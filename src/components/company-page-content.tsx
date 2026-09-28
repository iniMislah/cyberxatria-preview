"use client";

import Link from "next/link";
import { ArrowRight, Award, Check, Handshake, Network, ScanSearch, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { usePublicPreferences } from "@/lib/public-preferences";

const reasonIcons = [Target, UsersRound, Network, Sparkles];
const badgeIcons = [Award, ShieldCheck, Handshake, Network];

export function CompanyPageContent() {
  const { t } = usePublicPreferences();
  const copy = t({
    id: {
      eyebrow: "Tentang CyberXatria",
      title: "Membangun Organisasi yang",
      accent: "Lebih Tangguh dan Aman",
      intro: "CyberXatria membantu organisasi memperkuat ketahanan siber melalui monitoring, assessment, simulasi, pelatihan, dan latihan cybersecurity secara langsung.",
      visionTitle: "Visi Kami",
      vision: "Memberdayakan organisasi dengan kemampuan cybersecurity yang lebih kuat serta membangun ekosistem digital yang lebih tangguh dan aman.",
      missionTitle: "Misi Kami",
      mission: ["Menyediakan solusi cybersecurity yang praktis dan efektif.", "Meningkatkan kesadaran keamanan serta kemampuan teknis.", "Membantu organisasi mengidentifikasi, mengelola, dan merespons ancaman.", "Mendukung peningkatan kesiapan cybersecurity berkelanjutan."],
      capability: "Kapabilitas",
      expertiseTitle: "Keahlian",
      expertiseAccent: "Kami",
      expertise: ["Security Operations Center (SOC)", "Cyber Drill Exercise", "Tabletop Exercise (TTX)", "Cyber Threat Intelligence", "Security Assessment", "Remediation", "Security Awareness & Training"],
      framework: "Framework NIST",
      lifecycleTitle: "Pendekatan",
      lifecycleAccent: "Berkelanjutan",
      lifecycleIntro: "People, process, dan technology bergerak dalam satu lifecycle peningkatan kesiapan.",
      lifecycle: ["Asesmen", "Persiapan", "Deteksi", "Respons", "Peningkatan"],
      differentiator: "Nilai pembeda",
      whyTitle: "Mengapa Memilih",
      reasons: [
        ["Practical & Scenario-Based", "Pendekatan praktis dengan skenario yang relevan terhadap ancaman nyata."],
        ["Experienced Professionals", "Didukung tenaga profesional dan ahli di bidang cybersecurity."],
        ["End-to-End Approach", "Pendekatan menyeluruh mulai dari assessment hingga improvement."],
        ["Continuous Improvement", "Meningkatkan cybersecurity maturity organisasi secara berkelanjutan."],
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
      eyebrow: "About CyberXatria",
      title: "Building Organizations That Are",
      accent: "More Resilient and Secure",
      intro: "CyberXatria helps organizations strengthen cyber resilience through monitoring, assessment, simulation, training, and hands-on cybersecurity exercises.",
      visionTitle: "Our Vision",
      vision: "Empower organizations with stronger cybersecurity capabilities and build a more resilient and secure digital ecosystem.",
      missionTitle: "Our Mission",
      mission: ["Provide practical and effective cybersecurity solutions.", "Improve security awareness and technical capabilities.", "Help organizations identify, manage, and respond to threats.", "Support continuous cybersecurity readiness improvement."],
      capability: "Capabilities",
      expertiseTitle: "Our",
      expertiseAccent: "Expertise",
      expertise: ["Security Operations Center (SOC)", "Cyber Drill Exercise", "Tabletop Exercise (TTX)", "Cyber Threat Intelligence", "Security Assessment", "Remediation", "Security Awareness & Training"],
      framework: "NIST Framework",
      lifecycleTitle: "Continuous",
      lifecycleAccent: "Approach",
      lifecycleIntro: "People, process, and technology move through one readiness improvement lifecycle.",
      lifecycle: ["Assess", "Prepare", "Detect", "Respond", "Improve"],
      differentiator: "Differentiators",
      whyTitle: "Why Choose",
      reasons: [
        ["Practical & Scenario-Based", "A practical approach with scenarios relevant to real threats."],
        ["Experienced Professionals", "Supported by experienced cybersecurity professionals and experts."],
        ["End-to-End Approach", "A comprehensive approach from assessment to improvement."],
        ["Continuous Improvement", "Improving the organization's cybersecurity maturity continuously."],
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
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/5 py-16 sm:py-20">
        <div className="dot-field absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,63,94,.14),transparent_36%)]" />
        <div className="page-grid relative text-center">
          <p className="eyebrow justify-center">{copy.eyebrow}</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-bold tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl">{copy.title} <span className="text-gradient">{copy.accent}</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{copy.intro}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid grid gap-6 lg:grid-cols-2">
          <div className="cyber-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400"><ScanSearch /></div>
              <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">{copy.visionTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{copy.vision}</p>
            </div>
          </div>
          <div className="cyber-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400"><ShieldCheck /></div>
              <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">{copy.missionTitle}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{copy.mission.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-rose-500" />{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.capability}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.expertiseTitle} <span className="text-gradient">{copy.expertiseAccent}</span></h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.expertise.map((item, index) => (
              <div key={item} className="motion-card flex items-center gap-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090d15] p-5 shadow-sm dark:shadow-none hover:border-rose-500/40 transition">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs font-black text-rose-600 dark:text-rose-400">0{index + 1}</span>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.framework}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.lifecycleTitle} <span className="text-gradient">{copy.lifecycleAccent}</span></h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.lifecycleIntro}</p>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-5">
            {copy.lifecycle.map((item, index) => (
              <div key={item} className="motion-card group relative flex h-full flex-col justify-between rounded-2xl border border-rose-500/25 dark:border-rose-500/30 bg-white dark:bg-[#090d15] px-4 py-6 text-center shadow-sm dark:shadow-none hover:border-rose-500/60 transition-all">
                <span className="mx-auto grid size-8 place-items-center rounded-full bg-rose-500/10 text-xs font-black text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/25 group-hover:scale-110 transition-transform">0{index + 1}</span>
                <p className="mt-3 font-bold text-slate-900 dark:text-white flex-1 flex items-center justify-center">{item}</p>
                {index < copy.lifecycle.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-rose-400/60 dark:text-rose-700 md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.differentiator}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.whyTitle} <span className="text-gradient">CyberXatria?</span></h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {copy.reasons.map(([title, text], index) => {
              const Icon = reasonIcons[index];
              return (
                <div key={title} className="cyber-card motion-card flex h-full flex-col rounded-2xl p-7">
                  <div className="grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400 mb-4"><Icon className="size-6" /></div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-600 dark:text-slate-400 flex-1">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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

      <section className="pb-16 sm:pb-20">
        <div className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 dark:bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,.22),transparent_35%),#080c14] px-6 py-14 text-center sm:px-12 shadow-lg dark:shadow-[0_0_50px_rgba(244,63,94,0.15)]">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{copy.ctaText}</p>
          <Link href="/request-demo" className="glow-button mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white">{copy.cta} <ArrowRight className="size-4" /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

