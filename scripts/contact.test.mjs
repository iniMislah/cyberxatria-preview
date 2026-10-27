import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/app/api/contact/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
let moduleId = 0;
const payload = {
  name: "Test Visitor", company: "Test Organization", email: "visitor@example.test",
  country: "Indonesia", phoneCountryCode: "+62", phoneNumber: "81234567890",
  interest: "Cyber Drill Exercise", requestType: "Consultation", message: "Please contact us.", language: "id", website: "",
};

async function setup(t, responses = [201, 201]) {
  const original = Object.fromEntries(["BREVO_API_KEY", "BREVO_SENDER_EMAIL", "BREVO_ADMIN_EMAIL"].map(key => [key, process.env[key]]));
  Object.assign(process.env, { BREVO_API_KEY: "mock-only-key", BREVO_SENDER_EMAIL: "sender@example.test", BREVO_ADMIN_EMAIL: "admin@example.test" });
  t.after(() => {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  });
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, ...options, body: JSON.parse(options.body) });
    const status = responses[calls.length - 1] ?? 201;
    if (status instanceof Error) throw status;
    return Response.json(status === 201 ? { messageId: `mock-${calls.length}` } : { message: "PRIVATE PROVIDER ERROR" }, { status });
  });
  const { POST } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}#${++moduleId}`);
  return { POST, calls };
}

function request(data = payload, key = randomUUID(), headers = {}) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": key, ...headers }, body: JSON.stringify(data),
  });
}

