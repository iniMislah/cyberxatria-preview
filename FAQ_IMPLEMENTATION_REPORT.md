# Laporan FAQ Beranda CyberXatria

Pembaruan FAQ nomor 6: jawaban Indonesia mengikuti naskah yang diminta dan didukung halaman Cyber Drill serta Tabletop. Terjemahan Inggris diselaraskan; tautan diganti ke Cyber Drill menggunakan localePath. Hash tujuh FAQ lainnya dan komponen accordion tetap sama. Lint, build normal, build GitHub Pages, serta diff check lulus; 8 kombinasi browser ID/EN, light/dark, dan mobile/desktop lulus. HTML export kedua locale memuat pertanyaan pengganti, tanpa pertanyaan/tautan SOC lama atau localhost, dengan basePath satu kali. Tidak ada deployment langsung, commit, atau push.

## Audit dan ruang lingkup

Delapan topik didukung oleh konten situs saat ini. Tidak ada FAQ sebelumnya. Bagian baru ditempatkan setelah sertifikasi, sebelum CTA terakhir dan footer. Tidak ada perubahan pada Contact Form, Brevo, API, aset, canonical, robots, sitemap, atau konfigurasi SEO global.

AI for SOC masih berstatus Coming Soon di navigasi dan halaman SOC. Klaim 24/7 pada hero lama tidak diulang karena status layanan belum konsisten; pemilik konten perlu mengonfirmasi status operasional tersebut secara terpisah. FAQ tidak menjanjikan SLA, harga, sertifikasi baru, atau hasil tertentu.

## File

- `src/lib/home-faq.ts`: konten ID/EN.
- `src/components/home-faq.tsx`: accordion homepage.
- `src/app/page.tsx`: penempatan FAQ.
- `FAQ_IMPLEMENTATION_REPORT.md`: laporan dan naskah persis yang digunakan.

## SEO dan aksesibilitas

H2 untuk judul bagian; H3 dan button untuk tiap pertanyaan; aria-expanded/aria-controls dan panel berlabel. Jawaban selalu berada di HTML, tanpa API dan tanpa menunggu klik. Panel tertutup inert agar tautan tersembunyi tidak menerima fokus. Enter/Space/Tab didukung oleh button asli, fokus terlihat, satu item terbuka, transisi halus menghormati reduced motion. useParams mengambil locale route untuk HTML awal ID/EN; tautan memakai localePath dan Next Link sehingga basePath ditambahkan satu kali. Tidak ada FAQPage JSON-LD atau janji rich result.

## Naskah FAQ persis dan sumber

### ID: Pertanyaan yang Sering Diajukan

#### 1. Apa itu CyberXatria dan bagaimana platform ini membantu kesiapan keamanan siber?

CyberXatria merupakan ekosistem pembelajaran dan latihan keamanan siber untuk membantu individu dan organisasi membangun kompetensi serta kesiapan menghadapi ancaman. Melalui pelatihan, praktik, dan simulasi berbasis skenario nyata, CyberXatria membantu tim mengembangkan kemampuan teknis, koordinasi, dan pengambilan keputusan saat menghadapi insiden siber.

Tautan: Tentang CyberXatria (/id/company).

Sumber: Tentang Kami: pengantar dan ekosistem pembelajaran; Beranda: pendekatan terstruktur.

#### 2. Layanan apa saja yang tersedia di CyberXatria?

CyberXatria menampilkan Cyber Drill Exercise, Tabletop Exercise, serta AI for SOC yang saat ini ditandai sebagai layanan yang akan hadir. Situs ini juga menjelaskan program pembelajaran dan pelatihan keamanan siber untuk individu dan organisasi.

