"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  DatabaseZap,
  GraduationCap,
  LockKeyhole,
  MonitorCog,
  RotateCw,
  ShieldAlert,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { CountUpValue, Reveal } from "@/components/public-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { usePublicPreferences } from "@/lib/public-preferences";
import { publicAsset } from "@/lib/asset-path";

const threatIcons = [LockKeyhole, ShieldAlert, DatabaseZap, UsersRound];
const impactIcons = [ShieldAlert, DatabaseZap, BadgeDollarSign, LockKeyhole, UsersRound];
const approachIdentityIcons = [ShieldCheck, UsersRound, GraduationCap, Target];
const approachItemIcons = [
  [ShieldAlert, ShieldCheck, BadgeDollarSign],
  [UsersRound, RotateCw, MonitorCog],
  [GraduationCap, Target],
  [Check, Check, Check, Check],
];
const approachCards = [
  {
    number: "01",
    image: "/images/No. 1.png",
    title: "Platform Pembelajaran Keamanan Siber yang Komprehensif",
    description: "CyberXatria menawarkan ekosistem pembelajaran yang mencakup domain utama keamanan siber:",
    items: [
      ["Keamanan Ofensif", "(Red Team, Pengujian Penetrasi, Eksploitasi)"],
      ["Keamanan Defensif", "(SOC, Respons Insiden, Perburuan Ancaman)"],
      ["Tata Kelola, Risiko, dan Kepatuhan (GRC)", ""],
    ],
  },
  {
    number: "02",
    image: "/images/No. 2.png",
    title: "Pendekatan Terstruktur: Orang – Proses – Teknologi",
    description: "CyberXatria mengembangkan kapabilitas keamanan siber secara holistik melalui:",
    items: [
      ["Orang", "Meningkatkan kompetensi teknis dan pola pikir keamanan."],
      ["Proses", "Meningkatkan pemahaman tentang alur kerja, kerangka kerja, dan praktik terbaik."],
      ["Teknologi", "Memberikan pengalaman langsung dengan alat dan lingkungan dunia nyata."],
    ],
  },
  {
    number: "03",
    image: "/images/No. 3.png",
    title: "Cocok untuk Semua Tingkat Keahlian",
    description: "",
    items: [
      ["Pemula", "Mempelajari dasar-dasar keamanan siber melalui lab yang dipandu."],
      ["Profesional", "Meningkatkan keahlian mereka dengan skenario yang realistis dan kompleks."],
    ],
  },
  {
    number: "04",
    image: "/images/No. 4.png",
    title: "Fleksibel untuk Perusahaan dan Penyedia Pelatihan",
    description: "CyberXatria mendukung kebutuhan perusahaan melalui:",
    items: [
      ["Pengembangan konten khusus (disesuaikan)", ""],
      ["Penilaian dan evaluasi yang disesuaikan", ""],
      ["Inisiatif pelatihan internal", ""],
      ["Program peningkatan keterampilan tenaga kerja", ""],
    ],
  },
];

