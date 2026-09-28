"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BellRing,
  Binoculars,
  BookOpenCheck,
  BrainCircuit,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  Clock3,
  Crosshair,
  Eye,
  FileCheck2,
  Gauge,
  Gavel,
  Landmark,
  Megaphone,
  MessageSquareText,
  Network,
  Radar,
  RadioTower,
  RotateCcw,
  Scale,
  ScanSearch,
  ShieldCheck,
  Siren,
  Timer,
  UsersRound,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/public-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { publicAsset } from "@/lib/asset-path";
import { type Localized, usePublicPreferences } from "@/lib/public-preferences";

const icons = {
  Activity,
  BellRing,
  Binoculars,
  BookOpenCheck,
  BrainCircuit,
  ChartNoAxesCombined,
  ClipboardCheck,
  Clock3,
  Crosshair,
  Eye,
  FileCheck2,
  Gauge,
  Gavel,
  Landmark,
  Megaphone,
  MessageSquareText,
  Network,
  Radar,
  RadioTower,
  RotateCcw,
  Scale,
  ScanSearch,
  ShieldCheck,
  Siren,
  Timer,
  UsersRound,
  Workflow,
} satisfies Record<string, LucideIcon>;

export type ServiceIcon = keyof typeof icons;
export type ServiceItem = { icon: ServiceIcon; title: string; text: string };
export type ServicePackage = { name: string; description: string; items: string[]; featured?: boolean };

export type ServicePageCopy = {
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  image: string;
  imageAlt: string;
  aboutEyebrow: string;
  aboutTitle: string;
  about: string[];
  pillars: string[];
  challengesEyebrow: string;
  challengesTitle: string;
  challengesText: string;
  challenges: ServiceItem[];
  featuresEyebrow: string;
  featuresTitle: string;
  features: ServiceItem[];
  flowEyebrow: string;
  flowTitle: string;
  flow: string[];
  packagesEyebrow: string;
  packagesTitle: string;
  packagesText: string;
  recommended: string;
  packages: ServicePackage[];
  audienceEyebrow: string;
  audienceTitle: string;
  audience: string[];
  benefits: ServiceItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaButton: string;
};

export type ServicePageProps = {
  content: Localized<ServicePageCopy>;
};

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="eyebrow justify-center">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{text}</p>}
    </div>
  );
}

