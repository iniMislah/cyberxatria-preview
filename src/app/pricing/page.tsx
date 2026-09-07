import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Pricing" };

const packages = [
  { name: "SOC Lite", tag: "Essential visibility", price: "Hubungi Kami", points: ["Monitoring 8 × 5", "Endpoint & SD-WAN", "Incident response reaktif", "Monthly reporting"] },
  { name: "SOC Essential", tag: "Most popular", price: "Masuk untuk melihat", featured: true, points: ["Monitoring 24 × 7", "First response 15 menit", "Semua tipe aset", "Security expert support"] },
  { name: "SOC Advanced", tag: "Proactive protection", price: "Custom quotation", points: ["Semua fitur Essential", "Proactive threat hunting", "Annual Cyber Drill", "SLA 99%"] },
];

export default function PricingPage() {
  return <main className="site-shell min-h-screen bg-[#03060d] text-white"><SiteHeader /><section className="relative overflow-hidden py-24"><div className="dot-field absolute inset-0 opacity-15" /><div className="page-grid relative text-center"><p className="eyebrow justify-center">Paket layanan</p><h1 className="mt-6 text-5xl font-bold tracking-tight">Pilih Perlindungan yang <span className="text-gradient">Tepat</span></h1><p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">Paket berikut menggunakan data placeholder. Detail komersial dan pricing final akan dihubungkan pada tahap berikutnya.</p></div></section><section className="pb-24"><div className="page-grid grid gap-5 lg:grid-cols-3">{packages.map(pkg => <article key={pkg.name} className={`relative flex flex-col rounded-2xl border p-7 ${pkg.featured ? "border-rose-500 bg-[linear-gradient(145deg,rgba(66,12,34,.72),rgba(7,10,18,.95))] shadow-[0_0_60px_rgba(244,63,94,.15)]" : "border-white/10 bg-[#090d15]"}`}>{pkg.featured && <span className="absolute inset-x-0 top-0 rounded-t-2xl bg-gradient-to-r from-fuchsia-700 to-red-500 py-1.5 text-center text-[10px] font-black uppercase tracking-widest">Recommended</span>}<p className={`text-xs font-bold uppercase tracking-widest text-slate-500 ${pkg.featured ? "mt-5" : ""}`}>{pkg.tag}</p><h2 className="mt-3 text-2xl font-bold">{pkg.name}</h2><div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4"><LockKeyhole className="size-6 text-rose-400" /><p className="font-semibold">{pkg.price}</p></div><ul className="mt-7 space-y-4 text-sm text-slate-300">{pkg.points.map(point => <li key={point} className="flex gap-3"><Check className="size-4 text-rose-500" />{point}</li>)}</ul><Link href="/signup" className={`mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg font-semibold ${pkg.featured ? "glow-button" : "border border-rose-500/50 hover:bg-rose-500/10"}`}>Buat Akun <ArrowRight className="size-4" /></Link></article>)}</div><div className="page-grid mt-8 rounded-2xl border border-white/10 bg-[#090d15] p-6 text-center"><p className="text-sm text-slate-400">Butuh paket Cyber Drill atau Tabletop yang disesuaikan dengan jumlah peserta, industri, dan lingkup simulasi?</p><Link href="/request-demo" className="mt-3 inline-flex items-center gap-2 font-semibold text-rose-400">Request custom quotation <ArrowRight className="size-4" /></Link></div></section><SiteFooter /></main>;
}
