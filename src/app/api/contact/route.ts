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
  const rows = [
    [id ? "Nama" : "Name", data.name],
    ["Email", data.email],
    [id ? "Telepon" : "Phone", data.phoneNumber ? `${data.phoneCountryCode} ${data.phoneNumber}` : "-"],
    [id ? "Kode negara telepon" : "Phone country code", data.phoneCountryCode],
    [id ? "Perusahaan / organisasi" : "Company / organization", data.company],
    [id ? "Negara / wilayah" : "Country / region", data.country],
    [id ? "Layanan" : "Solution", data.interest],
    [id ? "Tipe permintaan" : "Request type", data.requestType],
    [id ? "Pesan" : "Message", data.message || "-"],
    [id ? "Waktu pengajuan (UTC)" : "Submitted at (UTC)", new Date().toISOString()],
  ];
  const summary = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const greeting = id ? `Halo ${data.name},` : `Hello ${data.name},`;
  const intro = id ? "Terima kasih telah menghubungi CyberXatria. Permintaan Anda telah kami terima." : "Thank you for contacting CyberXatria. We have received your inquiry.";
  const followUp = id ? "Tim CyberXatria akan menindaklanjuti permintaan Anda." : "The CyberXatria team will follow up on your inquiry.";
  const table = `<table role="presentation" style="border-collapse:collapse;width:100%;table-layout:fixed">${rows.map(([label, value]) => `<tr><td style="padding:10px 4px;border-bottom:1px solid #e2e8f0;overflow-wrap:anywhere"><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;
  const template = (title: string, content: string) => `<!doctype html><html lang="${data.language}"><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"></head><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:600px;margin:0 auto;padding:24px;background:#fff;overflow-wrap:anywhere"><p style="color:#be123c;font-weight:bold">CyberXatria</p><h1 style="font-size:22px">${escapeHtml(title)}</h1>${content}<p style="margin-top:24px;color:#64748b">CyberXatria</p></div></body></html>`;

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

  const internal = await send(config.admin, internalSubject, template(internalSubject, table), `${internalSubject}\n\n${summary}`, data.email);
  if (internal !== "accepted") {
    return { status: 502, body: { ok: false, code: internal === "unknown" ? "uncertain" : "delivery_failed", internal, acknowledgment: "not_attempted" as Delivery } };
  }
  const acknowledgment = await send(data.email, visitorSubject, template(visitorSubject, `<p>${escapeHtml(greeting)}</p><p>${intro}</p>${table}<p>${followUp}</p>`), `${greeting}\n\n${intro}\n\n${summary}\n\n${followUp}`);
  return { status: acknowledgment === "accepted" ? 200 : 207, body: { ok: acknowledgment === "accepted", code: acknowledgment === "accepted" ? "sent" : "partial", internal, acknowledgment } };
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
