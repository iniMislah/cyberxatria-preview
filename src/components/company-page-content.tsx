"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  Check,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  Network,
  ScanSearch,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ApproachComparison } from "@/components/approach-comparison";
import { RequestDemoCta } from "@/components/request-demo-cta";
import { publicAsset } from "@/lib/asset-path";
import { usePublicPreferences } from "@/lib/public-preferences";

const badgeIcons = [Award, ShieldCheck, Handshake, Network];

const capabilityIcons = [
  ShieldCheck,
  Activity,
  UsersRound,
  ScanSearch,
  ClipboardCheck,
  Wrench,
  GraduationCap,
];

export function CompanyPageContent() {
  const { t } = usePublicPreferences();
  const [scrollPosition, setScrollPosition] = useState<0 | 1 | 2>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollPosition(0);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    if (ratio < 0.33) {
      setScrollPosition(0);
    } else if (ratio < 0.67) {
      setScrollPosition(1);
    } else {
      setScrollPosition(2);
    }
  };

  const scrollToState = (state: 0 | 1 | 2) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const target = state === 0 ? 0 : state === 1 ? maxScroll * 0.5 : maxScroll;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const copy = t({
    id: {
      heroEyebrow: "TENTANG CYBERXATRIA",
      heroTitle: ["Membangun Kesiapan Siber", "melalui Pengalaman Nyata"],
      heroParagraphs: [
        "CyberXatria merupakan platform cybersecurity yang dirancang untuk membantu organisasi memperkuat ketahanan siber melalui layanan monitoring keamanan, assessment, simulasi, pelatihan, dan latihan cybersecurity secara langsung.",
        "Kami menggabungkan cybersecurity knowledge, hands-on practice, dan realistic simulation untuk membantu tim membangun kemampuan teknis, koordinasi, dan pengambilan keputusan saat menghadapi insiden keamanan siber.",
      ],
      learningEyebrow: "SIAPA KAMI",
      learningTitle: ["Dari Pembelajaran hingga Simulasi,", "CyberXatria Membantu Membangun Kesiapan Siber"],
      learningParagraphs: [
        "CyberXatria merupakan ekosistem pembelajaran dan exercise keamanan siber yang dirancang untuk membantu individu maupun organisasi mengembangkan kompetensi dan kesiapan menghadapi ancaman siber.",
        "Program kami mencakup berbagai area keamanan siber, mulai dari Offensive Security, Defensive Security, Security Operations, hingga Governance, Risk & Compliance.",
        "Melalui pendekatan Manusia, Proses, dan Teknologi, CyberXatria menghubungkan pembelajaran dengan praktik sehingga kemampuan yang dibangun dapat diterapkan dalam situasi yang lebih realistis.",
      ],
      visionTitle: "Visi Kami",
      vision: "Memberdayakan organisasi dengan kemampuan cybersecurity yang lebih kuat serta membangun ekosistem digital yang lebih tangguh dan aman.",
      missionTitle: "Misi Kami",
      mission: [
        "Menyediakan solusi cybersecurity yang praktis dan efektif.",
        "Meningkatkan kesadaran keamanan serta kemampuan teknis.",
        "Membantu organisasi mengidentifikasi, mengelola, dan merespons ancaman.",
        "Mendukung peningkatan kesiapan cybersecurity berkelanjutan.",
      ],
      capability: "Kapabilitas",
      expertiseTitle: "Keahlian",
      expertiseAccent: "Kami",
      expertise: [
        "Security Operations Center (SOC)",
        "Cyber Drill Exercise",
        "Tabletop Exercise (TTX)",
        "Cyber Threat Intelligence",
        "Security Assessment",
        "Remediation",
        "Security Awareness & Training",
      ],
      framework: "Framework NIST",
      lifecycleTitle: "Pendekatan",
      lifecycleAccent: "Berkelanjutan",
      lifecycleIntro: "People, process, dan technology bergerak dalam satu lifecycle peningkatan kesiapan.",
      lifecycle: ["Asesmen", "Persiapan", "Deteksi", "Respons", "Peningkatan"],
      differentiator: "Nilai pembeda",
      whyTitle: "Mengapa Memilih",
      traditional: "Pendekatan Tradisional",
      cyberxatria: "Pendekatan CyberXatria",
      comparisonPairs: [
        { traditional: "Keamanan reaktif", cyberxatria: "Keamanan proaktif" },
        { traditional: "Penilaian pada titik waktu tertentu", cyberxatria: "Kesiapsiagaan berkelanjutan" },
        { traditional: "Manual & terfragmentasi", cyberxatria: "Pendekatan terintegrasi" },
        { traditional: "Menanggapi setelah insiden terjadi", cyberxatria: "Persiapan sebelum insiden" },
        { traditional: "Pelaporan yang berfokus pada aspek teknis", cyberxatria: "Wawasan bisnis yang dapat ditindaklanjuti" },
        { traditional: "Latihan berkala", cyberxatria: "Pengujian berbasis skenario" },
        { traditional: "Mengidentifikasi celah", cyberxatria: "Identifikasi → Prioritaskan → Perbaiki" },
        { traditional: "Keamanan sebagai fungsi", cyberxatria: "Keamanan sebagai ketahanan bisnis" },
      ],
      ecosystem: "Ekosistem terpercaya",
      certTitle: "Sertifikasi & Kemitraan",
      certIntro: "Kami membangun layanan melalui standar yang kuat, teknologi yang relevan, dan kolaborasi bersama ekosistem cybersecurity.",
      badges: ["Sertifikasi ISO", "Sertifikasi Cybersecurity", "Strategic Partners", "Kolaborasi Industri"],
      ctaTitle: "Siap Memperkuat Ketahanan Siber Organisasi Anda?",
      ctaText: "Temukan bagaimana CyberXatria membantu organisasi mempersiapkan diri, mendeteksi, dan merespons ancaman siber.",
      cta: "Request Demo",
    },
    en: {
      heroEyebrow: "ABOUT CYBERXATRIA",
      heroTitle: ["Building Cyber Resilience", "Through Real-World Experience"],
      heroParagraphs: [
        "CyberXatria is a cybersecurity platform designed to help organizations strengthen cyber resilience through security monitoring, assessments, simulations, training, and hands-on cybersecurity exercises.",
        "We combine cybersecurity knowledge, hands-on practice, and realistic simulation to help teams build technical capabilities, coordination, and decision-making skills when responding to cybersecurity incidents.",
      ],
      learningEyebrow: "WHO WE ARE",
      learningTitle: ["From Learning to Simulation,", "CyberXatria Helps Build Cyber Readiness"],
      learningParagraphs: [
        "CyberXatria is a cybersecurity learning and exercise ecosystem designed to help individuals and organizations develop their competencies and readiness to face cyber threats.",
        "Our programs cover various areas of cybersecurity, including Offensive Security, Defensive Security, Security Operations, and Governance, Risk & Compliance.",
        "Through a People, Process, and Technology approach, CyberXatria connects learning with practice so that the capabilities developed can be applied in more realistic situations.",
      ],
      visionTitle: "Our Vision",
      vision: "Empower organizations with stronger cybersecurity capabilities and build a more resilient and secure digital ecosystem.",
      missionTitle: "Our Mission",
      mission: [
        "Provide practical and effective cybersecurity solutions.",
        "Improve security awareness and technical capabilities.",
        "Help organizations identify, manage, and respond to threats.",
        "Support continuous cybersecurity readiness improvement.",
      ],
      capability: "Capabilities",
      expertiseTitle: "Our",
      expertiseAccent: "Expertise",
      expertise: [
        "Security Operations Center (SOC)",
        "Cyber Drill Exercise",
        "Tabletop Exercise (TTX)",
        "Cyber Threat Intelligence",
        "Security Assessment",
        "Remediation",
        "Security Awareness & Training",
      ],
      framework: "NIST Framework",
      lifecycleTitle: "Continuous",
      lifecycleAccent: "Approach",
      lifecycleIntro: "People, process, and technology move through one readiness improvement lifecycle.",
      lifecycle: ["Assess", "Prepare", "Detect", "Respond", "Improve"],
      differentiator: "Differentiators",
      whyTitle: "Why Choose",
      traditional: "Traditional Approach",
      cyberxatria: "CyberXatria Approach",
      comparisonPairs: [
        { traditional: "Reactive security", cyberxatria: "Proactive security" },
        { traditional: "Point-in-time assessment", cyberxatria: "Continuous readiness" },
        { traditional: "Manual & fragmented", cyberxatria: "Integrated approach" },
        { traditional: "Respond after incidents", cyberxatria: "Prepare before incidents" },
        { traditional: "Technical-focused reporting", cyberxatria: "Actionable business insights" },
        { traditional: "Periodic exercises", cyberxatria: "Scenario-based testing" },
        { traditional: "Identify gaps", cyberxatria: "Identify → Prioritize → Improve" },
        { traditional: "Security as a function", cyberxatria: "Security as business resilience" },
      ],
      ecosystem: "Trusted ecosystem",
      certTitle: "Certifications & Partnerships",
      certIntro: "We build services through strong standards, relevant technology, and collaboration with the cybersecurity ecosystem.",
      badges: ["ISO Certification", "Cybersecurity Certification", "Strategic Partners", "Industry Collaboration"],
      ctaTitle: "Ready to Strengthen Your Organization's Cyber Resilience?",
      ctaText: "Discover how CyberXatria helps organizations prepare for, detect, and respond to cyber threats.",
      cta: "Request Demo",
    },
  });

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative min-h-[680px] overflow-hidden border-b border-slate-200/80 dark:border-white/5">
        <div className="home-hero-artwork absolute inset-y-0 right-0">
          <Image
            src={publicAsset("/images/Tentang Kami Light.png")}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 115vw, (max-width: 1024px) 86vw, 68vw"
            className="hero-visual object-cover object-[58%_center] opacity-90 dark:hidden"
          />
          <Image
            src={publicAsset("/images/Tentang Kami.png")}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 115vw, (max-width: 1024px) 86vw, 68vw"
            className="hero-visual hidden object-cover object-[58%_center] opacity-90 dark:block"
          />
        </div>
        <div className="dot-field absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,63,94,.14),transparent_36%)]" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-95" />
        <div className="page-grid relative z-10 flex min-h-[650px] items-center py-20 sm:py-24">
          <div className="max-w-[720px] pt-8">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl">
              {copy.heroTitle[0]}
              <br />
              <span className="text-gradient">{copy.heroTitle[1]}</span>
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {copy.heroParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden sm:min-h-[320px]">
            <Image
              src={publicAsset("/images/Siapa Kami Light.png")}
              alt={`${copy.learningTitle[0]} ${copy.learningTitle[1]}`}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain dark:hidden"
            />
            <Image
              src={publicAsset("/images/Siapa Kami Dark.png")}
              alt={`${copy.learningTitle[0]} ${copy.learningTitle[1]}`}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="hidden object-contain dark:block"
            />
          </div>
          <div>
            <p className="eyebrow">{copy.learningEyebrow}</p>
            <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {copy.learningTitle[0]}
              <br />
              <span className="text-gradient">{copy.learningTitle[1]}</span>
            </h2>
            <div className="mt-6 space-y-4 leading-7 text-slate-600 dark:text-slate-400">
              {copy.learningParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid grid gap-6 lg:grid-cols-2">
          <div className="cyber-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400">
                <ScanSearch />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                {copy.visionTitle}
              </h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{copy.vision}</p>
            </div>
          </div>
          <div className="cyber-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400">
                <ShieldCheck />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                {copy.missionTitle}
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {copy.mission.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-rose-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Premium Horizontal Capabilities Showcase */}
      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-14 sm:py-16 transition-colors overflow-hidden">
        <div className="page-grid">
          <div className="mx-auto mb-8 sm:mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.capability}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {copy.expertiseTitle} <span className="text-gradient">{copy.expertiseAccent}</span>
            </h2>
          </div>

          {/* Horizontally Scrollable 7-Card Showcase */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
            style={{ scrollSnapType: "x proximity" }}
          >
            {copy.expertise.map((title, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              return (
                <article
                  key={title}
                  tabIndex={0}
                  className="group flex flex-col justify-between w-[260px] sm:w-[270px] lg:w-[280px] shrink-0 snap-start rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-white/[0.08] dark:bg-[#090d16] dark:shadow-none dark:hover:border-rose-500/40"
                >
                  <div>
                    {/* Header: Minimal Icon Container & Subtle Editorial Number */}
                    <div className="flex items-center justify-between">
                      <div className="grid size-9 place-items-center rounded-xl bg-rose-500/[0.08] text-rose-500 transition-colors duration-200 group-hover:bg-rose-500/15 group-hover:text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 dark:group-hover:text-rose-300">
                        <Icon className="size-4.5" />
                      </div>
                      <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Capability Name (NO descriptions underneath) */}
                    <h3 className="mt-4 text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug tracking-tight transition-colors duration-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 min-h-[2.5rem] flex items-center">
                      {title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Minimal 3-State Scroll Progress Indicator (START, MIDDLE, END) */}
          <div className="mt-6 flex justify-center items-center gap-2" aria-hidden="true">
            {[0, 1, 2].map((idx) => {
              const isActive = scrollPosition === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  tabIndex={-1}
                  onClick={() => scrollToState(idx as 0 | 1 | 2)}
                  aria-label={`Scroll position ${idx === 0 ? "Start" : idx === 1 ? "Middle" : "End"}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-6 bg-rose-500 dark:bg-rose-400"
                      : "w-1.5 bg-slate-300/80 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/30"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Continuous Approach Lifecycle */}
      <section className="py-16 sm:py-20">
        <div className="page-grid">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.framework}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {copy.lifecycleTitle} <span className="text-gradient">{copy.lifecycleAccent}</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.lifecycleIntro}</p>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-5">
            {copy.lifecycle.map((item, index) => (
              <div
                key={item}
                className="motion-card group relative flex h-full flex-col justify-between rounded-2xl border border-rose-500/25 dark:border-rose-500/30 bg-white dark:bg-[#090d15] px-4 py-6 text-center shadow-sm dark:shadow-none hover:border-rose-500/60 transition-all"
              >
                <span className="mx-auto grid size-8 place-items-center rounded-full bg-rose-500/10 text-xs font-black text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/25 group-hover:scale-110 transition-transform">
                  0{index + 1}
                </span>
                <p className="mt-3 font-bold text-slate-900 dark:text-white flex-1 flex items-center justify-center">
                  {item}
                </p>
                {index < copy.lifecycle.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-rose-400/60 dark:text-rose-700 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DO/DON'T Symmetrical Comparison Infographic with Center Notches & Medallion */}
      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.differentiator}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {copy.whyTitle} <span className="text-gradient">CyberXatria?</span>
            </h2>
          </div>

          <ApproachComparison
            traditionalTitle={copy.traditional}
            cyberxatriaTitle={copy.cyberxatria}
            pairs={copy.comparisonPairs}
          />
        </div>
      </section>

      {/* Certifications and Ecosystem */}
      <section className="py-16 sm:py-20">
        <div className="page-grid grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{copy.ecosystem}</p>
            <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.certTitle}</h2>
            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">{copy.certIntro}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.badges.map((label, index) => {
              const Icon = badgeIcons[index];
              return (
                <div key={label} className="motion-card flex h-full flex-col rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090d15] p-6 shadow-sm dark:shadow-none hover:border-rose-500/40 transition">
                  <Icon className="size-7 text-rose-500" />
                  <p className="mt-4 font-semibold text-slate-900 dark:text-white flex-1">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="pb-16 sm:pb-20">
        <div className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 dark:bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,.22),transparent_35%),#080c14] px-6 py-14 text-center sm:px-12 shadow-lg dark:shadow-[0_0_50px_rgba(244,63,94,0.15)]">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{copy.ctaText}</p>
          <RequestDemoCta className="mt-8">{copy.cta}</RequestDemoCta>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
