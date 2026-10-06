"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  GraduationCap,
  MonitorCog,
  RotateCw,
  ShieldAlert,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { CountUpValue, Reveal } from "@/components/public-motion";
import { RequestDemoCta } from "@/components/request-demo-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { localePath, usePublicPreferences } from "@/lib/public-preferences";
import { publicAsset } from "@/lib/asset-path";

const threatImages = [
  { light: "/images/Ransomware Trend_Light.png", dark: "/images/Ransomware Trend.png" },
  { light: "/images/Phishing Trend_Light.png", dark: "/images/Phishing Trend.png" },
  { light: "/images/Data Breach Trend_Light.png", dark: "/images/Data Breach Trend.png" },
  { light: "/images/Insider Threat Trend_Light.png", dark: "/images/Insider Threat Trend.png" },
];

const readinessImpactImages = [
  { light: "/images/Serangan Siber Light.png", dark: "/images/Serangan Siber Dark.png" },
  { light: "/images/Kebocoran Data_Light.png", dark: "/images/Kebocoran Data Dark.png" },
  { light: "/images/Dampak Finansial_Light.png", dark: "/images/Dampak Finansial Dark.png" },
  { light: "/images/Dampak Kepatuhan Light.png", dark: "/images/Dampak Kepatuhan Dark.png" },
  { light: "/images/Dampak Reputasi Light.png", dark: "/images/Dampak Reputasi Dark.png" },
];

const solutionServiceMeta = [
  { image: "/images/cyber-drill-hero.png", imageLight: "/images/Solusi_Cyberdrill_Light.png", href: "/solutions/cyber-drill" },
  { image: "/images/tabletop-hero.png", imageLight: "/images/Solusi_TTX_Light.png", href: "/solutions/tabletop" },
  { image: "/images/Solusi_SOC_AI.png", imageLight: "/images/Solusi_SOC_Light.png", href: "" },
];

const approachCardMeta = [
  {
    number: "01",
    image: "/images/No. 1.png",
    imageDark: "/images/No. 1 dark mode.png",
    identityIcon: ShieldCheck,
    itemIcons: [ShieldAlert, ShieldCheck, BadgeDollarSign],
  },
  {
    number: "02",
    image: "/images/No. 2.png",
    imageDark: "/images/No. 2 dark mode.png",
    identityIcon: Target,
    itemIcons: [Check, Check, Check, Check],
  },
  {
    number: "03",
    image: "/images/No. 3.png",
    imageDark: "/images/No. 3 dark mode.png",
    identityIcon: GraduationCap,
    itemIcons: [GraduationCap, Target],
  },
  {
    number: "04",
    image: "/images/No. 4.png",
    imageDark: "/images/No. 4 dark mode.png",
    identityIcon: UsersRound,
    itemIcons: [UsersRound, RotateCw, MonitorCog],
  },
];

const approachCardOrder = [0, 1, 2, 3];

const industryMeta = [
  { image: "/images/Manufaktur.png" },
  { image: "/images/Perbankan.png" },
  { image: "/images/Pemerintahan.png" },
  { image: "/images/Konstruksi dan Infrastruktur.png" },
];

