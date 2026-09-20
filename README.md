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
