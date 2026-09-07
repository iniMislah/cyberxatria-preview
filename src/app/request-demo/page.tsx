import type { Metadata } from "next";
import { Check, Clock3, Headphones } from "lucide-react";
import { RequestDemoForm } from "@/components/request-demo-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Request Demo" };

export default function RequestDemoPage() {
  return <main className="site-shell min-h-screen bg-[#03060d] text-white"><SiteHeader /><section className="py-20"><div className="page-grid grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr]"><div className="lg:sticky lg:top-28"><p className="eyebrow">Eksplorasi solusi</p><h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Lihat Cara CyberXatria <span className="text-gradient">Melindungi Organisasi Anda</span></h1><p className="mt-6 leading-7 text-slate-400">Dapatkan walkthrough solusi sesuai kebutuhan organisasi. Tim kami akan membantu memetakan tantangan serta skenario yang relevan.</p><div className="mt-8 space-y-4">{["Demo disesuaikan dengan kebutuhan", "Konsultasi dengan security expert", "Tanpa komitmen pembelian", "Rekomendasi langkah berikutnya"].map(item => <p key={item} className="flex items-center gap-3 text-sm text-slate-300"><Check className="size-5 text-rose-500" />{item}</p>)}</div><div className="mt-10 grid grid-cols-2 gap-4"><div className="rounded-xl border border-white/10 bg-[#090d15] p-4"><Clock3 className="size-6 text-rose-400" /><p className="mt-3 font-semibold">30–45 menit</p><p className="mt-1 text-xs text-slate-500">Durasi sesi demo</p></div><div className="rounded-xl border border-white/10 bg-[#090d15] p-4"><Headphones className="size-6 text-rose-400" /><p className="mt-3 font-semibold">Security Expert</p><p className="mt-1 text-xs text-slate-500">Pendamping sesi</p></div></div></div><RequestDemoForm /></div></section><SiteFooter /></main>;
}
