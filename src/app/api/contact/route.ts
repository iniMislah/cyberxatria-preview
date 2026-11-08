import { createHash } from "node:crypto";

export const runtime = "nodejs";

const emailPattern = /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/;
const maxPayloadBytes = 16 * 1024;
const retentionMs = 30 * 60 * 1000;
const contactFields = ["name", "company", "email", "country", "interest", "requestType", "phoneCountryCode", "phoneNumber", "message"] as const;
type Delivery = "accepted" | "failed" | "unknown" | "not_attempted";
type Result = { ok: boolean; code: string; internal: Delivery; acknowledgment: Delivery };
type StoredResult = { digest: string; expires: number; result: Promise<{ status: number; body: Result }> };

// shortcut: process-local deduplication/rate limits, use shared storage before running multiple instances.
const submissions = new Map<string, StoredResult>();
const rateLimits = new Map<string, { count: number; expires: number }>();

function json(body: object, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, code: "origin" }, 403);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return json({ ok: false, code: "content_type" }, 415);
  }
  if (Number(request.headers.get("content-length")) > maxPayloadBytes) return json({ ok: false, code: "payload_size" }, 413);

  let value: unknown;
  const reader = request.body?.getReader();
  if (!reader) return json({ ok: false, code: "validation" }, 400);
  try {
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;
      size += chunk.byteLength;
      if (size > maxPayloadBytes) {
        await reader.cancel();
        return json({ ok: false, code: "payload_size" }, 413);
      }
      chunks.push(chunk);
    }
    value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return json({ ok: false, code: "validation" }, 400);
  } finally {
    reader.releaseLock();
  }

  const data = parseContact(value);
  if (!data) return json({ ok: false, code: "validation" }, 400);
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[a-zA-Z0-9-]{16,64}$/.test(key)) return json({ ok: false, code: "validation" }, 400);

  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  const admin = process.env.BREVO_ADMIN_EMAIL;
  if (!apiKey || !sender || !admin || !emailPattern.test(sender) || !emailPattern.test(admin)) {
    return json({ ok: false, code: "configuration" }, 503);
  }

  const now = Date.now();
  for (const [id, entry] of submissions) if (entry.expires <= now) submissions.delete(id);
  for (const [id, entry] of rateLimits) if (entry.expires <= now) rateLimits.delete(id);
  const digest = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  const previous = submissions.get(key) ?? submissions.get(digest);
  if (previous) {
    if (previous.digest !== digest) return json({ ok: false, code: "conflict" }, 409);
    const result = await previous.result;
    return json(result.body, result.status);
  }

  const emailKey = createHash("sha256").update(data.email.toLowerCase()).digest("hex");
  if (submissions.size >= 1000 || rateLimits.size >= 1000 ||
      (rateLimits.get(emailKey)?.count ?? 0) >= 3 || (rateLimits.get("global")?.count ?? 0) >= 20) {
    return json({ ok: false, code: "rate_limit" }, 429);
  }
  for (const [id, windowMs] of [[emailKey, 10 * 60 * 1000], ["global", 60 * 1000]] as const) {
    const limit = rateLimits.get(id) ?? { count: 0, expires: now + windowMs };
    limit.count++;
    rateLimits.set(id, limit);
  }

  const result = deliverContact(data, { apiKey, sender, admin });
  const entry = { digest, expires: now + retentionMs, result };
  submissions.set(key, entry);
  submissions.set(digest, entry);
  const outcome = await result;
  if (outcome.body.internal === "failed") {
    submissions.delete(key);
    submissions.delete(digest);
  }
  return json(outcome.body, outcome.status);
}

function parseContact(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const data = {} as Record<(typeof contactFields)[number], string>;
  for (const field of contactFields) {
    const raw = record[field] ?? "";
    if (typeof raw !== "string" || raw.length > (field === "message" ? 2000 : 300)) return null;
    if (field !== "message" && /[\x00-\x1f\x7f]/.test(raw)) return null;
    data[field] = raw.trim();
  }
  if ((["name", "company", "email", "country", "interest", "requestType"] as const).some(field => !data[field])) return null;
  if (!emailPattern.test(data.email) || !/^\+\d{1,4}$/.test(data.phoneCountryCode)) return null;
  if (data.phoneNumber && !/^[\d\s()+.-]{3,50}$/.test(data.phoneNumber)) return null;
  if (!["Cyber Drill Exercise", "Tabletop Exercise"].includes(data.interest)) return null;
  if (!["Demo", "Consultation", "Pricing"].includes(data.requestType)) return null;
  if (record.language !== "id" && record.language !== "en") return null;
  if (record.website !== undefined && record.website !== "") return null;
  return { ...data, language: record.language };
}