const content = {
  id: {
    hero: {
      alt: "Perisai digital CyberXatria",
      badge: "Cyber readiness platform",
      headline: ["Deteksi Lebih Cepat.", "Respons Lebih Tepat.", "Tetap Terlindungi."],
      subheadline:
        "Lindungi organisasi Anda dengan 24/7 Security Operations Center (SOC), realistis Cyber Drill Exercises, dan Tabletop Exercises strategis yang dirancang untuk meningkatkan kesiapan keamanan, kemampuan penanggulangan insiden, dan ketahanan siber.",
      requestDemoCta: "Request Demo",
      solutionsCta: "Lihat Solusi",
    },
    threats: {
      eyebrow: "Tren ancaman siber",
      title: "Ancaman Bersifat",
      accent: "Global",
      intro: "Organisasi membutuhkan kesiapan yang selalu aktif untuk menghadapi risiko yang terus berkembang.",
      items: [
        ["Ransomware Trend", "49%", "grup ransomware aktif"],
        ["Phishing Trend", "13.8%", "serangan phishing"],
        ["Data Breach Trend", "22.000+", "data breach terkonfirmasi di 145 negara"],
        ["Insider Threat Trend", "US$19.5M", "Average annual insider risk cost / biaya risiko pihak dalam"],
      ],
      note: "Ancaman siber tidak mengenal batas. Satu insiden dapat berdampak besar pada bisnis, reputasi, dan kepercayaan.",
    },
    readiness: {
      eyebrow: "Cyber resilience",
      title: "MENGAPA",
      accent: "KESIAPAN SIBER",
      suffix: "PENTING?",
      intro: [
        "Ancaman siber semakin canggih dan berdampak nyata bagi organisasi.",
        "Kesiapan Siber siap membantu Anda mengurangi risiko dan menjaga keberlangsungan bisnis.",
      ],
      impacts: [
        ["SERANGAN SIBER", "Kerentanan dieksploitasi oleh penyerang."],
        ["KEBOCORAN DATA", "Data sensitif dikompromikan."],
        ["DAMPAK FINANSIAL", "Kerugian dan gangguan operasional."],
        ["DAMPAK KEPATUHAN", "Denda, sanksi, dan kewajiban hukum."],
        ["DAMPAK REPUTASI", "Kepercayaan pelanggan dan citra perusahaan menurun."],
      ],
    },
    solutions: {
      eyebrow: "Perlindungan terintegrasi",
      title: "Solusi",
      accent: "Kami",
      intro: "Layanan keamanan siber untuk memantau, menguji, dan memperkuat kesiapan organisasi.",
      learnMore: "Pelajari Lebih Lanjut",
      comingSoon: "Coming Soon",
      services: [
        {
          title: "CYBER DRILL EXERCISE",
          description:
            "Simulasi serangan siber dari sisi teknis yang dirancang untuk menguji kemampuan organisasi dalam mendeteksi, merespons, dan menangani insiden keamanan secara nyata.",
          points: ["Simulated Attack Scenario", "Blue Team Validation", "Gap Assessment"],
        },
        {
          title: "TABLETOP EXERCISE",
          description:
            "Simulasi berbasis skenario yang melibatkan berbagai fungsi dalam organisasi untuk menguji pengambilan keputusan, koordinasi, dan prosedur respons insiden siber.",
          points: ["Crisis Simulation", "Real Scenario", "Executive Readiness", "Stakeholder Coordination"],
        },
        {
          title: "AI for SOC",
          description: "",
          points: [],
        },
      ],
    },
    whyCyberXatria: {
      eyebrow: "Kenapa Memilih Kami",
      title: "Mengapa Memilih",
      accent: "CyberXatria?",
      cards: [
        {
          title: "Platform Pembelajaran Keamanan Siber yang Komprehensif",
          description: "CyberXatria menawarkan ekosistem pembelajaran yang mencakup domain utama keamanan siber:",
          items: [
            ["Keamanan Ofensif", "(Red Team, Pengujian Penetrasi, Eksploitasi)"],
            ["Keamanan Defensif", "(SOC, Respons Insiden, Perburuan Ancaman)"],
            ["Tata Kelola, Risiko, dan Kepatuhan (GRC)", ""],
          ],
        },
        {
          title: "Fleksibel untuk Perusahaan dan Penyedia Pelatihan",
          description: "CyberXatria mendukung kebutuhan perusahaan melalui:",
          items: [
            ["Pengembangan konten khusus (disesuaikan)", ""],
            ["Penilaian dan evaluasi yang disesuaikan", ""],
            ["Inisiatif pelatihan internal", ""],
            ["Program peningkatan keterampilan tenaga kerja", ""],
          ],
        },
        {
          title: "Cocok untuk Semua Tingkat Keahlian",
          description: "",
          items: [
            ["Pemula", "Mempelajari dasar-dasar keamanan siber melalui lab yang dipandu."],
            ["Profesional", "Meningkatkan keahlian mereka dengan skenario yang realistis dan kompleks."],
          ],
        },
        {
          title: "Pendekatan Terstruktur",
          description: "CyberXatria mengembangkan kapabilitas keamanan siber secara holistik melalui:",
          items: [
            ["Orang", "Meningkatkan kompetensi teknis dan pola pikir keamanan."],
            ["Proses", "Meningkatkan pemahaman tentang alur kerja, kerangka kerja, dan praktik terbaik."],
            ["Teknologi", "Memberikan pengalaman langsung dengan alat dan lingkungan dunia nyata."],
          ],
        },
      ],
    },
    industries: {
      eyebrow: "Dipercaya oleh",
      title: "Berbagai",
      accent: "Industri",
      intro: "CyberXatria dipercaya oleh organisasi dari berbagai sektor untuk memperkuat ketahanan siber mereka.",
      items: [
        {
          name: "Manufaktur",
          text: "Melindungi sistem produksi, rantai pasok, dan data operasional dari berbagai ancaman siber.",
        },
        {
          name: "Perbankan",
          text: "Menjaga keamanan transaksi, data nasabah, dan kepatuhan terhadap regulasi.",
        },
        {
          name: "Pemerintahan",
          text: "Memperkuat keamanan sistem dan data untuk mendukung layanan publik yang andal.",
        },
        {
          name: "Konstruksi & Infrastruktur",
          text: "Melindungi proyek, aset kritikal, dan infrastruktur dari risiko serangan siber.",
        },
      ],
    },
    cta: {
      eyebrow: "Siap meningkatkan kesiapan?",
      title: "Bangun ketahanan siber sebelum insiden terjadi.",
      button: "Request Demo",
    },
  },
  en: {
    hero: {
      alt: "CyberXatria digital shield",
      badge: "Cyber readiness platform",
      headline: ["Faster Detection.", "More Precise Response.", "Stay Protected."],
      subheadline:
        "Protect your organization with a 24/7 Security Operations Center (SOC), realistic cyber drill exercises, and strategic tabletop exercises designed to enhance security readiness, incident response capabilities, and cyber resilience.",
      requestDemoCta: "Request Demo",
      solutionsCta: "View Solutions",
    },
    threats: {
      eyebrow: "Cyber threat trends",
      title: "Threats Are",
      accent: "Global",
      intro: "Organizations need always-on readiness to face evolving risks.",
      items: [
        ["Ransomware Trend", "49%", "active ransomware groups"],
        ["Phishing Trend", "13.8%", "phishing attacks"],
        ["Data Breach Trend", "22,000+", "confirmed data breaches in 145 countries"],
        ["Insider Threat Trend", "US$19.5 million", "Average annual cost of insider risk"],
      ],
      note: "Cyber threats know no boundaries. One incident can significantly affect business, reputation, and trust.",
    },
    readiness: {
      eyebrow: "Cyber resilience",
      title: "WHY IS",
      accent: "CYBER READINESS",
      suffix: "IMPORTANT?",
      intro: [
        "Cyber threats are becoming increasingly sophisticated and have a real impact on organizations.",
        "Cyber Readiness helps you reduce risks and maintain business continuity.",
      ],
      impacts: [
        ["CYBER ATTACK", "Vulnerabilities are exploited by attackers."],
        ["DATA BREACH", "Sensitive data is compromised."],
        ["FINANCIAL IMPACT", "Financial losses and operational disruptions."],
        ["COMPLIANCE IMPACT", "Fines, penalties, and legal obligations."],
        ["REPUTATIONAL IMPACT", "Declining customer trust and corporate reputation."],
      ],
    },
    solutions: {
      eyebrow: "Integrated protection",
      title: "Our",
      accent: "Solutions",
      intro: "Cybersecurity services to monitor, test, and strengthen organizational readiness.",
      learnMore: "Learn More",
      comingSoon: "Coming Soon",
      services: [
        {
          title: "CYBER DRILL EXERCISE",
          description:
            "A technical cyberattack simulation designed to test an organization's ability to detect, respond to, and handle real-world security incidents.",
          points: ["Simulated Attack Scenario", "Blue Team Validation", "Gap Assessment"],
        },
        {
          title: "TABLETOP EXERCISE",
          description:
            "A scenario-based simulation involving various functions within an organization to test decision-making, coordination, and cyber incident response procedures.",
          points: ["Crisis Simulation", "Real Scenario", "Executive Readiness", "Stakeholder Coordination"],
        },
        {
          title: "AI for SOC",
          description: "",
          points: [],
        },
      ],
    },
    whyCyberXatria: {
      eyebrow: "WHY CHOOSE US",
      title: "Why Choose",
      accent: "CyberXatria?",
      cards: [
        {
          title: "Comprehensive Cybersecurity Learning Platform",
          description: "CyberXatria offers a learning ecosystem that covers key cybersecurity domains:",
          items: [
            ["Offensive Security", "(Red Team, Penetration Testing, Exploitation)"],
            ["Defensive Security", "(SOC, Incident Response, Threat Hunting)"],
            ["Governance, Risk, and Compliance (GRC)", ""],
          ],
        },
        {
          title: "Flexible for Enterprises and Training Providers",
          description: "CyberXatria supports organizational needs through:",
          items: [
            ["Custom content development (tailored)", ""],
            ["Customized assessments and evaluations", ""],
            ["Internal training initiatives", ""],
            ["Workforce upskilling programs", ""],
          ],
        },
        {
          title: "Suitable for All Skill Levels",
          description: "",
          items: [
            ["Beginner", "Learn cybersecurity fundamentals through guided labs."],
            ["Professional", "Enhance their expertise through realistic and complex scenarios."],
          ],
        },
        {
          title: "Structured Approach",
          description: "CyberXatria develops cybersecurity capabilities holistically through:",
          items: [
            ["People", "Enhance technical competencies and security mindset."],
            ["Process", "Improve understanding of workflows, frameworks, and best practices."],
            ["Technology", "Provide hands-on experience with real-world tools and environments."],
          ],
        },
      ],
    },
    industries: {
      eyebrow: "Trusted by",
      title: "Various",
      accent: "Industries",
      intro: "CyberXatria is trusted by organizations across various sectors to strengthen their cyber resilience.",
      items: [
        {
          name: "Manufacturing",
          text: "Protect production systems, supply chains, and operational data from various cyber threats.",
        },
        {
          name: "Banking",
          text: "Safeguard transactions, customer data, and regulatory compliance.",
        },
        {
          name: "Government",
          text: "Strengthen system and data security to support reliable public services.",
        },
        {
          name: "Construction & Infrastructure",
          text: "Protect projects, critical assets, and infrastructure from cyberattack risks.",
        },
      ],
    },
    cta: {
      eyebrow: "Ready to improve readiness?",
      title: "Build cyber resilience before incidents happen.",
      button: "Request Demo",
    },
  },
};

