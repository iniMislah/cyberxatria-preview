# CyberXatria Website

Static-first company profile and customer portal prototype for CyberXatria, built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev -- -p 3001
```

Open `http://localhost:3001`. Backend New Identity berjalan terpisah di
`http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
```

The build is exported as a static site to `out/`.

## Deploy VM

Jangan jalankan compose dari repo ini. Satu compose ada di
`be_identity_cyberxatria/docker-compose.yml` (FE + Identity).

Di VM, clone kedua repo sebagai sibling, isi `.env` di BE, lalu:

```bash
cd be_identity_cyberxatria
docker compose up -d --build
```

FE listen di port `3001` (`network_mode: host`). Detail env ada di README BE.

## Implemented routes

- `/` — landing page
- `/company` — company profile
- `/solutions/soc` — SOC as a Service
- `/solutions/cyber-drill` — Cyber Drill Exercise
- `/solutions/tabletop` — Cyber Security Tabletop Exercise
- `/signup` — input nama, email, telepon, dan Cloudflare Turnstile untuk meminta OTP
- `/verify-account` — verifikasi OTP dan langsung meminta pengiriman link create password
- `/account-created` — konfirmasi bahwa link create password sudah dikirim
- `/activate-account` — membuat password dari token pada link email
- `/login` — login lokal melalui test-only Identity API
- `/dashboard`, `/request-demo`, `/pricing`, `/billing` — customer portal flow
- `/admin/users` — user management, company assignment, dan pengelolaan privilege fitur/aset
- `/admin/features` — katalog feature dan feature plan
- `/admin/privilege-config` — entitlement company dan access set aset

## New Identity local flow

Pastikan `.env` backend New Identity berisi nilai berikut saat pengujian lokal:

```env
CORS_ORIGINS=http://localhost:3001
FRONTEND_URL=http://localhost:3001
MAIL_TRANSPORT=log
ENABLE_TEST_AUTH_API=true
```

Dengan `MAIL_TRANSPORT=log`, response backend menyertakan OTP dan URL aktivasi
khusus development. CyberXatria menampilkan keduanya agar seluruh flow dapat
diuji lokal tanpa SMTP. Pada mode SMTP, user mengambil OTP dan link create
password dari inbox email.

Self-service registration tidak memakai approval admin. Urutannya adalah:

1. isi nama, email, telepon, dan CAPTCHA;
2. masukkan OTP email;
3. Identity langsung mengirim link create password;
4. buka `/activate-account?token=...`, buat password minimal 8 karakter;
5. login memakai akun yang baru aktif.

Endpoint login yang dipakai halaman `/login` masih test-only dan harus diganti
dengan kontrak OIDC/JWT production ketika tersedia.

Untuk wording di seluruh website, user tanpa `role_bindings` aktif dianggap
memiliki effective role `User`. Ini merupakan default presentasi frontend dan
tidak otomatis memberikan permission RBAC; authorization backend tetap hanya
berasal dari binding dan permission yang tersimpan di database.

Setelah migration permission dijalankan, login ulang diperlukan agar frontend
menerima daftar permission terbaru. Panel privilege hanya muncul jika session
memiliki `privilege.view`; tombol assign dan remove masing-masing mengikuti
`privilege.assign` dan `privilege.remove`.

## Integration notes

Dashboard, billing, dan halaman bisnis lainnya masih memakai presentation data.

Set `NEXT_PUBLIC_SITE_URL` to the production origin when building so canonical Open Graph URLs point to the deployed domain.

## Contact Form — Brevo (localhost)

The existing `RequestDemoForm` is the public Contact Form on `/request-demo`,
`/id/request-demo`, and `/en/request-demo`. It now posts to `POST /api/contact`.
The obsolete LarkSuite SMTP endpoint and Nodemailer dependencies have been removed.
This form sends exclusively through Brevo; there is no SMTP fallback or parallel send.
The removed `/api/request-demo` URL is not an email API. The existing
`/[lang]/request-demo` page pattern can still match that URL and return HTML;
an HTTP 200 there must not be interpreted as an email submission result.

Set `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, and `BREVO_ADMIN_EMAIL` in the ignored
`.env.local`. Use `admin@cyberxatria.id` for `BREVO_ADMIN_EMAIL`. The sender must
be verified in Brevo. Do not put the key in a `NEXT_PUBLIC_` variable or a browser.
Run `npm run dev` without `GITHUB_PAGES=true` for the local API.

The server validates the existing fields and sends two separate emails in order:
internal notification (Reply-To: visitor), then visitor acknowledgment. `200`
means both were accepted by Brevo, not proof of inbox delivery. `207` means the
internal notification was accepted but acknowledgment failed or is uncertain.
An internal failure returns `502` and skips acknowledgment. Responses contain
separate `internal` and `acknowledgment` results; provider errors/keys are never
returned. Each Brevo call has a 10-second timeout and is never retried automatically.

Run the mocked suite with `node --test scripts/contact.test.mjs`. It uses fake
credentials and intercepted fetch calls; it never loads `.env.local` or sends email.

### Manual real-email test (sends real email)

1. Run the mock suite first. Confirm the Brevo sender/domain is verified and the
   configured admin inbox and visitor test inbox belong to you.
2. Start `npm run dev`. Open `/id/request-demo`, fill the existing form, and submit
   **once**. In browser Network, check `/api/contact` and its two delivery results.
3. Check the internal inbox and visitor inbox/spam folders, and Brevo transactional
   logs. Verify subject, greeting, summary, country, full phone number, timestamp,
   and internal Reply-To. A Brevo acceptance does not guarantee inbox delivery.
4. Repeat with a distinct inquiry on `/en/request-demo` to verify English copy.
   Use another distinct inquiry to check optional phone/message being empty.
5. On partial or uncertain delivery, retain the form and inspect Brevo logs before
   resubmitting; do not refresh/retry blindly. Test failure states with mocks,
   not by repeatedly sending real messages or exposing a key in developer tools.

### Static GitHub Pages and operational limits

`GITHUB_PAGES=true npm run build` retains static export and the preview basePath.
A normal `npm run build` produces a Node-hosted Next.js app with working APIs.
The existing nginx Docker build sets `STATIC_EXPORT=true` to keep producing `out/`
without a subpath. It accepts `NEXT_PUBLIC_CONTACT_ENDPOINT` as a build argument.
GitHub Pages cannot run `/api/contact`. Without `NEXT_PUBLIC_CONTACT_ENDPOINT`,
the static form displays an unavailable message and does not fake success.
For a future external backend, configure `NEXT_PUBLIC_CONTACT_ENDPOINT` at build
time to its HTTPS URL. It must implement this request/response contract and
idempotency handling, and allow the preview origin and `Content-Type` /
`Idempotency-Key` headers through CORS. The local route intentionally accepts
same-origin browser requests only. No external backend is deployed here.

Spam controls include a honeypot, a 16 KiB streamed payload limit, maximum field
lengths, three unique inquiries per email per ten minutes, and twenty globally
per minute. Identical payloads and idempotency keys share the same result for
30 minutes, including concurrent requests and uncertain sends. Definitive
internal rejection may be retried manually within the rate limits. These caches
are bounded and process-local: restart/multiple instances lose shared protection.
Use a durable shared store, trusted gateway rate limiting, and bot verification
before operating a public backend at scale. Do not assume exactly-once delivery
across process restarts or that a client-provided email proves mailbox ownership.
