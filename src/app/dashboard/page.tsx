import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, BellRing, Check, Clock3, Radar, ShieldAlert, ShieldCheck, Target, UsersRound } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { DashboardGreeting } from "@/components/dashboard-greeting";

export const metadata: Metadata = { title: "Dashboard" };

const services = [
  { icon: Radar, title: "SOC as a Service", price: "Rp 25.000.000", href: "/solutions/soc", points: ["Monitoring 24/7", "Threat Detection", "Incident Response", "Vulnerability Monitoring"] },
  { icon: Target, title: "Cyber Drill Exercise", price: "Rp 35.000.000", href: "/solutions/cyber-drill", points: ["Simulasi Serangan", "Blue Team Validation", "Gap Assessment", "Laporan & Rekomendasi"] },
  { icon: UsersRound, title: "Tabletop Exercise", price: "Rp 20.000.000", href: "/solutions/tabletop", points: ["Skenario Krisis", "Diskusi Terstruktur", "Evaluasi Kesiapan", "Rekomendasi Strategis"] },
];

export default function DashboardPage() {
  return <PortalShell><div className="mx-auto max-w-[1320px]">
    <section className="relative min-h-[280px] overflow-hidden rounded-2xl border border-rose-500/25 bg-[#090e18] p-6 sm:p-8">
      <Image src="/images/cyber-shield-hero.png" alt="CyberXatria dashboard protection" fill sizes="(max-width: 1024px) 100vw, 75vw" className="object-cover object-[76%_48%] opacity-55" /><div className="absolute inset-0 bg-gradient-to-r from-[#080c15] via-[#080c15]/85 to-transparent" />
      <div className="relative z-10 max-w-xl"><DashboardGreeting /><p className="mt-3 text-sm leading-6 text-slate-400">Kelola keamanan siber organisasi Anda dengan solusi terintegrasi dari CyberXatria.</p><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{[{v:"12",l:"Monitoring Aktif"},{v:"3",l:"Drill Terjadwal"},{v:"2",l:"Sesi Tabletop"},{v:"8",l:"Laporan Baru"}].map(item => <div key={item.l} className="rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-sm"><p className="text-xl font-black text-rose-400">{item.v}</p><p className="mt-1 text-[11px] text-slate-400">{item.l}</p></div>)}</div></div>
    </section>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
      <section><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Solusi Kami</h2><Link href="/pricing" className="text-xs font-semibold text-rose-400">Lihat semua solusi →</Link></div><div className="grid gap-4 lg:grid-cols-3">{services.map(service => <article key={service.title} className="cyber-card flex flex-col rounded-2xl p-5"><div className="flex items-start justify-between"><div className="grid size-10 place-items-center rounded-xl bg-rose-500/10 text-rose-400"><service.icon className="size-5" /></div><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-400">Available</span></div><h3 className="mt-5 font-bold text-rose-300">{service.title}</h3><ul className="mt-4 space-y-2 text-xs text-slate-400">{service.points.map(point => <li key={point} className="flex gap-2"><Check className="size-3.5 text-rose-500" />{point}</li>)}</ul><p className="mt-6 text-xs text-slate-500">Mulai dari</p><p className="mt-1 text-lg font-bold">{service.price}<span className="text-xs font-normal text-slate-500"> / sesi</span></p><div className="mt-5 grid grid-cols-[1fr_auto] gap-2"><Link href="/pricing" className="glow-button inline-flex h-10 items-center justify-center rounded-lg text-xs font-bold">Mulai Trial Gratis</Link><Link aria-label={`Lihat ${service.title}`} href={service.href} className="grid size-10 place-items-center rounded-lg border border-white/10"><ArrowRight className="size-4" /></Link></div></article>)}</div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#090e18] p-6"><div className="flex gap-4"><ShieldCheck className="size-8 shrink-0 text-rose-500" /><div><p className="text-lg font-bold">Keamanan siber bukan hanya tentang teknologi, <span className="text-rose-400">tetapi tentang ketahanan bisnis.</span></p><p className="mt-2 text-sm text-slate-500">CyberXatria hadir membantu organisasi tetap siap, tangguh, dan selangkah lebih maju.</p></div></div></div>
      </section>
      <aside className="space-y-6"><div className="rounded-2xl border border-white/10 bg-[#090e18] p-5"><div className="flex items-center justify-between"><h2 className="font-bold">Notifikasi Terbaru</h2><BellRing className="size-5 text-rose-400" /></div><div className="mt-5 space-y-4">{[{i:ShieldAlert,t:"Ancaman kritis terdeteksi",d:"High severity pada server produksi",time:"2 menit lalu"},{i:Activity,t:"Laporan mingguan tersedia",d:"SOC Weekly Report siap diunduh",time:"1 jam lalu"},{i:Target,t:"Cyber Drill dijadwalkan",d:"Simulasi dimulai dalam 10 hari",time:"3 jam lalu"},{i:UsersRound,t:"Tabletop selesai",d:"Laporan & rekomendasi tersedia",time:"5 jam lalu"}].map(item => <div key={item.t} className="flex gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-rose-400"><item.i className="size-4" /></span><div><p className="text-xs font-semibold">{item.t}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{item.d}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-slate-600"><Clock3 className="size-3" />{item.time}</p></div></div>)}</div></div>
        <div className="rounded-2xl border border-white/10 bg-[#090e18] p-5"><h2 className="font-bold">Aktivitas Terbaru</h2><div className="mt-5 space-y-5">{["Login berhasil", "Laporan diunduh", "Pengaturan diubah", "Notifikasi dibaca"].map((item,index) => <div key={item} className="flex gap-3 text-xs"><span className={`mt-1 size-2 rounded-full ${["bg-emerald-400","bg-fuchsia-400","bg-sky-400","bg-slate-500"][index]}`} /><div><p className="font-semibold text-slate-300">{item}</p><p className="mt-1 text-slate-600">{index + 1} jam lalu</p></div></div>)}</div></div>
      </aside>
    </div>
  </div></PortalShell>;
}
