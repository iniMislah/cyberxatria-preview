"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Check,
  DatabaseZap,
  Factory,
  Landmark,
  LockKeyhole,
  Network,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { CountUpValue, Reveal } from "@/components/public-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { usePublicPreferences } from "@/lib/public-preferences";

const threatIcons = [LockKeyhole, ShieldAlert, DatabaseZap, UsersRound];
const impactIcons = [ShieldAlert, DatabaseZap, BadgeDollarSign, LockKeyhole, UsersRound];
const serviceIcons = [Radar, Target, UsersRound];
const industryIcons = [Factory, Landmark, Building2, Network];
const capabilities = ["SOC MONITORING", "THREAT DETECTION", "INCIDENT RESPONSE", "CYBER DRILL", "TABLETOP EXERCISE", "VULNERABILITY MONITORING"];

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
      ["SOC as a Service", "/solutions/soc", "Layanan monitoring keamanan siber yang membantu organisasi mendeteksi, menganalisis, dan merespons ancaman secara lebih cepat dan terukur.", ["Security Monitoring", "Threat Detection", "Incident Response", "Vulnerability Monitoring"]],
      ["Cyber Drill Exercise", "/solutions/cyber-drill", "Simulasi serangan siber dari sisi teknis yang dirancang untuk menguji kemampuan organisasi dalam mendeteksi, merespons, dan menangani insiden keamanan secara nyata.", ["Simulated Attack Scenario", "Blue Team Validation", "Gap Assessment"]],
      ["Tabletop Exercise", "/solutions/tabletop", "Simulasi berbasis skenario yang melibatkan berbagai fungsi dalam organisasi untuk menguji pengambilan keputusan, koordinasi, dan prosedur respons insiden siber.", ["Crisis Simulation", "Real Scenario", "Executive Readiness", "Stakeholder Coordination"]],
    ],
    learnMore: "Pelajari Lebih Lanjut",
    approachEyebrow: "Pendekatan kami",
    approachTitle: "Kenapa",
    approachAccent: "Memilih Kami?",
    traditional: "Pendekatan Tradisional",
    cyberxatria: "Pendekatan CyberXatria",
    traditionalPoints: ["Keamanan reaktif", "Penilaian pada satu titik waktu", "Manual dan terfragmentasi", "Merespons setelah insiden", "Pelaporan berfokus pada teknis", "Latihan dilakukan secara berkala"],
    cyberxatriaPoints: ["Keamanan proaktif", "Kesiapan berkelanjutan", "Pendekatan terintegrasi", "Bersiap sebelum insiden terjadi", "Insight bisnis yang dapat ditindaklanjuti", "Pengujian berbasis skenario"],
    industriesEyebrow: "Dipercaya berbagai industri",
    industriesHeading: "Dipercaya oleh Berbagai Industri",
    industries: [
      ["Manufaktur", "Melindungi sistem produksi dan data operasional."],
      ["Perbankan", "Menjaga transaksi, data nasabah, dan kepatuhan."],
      ["Pemerintahan", "Memperkuat keamanan sistem dan data publik."],
      ["Konstruksi & Infrastruktur", "Menjaga layanan dan sistem kritikal tetap tersedia."],
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
      ["SOC as a Service", "/solutions/soc", "A cybersecurity monitoring service that helps organizations detect, analyze, and respond to threats more quickly and effectively.", ["Security Monitoring", "Threat Detection", "Incident Response", "Vulnerability Monitoring"]],
      ["Cyber Drill Exercise", "/solutions/cyber-drill", "A technical cyberattack simulation designed to test an organization's ability to detect, respond to, and handle real-world security incidents.", ["Simulated Attack Scenario", "Blue Team Validation", "Gap Assessment"]],
      ["Tabletop Exercise", "/solutions/tabletop", "A scenario-based simulation involving various functions within an organization to test decision-making, coordination, and cyber incident response procedures.", ["Crisis Simulation", "Real Scenario", "Executive Readiness", "Stakeholder Coordination"]],
    ],
    learnMore: "Learn More",
    approachEyebrow: "Our approach",
    approachTitle: "Why",
    approachAccent: "Choose Us?",
    traditional: "Traditional Approach",
    cyberxatria: "CyberXatria Approach",
    traditionalPoints: ["Reactive security", "Point-in-time assessment", "Manual and fragmented", "Responding after incidents", "Technical-focused reporting", "Periodic exercises"],
    cyberxatriaPoints: ["Proactive security", "Continuous readiness", "Integrated approach", "Prepared before incidents occur", "Actionable business insight", "Scenario-based testing"],
    industriesEyebrow: "Trusted across industries",
    industriesHeading: "Trusted by Various Industries",
    industries: [
      ["Manufacturing", "Protecting production systems and operational data."],
      ["Banking", "Safeguarding transactions, customer data, and compliance."],
      ["Government", "Strengthening public systems and data security."],
      ["Construction & Infrastructure", "Keeping critical services and systems available."],
    ],
    finalEyebrow: "Ready to improve readiness?",
    finalTitle: "Build cyber resilience before incidents happen.",
  },
};