for (const language of ["id", "en"]) {
  test(`valid ${language}: two ordered emails, exact recipients/sender, localized templates`, async t => {
    const { POST, calls } = await setup(t);
    const response = await POST(request({ ...payload, language, to: "attacker@example.test" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, code: "sent", internal: "accepted", acknowledgment: "accepted" });
    assert.equal(calls.length, 2);
    for (const call of calls) {
      assert.equal(call.url, "https://api.brevo.com/v3/smtp/email");
      assert.equal(call.method, "POST");
      assert.equal(call.headers["api-key"], "mock-only-key");
      assert.equal(call.headers["Content-Type"], "application/json");
      assert.equal(call.headers.Accept, "application/json");
      assert.deepEqual(call.body.sender, { name: "CyberXatria", email: "sender@example.test" });
      assert(call.signal instanceof AbortSignal);
      assert(call.body.htmlContent.includes(`lang="${language}"`));
      for (const field of [payload.name, payload.company, payload.country, payload.email, payload.interest, payload.message, "+62 81234567890"]) assert(call.body.htmlContent.includes(field));
      assert.match(call.body.textContent, /\d{4}-\d{2}-\d{2}T/);
    }
    assert.deepEqual(calls[0].body.to, [{ email: "admin@example.test" }]);
    assert.deepEqual(calls[0].body.replyTo, { email: payload.email });
    assert.deepEqual(calls[1].body.to, [{ email: payload.email }]);
    assert.equal(calls[0].body.subject, language === "id" ? "[CyberXatria] Pengajuan Baru dari Contact Form" : "[CyberXatria] New Contact Form Inquiry");
    assert.equal(calls[1].body.subject, language === "id" ? "[CyberXatria] Permintaan Anda Telah Diterima" : "[CyberXatria] We've Received Your Inquiry");
    assert(calls[1].body.textContent.includes(language === "id" ? "akan menindaklanjuti" : "will follow up"));
  });
}

test("invalid email, missing fields, invalid enums/language/phone, oversized fields and honeypot never send", async t => {
  const { POST, calls } = await setup(t);
  const invalid = [
    { email: "invalid" }, { email: "a@example.test\r\nBcc:other@example.test" },
    ...["name", "company", "email", "country", "interest", "requestType"].map(field => ({ [field]: "" })),
    { language: "fr" }, { interest: "invented" }, { requestType: "invented" },
    { phoneCountryCode: "62" }, { phoneNumber: "invalid" }, { message: "x".repeat(2001) }, { website: "bot.example" },
  ];
  for (const invalidData of invalid) assert.equal((await POST(request({ ...payload, ...invalidData }))).status, 400);
  assert.equal(calls.length, 0);
});

test("payload size is enforced for actual bytes, including without Content-Length", async t => {
  const { POST, calls } = await setup(t);
  assert.equal((await POST(request({ ...payload, junk: "x".repeat(17_000) }))).status, 413);
  assert.equal((await POST(request(payload, randomUUID(), { "Content-Length": "99999" }))).status, 413);
  assert.equal(calls.length, 0);
});

test("malformed JSON, foreign origin, wrong content type, missing idempotency key", async t => {
  const { POST, calls } = await setup(t);
  assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" }))).status, 400);
  assert.equal((await POST(request(payload, randomUUID(), { Origin: "https://untrusted.example" }))).status, 403);
  assert.equal((await POST(request(payload, randomUUID(), { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await POST(request(payload, ""))).status, 400);
  assert.equal(calls.length, 0);
});

test("missing API key or invalid sender/admin fails safely before fetch", async t => {
  const { POST, calls } = await setup(t);
  delete process.env.BREVO_API_KEY;
  assert.equal((await POST(request())).status, 503);
  process.env.BREVO_API_KEY = "mock-only-key";
  process.env.BREVO_SENDER_EMAIL = "invalid";
  assert.equal((await POST(request())).status, 503);
  process.env.BREVO_SENDER_EMAIL = "sender@example.test";
  process.env.BREVO_ADMIN_EMAIL = "";
  assert.equal((await POST(request())).status, 503);
  assert.equal(calls.length, 0);
});

for (const status of [401, 403, 429, 500]) {
  test(`Brevo ${status}: no acknowledgment, no automatic retry, no provider detail leakage`, async t => {
    const { POST, calls } = await setup(t, [status]);
    const response = await POST(request());
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.ok, false);
    assert.equal(body.internal, status >= 500 ? "unknown" : "failed");
    assert.equal(body.acknowledgment, "not_attempted");
    assert.equal(calls.length, 1);
    assert(!JSON.stringify(body).includes("PRIVATE"));
  });
}

test("timeout remains unknown and a repeat does not send again", async t => {
  const { POST, calls } = await setup(t, [new DOMException("mock timeout", "TimeoutError")]);
  const key = randomUUID();
  for (let i = 0; i < 2; i++) {
    const response = await POST(request(payload, key));
    assert.equal(response.status, 502);
    assert.equal((await response.json()).code, "uncertain");
  }
  assert.equal(calls.length, 1);
});

for (const failure of [403, new DOMException("mock timeout", "TimeoutError")]) {
  test(`partial acknowledgment ${typeof failure === "number" ? failure : "timeout"} is retained without resending`, async t => {
    const { POST, calls } = await setup(t, [201, failure]);
    const key = randomUUID();
    for (let i = 0; i < 2; i++) {
      const response = await POST(request(payload, key));
      assert.equal(response.status, 207);
      const body = await response.json();
      assert.equal(body.ok, false);
      assert.equal(body.code, "partial");
      assert.equal(body.internal, "accepted");
      assert.equal(body.acknowledgment, typeof failure === "number" ? "failed" : "unknown");
    }
    assert.equal(calls.length, 2);
  });
}

test("concurrent/repeated submissions are deduplicated, including with a new key", async t => {
  const { POST, calls } = await setup(t);
  const key = randomUUID();
  const results = await Promise.all([POST(request(payload, key)), POST(request(payload, key))]);
  assert(results.every(response => response.status === 200));
  assert.equal((await POST(request(payload))).status, 200);
  assert.equal((await POST(request({ ...payload, message: "changed" }, key))).status, 409);
  assert.equal(calls.length, 2);
});

test("rate limit blocks new inquiries to the same recipient after three submissions", async t => {
  const { POST, calls } = await setup(t);
  for (let i = 0; i < 3; i++) assert.equal((await POST(request({ ...payload, message: `Inquiry ${i}` }))).status, 200);
  assert.equal((await POST(request({ ...payload, message: "Inquiry 4" }))).status, 429);
  assert.equal(calls.length, 6);
});

test("all user HTML is escaped in both emails", async t => {
  const { POST, calls } = await setup(t);
  const injection = `<img src=x onerror="alert('x')"> & test`;
  await POST(request({ ...payload, name: injection, company: injection, message: injection }));
  for (const call of calls) {
    assert(!call.body.htmlContent.includes("<img src=x"));
    assert(call.body.htmlContent.includes("&lt;img src=x"));
    assert(call.body.htmlContent.includes("&quot;"));
    assert(call.body.htmlContent.includes("&#39;"));
    assert(call.body.htmlContent.includes("&amp; test"));
  }
});

test("optional phone/message may be empty without inventing data", async t => {
  const { POST, calls } = await setup(t);
  assert.equal((await POST(request({ ...payload, phoneNumber: "", message: "" }))).status, 200);
  assert(calls[0].body.textContent.includes("Telepon: -"));
  assert(calls[0].body.textContent.includes("Pesan: -"));
});

test("global rate limit applies across different visitor emails", async t => {
  const { POST, calls } = await setup(t);
  for (let i = 0; i < 20; i++) assert.equal((await POST(request({ ...payload, email: `visitor${i}@example.test` }))).status, 200);
  assert.equal((await POST(request({ ...payload, email: "another@example.test" }))).status, 429);
  assert.equal(calls.length, 40);
});

test("the fetch timeout is 10 seconds and malformed acceptance receipts stay uncertain", async t => {
  const { POST } = await setup(t);
  const timeouts = [];
  t.mock.method(AbortSignal, "timeout", ms => {
    timeouts.push(ms);
    return new AbortController().signal;
  });
  t.mock.method(globalThis, "fetch", async () => Response.json({ unexpected: true }, { status: 201 }));
  const response = await POST(request());
  assert.equal((await response.json()).code, "uncertain");
  assert.deepEqual(timeouts, [10_000]);
});