export function ServicePage({ content }: ServicePageProps) {
  const { t } = usePublicPreferences();
  const props = t(content);

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative min-h-[610px] overflow-hidden border-b border-slate-200/80 dark:border-white/5">
        <Image src={publicAsset(props.image)} alt={props.imageAlt} fill priority sizes="100vw" className="hero-visual object-cover object-[66%_center] opacity-90" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-95" />
        <div className="page-grid relative z-10 flex min-h-[590px] items-center py-20">
          <Reveal className="max-w-2xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-400">{props.eyebrow}</p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl">{props.title}<br /><span className="text-gradient">{props.accent}</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{props.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/request-demo" className="glow-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white">Request Demo <ArrowRight className="size-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">{props.aboutEyebrow}</p>
            <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{props.aboutTitle}</h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600 dark:text-slate-400">{props.about.map((text) => <p key={text}>{text}</p>)}</div>
          </div>
          <div className="cyber-card relative overflow-hidden rounded-2xl p-7">
            <div className="dot-field absolute inset-0 opacity-20" />
            <p className="relative text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">People · Process · Technology</p>
            <div className="relative mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {props.pillars.map((item, index) => (
                <div key={item} className="motion-card group relative flex h-full flex-col items-center justify-center rounded-xl border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] p-4 text-center transition hover:border-rose-500/40 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 shadow-sm dark:shadow-none">
                  <span className="mx-auto mb-3 grid size-9 place-items-center rounded-full border border-rose-500/40 bg-rose-500/10 text-xs font-black text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">0{index + 1}</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid"><SectionHeading eyebrow={props.challengesEyebrow} title={props.challengesTitle} text={props.challengesText} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{props.challenges.map((item) => { const Icon = icons[item.icon]; return <article key={item.title} className="motion-card flex h-full flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090d15] p-6 shadow-sm dark:shadow-none"><Icon className="size-8 text-rose-500" /><h3 className="mt-5 font-bold text-slate-900 dark:text-white min-h-[3rem] flex items-center">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 flex-1">{item.text}</p></article>; })}</div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid"><SectionHeading eyebrow={props.featuresEyebrow} title={props.featuresTitle} />
          <div className={`grid gap-5 ${props.features.length === 4 ? "sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>{props.features.map((item) => { const Icon = icons[item.icon]; return <article key={item.title} className="cyber-card motion-card rounded-2xl p-6 flex h-full flex-col justify-between"><div className="grid size-11 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400 mb-5"><Icon className="size-5" /></div><div className="flex flex-1 flex-col"><h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3><p className="mt-2.5 text-sm leading-6 text-slate-600 dark:text-slate-400 flex-1">{item.text}</p></div></article>; })}</div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid"><SectionHeading eyebrow={props.flowEyebrow} title={props.flowTitle} />
          <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">{props.flow.map((step, index) => <div key={step} className="motion-card group relative rounded-xl border border-rose-500/25 dark:border-rose-500/30 bg-white dark:bg-[#090d15] p-4 text-center shadow-sm dark:shadow-none hover:border-rose-500/60 transition-all"><span className="mx-auto grid size-8 place-items-center rounded-full bg-rose-500/10 text-xs font-black text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/25 group-hover:scale-110 transition-transform">{String(index + 1).padStart(2, "0")}</span><p className="mt-3 text-xs font-bold uppercase leading-5 text-slate-800 dark:text-slate-200">{step}</p>{index < props.flow.length - 1 && <ArrowRight className="absolute -right-3.5 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-rose-400/60 dark:text-rose-600 lg:block" />}</div>)}</div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid"><SectionHeading eyebrow={props.packagesEyebrow} title={props.packagesTitle} text={props.packagesText} />
          <div className="grid items-stretch gap-6 lg:grid-cols-3">{props.packages.map((pkg) => <article key={pkg.name} className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all ${pkg.featured ? "border-2 border-rose-500/80 dark:border-rose-500 bg-gradient-to-b from-rose-50/80 via-white to-white dark:bg-[linear-gradient(145deg,rgba(66,12,34,.72),rgba(7,10,18,.95))] shadow-[0_12px_40px_rgba(244,63,94,0.12)] dark:shadow-[0_0_50px_rgba(244,63,94,.18)]" : "border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#090d15] shadow-sm dark:shadow-none hover:border-rose-500/40"}`}>{pkg.featured && <span className="absolute inset-x-0 top-0 rounded-t-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-500 py-1.5 text-center text-[10px] font-black uppercase tracking-widest text-white shadow-sm">{props.recommended}</span>}<h3 className={`text-center text-xl font-bold ${pkg.featured ? "mt-5 text-rose-600 dark:text-rose-300" : "text-slate-900 dark:text-white"}`}>{pkg.name}</h3><p className="mt-3 min-h-12 text-center text-sm leading-6 text-slate-600 dark:text-slate-400">{pkg.description}</p><ul className="mt-7 space-y-3 text-sm text-slate-700 dark:text-slate-300 flex-1">{pkg.items.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-rose-500" />{item}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow">{props.audienceEyebrow}</p><h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">{props.audienceTitle}</h2><ul className="mt-7 space-y-4 text-sm text-slate-700 dark:text-slate-300">{props.audience.map((item) => <li key={item} className="flex gap-3"><Check className="size-5 shrink-0 text-rose-500" />{item}</li>)}</ul></div>
          <div className="grid gap-4 sm:grid-cols-2">{props.benefits.map((item) => { const Icon = icons[item.icon]; return <div key={item.title} className="motion-card flex h-full flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090d15] p-5 shadow-sm dark:shadow-none"><Icon className="size-7 text-emerald-500 dark:text-emerald-400" /><h3 className="mt-4 font-bold text-slate-900 dark:text-white min-h-[2.5rem] flex items-center">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 flex-1">{item.text}</p></div>; })}</div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 dark:from-[#0c101d] dark:via-[#080c16] dark:to-[#04060b] px-6 py-14 text-center sm:px-12 shadow-lg dark:shadow-[0_0_50px_rgba(244,63,94,0.15)]">
          <p className="eyebrow justify-center">{props.ctaEyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{props.ctaTitle}</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/request-demo" className="glow-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white">
              {props.ctaButton} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
