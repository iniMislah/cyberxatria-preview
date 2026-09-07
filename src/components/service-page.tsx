import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export type ServiceItem = { icon: LucideIcon; title: string; text: string };
export type ServicePackage = { name: string; description: string; items: string[]; featured?: boolean };

export type ServicePageProps = {
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  image: string;
  imageAlt: string;
  aboutTitle: string;
  about: string[];
  challenges: ServiceItem[];
  features: ServiceItem[];
  flow: string[];
  audience: string[];
  benefits: ServiceItem[];
  packages: ServicePackage[];
  ctaTitle: string;
};

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="eyebrow justify-center">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-7 text-slate-400">{text}</p>}
    </div>
  );
}

export function ServicePage(props: ServicePageProps) {
  return (
    <main className="site-shell min-h-screen bg-[#03060d] text-white">
      <SiteHeader />
      <section className="relative min-h-[610px] overflow-hidden border-b border-white/5">
        <Image src={props.image} alt={props.imageAlt} fill priority sizes="100vw" className="object-cover object-[66%_center] opacity-90" />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03060d] via-transparent to-transparent" />
        <div className="page-grid relative z-10 flex min-h-[590px] items-center py-20">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-rose-400">{props.eyebrow}</p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl">{props.title}<br /><span className="text-gradient">{props.accent}</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{props.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/request-demo" className="glow-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold">Request Demo <ArrowRight className="size-4" /></Link>
              <Link href="/signup" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-black/20 px-6 font-semibold backdrop-blur-sm hover:border-rose-500/50">Lihat Pricing <ShieldCheck className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="page-grid grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">Tentang layanan</p>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{props.aboutTitle}</h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-400">{props.about.map((text) => <p key={text}>{text}</p>)}</div>
          </div>
          <div className="cyber-card relative overflow-hidden rounded-2xl p-7">
            <div className="dot-field absolute inset-0 opacity-20" />
            <p className="relative text-sm font-bold uppercase tracking-widest text-rose-400">People · Process · Technology</p>
            <div className="relative mt-7 grid grid-cols-3 gap-3">
              {["Visibilitas", "Kesiapan", "Respons"].map((item, index) => <div key={item} className="rounded-xl border border-white/10 bg-black/30 p-4 text-center"><span className="mx-auto mb-3 grid size-9 place-items-center rounded-full border border-rose-500/40 text-xs font-black text-rose-400">0{index + 1}</span><p className="text-xs font-semibold text-slate-300">{item}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#070a12] py-24">
        <div className="page-grid"><SectionHeading eyebrow="Risiko operasional" title="Tantangan yang Kami Bantu Atasi" text="Kami membantu tim melihat risiko lebih dini dan memperkuat koordinasi sebelum dampaknya meluas." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{props.challenges.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-[#090d15] p-6"><item.icon className="size-8 text-rose-500" /><h3 className="mt-5 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="py-24">
        <div className="page-grid"><SectionHeading eyebrow="Kapabilitas" title="Layanan & Fitur Utama" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{props.features.map((item) => <article key={item.title} className="cyber-card rounded-2xl p-6"><div className="grid size-11 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/8 text-rose-400"><item.icon className="size-5" /></div><h3 className="mt-5 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#070a12] py-24">
        <div className="page-grid"><SectionHeading eyebrow="Alur terukur" title="Bagaimana Prosesnya Bekerja" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">{props.flow.map((step, index) => <div key={step} className="relative rounded-xl border border-rose-500/25 bg-[#090d15] p-4 text-center"><span className="mx-auto grid size-8 place-items-center rounded-full bg-rose-500/10 text-xs font-black text-rose-400">{String(index + 1).padStart(2, "0")}</span><p className="mt-3 text-xs font-bold uppercase leading-5 text-slate-200">{step}</p>{index < props.flow.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-rose-700 lg:block" />}</div>)}</div>
        </div>
      </section>

      <section className="py-24">
        <div className="page-grid"><SectionHeading eyebrow="Pilihan layanan" title="Service Packages" text="Pilih paket awal yang paling sesuai. Detail harga dapat dilihat setelah membuat akun." />
          <div className="grid items-stretch gap-5 lg:grid-cols-3">{props.packages.map((pkg) => <article key={pkg.name} className={`relative flex flex-col rounded-2xl border p-7 ${pkg.featured ? "border-rose-500 bg-[linear-gradient(145deg,rgba(66,12,34,.72),rgba(7,10,18,.95))] shadow-[0_0_50px_rgba(244,63,94,.13)]" : "border-white/10 bg-[#090d15]"}`}>{pkg.featured && <span className="absolute inset-x-0 top-0 rounded-t-2xl bg-gradient-to-r from-fuchsia-700 to-red-500 py-1.5 text-center text-[10px] font-black uppercase tracking-widest">Recommended</span>}<h3 className={`text-center text-xl font-bold ${pkg.featured ? "mt-5 text-rose-300" : "text-white"}`}>{pkg.name}</h3><p className="mt-3 min-h-12 text-center text-sm leading-6 text-slate-400">{pkg.description}</p><ul className="mt-7 space-y-3 text-sm text-slate-300">{pkg.items.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-rose-500" />{item}</li>)}</ul><Link href="/signup" className={`mt-auto inline-flex h-11 items-center justify-center rounded-lg px-5 pt-0 font-semibold ${pkg.featured ? "glow-button mt-8" : "mt-8 border border-rose-500/50 hover:bg-rose-500/10"}`}>Pilih Paket</Link></article>)}</div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#070a12] py-24">
        <div className="page-grid grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow">Cocok untuk siapa?</p><h2 className="mt-5 text-3xl font-bold">Dibangun untuk Organisasi yang Serius dengan Kesiapan Siber</h2><ul className="mt-7 space-y-4 text-sm text-slate-300">{props.audience.map((item) => <li key={item} className="flex gap-3"><Check className="size-5 shrink-0 text-rose-500" />{item}</li>)}</ul></div>
          <div className="grid gap-4 sm:grid-cols-2">{props.benefits.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-[#090d15] p-5"><item.icon className="size-7 text-emerald-400" /><h3 className="mt-4 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p></div>)}</div>
        </div>
      </section>

      <section className="py-24"><div className="page-grid rounded-3xl border border-rose-500/30 bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,.22),transparent_35%),#080c14] px-6 py-14 text-center sm:px-12"><p className="eyebrow justify-center">Langkah berikutnya</p><h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-4xl">{props.ctaTitle}</h2><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/request-demo" className="glow-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold">Request Consultation <ArrowRight className="size-4" /></Link><Link href="/signup" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 px-6 font-semibold hover:border-rose-500/50">Buat Akun</Link></div></div></section>
      <SiteFooter />
    </main>
  );
}
