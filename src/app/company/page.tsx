import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Check, Handshake, Network, ScanSearch, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Tentang Kami", description: "Kenali visi, misi, keahlian, dan pendekatan ketahanan siber CyberXatria." };

const expertise = ["Security Operations Center (SOC)", "Cyber Drill Exercise", "Tabletop Exercise (TTX)", "Cyber Threat Intelligence", "Security Assessment", "Remediation", "Security Awareness & Training"];
const lifecycle = ["Asesmen", "Persiapan", "Deteksi", "Respons", "Peningkatan"];
const reasons = [
  { icon: Target, title: "Practical & Scenario-Based", text: "Pendekatan praktis dengan skenario yang relevan terhadap ancaman nyata." },
  { icon: UsersRound, title: "Experienced Professionals", text: "Didukung tenaga profesional dan ahli di bidang cybersecurity." },
  { icon: Network, title: "End-to-End Approach", text: "Pendekatan menyeluruh mulai dari assessment hingga improvement." },
  { icon: Sparkles, title: "Continuous Improvement", text: "Meningkatkan cybersecurity maturity organisasi secara berkelanjutan." },
];

export default function CompanyPage() {
  return <main className="site-shell min-h-screen bg-[#03060d] text-white">
    <SiteHeader />
    <section className="relative overflow-hidden border-b border-white/5 py-28">
      <div className="dot-field absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,63,94,.16),transparent_36%)]" />
      <div className="page-grid relative text-center"><p className="eyebrow justify-center">Tentang CyberXatria</p><h1 className="mx-auto mt-6 max-w-4xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl">Membangun Organisasi yang <span className="text-gradient">Lebih Tangguh dan Aman</span></h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">CyberXatria membantu organisasi memperkuat ketahanan siber melalui monitoring, assessment, simulasi, pelatihan, dan latihan cybersecurity secara langsung.</p></div>
    </section>

    <section className="py-24"><div className="page-grid grid gap-6 lg:grid-cols-2"><div className="cyber-card rounded-3xl p-8 sm:p-10"><div className="grid size-12 place-items-center rounded-xl bg-rose-500/10 text-rose-400"><ScanSearch /></div><h2 className="mt-6 text-3xl font-bold">Visi Kami</h2><p className="mt-4 leading-7 text-slate-400">Memberdayakan organisasi dengan kemampuan cybersecurity yang lebih kuat serta membangun ekosistem digital yang lebih tangguh dan aman.</p></div><div className="cyber-card rounded-3xl p-8 sm:p-10"><div className="grid size-12 place-items-center rounded-xl bg-rose-500/10 text-rose-400"><ShieldCheck /></div><h2 className="mt-6 text-3xl font-bold">Misi Kami</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">{["Menyediakan solusi cybersecurity yang praktis dan efektif.", "Meningkatkan kesadaran keamanan serta kemampuan teknis.", "Membantu organisasi mengidentifikasi, mengelola, dan merespons ancaman.", "Mendukung peningkatan kesiapan cybersecurity berkelanjutan."].map(item => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-rose-500" />{item}</li>)}</ul></div></div></section>

    <section className="border-y border-white/5 bg-[#070a12] py-24"><div className="page-grid"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Kapabilitas</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Keahlian <span className="text-gradient">Kami</span></h2></div><div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">{expertise.map((item, index) => <div key={item} className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#090d15] p-5"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-xs font-black text-rose-400">0{index + 1}</span><p className="text-sm font-semibold">{item}</p></div>)}</div></div></section>

    <section className="py-24"><div className="page-grid"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Framework NIST</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Pendekatan <span className="text-gradient">Berkelanjutan</span></h2><p className="mt-4 text-slate-400">People, process, dan technology bergerak dalam satu lifecycle peningkatan kesiapan.</p></div><div className="grid gap-3 sm:grid-cols-5">{lifecycle.map((item, index) => <div key={item} className="relative rounded-2xl border border-rose-500/25 bg-[#090d15] px-4 py-7 text-center"><span className="text-xs font-black text-rose-500">0{index + 1}</span><p className="mt-2 font-bold">{item}</p>{index < lifecycle.length - 1 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden size-6 -translate-y-1/2 text-rose-700 sm:block" />}</div>)}</div></div></section>

    <section className="border-y border-white/5 bg-[#070a12] py-24"><div className="page-grid"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Nilai pembeda</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Mengapa Memilih <span className="text-gradient">CyberXatria?</span></h2></div><div className="grid gap-4 md:grid-cols-2">{reasons.map(item => <div key={item.title} className="cyber-card rounded-2xl p-7"><item.icon className="size-8 text-rose-500" /><h3 className="mt-5 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p></div>)}</div></div></section>

    <section className="py-24"><div className="page-grid grid items-center gap-10 lg:grid-cols-2"><div><p className="eyebrow">Ekosistem terpercaya</p><h2 className="mt-5 text-3xl font-bold sm:text-4xl">Sertifikasi & Kemitraan</h2><p className="mt-5 leading-7 text-slate-400">Kami membangun layanan melalui standar yang kuat, teknologi yang relevan, dan kolaborasi bersama ekosistem cybersecurity.</p></div><div className="grid gap-4 sm:grid-cols-2">{[{icon:Award,label:"Sertifikasi ISO"},{icon:ShieldCheck,label:"Sertifikasi Cybersecurity"},{icon:Handshake,label:"Strategic Partners"},{icon:Network,label:"Kolaborasi Industri"}].map(item => <div key={item.label} className="rounded-xl border border-white/10 bg-[#090d15] p-6"><item.icon className="size-7 text-rose-500" /><p className="mt-4 font-semibold">{item.label}</p></div>)}</div></div></section>

    <section className="pb-24"><div className="page-grid rounded-3xl border border-rose-500/30 bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,.22),transparent_35%),#080c14] px-6 py-14 text-center"><h2 className="text-3xl font-bold sm:text-4xl">Siap Memperkuat Ketahanan Siber Organisasi Anda?</h2><p className="mx-auto mt-4 max-w-2xl text-slate-400">Temukan bagaimana CyberXatria membantu organisasi mempersiapkan diri, mendeteksi, dan merespons ancaman siber.</p><Link href="/request-demo" className="glow-button mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold">View Demo <ArrowRight className="size-4" /></Link></div></section>
    <SiteFooter />
  </main>;
}