Tautan: Lihat layanan CyberXatria (/id/#solutions).

Sumber: Beranda dan Tentang Kami: layanan; navigasi dan halaman SOC: Coming Soon; Tentang Kami: pengalaman pelatihan.

#### 3. Apa perbedaan Cyber Drill Exercise dan Tabletop Exercise?

Cyber Drill Exercise berfokus pada simulasi serangan teknis untuk menguji kemampuan tim dalam mendeteksi, merespons, dan menangani insiden. Tabletop Exercise menggunakan diskusi skenario terstruktur untuk menguji keputusan, komunikasi, koordinasi, serta prosedur respons insiden lintas fungsi.

Tautan: Pelajari Tabletop Exercise (/id/solutions/tabletop).

Sumber: Cyber Drill: Tentang layanan; Tabletop: Tentang layanan dan fokus diskusi lintas fungsi.

#### 4. Apa manfaat Cyber Drill Exercise bagi perusahaan?

Cyber Drill Exercise membantu perusahaan mengukur kesiapan tim dan mengidentifikasi kesenjangan pada proses, teknologi, koordinasi, serta kemampuan deteksi dan respons. Hasil latihan mencakup penilaian kinerja, temuan, dan rekomendasi perbaikan yang dapat digunakan sebagai dasar peningkatan kesiapan siber.

Tautan: Pelajari Cyber Drill Exercise (/id/solutions/cyber-drill).

Sumber: Cyber Drill: Area yang Dinilai, Output yang Diterima, serta manfaat latihan.

#### 5. Bagaimana Tabletop Exercise membantu kesiapan respons insiden siber?

Dalam Tabletop Exercise, peserta mendiskusikan tindakan, keputusan, komunikasi, dan eskalasi berdasarkan skenario insiden yang diberikan secara bertahap. Fasilitator mengevaluasi respons peserta untuk mengidentifikasi kesenjangan pada peran, koordinasi, serta prosedur dan menyusun rekomendasi perbaikan.

Tautan: Lihat alur Tabletop Exercise (/id/solutions/tabletop).

Sumber: Tabletop: Alur Latihan, Area Penilaian, dan hasil latihan.

#### 6. Bagaimana CyberXatria membantu organisasi meningkatkan kesiapan menghadapi ancaman siber?

CyberXatria mendukung peningkatan kesiapan keamanan siber melalui latihan dan simulasi berbasis skenario. Melalui Cyber Drill Exercise dan Tabletop Exercise, organisasi dapat melatih kemampuan respons, mengevaluasi koordinasi tim, serta mengidentifikasi area yang perlu ditingkatkan dalam penanganan insiden siber.

Tautan: Pelajari Cyber Drill Exercise (/id/solutions/cyber-drill).

Sumber: Cyber Drill: Tentang layanan dan Area yang Dinilai; Tabletop: Tentang layanan, Alur Latihan, serta Area Penilaian.

#### 7. Apakah CyberXatria cocok untuk pemula maupun profesional keamanan siber?

Ya, situs CyberXatria menjelaskan pembelajaran untuk berbagai tingkat keahlian. Pemula dapat mempelajari dasar keamanan siber melalui lab yang dipandu, sedangkan profesional dapat mengembangkan keahlian melalui skenario yang realistis dan kompleks.

Tautan: Kenali pendekatan pembelajaran kami (/id/company).

Sumber: Beranda: Mengapa Memilih CyberXatria, Cocok untuk Semua Tingkat Keahlian (Pemula dan Profesional).

#### 8. Bagaimana cara mengetahui layanan CyberXatria yang sesuai untuk organisasi?

Gunakan Cyber Drill Exercise untuk menguji kesiapan teknis dan Tabletop Exercise untuk mengevaluasi keputusan, koordinasi, serta prosedur respons insiden. Sampaikan tujuan dan kebutuhan organisasi melalui formulir kontak pada halaman Ajukan Demo untuk mendiskusikan layanan dan skenario yang relevan.

Tautan: Ajukan demo dan diskusikan kebutuhan Anda (/id/request-demo).

Sumber: Cyber Drill dan Tabletop: deskripsi layanan; Request Demo: konsultasi kebutuhan serta formulir kontak.

### EN: Frequently Asked Questions

#### 1. What is CyberXatria, and how does it support cybersecurity readiness?

CyberXatria is a cybersecurity learning and exercise ecosystem that helps individuals and organizations build skills and prepare for cyber threats. Through training, practical activities, and realistic scenario-based simulations, it helps teams develop technical capabilities, coordination, and decision-making skills for cyber incidents.

Tautan: About CyberXatria (/en/company).

Sumber: Tentang Kami: pengantar dan ekosistem pembelajaran; Beranda: pendekatan terstruktur.

#### 2. What services does CyberXatria offer?

CyberXatria presents Cyber Drill Exercise, Tabletop Exercise, and AI for SOC, which is currently marked as coming soon. The website also describes cybersecurity learning and training programs for individuals and organizations.

Tautan: Explore CyberXatria services (/en/#solutions).

Sumber: Beranda dan Tentang Kami: layanan; navigasi dan halaman SOC: Coming Soon; Tentang Kami: pengalaman pelatihan.

#### 3. What is the difference between Cyber Drill Exercise and Tabletop Exercise?

Cyber Drill Exercise uses technical attack simulations to test a team's ability to detect, respond to, and handle incidents. Tabletop Exercise uses structured scenario discussions to test decisions, communication, coordination, and incident response procedures across organizational functions.

Tautan: Explore Tabletop Exercise (/en/solutions/tabletop).

Sumber: Cyber Drill: Tentang layanan; Tabletop: Tentang layanan dan fokus diskusi lintas fungsi.

#### 4. How can Cyber Drill Exercise benefit a company?

Cyber Drill Exercise helps companies assess team readiness and identify gaps in processes, technology, coordination, and detection and response capabilities. Exercise results include performance assessments, findings, and improvement recommendations that can inform further cybersecurity readiness work.

Tautan: Explore Cyber Drill Exercise (/en/solutions/cyber-drill).

Sumber: Cyber Drill: Area yang Dinilai, Output yang Diterima, serta manfaat latihan.

#### 5. How does Tabletop Exercise support cyber incident response readiness?

During a Tabletop Exercise, participants discuss actions, decisions, communication, and escalation as an incident scenario unfolds in stages. Facilitators assess participants' responses to identify gaps in roles, coordination, and procedures and develop improvement recommendations.

Tautan: See the Tabletop Exercise process (/en/solutions/tabletop).

Sumber: Tabletop: Alur Latihan, Area Penilaian, dan hasil latihan.

#### 6. How does CyberXatria help organizations improve their cybersecurity readiness?

CyberXatria helps organizations improve cybersecurity readiness through scenario-based exercises and simulations. Through Cyber Drill Exercise and Tabletop Exercise, organizations can practice incident response, evaluate team coordination, and identify areas for improvement in handling cyber incidents.

Tautan: Explore Cyber Drill Exercise (/en/solutions/cyber-drill).

Sumber: Cyber Drill: Tentang layanan dan Area yang Dinilai; Tabletop: Tentang layanan, Alur Latihan, serta Area Penilaian.

#### 7. Is CyberXatria suitable for both cybersecurity beginners and professionals?

Yes, the CyberXatria website describes learning for different skill levels. Beginners can learn cybersecurity fundamentals through guided labs, while professionals can develop their skills through realistic, complex scenarios.

Tautan: Learn about our learning approach (/en/company).

Sumber: Beranda: Mengapa Memilih CyberXatria, Cocok untuk Semua Tingkat Keahlian (Pemula dan Profesional).

#### 8. How can an organization choose the right CyberXatria service?

Choose Cyber Drill Exercise to test technical readiness and Tabletop Exercise to evaluate decisions, coordination, and incident response procedures. Share your organization's goals and needs through the contact form on the Request Demo page to discuss relevant services and scenarios.

Tautan: Request a demo and discuss your needs (/en/request-demo).

Sumber: Cyber Drill dan Tabletop: deskripsi layanan; Request Demo: konsultasi kebutuhan serta formulir kontak.

## Validasi yang dijalankan

- `npm run lint`: lulus.
- `node --test scripts/contact.test.mjs`: 21 mock test lulus; tidak ada email nyata dikirim.
- `npm run build`: lulus.
- `GITHUB_PAGES=true npm run build`: lulus (PowerShell memakai `$env:GITHUB_PAGES='true'`).
- `git diff --check`: lulus.
- Browser aplikasi lokal: 16 kombinasi ID/EN, light/dark, dan lebar 320/390/768/1440 px. Delapan FAQ, HTML awal sesuai bahasa, satu item terbuka, tutup/buka dengan Enter/Space, Tab melewati tautan panel tertutup, reduced motion, pergantian bahasa, dan tidak ada overflow horizontal terverifikasi. Tidak ada error console atau hydration dalam pemeriksaan ini.
- Pemeriksaan visual: desktop light dan mobile dark.
- Preview export lokal: 8 kombinasi ID/EN, light/dark, dan lebar 390/1440 px lolos pemeriksaan fungsional. Teks FAQ terdapat di `out/id.html` dan `out/en.html`; FAQ interaktif setelah hydration; tautan memakai `/cyberxatria-preview` satu kali dan menuju HTML yang tersedia (HTTP 200). Penempatan setelah sertifikasi dan sebelum CTA terverifikasi. Tidak ada runtime/hydration error; tercatat 10 permintaan prefetch internal 404 selama pengujian ini, dijelaskan di bawah.

## Batasan dan temuan untuk ditinjau

Preview export di Windows menghasilkan 404 pada prefetch segmen internal Next.js, contohnya `/cyberxatria-preview/id/__next.$d$lang.__PAGE__.txt`. Berkas yang diekspor berada pada `out/id/__next.$d$lang/__PAGE__.txt`. Permintaan serupa juga terjadi pada tujuan navigasi lama (Tentang Kami, Request Demo, dan layanan). Pemeriksaan tanpa error console pada preview static belum terpenuhi secara global; ini bukan error hydration FAQ. Prefetch tautan FAQ dinonaktifkan agar FAQ tidak menambahkan permintaan spekulatif. Tidak ada perubahan konfigurasi Next.js, workflow deployment, atau navigasi lama untuk menutupi temuan ini. Perilaku pada GitHub Pages/Linux belum diverifikasi dan tidak diasumsikan sama dengan preview Windows.

Status operasional AI for SOC perlu dikonfirmasi oleh pemilik konten karena deskripsi hero lama menyebut 24/7, sedangkan navigasi dan halaman SOC bertanda Coming Soon. FAQ layanan umum tetap mengikuti status Coming Soon dan tidak membuat komitmen baru. FAQ nomor 6 tentang SOC telah diganti dengan pertanyaan tentang peningkatan kesiapan organisasi, berdasarkan konten Cyber Drill dan Tabletop; tautan AI for SOC pada item tersebut dihapus. Tujuh FAQ lainnya dan komponen accordion dipertahankan. Komponen FAQ terpisah dari data dan tidak menambahkan dependensi atau JSON-LD.

Tidak dijalankan: pengujian perangkat fisik, audit pembaca layar manual, atau deployment langsung ke GitHub Pages. Tidak ada commit/push, perubahan `.env.local`, atau pengiriman email nyata.