export default function Home() {
  const { language, t } = usePublicPreferences();
  const href = (path: string) => localePath(path, language);
  const copy = t(content);

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative min-h-[720px] overflow-hidden border-b border-slate-200/80 dark:border-white/5">
        <div className="home-hero-artwork absolute inset-y-0 right-0">
          <Image
            src={publicAsset("/images/Hero banner Pict_Light.png")}
            alt={copy.hero.alt}
            fill
            priority
            sizes="(max-width: 640px) 115vw, (max-width: 1024px) 86vw, 68vw"
            className="hero-visual object-cover object-[58%_center] opacity-90 dark:hidden"
          />
          <Image
            src={publicAsset("/images/cyber-shield-hero.png")}
            alt={copy.hero.alt}
            fill
            priority
            sizes="(max-width: 640px) 115vw, (max-width: 1024px) 86vw, 68vw"
            className="hero-visual hidden object-cover object-[58%_center] opacity-90 dark:block"
          />
        </div>
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-95" />
        <div className="page-grid relative z-10 flex min-h-[690px] items-center py-20 sm:py-24">
          <Reveal className="max-w-[720px] pt-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-rose-600 dark:text-rose-300">
              <ShieldCheck className="size-4" /> {copy.hero.badge}
            </div>
            <h1 className="text-5xl font-bold leading-[1.06] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl lg:text-[74px]">
              {copy.hero.headline[0]}
              <br />
              {copy.hero.headline[1]}
              <br />
              <span className="text-gradient">{copy.hero.headline[2]}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {copy.hero.subheadline}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <RequestDemoCta>{copy.hero.requestDemoCta}</RequestDemoCta>
              <Link
                href="#solutions"
                className="secondary-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold"
              >
                {copy.hero.solutionsCta} <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.threats.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {copy.threats.title} <span className="text-gradient">{copy.threats.accent}</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.threats.intro}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.threats.items.map(([label, value, note], index) => {
              const image = threatImages[index];
              const tone =
                index === 3
                  ? "text-orange-500 dark:text-orange-400"
                  : index === 2
                  ? "text-red-500"
                  : "text-rose-500";
              return (
                <Reveal key={label} delay={index * 90} className="h-full flex flex-col">
                  <div tabIndex={0} className="cyber-card motion-card group flex h-full min-h-[390px] flex-1 flex-col items-center rounded-2xl p-6 text-center">
                    <div className="relative mb-6 h-40 w-full">
                      <Image
                        src={publicAsset(image.light)}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-contain dark:hidden"
                      />
                      <Image
                        src={publicAsset(image.dark)}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="hidden object-contain dark:block"
                      />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
                    <span className="mt-4 h-0.5 w-10 rounded-full bg-rose-500" />
                    <p className={`mt-5 text-4xl font-black ${tone}`}>
                      <CountUpValue value={value} />
                    </p>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-500 flex-1">{note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal
            delay={120}
            className="mt-6 flex items-start gap-4 rounded-2xl border border-orange-500/35 bg-orange-500/10 px-6 py-5 text-base font-semibold leading-7 text-slate-800 shadow-sm dark:text-slate-200"
          >
            <ShieldAlert className="mt-1 size-6 shrink-0 text-orange-500 dark:text-orange-400" />
            <p>{copy.threats.note}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.readiness.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {copy.readiness.title} <span className="text-gradient">{copy.readiness.accent}</span> {copy.readiness.suffix}
            </h2>
            <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              {copy.readiness.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {copy.readiness.impacts.map(([title, text], index) => {
              const image = readinessImpactImages[index];
              return (
                <article
                  key={title}
                  tabIndex={0}
                  className="motion-card relative flex h-full min-h-[360px] flex-col rounded-2xl border border-slate-200/90 bg-white p-5 text-center shadow-sm transition-all hover:border-rose-500/40 dark:border-white/8 dark:bg-[#0a0e17] dark:shadow-none"
                >
                  <div className="relative mx-auto mb-5 size-32 lg:size-36">
                    <Image
                      src={publicAsset(image.light)}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 128px, 144px"
                      className="object-contain dark:hidden"
                    />
                    <Image
                      src={publicAsset(image.dark)}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 128px, 144px"
                      className="hidden object-contain dark:block"
                    />
                  </div>
                  <h3 className="text-sm font-bold uppercase text-rose-600 dark:text-rose-400 min-h-[2.5rem] flex items-center justify-center">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400 flex-1">{text}</p>
                  <span className="mx-auto mt-5 h-0.5 w-10 rounded-full bg-rose-500" />
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
            <p className="eyebrow justify-center">{copy.solutions.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {copy.solutions.title} <span className="text-gradient">{copy.solutions.accent}</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.solutions.intro}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {copy.solutions.services.map((service, index) => {
              const meta = solutionServiceMeta[index];
              const comingSoon = !meta.href;
              return (
                <Reveal key={service.title} delay={index * 90} className="h-full flex flex-col">
                  <article className={`cyber-card motion-card flex h-full flex-1 flex-col rounded-2xl p-4 ${comingSoon ? "opacity-80" : ""}`}>
                    <div className="solution-card-image relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10">
                      <Image
                        src={publicAsset(meta.imageLight)}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover dark:hidden"
                      />
                      <Image
                        src={publicAsset(meta.image)}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="hidden object-cover dark:block"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-3 pt-5">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-rose-500/35 bg-rose-500/10 text-rose-500 dark:text-rose-400">
                          <ShieldCheck className="size-5" />
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                        {comingSoon && (
                          <span className="ml-auto rounded-full border border-slate-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:border-white/10 dark:text-slate-400">
                            {copy.solutions.comingSoon}
                          </span>
                        )}
                      </div>
                      {service.description && (
                        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{service.description}</p>
                      )}
                      {service.points.length > 0 && (
                        <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                          {service.points.map((point) => (
                            <li key={point} className="flex items-center gap-2">
                              <Check className="size-4 shrink-0 text-rose-500" /> {point}
                            </li>
                          ))}
                        </ul>
                      )}
                      {comingSoon ? (
                        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-slate-500 dark:text-slate-500">
                          {copy.solutions.comingSoon}
                        </span>
                      ) : (
                        <Link
                          href={href(meta.href)}
                          className="motion-link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
                        >
                          {copy.solutions.learnMore} <ArrowRight className="size-4" />
                        </Link>
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
            <p className="eyebrow justify-center">{copy.whyCyberXatria.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {copy.whyCyberXatria.title} <span className="text-gradient">{copy.whyCyberXatria.accent}</span>
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {approachCardMeta.map((meta, index) => {
              const card = copy.whyCyberXatria.cards[approachCardOrder[index]];
              const IdentityIcon = meta.identityIcon;
              const itemIcons = meta.itemIcons;
              return (
                <Reveal key={meta.number} delay={index * 80} className="h-full flex flex-col">
                  <article
                    className={`approach-feature-card approach-feature-card-${meta.number} motion-card relative h-full flex-1 overflow-hidden rounded-2xl border p-6`}
                  >
                    <div className="approach-card-copy relative z-10 flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-3">
                        <span className="approach-number">{meta.number}</span>
                        <span className="approach-icon">
                          <IdentityIcon className="size-5" />
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900 dark:text-white">
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{card.description}</p>
                      )}
                      <ul className="approach-items mt-5 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                        {card.items.map(([label, detail], itemIndex) => {
                          const ItemIcon = itemIcons[itemIndex] ?? Check;
                          return (
                            <li key={label} className="approach-item flex gap-3">
                              <span className="approach-item-icon">
                                <ItemIcon className="size-4" />
                              </span>
                              <span>
                                <span className="font-bold text-slate-900 dark:text-white">{label}</span>
                                {detail && <span className="block text-slate-600 dark:text-slate-400">{detail}</span>}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className={`approach-card-visual approach-card-visual-${meta.number}`}>
                      <Image
                        src={publicAsset(meta.image)}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 90vw, 28vw"
                        className="object-contain object-center dark:hidden"
                      />
                      <Image
                        src={publicAsset(meta.imageDark)}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 90vw, 28vw"
                        className="hidden object-contain object-center dark:block"
                      />
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
            <p className="eyebrow justify-center">{copy.industries.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {copy.industries.title} <span className="text-gradient">{copy.industries.accent}</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.industries.intro}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.industries.items.map((industry, index) => {
              const meta = industryMeta[index];
              return (
                <Reveal key={industry.name} delay={index * 70} className="h-full flex flex-col">
                  <div
                    tabIndex={0}
                    className="motion-card flex h-full flex-1 flex-col items-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080c14] p-6 text-center shadow-sm dark:shadow-none"
                  >
                    <div className={`industry-artwork industry-artwork-${index + 1} relative`}>
                      <Image src={publicAsset(meta.image)} alt={industry.name} fill sizes="120px" className="object-contain" />
                    </div>
                    <h3 className="mt-5 flex min-h-[2.5rem] items-center justify-center font-bold uppercase text-slate-900 dark:text-white">
                      {industry.name}
                    </h3>
                    <span className="mt-2 h-0.5 w-8 rounded-full bg-rose-500" />
                    <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400 flex-1">{industry.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <Reveal className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 dark:bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,0.20),transparent_34%),linear-gradient(135deg,#0b0f19,#05070c)] px-6 py-12 text-center sm:px-12 lg:flex lg:items-center lg:justify-between lg:text-left shadow-lg dark:shadow-[0_0_50px_rgba(244,63,94,0.15)]">
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              {copy.cta.eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              {copy.cta.title}
            </h2>
          </div>
          <RequestDemoCta className="relative mt-7 lg:mt-0">{copy.cta.button}</RequestDemoCta>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