const content = {
  id: {
    heroAlt: "Perisai digital CyberXatria",
    heroBadge: "Cyber readiness platform",
    headline: ["Deteksi Lebih Cepat.", "Respons Lebih Tepat.", "Tetap Terlindungi."],
    subheadline: "Lindungi organisasi Anda dengan Security Operations Center (SOC) 24/7, Cyber Drill Exercise yang realistis, dan Tabletop Exercise strategis yang dirancang untuk meningkatkan kesiapan keamanan, kemampuan penanggulangan insiden, dan ketahanan siber.",
    solutionsCta: "Lihat Solusi",
    threatEyebrow: "Tren ancaman siber",
    threatTitle: "Ancaman Bersifat",
    threatAccent: "Global",
    threatIntro: "Organisasi membutuhkan kesiapan yang selalu aktif untuk menghadapi risiko yang terus berkembang.",
    threats: [
      ["Ransomware Trend", "49%", "Grup ransomware aktif"],
      ["Phishing Trend", "13,8%", "Serangan phishing"],
      ["Data Breach Trend", "22.000+", "Data breach terkonfirmasi di 145 negara"],
      ["Insider Threat Trend", "US$19.5M", "Rata-rata biaya risiko tahunan yang ditimbulkan oleh pihak internal"],
    ],
    threatNote: "Ancaman siber tidak mengenal batas. Satu insiden dapat berdampak besar pada bisnis, reputasi, dan kepercayaan.",
    readinessEyebrow: "Cyber resilience",
    readinessTitle: "Mengapa",
    readinessAccent: "Kesiapan Siber",
    readinessSuffix: "Penting?",
    readinessIntro: "Kesiapan siber membantu organisasi menghadapi rangkaian dampak sebelum sebuah ancaman berkembang menjadi krisis.",
    impacts: [
      ["Serangan Siber", "Serangan memanfaatkan kerentanan sistem, jaringan, aplikasi, atau pengguna untuk memperoleh akses dan mengganggu operasi."],
      ["Kebocoran Data", "Akses tidak sah dapat menyebabkan data pelanggan, kredensial, informasi bisnis, atau data internal terekspos."],
      ["Dampak Finansial", "Insiden dapat menimbulkan biaya pemulihan, kehilangan pendapatan, downtime, serta kebutuhan investasi tambahan untuk mitigasi."],
      ["Dampak Kepatuhan", "Kegagalan memenuhi persyaratan regulasi dan standar dapat memicu sanksi, kewajiban pelaporan, atau tindakan korektif."],
      ["Dampak Reputasi", "Publikasi insiden dapat memengaruhi kepercayaan pelanggan, mitra, investor, dan persepsi terhadap organisasi."],
    ],
    solutionsEyebrow: "Perlindungan terintegrasi",
    solutionsTitle: "Solusi",
    solutionsAccent: "Kami",
    solutionsIntro: "Layanan keamanan siber untuk memantau, menguji, dan memperkuat kesiapan organisasi.",
    services: [
      ["/images/cyber-drill-hero.png", "CYBER DRILL EXERCISE", "/solutions/cyber-drill", "Simulasi serangan dunia nyata untuk menguji tim, proses, dan teknologi Anda dalam lingkungan yang realistis.", ["Simulasi Serangan Realistis", "Penilaian Tim Blue Team", "Validasi Respons Insiden", "Analisis Kesenjangan", "Laporan Eksekutif"]],
      ["/images/tabletop-hero.png", "TABLETOP EXERCISE", "/solutions/tabletop", "Simulasi berbasis diskusi dengan pemangku kepentingan untuk memperkuat pengambilan keputusan dan koordinasi.", ["Simulasi Skenario Eksekutif", "Manajemen Krisis", "Validasi Komunikasi", "Penilaian Pengambilan Keputusan", "Rencana Aksi & Rekomendasi"]],
      ["/images/Solusi_SOC_AI.png", "SOC AI", "", "", []],
    ],
    learnMore: "Pelajari Lebih Lanjut",
    approachEyebrow: "MENGAPA MEMILIH KAMI",
    approachTitle: "Mengapa Memilih",
    approachAccent: "CyberXatria?",
    approachCards,
    traditional: "Pendekatan Tradisional",
    cyberxatria: "Pendekatan CyberXatria",
    comparisonPairs: [
      { traditional: "Keamanan reaktif", cyberxatria: "Keamanan proaktif" },
      { traditional: "Penilaian pada satu titik waktu", cyberxatria: "Kesiapan berkelanjutan" },
      { traditional: "Manual dan terfragmentasi", cyberxatria: "Pendekatan terintegrasi" },
      { traditional: "Merespons setelah insiden", cyberxatria: "Bersiap sebelum insiden terjadi" },
      { traditional: "Pelaporan berfokus pada teknis", cyberxatria: "Insight bisnis yang dapat ditindaklanjuti" },
      { traditional: "Latihan dilakukan secara berkala", cyberxatria: "Pengujian berbasis skenario" },
    ],
    traditionalPoints: ["Keamanan reaktif", "Penilaian pada satu titik waktu", "Manual dan terfragmentasi", "Merespons setelah insiden", "Pelaporan berfokus pada teknis", "Latihan dilakukan secara berkala"],
    cyberxatriaPoints: ["Keamanan proaktif", "Kesiapan berkelanjutan", "Pendekatan terintegrasi", "Bersiap sebelum insiden terjadi", "Insight bisnis yang dapat ditindaklanjuti", "Pengujian berbasis skenario"],
    industriesEyebrow: "DIPERCAYA OLEH",
    industriesTitle: "Berbagai",
    industriesAccent: "Industri",
    industriesIntro: "CyberXatria dipercaya oleh organisasi dari berbagai sektor untuk memperkuat ketahanan siber mereka.",
    industries: [
      ["/images/Manufaktur.png", "MANUFAKTUR", "Melindungi sistem produksi, rantai pasok, dan data operasional dari berbagai ancaman siber."],
      ["/images/Perbankan.png", "PERBANKAN", "Menjaga keamanan transaksi, data nasabah, dan kepatuhan terhadap regulasi."],
      ["/images/Pemerintahan.png", "PEMERINTAHAN", "Memperkuat keamanan sistem dan data untuk mendukung layanan publik yang andal."],
      ["/images/Konstruksi dan Infrastruktur.png", "KONSTRUKSI & INFRASTRUKTUR", "Melindungi proyek, aset kritikal, dan infrastruktur dari risiko serangan siber."],
    ],
    finalEyebrow: "Siap meningkatkan kesiapan?",
    finalTitle: "Bangun ketahanan siber sebelum insiden terjadi.",
  },
  en: {
    heroAlt: "CyberXatria digital shield",
    heroBadge: "Cyber readiness platform",
    headline: ["Faster Detection.", "More Precise Response.", "Stay Protected."],
    subheadline: "Protect your organization with a 24/7 Security Operations Center (SOC), realistic Cyber Drill Exercises, and strategic Tabletop Exercises designed to enhance security readiness, incident response capabilities, and cyber resilience.",
    solutionsCta: "View Solutions",
    threatEyebrow: "Cyber threat trends",
    threatTitle: "Threats Are",
    threatAccent: "Global",
    threatIntro: "Organizations need always-on readiness to face evolving risks.",
    threats: [
      ["Ransomware Trend", "49%", "Active ransomware groups"],
      ["Phishing Trend", "13.8%", "Phishing attacks"],
      ["Data Breach Trend", "22,000+", "Confirmed data breaches in 145 countries"],
      ["Insider Threat Trend", "US$19.5M", "Average annual cost of insider risk"],
    ],
    threatNote: "Cyber threats know no boundaries. One incident can significantly affect business, reputation, and trust.",
    readinessEyebrow: "Cyber resilience",
    readinessTitle: "Why",
    readinessAccent: "Cyber Readiness",
    readinessSuffix: "Matters",
    readinessIntro: "Cyber readiness helps organizations address cascading impact before a threat becomes a crisis.",
    impacts: [
      ["Cyber Attack", "Attacks exploit vulnerabilities in systems, networks, applications, or users to gain access and disrupt operations."],
      ["Data Breach", "Unauthorized access can expose customer data, credentials, business information, or internal data."],
      ["Financial Impact", "Incidents can result in recovery costs, lost revenue, downtime, and additional investment required for mitigation."],
      ["Compliance Impact", "Failure to meet regulatory and standards requirements can lead to penalties, reporting obligations, or corrective actions."],
      ["Reputation Impact", "Public disclosure of an incident can affect the trust of customers, partners, investors, and overall perception of the organization."],
    ],
    solutionsEyebrow: "Integrated protection",
    solutionsTitle: "Our",
    solutionsAccent: "Solutions",
    solutionsIntro: "Cybersecurity services to monitor, test, and strengthen organizational readiness.",
    services: [
      ["/images/cyber-drill-hero.png", "CYBER DRILL EXERCISE", "/solutions/cyber-drill", "Simulasi serangan dunia nyata untuk menguji tim, proses, dan teknologi Anda dalam lingkungan yang realistis.", ["Simulasi Serangan Realistis", "Penilaian Tim Blue Team", "Validasi Respons Insiden", "Analisis Kesenjangan", "Laporan Eksekutif"]],
      ["/images/tabletop-hero.png", "TABLETOP EXERCISE", "/solutions/tabletop", "Simulasi berbasis diskusi dengan pemangku kepentingan untuk memperkuat pengambilan keputusan dan koordinasi.", ["Simulasi Skenario Eksekutif", "Manajemen Krisis", "Validasi Komunikasi", "Penilaian Pengambilan Keputusan", "Rencana Aksi & Rekomendasi"]],
      ["/images/Solusi_SOC_AI.png", "SOC AI", "", "", []],
    ],
    learnMore: "Pelajari Lebih Lanjut",
    approachEyebrow: "MENGAPA MEMILIH KAMI",
    approachTitle: "Mengapa Memilih",
    approachAccent: "CyberXatria?",
    approachCards,
    traditional: "Traditional Approach",
    cyberxatria: "CyberXatria Approach",
    comparisonPairs: [
      { traditional: "Reactive security", cyberxatria: "Proactive security" },
      { traditional: "Point-in-time assessment", cyberxatria: "Continuous readiness" },
      { traditional: "Manual and fragmented", cyberxatria: "Integrated approach" },
      { traditional: "Responding after incidents", cyberxatria: "Prepared before incidents occur" },
      { traditional: "Technical-focused reporting", cyberxatria: "Actionable business insight" },
      { traditional: "Periodic exercises", cyberxatria: "Scenario-based testing" },
    ],
    traditionalPoints: ["Reactive security", "Point-in-time assessment", "Manual and fragmented", "Responding after incidents", "Technical-focused reporting", "Periodic exercises"],
    cyberxatriaPoints: ["Proactive security", "Continuous readiness", "Integrated approach", "Prepared before incidents occur", "Actionable business insight", "Scenario-based testing"],
    industriesEyebrow: "DIPERCAYA OLEH",
    industriesTitle: "Berbagai",
    industriesAccent: "Industri",
    industriesIntro: "CyberXatria dipercaya oleh organisasi dari berbagai sektor untuk memperkuat ketahanan siber mereka.",
    industries: [
      ["/images/Manufaktur.png", "MANUFAKTUR", "Melindungi sistem produksi, rantai pasok, dan data operasional dari berbagai ancaman siber."],
      ["/images/Perbankan.png", "PERBANKAN", "Menjaga keamanan transaksi, data nasabah, dan kepatuhan terhadap regulasi."],
      ["/images/Pemerintahan.png", "PEMERINTAHAN", "Memperkuat keamanan sistem dan data untuk mendukung layanan publik yang andal."],
      ["/images/Konstruksi dan Infrastruktur.png", "KONSTRUKSI & INFRASTRUKTUR", "Melindungi proyek, aset kritikal, dan infrastruktur dari risiko serangan siber."],
    ],
    finalEyebrow: "Ready to improve readiness?",
    finalTitle: "Build cyber resilience before incidents happen.",
  },
};

