import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type DemoRequest = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
  message: string;
  language: "id" | "en";
};

const requiredFields: Array<keyof Omit<DemoRequest, "message" | "language">> = [
  "name",
  "company",
  "email",
  "phone",
  "country",
  "interest",
];

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = parseDemoRequest(body);
  if (!parsed) return NextResponse.json({ ok: false }, { status: 400 });

  const config = getSmtpConfig();
  if (!config) {
    console.error("Request demo SMTP configuration is incomplete.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"CyberXatria Website" <${config.from}>`,
      to: config.to,
      replyTo: parsed.email,
      subject: `New Request Demo - ${parsed.name} / ${parsed.company}`,
      text: buildAdminText(parsed),
      html: buildAdminHtml(parsed),
    });
  } catch (error) {
    console.error("Request demo primary email failed.", safeError(error));
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  try {
    await transporter.sendMail({
      from: `"CyberXatria" <${config.from}>`,
      to: parsed.email,
      subject:
        parsed.language === "id"
          ? "Permintaan Demo CyberXatria Telah Diterima"
          : "Your CyberXatria Demo Request Has Been Received",
      text: buildAutoReplyText(parsed),
      html: buildAutoReplyHtml(parsed),
    });
  } catch (error) {
    console.error("Request demo auto-reply failed.", safeError(error));
  }

  return NextResponse.json({ ok: true });
}

function parseDemoRequest(value: unknown): DemoRequest | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const data: DemoRequest = {
    name: readText(record.name),
    company: readText(record.company),
    email: readText(record.email),
    phone: readText(record.phone),
    country: readText(record.country),
    interest: readText(record.interest),
    message: readText(record.message, 2000),
    language: record.language === "id" ? "id" : "en",
  };

  if (requiredFields.some((field) => !data[field])) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return null;

  return data;
}

function readText(value: unknown, maxLength = 300) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getSmtpConfig() {
  const port = Number(process.env.SMTP_PORT);
  const config = {
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO_EMAIL,
  };

  if (!config.host || !Number.isInteger(port) || port <= 0 || !config.user || !config.pass || !config.from || !config.to) {
    return null;
  }

  return config;
}

function buildAdminText(data: DemoRequest) {
  return [
    "New Request Demo",
    "",
    `Name: ${data.name}`,
    `Company / Organization: ${data.company}`,
    `Business Email: ${data.email}`,
    `Phone Number: ${data.phone}`,
    `HQ Country: ${data.country}`,
    `Solution of Interest: ${data.interest}`,
    `Message: ${data.message || "-"}`,
  ].join("\n");
}

function buildAdminHtml(data: DemoRequest) {
  const rows = [
    ["Name", data.name],
    ["Company / Organization", data.company],
    ["Business Email", data.email],
    ["Phone Number", data.phone],
    ["HQ Country", data.country],
    ["Solution of Interest", data.interest],
    ["Message", data.message || "-"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
      <h2 style="margin:0 0 16px">New Request Demo</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="border:1px solid #e2e8f0;padding:8px 10px;font-weight:700;width:190px">${escapeHtml(label)}</td>
                  <td style="border:1px solid #e2e8f0;padding:8px 10px">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function buildAutoReplyText(data: DemoRequest) {
  if (data.language === "id") {
    return [
      `Halo ${data.name},`,
      "",
      "Terima kasih telah menghubungi CyberXatria.",
      "",
      "Permintaan demo Anda telah kami terima dan akan ditindaklanjuti oleh tim CyberXatria.",
      "",
      "Salam,",
      "Tim CyberXatria",
      "",
      "Email ini dikirim secara otomatis. Mohon tidak membalas email ini.",
    ].join("\n");
  }

  return [
    `Hello ${data.name},`,
    "",
    "Thank you for contacting CyberXatria.",
    "",
    "We have received your demo request and the CyberXatria team will follow up on your request.",
    "",
    "Regards,",
    "CyberXatria Team",
    "",
    "This is an automated email. Please do not reply to this message.",
  ].join("\n");
}

function buildAutoReplyHtml(data: DemoRequest) {
  const lines =
    data.language === "id"
      ? [
          `Halo ${data.name},`,
          "Terima kasih telah menghubungi CyberXatria.",
          "Permintaan demo Anda telah kami terima dan akan ditindaklanjuti oleh tim CyberXatria.",
          "Salam,<br>Tim CyberXatria",
          "Email ini dikirim secara otomatis. Mohon tidak membalas email ini.",
        ]
      : [
          `Hello ${data.name},`,
          "Thank you for contacting CyberXatria.",
          "We have received your demo request and the CyberXatria team will follow up on your request.",
          "Regards,<br>CyberXatria Team",
          "This is an automated email. Please do not reply to this message.",
        ];

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
      ${lines.map((line) => `<p>${escapeHtml(line).replace(/&lt;br&gt;/g, "<br>")}</p>`).join("")}
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeError(error: unknown) {
  if (error instanceof Error) return { name: error.name, message: error.message };
  return { message: "Unknown email error" };
}
