# Panduan Versioning & Tag — CyberXatria

Dokumen ini untuk BE (`be_identity_cyberxatria`) dan FE (`fe_cyberxatria`).  
Tim mengikuti aturan yang sama.

---

## 1. Dua jenis “version” (jangan dicampur)

| Jenis | Contoh | Kapan berubah |
|-------|--------|----------------|
| **App / release (SemVer)** | `1.0.0` → `1.0.1` / `1.1.0` | Setiap rilis: fix, fitur, atau breaking |
| **API path** | `/api/v1` | Hanya jika kontrak HTTP **breaking** → `/api/v2` |

- Bug fix / fitur baru **biasanya tidak** mengubah `/api/v1`.
- Angka di `package.json` = sumber kebenaran app version.
- BE dan FE **boleh beda angka** (rilis terpisah), asal API tetap kompatibel.

Format tag Git: **`v` + SemVer** → contoh `v1.0.1` (bukan `1.0.1` tanpa `v`).

---

## 2. Kapan bump apa?

| Jenis perubahan | Bump | Contoh dari `1.0.0` | Tag |
|-----------------|------|---------------------|-----|
| Bug fix, hotfix, patch keamanan kecil (tanpa ubah kontrak) | **PATCH** | `1.0.1` | `v1.0.1` |
| Fitur baru, masih backward compatible | **MINOR** | `1.1.0` | `v1.1.0` |
| Breaking change (API/response/auth contract putus) | **MAJOR** | `2.0.0` | `v2.0.0` (+ pertimbangkan `/api/v2`) |

Contoh singkat:

- Fix crash login → `1.0.0` → **`1.0.1`**
- Tambah endpoint/halaman baru (client lama tetap jalan) → **`1.1.0`**
- Ubah shape response login / rename path wajib → **`2.0.0`**

---

## 3. Proses rilis (step by step)

Lakukan di **repo yang berubah** saja (BE saja, FE saja, atau keduanya).

Pakai satu perintah ini — jangan edit `package.json` manual, jangan `git tag` manual:

| Perubahan | Perintah |
|-----------|----------|
| Bug fix / hotfix | `npm run release:patch` |
| Fitur baru (kompatibel) | `npm run release:minor` |
| Breaking change | `npm run release:major` |

### Langkah 1 — Selesaikan kerjaan dulu

1. Semua fitur/fix sudah di-commit.
2. Working tree bersih: `git status`.
3. Branch rilis biasanya **`dev`**. Sync dulu:

```powershell
git checkout dev
git pull origin dev
```

### Langkah 2 — Jalankan release

```powershell
npm run release:patch
# atau: npm run release:minor
# atau: npm run release:major
```

Script otomatis:

- cek working tree bersih,
- bump `package.json` (+ lockfile bila ada),
- commit `chore: release vX.Y.Z`,
- buat tag lokal `vX.Y.Z`,
- cetak perintah push.

Yang ikut otomatis setelah bump (tanpa edit hardcode):

| Repo | Otomatis ikut |
|------|----------------|
| **BE** | Info `GET /api/v1`, Swagger, health live/ready (`getAppVersion()`), Sonar `projectVersion` |
| **FE** | Footer `v…` (`APP_VERSION` dari `package.json`), Sonar `projectVersion` |

Override hanya jika perlu (jarang): BE `APP_VERSION`, FE `NEXT_PUBLIC_APP_VERSION`.

> Jangan jalankan lagi jika bump + tag sudah dibuat.

### Langkah 3 — Push branch + tag

Pakai branch dan tag yang dicetak script (contoh `v1.0.1`):

```powershell
git push origin dev
git push origin v1.0.1
```

Jangan `git push --tags` (bisa mengirim semua tag lokal). Push **satu tag** saja.

### Langkah 4 — Verifikasi

- GitHub → repo → **Tags / Releases**: muncul `v1.0.1`
- Atau:

```powershell
git ls-remote --tags origin v1.0.1
```

---

## 3b. Cadangan — bump manual (hanya jika script gagal)

Edit `package.json`, sync lockfile, commit, lalu tag:

```powershell
npm install --package-lock-only
git add package.json package-lock.json
git commit -m "chore: release v1.0.1"
git tag -a v1.0.1 -m "Release v1.0.1"
```

Cek tag = HEAD:

```powershell
git log -1 --oneline v1.0.1
git log -1 --oneline HEAD
```

Lanjut Langkah 3–4 (push + verifikasi). Jangan campur dengan `npm run release:…`.

---

## 4. Checklist singkat (copy ke PR / chat)

```text
[ ] Jenis perubahan: patch / minor / major sudah ditentukan
[ ] npm run release:patch  (atau :minor / :major)
[ ] git push origin <branch>
[ ] git push origin vX.Y.Z   (tag yang dicetak script)
[ ] Tag muncul di GitHub
[ ] (Breaking API?) dokumentasikan /api/v2 bila perlu
```

---

## 5. Contoh alur tim

```text
Developer selesai fitur/fix + tree bersih
        ↓
Tentukan: patch / minor / major
        ↓
npm run release:patch   (atau :minor / :major)
        ↓
git push origin <branch>
git push origin vX.Y.Z
        ↓
(Opsional) VM: git pull → npm run sonar
```

---

## 6. Hal yang sering salah

1. **Tag tanpa bump `package.json`** — UI/API info masih versi lama.
2. **Bump tanpa tag** — sulit lacak rilis di GitHub.
3. **Tag di commit lama setelah rebase** — hapus tag lokal lalu buat ulang di `HEAD`:
   ```powershell
   git tag -d v1.0.1
   git tag -a v1.0.1 -m "Release v1.0.1"
   ```
4. **Mengubah `/api/v1` tiap patch** — jangan; hanya saat breaking.
5. **Push force tag** — hindari kecuali tim setuju memperbaiki tag salah:
   ```powershell
   git push origin :refs/tags/v1.0.1
   git push origin v1.0.1
   ```

---

## 7. Relasi dengan Sonar (opsional)

- Scan lokal/VM: `npm run sonar` (butuh `SONAR_HOST_URL` + `SONAR_TOKEN` di VM).
- `sonar.projectVersion` mengikuti `package.json` saat scan.
- Versioning **tidak wajib** menunggu Sonar selesai; Sonar adalah quality gate terpisah.

---

## 8. Baseline saat ini

| Item | Nilai |
|------|--------|
| App version awal | `1.0.0` |
| Tag awal | `v1.0.0` |
| API | `/api/v1` |
| Branch kerja utama | `dev` |

Rilis berikutnya: patch → `v1.0.1`, fitur → `v1.1.0`, breaking → `v2.0.0`.