export default function Home() {
  const { t } = usePublicPreferences();
  const copy = t(content);
  const [activeImpact, setActiveImpact] = useState(0);

  return (
    <main className="site-shell min-h-screen bg-[#03060d] text-white">
      <SiteHeader />

      <section className="relative min-h-[720px] overflow-hidden border-b border-white/5">
        <Image src="/images/cyber-shield-hero.png" alt={copy.heroAlt} fill priority sizes="100vw" className="hero-visual object-cover object-[66%_center] opacity-90" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03060d] via-transparent to-transparent" />
        <div className="page-grid relative z-10 flex min-h-[690px] items-center py-24">
          <Reveal className="max-w-[720px] pt-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-rose-300">
              <ShieldCheck className="size-4" /> {copy.heroBadge}
            </div>
            <h1 className="text-5xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-6xl lg:text-[74px]">
              {copy.headline[0]}<br />{copy.headline[1]}<br /><span className="text-gradient">{copy.headline[2]}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{copy.subheadline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/request-demo" className="glow-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold"><ShieldCheck className="size-5" /> Request Demo</Link>
              <Link href="#solutions" className="motion-link inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-black/20 px-6 font-semibold backdrop-blur-sm transition hover:border-rose-500/60 hover:bg-rose-500/8">{copy.solutionsCta} <ArrowRight className="size-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="capability-marquee" aria-label="CyberXatria capabilities">
        <div className="capability-track">
          {[...capabilities, ...capabilities].map((item, index) => <span key={`${item}-${index}`} className="capability-item">{item}<span aria-hidden="true">✦</span></span>)}
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.threatEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">{copy.threatTitle} <span className="text-gradient">{copy.threatAccent}</span></h2>
            <p className="mt-4 text-slate-400">{copy.threatIntro}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.threats.map(([label, value, note], index) => {
              const Icon = threatIcons[index];
              const tone = index === 3 ? "text-orange-400" : index === 2 ? "text-red-500" : "text-rose-500";
              return (
                <Reveal key={label} delay={index * 90}>
                  <div tabIndex={0} className="cyber-card motion-card group rounded-2xl p-6">
                    <Icon className={`mb-7 size-9 ${tone}`} />
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
                    <p className={`mt-3 text-4xl font-black ${tone}`}><CountUpValue value={value} /></p>
                    <p className="mt-2 text-sm text-slate-500">{note}</p>
                    <div className="threat-meter" aria-hidden="true"><span style={{ "--meter": `${[49, 38, 72, 64][index]}%` } as React.CSSProperties} /></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={120} className="mt-4 flex items-start gap-3 rounded-xl border border-orange-500/25 bg-orange-500/5 px-5 py-4 text-sm text-slate-300">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-orange-400" /><p>{copy.threatNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#070a12] py-16 sm:py-20">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.readinessEyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">{copy.readinessTitle} <span className="text-gradient">{copy.readinessAccent}</span> {copy.readinessSuffix}</h2>
            <p className="mt-4 text-slate-400">{copy.readinessIntro}</p>
          </Reveal>
          <Reveal className="readiness-sequence grid gap-3 md:grid-cols-5">
            {copy.impacts.map(([title, text], index) => {
              const Icon = impactIcons[index];
              return (
                <button key={title} type="button" onClick={() => setActiveImpact(index)} onFocus={() => setActiveImpact(index)} aria-expanded={activeImpact === index} className="readiness-card motion-card relative rounded-2xl border border-white/8 bg-[#0a0e17] p-5 text-center">
                  <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/8 text-rose-400"><Icon className="size-6" /></div>
                  <h3 className="text-sm font-bold uppercase text-rose-400">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
                  {index < copy.impacts.length - 1 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden size-6 -translate-y-1/2 text-rose-700 md:block" />}
                </button>
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
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{copy.solutionsTitle} <span className="text-gradient">{copy.solutionsAccent}</span></h2>
            <p className="mt-4 text-slate-400">{copy.solutionsIntro}</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {copy.services.map((service, index) => {
              const [title, href, text, points] = service as [string, string, string, string[]];
              const Icon = serviceIcons[index];
              return (
                <Reveal key={title} delay={index * 90}>
                  <article className="cyber-card motion-card flex min-h-[390px] flex-col rounded-2xl p-7">
                    <div className="mb-6 grid size-12 place-items-center rounded-xl border border-rose-500/35 bg-rose-500/8 text-rose-400"><Icon className="size-6" /></div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-300">{points.map((point) => <li key={point} className="flex items-center gap-2"><Check className="size-4 text-rose-500" /> {point}</li>)}</ul>
                    <Link href={href} className="motion-link mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-rose-400 hover:text-rose-300">{copy.learnMore} <ArrowRight className="size-4" /></Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#070a12] py-16 sm:py-20">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.approachEyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{copy.approachTitle} <span className="text-gradient">{copy.approachAccent}</span></h2>
          </Reveal>
          <Reveal className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
            <div className="motion-card rounded-2xl border border-white/10 bg-[#090d15] p-7">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500">{copy.traditional}</h3>
              <ul className="space-y-4 text-sm text-slate-400">{copy.traditionalPoints.map((item) => <li key={item} className="flex gap-3"><span className="text-slate-600">○</span>{item}</li>)}</ul>
            </div>
            <div className="cyber-card motion-card rounded-2xl p-7 shadow-[0_0_60px_rgba(244,63,94,0.08)]">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-rose-400">{copy.cyberxatria}</h3>
              <ul className="space-y-4 text-sm text-slate-200">{copy.cyberxatriaPoints.map((item) => <li key={item} className="flex gap-3"><Check className="size-4 shrink-0 text-rose-500" />{item}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.industriesEyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{copy.industriesHeading}</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.industries.map(([name, text], index) => {
              const Icon = industryIcons[index];
              return (
                <Reveal key={name} delay={index * 70}>
                  <div tabIndex={0} className="motion-card rounded-2xl border border-white/10 bg-[#080c14] p-6 text-center">
                    <Icon className="mx-auto size-10 text-rose-500" />
                    <h3 className="mt-5 font-bold uppercase">{name}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <Reveal className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,0.20),transparent_34%),linear-gradient(135deg,#0b0f19,#05070c)] px-6 py-12 text-center sm:px-12 lg:flex lg:items-center lg:justify-between lg:text-left">
          <div className="relative"><p className="text-sm font-bold uppercase tracking-widest text-rose-400">{copy.finalEyebrow}</p><h2 className="mt-3 text-3xl font-bold">{copy.finalTitle}</h2></div>
          <Link href="/request-demo" className="glow-button relative mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold lg:mt-0">Request Demo <ArrowRight className="size-4" /></Link>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