async function deliverContact(data: NonNullable<ReturnType<typeof parseContact>>, config: { apiKey: string; sender: string; admin: string }) {
  const id = data.language === "id";
  const internalSubject = id ? "[CyberXatria] Pengajuan Baru dari Contact Form" : "[CyberXatria] New Contact Form Inquiry";
  const visitorSubject = id ? "[CyberXatria] Permintaan Anda Telah Diterima" : "[CyberXatria] We've Received Your Inquiry";
  const submittedAt = new Date().toISOString();
  const rows = [
    [id ? "Nama" : "Name", data.name],
    ["Email", data.email],
    [id ? "Telepon" : "Phone", data.phoneNumber ? `${data.phoneCountryCode} ${data.phoneNumber}` : "-"],
    [id ? "Perusahaan / organisasi" : "Company / organization", data.company],
    [id ? "Negara / wilayah" : "Country / region", data.country],
    [id ? "Layanan" : "Solution", data.interest],
    [id ? "Tipe permintaan" : "Request type", data.requestType],
    [id ? "Pesan" : "Message", data.message || "-"],
    [id ? "Tanggal Pengiriman" : "Submitted date", submittedAt.slice(0, 10)],
  ];
  const summary = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const greeting = id ? `Halo ${data.name},` : `Hello ${data.name},`;
  const intro = id ? "Terima kasih telah menghubungi CyberXatria. Permintaan Anda telah kami terima." : "Thank you for contacting CyberXatria. We have received your inquiry.";
  const followUp = id ? "Tim CyberXatria akan menindaklanjuti permintaan Anda." : "The CyberXatria team will follow up on your inquiry.";
  const closing = id ? "Tim CyberXatria" : "CyberXatria Team";
  const internalTitle = id ? "Permintaan Baru dari Website CyberXatria" : "New Inquiry from the CyberXatria Website";
  const visitorTitle = id ? "Permintaan Anda Telah Diterima" : "We've Received Your Inquiry";
  const internalIntro = id ? "Pengajuan baru telah diterima melalui formulir kontak website. Berikut detail pengajuannya." : "A new inquiry has been received through the website contact form. The submission details are below.";
  const notice = id ? "Email ini dikirim secara otomatis oleh website CyberXatria." : "This email was sent automatically by the CyberXatria website.";
  const groups = [
    { title: id ? "Detail kontak" : "Contact details", rows: rows.slice(0, 5) },
    { title: id ? "Detail permintaan" : "Request details", rows: [...rows.slice(5, 7), rows[8]] },
    { title: id ? "Pesan" : "Message", rows: rows.slice(7, 8) },
  ];
  const table = `<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed">
    <colgroup><col width="36%" style="width:36%"><col width="64%" style="width:64%"></colgroup>
    ${groups.map(group => `<tbody>
      <tr><th colspan="2" align="left" style="padding:20px 0 8px;font-size:13px;line-height:20px;color:#191C22;font-weight:bold">${group.title}</th></tr>
      ${group.rows.map(([label, value]) => `<tr>
        <th scope="row" width="36%" align="left" valign="top" bgcolor="#F6F7F9" style="width:36%;padding:8px 12px;border-bottom:1px solid #E5E7EB;font-size:13px;line-height:20px;font-weight:normal;color:#596170;word-wrap:break-word;overflow-wrap:anywhere">${escapeHtml(label)}</th>
        <td width="64%" align="left" valign="top" bgcolor="#FAFBFC" style="width:64%;padding:8px 12px;border-bottom:1px solid #E5E7EB;font-size:14px;line-height:20px;color:#191C22;word-wrap:break-word;overflow-wrap:anywhere;word-break:break-word">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
      </tr>`).join("")}
    </tbody>`).join("")}
  </table>`;
  const accentStyle = "width:35%;background-color:#8E235E;background-image:linear-gradient(115deg,#191C22 18%,#8E235E 18%,#EA4036 100%);font-size:0;line-height:0";
  const template = (title: string, content: string) => `<!doctype html>
    <html lang="${data.language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
    <body style="margin:0;padding:0;background-color:#EEF0F3;color:#191C22;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#EEF0F3" style="width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt"><tr><td align="center" style="padding:24px 12px">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" style="width:100%;max-width:600px;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt">
          <tr><td bgcolor="#191C22" style="background-color:#191C22">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed"><tr>
              <td width="65%" align="left" valign="middle" style="width:65%;padding:18px 20px">
                <img src="https://inimislah.github.io/cyberxatria-preview/images/cyberxatria-logo.png" alt="CyberXatria" width="213" height="57" style="display:block;width:213px;max-width:100%;height:auto;border:0;outline:none;text-decoration:none">
                <p style="margin:6px 0 0;font-size:10px;line-height:16px;color:#D1D5DB">Cyber Readiness &amp; Security Operations</p>
              </td>
              <td width="35%" bgcolor="#8E235E" aria-hidden="true" style="${accentStyle}">&nbsp;</td>
            </tr></table>
          </td></tr>
          <tr><td align="left" style="padding:24px;background-color:#FFFFFF;font-size:14px;line-height:22px;word-wrap:break-word;overflow-wrap:anywhere">
            <h1 style="margin:0 0 20px;font-size:22px;line-height:30px;font-weight:bold;color:#191C22">${escapeHtml(title)}</h1>
            ${content}
          </td></tr>
          <tr><td bgcolor="#191C22" style="background-color:#191C22">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed"><tr>
              <td width="65%" align="left" style="width:65%;padding:10px 20px">
                <p style="margin:0;font-size:13px;line-height:18px;font-weight:bold;color:#FFFFFF">CyberXatria</p>
                <p style="margin:2px 0 0;font-size:9px;line-height:14px;color:#D1D5DB">Cyber Readiness &amp; Security Operations</p>
              </td>
              <td width="35%" bgcolor="#8E235E" aria-hidden="true" style="${accentStyle}">&nbsp;</td>
            </tr></table>
          </td></tr>
          <tr><td bgcolor="#F3F4F6" align="left" style="padding:8px 20px;background-color:#F3F4F6;font-size:10px;line-height:14px;color:#6B7280">
            <p style="margin:0 0 2px">&copy; ${submittedAt.slice(0, 4)} CyberXatria.</p>
            <p style="margin:0">${notice}</p>
          </td></tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td></tr></table>
    </body></html>`;

  async function send(to: string, subject: string, htmlContent: string, textContent: string, replyTo?: string): Promise<Delivery> {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": config.apiKey, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ sender: { name: "CyberXatria", email: config.sender }, to: [{ email: to }], subject, htmlContent, textContent, ...(replyTo && { replyTo: { email: replyTo } }) }),
        signal: AbortSignal.timeout(10_000),
        redirect: "error",
      });
      if (!response.ok) {
        void response.body?.cancel();
        return response.status >= 500 ? "unknown" : "failed";
      }
      const receipt: unknown = await response.json();
      return receipt && typeof receipt === "object" && "messageId" in receipt && typeof receipt.messageId === "string" ? "accepted" : "unknown";
    } catch {
      // A timeout may occur after acceptance; never retry an uncertain send automatically.
      return "unknown";
    }
  }

  const internal = await send(config.admin, internalSubject, template(internalTitle, `<p style="margin:0 0 4px">${internalIntro}</p>${table}`), `${internalTitle}\n\n${internalIntro}\n\n${summary}\n\n${notice}`, data.email);
  if (internal !== "accepted") {
    return { status: 502, body: { ok: false, code: internal === "unknown" ? "uncertain" : "delivery_failed", internal, acknowledgment: "not_attempted" as Delivery } };
  }
  const acknowledgment = await send(data.email, visitorSubject, template(visitorTitle, `<p style="margin:0 0 12px">${escapeHtml(greeting)}</p><p style="margin:0 0 4px">${intro}</p>${table}<p style="margin:24px 0 16px">${followUp}</p><p style="margin:0">${closing}</p>`), `${greeting}\n\n${intro}\n\n${summary}\n\n${followUp}\n\n${closing}\n\n${notice}`);
  return { status: acknowledgment === "accepted" ? 200 : 207, body: { ok: acknowledgment === "accepted", code: acknowledgment === "accepted" ? "sent" : "partial", internal, acknowledgment } };
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