export default function Home() {
  const { t } = usePublicPreferences();
  const copy = t(content);

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative min-h-[720px] overflow-hidden border-b border-slate-200/80 dark:border-white/5">
        <div className="home-hero-artwork absolute inset-y-0 right-0">
          <Image src={publicAsset("/images/cyber-shield-hero.png")} alt={copy.heroAlt} fill priority sizes="(max-width: 640px) 115vw, (max-width: 1024px) 86vw, 68vw" className="hero-visual object-cover object-[58%_center] opacity-90" />
        </div>
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-95" />
        <div className="page-grid relative z-10 flex min-h-[690px] items-center py-20 sm:py-24">
          <Reveal className="max-w-[720px] pt-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-rose-600 dark:text-rose-300">
              <ShieldCheck className="size-4" /> {copy.heroBadge}
            </div>
            <h1 className="text-5xl font-bold leading-[1.06] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl lg:text-[74px]">
              {copy.headline[0]}<br />{copy.headline[1]}<br /><span className="text-gradient">{copy.headline[2]}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">{copy.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/request-demo" className="glow-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white">
                <ShieldCheck className="size-4" /> Request Demo
              </Link>
              <Link href="#solutions" className="secondary-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold">
                {copy.solutionsCta} <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.threatEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">{copy.threatTitle} <span className="text-gradient">{copy.threatAccent}</span></h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.threatIntro}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.threats.map(([label, value, note], index) => {
              const Icon = threatIcons[index];
              const tone = index === 3 ? "text-orange-500 dark:text-orange-400" : index === 2 ? "text-red-500" : "text-rose-500";
              return (
                <Reveal key={label} delay={index * 90} className="h-full flex flex-col">
                  <div tabIndex={0} className="cyber-card motion-card group flex h-full flex-1 flex-col rounded-2xl p-6">
                    <Icon className={`mb-7 size-9 ${tone}`} />
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
                    <p className={`mt-3 text-4xl font-black ${tone}`}><CountUpValue value={value} /></p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-500 flex-1">{note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={120} className="mt-6 flex items-start gap-4 rounded-2xl border border-orange-500/35 bg-orange-500/10 px-6 py-5 text-base font-semibold leading-7 text-slate-800 shadow-sm dark:text-slate-200">
            <ShieldAlert className="mt-1 size-6 shrink-0 text-orange-500 dark:text-orange-400" /><p>{copy.threatNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.readinessEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">{copy.readinessTitle} <span className="text-gradient">{copy.readinessAccent}</span> {copy.readinessSuffix}</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.readinessIntro}</p>
          </Reveal>
          <Reveal className="grid gap-3 md:grid-cols-5">
            {copy.impacts.map(([title, text], index) => {
              const Icon = impactIcons[index];
              return (
                <article
                  key={title}
                  tabIndex={0}
                  className="motion-card relative flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 text-center shadow-sm transition-all hover:border-rose-500/40 dark:border-white/8 dark:bg-[#0a0e17] dark:shadow-none"
                >
                  <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400"><Icon className="size-6" /></div>
                  <h3 className="text-sm font-bold uppercase text-rose-600 dark:text-rose-400 min-h-[2.5rem] flex items-center justify-center">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400 flex-1">{text}</p>
                </article>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section id="solutions" className="relative py-16 sm:py-20">
        <div className="dot-field absolute inset-x-0 top-0 h-52 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="page-grid relative">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.solutionsEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">{copy.solutionsTitle} <span className="text-gradient">{copy.solutionsAccent}</span></h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.solutionsIntro}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {copy.services.map((service, index) => {
              const [image, title, href, text, points] = service as [string, string, string, string, string[]];
              const comingSoon = !href;
              return (
                <Reveal key={title} delay={index * 90} className="h-full flex flex-col">
                  <article className={`cyber-card motion-card flex h-full flex-1 flex-col rounded-2xl p-4 ${comingSoon ? "opacity-80" : ""}`}>
                    <div className="solution-card-image relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10">
                      <Image src={publicAsset(image)} alt={title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-3 pt-5">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-rose-500/35 bg-rose-500/10 text-rose-500 dark:text-rose-400"><ShieldCheck className="size-5" /></span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                        {comingSoon && <span className="ml-auto rounded-full border border-slate-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:border-white/10 dark:text-slate-400">Coming Soon</span>}
                      </div>
                      {text && <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p>}
                      {points.length > 0 && <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">{points.map((point) => <li key={point} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-rose-500" /> {point}</li>)}</ul>}
                      {comingSoon ? (
                        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-slate-500 dark:text-slate-500">Coming Soon</span>
                      ) : (
                        <Link href={href} className="motion-link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300">{copy.learnMore} <ArrowRight className="size-4" /></Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.approachEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">{copy.approachTitle} <span className="text-gradient">{copy.approachAccent}</span></h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {copy.approachCards.map((card, index) => {
              const typedCard = card as {
                number: string;
                image: string;
                title: string;
                description: string;
                items: [string, string][];
              };
              const IdentityIcon = approachIdentityIcons[index];
              const itemIcons = approachItemIcons[index];
              return (
                <Reveal key={typedCard.number} delay={index * 80} className="h-full flex flex-col">
                  <article className={`approach-feature-card approach-feature-card-${typedCard.number} motion-card relative h-full flex-1 overflow-hidden rounded-2xl border p-6`}>
                    <div className="approach-card-copy relative z-10 flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-3">
                        <span className="approach-number">{typedCard.number}</span>
                        <span className="approach-icon"><IdentityIcon className="size-5" /></span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900 dark:text-white">{typedCard.title}</h3>
                      {typedCard.description && <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{typedCard.description}</p>}
                      <ul className="approach-items mt-5 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                        {typedCard.items.map(([label, detail], itemIndex) => {
                          const ItemIcon = itemIcons[itemIndex] ?? Check;
                          return (
                            <li key={label} className="approach-item flex gap-3">
                              <span className="approach-item-icon"><ItemIcon className="size-4" /></span>
                              <span>
                                <span className="font-bold text-slate-900 dark:text-white">{label}</span>
                                {detail && <span className="block text-slate-600 dark:text-slate-400">{detail}</span>}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className={`approach-card-visual approach-card-visual-${typedCard.number}`}>
                      <Image src={publicAsset(typedCard.image)} alt="" fill sizes="(max-width: 768px) 90vw, 28vw" className="object-contain object-center" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.industriesEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">{copy.industriesTitle} <span className="text-gradient">{copy.industriesAccent}</span></h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.industriesIntro}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.industries.map(([image, name, text], index) => {
              return (
                <Reveal key={name} delay={index * 70} className="h-full flex flex-col">
                  <div tabIndex={0} className="motion-card flex h-full flex-1 flex-col items-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080c14] p-6 text-center shadow-sm dark:shadow-none">
                    <div className={`industry-artwork industry-artwork-${index + 1} relative`}>
                      <Image src={publicAsset(image)} alt={name} fill sizes="120px" className="object-contain" />
                    </div>
                    <h3 className="mt-5 flex min-h-[2.5rem] items-center justify-center font-bold uppercase text-slate-900 dark:text-white">{name}</h3>
                    <span className="mt-2 h-0.5 w-8 rounded-full bg-rose-500" />
                    <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400 flex-1">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <Reveal className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 dark:bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,0.20),transparent_34%),linear-gradient(135deg,#0b0f19,#05070c)] px-6 py-12 text-center sm:px-12 lg:flex lg:items-center lg:justify-between lg:text-left shadow-lg dark:shadow-[0_0_50px_rgba(244,63,94,0.15)]">
          <div className="relative"><p className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">{copy.finalEyebrow}</p><h2 className="mt-3 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">{copy.finalTitle}</h2></div>
          <Link href="/request-demo" className="glow-button relative mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white lg:mt-0">Request Demo <ArrowRight className="size-4" /></Link>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
