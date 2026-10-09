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
import { Reveal } from "@/components/public-motion";
import { RequestDemoCta } from "@/components/request-demo-cta";
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
export type ServiceHighlight = { label: string; image: string };

export type ServicePageCopy = {
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  image: string;
  imageLight?: string;
  imageAlt: string;
  heroCtaButton?: string;
  heroSecondaryCtaButton?: string;
  heroHighlights?: ServiceHighlight[];
  aboutEyebrow: string;
  aboutTitle: string;
  about: string[];
  pillarLabel?: string;
  pillars: string[];
  pillarImages?: string[];
  challengesEyebrow: string;
  challengesTitle: string;
  challengesText: string;
  challenges: ServiceItem[];
  challengeIconImages?: string[];
  challengesVariant?: "default" | "centeredCards";
  featuresEyebrow: string;
  featuresTitle: string;
  features: ServiceItem[];
  featuresVariant?: "default" | "centeredCards";
  flowEyebrow: string;
  flowTitle: string;
  flowText?: string;
  flow: string[];
  flowDescriptions?: string[];
  flowImages?: string[];
  flowVariant?: "default" | "processGrid";
  assessmentEyebrow?: string;
  assessmentTitle?: string;
  assessmentText?: string;
  assessment?: ServiceItem[];
  assessmentIconImages?: string[];
  assessmentVariant?: "default" | "compact";
  deliverablesEyebrow?: string;
  deliverablesTitle?: string;
  deliverablesText?: string;
  deliverables?: ServiceItem[];
  deliverableImages?: string[];
  deliverableIconImages?: { light: string; dark: string }[];
  deliverablesVariant?: "default" | "centeredGrid";
  packagesEyebrow: string;
  packagesTitle: string;
  packagesText: string;
  packagesVariant?: "default" | "balanced" | "highlighted";
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
  const flowImages = props.flowImages;
  const hasFeatures = props.features.length > 0;
  const hasPackages = props.packages.length > 0;
  const hasAudience = props.audience.length > 0 || props.benefits.length > 0;

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative min-h-[610px] overflow-hidden border-b border-slate-200/80 dark:border-white/5">
        {props.imageLight && (
          <Image src={publicAsset(props.imageLight)} alt={props.imageAlt} fill priority sizes="100vw" className="hero-visual object-cover object-[66%_center] opacity-90 dark:hidden" />
        )}
        <Image src={publicAsset(props.image)} alt={props.imageAlt} fill priority sizes="100vw" className={`hero-visual object-cover object-[66%_center] opacity-90 ${props.imageLight ? "hidden dark:block" : ""}`} />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-95" />
        <div className="page-grid relative z-10 flex min-h-[590px] items-center py-20">
          <Reveal className="max-w-2xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-400">{props.eyebrow}</p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl">{props.title}<br /><span className="text-gradient">{props.accent}</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{props.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestDemoCta>{props.heroCtaButton}</RequestDemoCta>
              {props.heroSecondaryCtaButton && <a href="#exercise-flow" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white/70 px-6 text-sm font-semibold text-slate-800 transition hover:border-rose-500/50 hover:text-rose-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-rose-400/50 dark:hover:text-rose-300">{props.heroSecondaryCtaButton}</a>}
            </div>
            {props.heroHighlights && (
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {props.heroHighlights.map((item) => (
                  <div key={item.label} className="motion-card flex min-h-[132px] flex-col items-center justify-center rounded-xl border border-white/60 bg-white/75 p-4 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#090d15]/75 dark:shadow-none">
                    <div className="relative mb-3 size-16 sm:size-20">
                      <Image
                        src={publicAsset(item.image)}
                        alt={item.label}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="object-contain"
                      />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">{item.label}</p>
                  </div>
                ))}
              </div>
            )}
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
            <p className="relative text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">{props.pillarLabel ?? "People · Process · Technology"}</p>
            <div className={`relative mt-6 grid grid-cols-1 gap-3.5 ${props.pillars.length === 4 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
              {props.pillars.map((item, index) => (
                <div key={item} className="motion-card group relative flex min-h-[132px] flex-col items-center justify-center rounded-xl border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] p-4 text-center transition hover:border-rose-500/40 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 shadow-sm dark:shadow-none">
                  {props.pillarImages?.[index] ? (
                    <div className="relative mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20">
                      <Image
                        src={publicAsset(props.pillarImages[index])}
                        alt={item}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="mx-auto mb-3 grid size-9 place-items-center rounded-full border border-rose-500/40 bg-rose-500/10 text-xs font-black text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">0{index + 1}</span>
                  )}
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid"><SectionHeading eyebrow={props.challengesEyebrow} title={props.challengesTitle} text={props.challengesText} />
          <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${props.challengesVariant === "centeredCards" ? "justify-items-center" : ""}`}>
            {props.challenges.map((item, index) => {
              const Icon = icons[item.icon];
              const iconImage = props.challengeIconImages?.[index];
              const isCenteredChallenge = props.challengesVariant === "centeredCards" || Boolean(iconImage);
              return (
                <article key={item.title} className={`motion-card flex h-full min-h-[220px] w-full max-w-[380px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-rose-500/40 dark:border-white/10 dark:bg-[#090d15] dark:shadow-none ${isCenteredChallenge ? "items-center text-center" : ""}`}>
                  {iconImage ? (
                    <span className="relative block size-16 sm:size-[72px]">
                      <Image src={publicAsset(iconImage)} alt="" fill sizes="(max-width: 640px) 64px, 72px" className="object-contain" />
                    </span>
                  ) : (
                    <span className={isCenteredChallenge ? "grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400" : ""}>
                      <Icon className={isCenteredChallenge ? "size-6" : "size-8 text-rose-500"} />
                    </span>
                  )}
                  <h3 className={`mt-5 min-h-[3rem] font-bold text-slate-900 dark:text-white ${isCenteredChallenge ? "flex items-center justify-center" : "flex items-center"}`}>{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {hasFeatures && <section className="py-16 sm:py-20">
        <div className="page-grid"><SectionHeading eyebrow={props.featuresEyebrow} title={props.featuresTitle} />
          <div className={`grid gap-5 ${props.features.length === 4 ? "sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"} ${props.featuresVariant === "centeredCards" ? "justify-items-center" : ""}`}>
            {props.features.map((item) => {
              const Icon = icons[item.icon];
              const isCenteredFeature = props.featuresVariant === "centeredCards";
              return (
                <article key={item.title} className={`cyber-card motion-card flex h-full min-h-[240px] w-full max-w-[380px] flex-col rounded-2xl p-6 ${isCenteredFeature ? "items-center text-center" : "justify-between"}`}>
                  <div className="mb-5 grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 dark:text-rose-400">
                    <Icon className="size-6" />
                  </div>
                  <div className={`flex flex-1 flex-col ${isCenteredFeature ? "items-center" : ""}`}>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>}

      <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div id="exercise-flow" className="page-grid"><SectionHeading eyebrow={props.flowEyebrow} title={props.flowTitle} text={props.flowText} />
          {flowImages && props.flowVariant === "processGrid" ? (
            <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {props.flow.map((step, index) => (
                <article key={`${index}-${step}`} className="motion-card flex h-[410px] flex-col items-center rounded-2xl border border-rose-500/25 bg-white p-6 text-center shadow-sm transition-all hover:border-rose-500/60 hover:shadow-md dark:border-rose-500/30 dark:bg-[#090d15] dark:shadow-none">
                  <div className="relative mx-auto mt-1 h-28 w-28 sm:h-32 sm:w-32">
                    <Image
                      src={publicAsset(flowImages[index])}
                      alt={step}
                      fill
                      sizes="(max-width: 640px) 112px, 128px"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mt-5 min-h-12 text-center text-base font-bold leading-6 text-slate-900 dark:text-white">{step}</h3>
                  {props.flowDescriptions?.[index] && <p className="mt-3 flex-1 text-center text-sm leading-6 text-slate-600 dark:text-slate-400">{props.flowDescriptions[index]}</p>}
                </article>
              ))}
            </div>
          ) : flowImages ? (
            <div className={`mx-auto grid justify-center gap-3.5 sm:grid-cols-2 md:grid-cols-3 ${props.flow.length === 6 ? "max-w-5xl lg:grid-cols-6" : "lg:grid-cols-7"}`}>{props.flow.map((step, index) => (
              <div key={`${index}-${step}`} className="motion-card group relative flex h-full min-h-[190px] flex-col items-center rounded-xl border border-rose-500/25 bg-white p-3 text-center shadow-sm transition-all hover:border-rose-500/60 hover:shadow-md dark:border-rose-500/30 dark:bg-[#090d15] dark:shadow-none">
                <span className="text-xs font-black text-rose-600 dark:text-rose-400">{String(index + 1).padStart(2, "0")}</span>
                <div className="relative mx-auto mt-2 aspect-square w-full max-w-[104px] flex-1">
                  <Image
                    src={publicAsset(flowImages[index])}
                    alt={step}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 9vw"
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-xs font-bold uppercase leading-5 text-slate-800 dark:text-slate-200">{step}</p>
                {props.flowDescriptions?.[index] && <p className="mt-2 text-[11px] leading-5 text-slate-600 dark:text-slate-400">{props.flowDescriptions[index]}</p>}
                {index < props.flow.length - 1 && <ArrowRight className="absolute -right-3.5 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-rose-400/60 dark:text-rose-600 lg:block" />}
              </div>
            ))}</div>
          ) : (
            <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">{props.flow.map((step, index) => <div key={`${index}-${step}`} className="motion-card group relative rounded-xl border border-rose-500/25 dark:border-rose-500/30 bg-white dark:bg-[#090d15] p-4 text-center shadow-sm dark:shadow-none hover:border-rose-500/60 transition-all"><span className="mx-auto grid size-8 place-items-center rounded-full bg-rose-500/10 text-xs font-black text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/25 group-hover:scale-110 transition-transform">{String(index + 1).padStart(2, "0")}</span><p className="mt-3 text-xs font-bold uppercase leading-5 text-slate-800 dark:text-slate-200">{step}</p>{props.flowDescriptions?.[index] && <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{props.flowDescriptions[index]}</p>}{index < props.flow.length - 1 && <ArrowRight className="absolute -right-3.5 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-rose-400/60 dark:text-rose-600 lg:block" />}</div>)}</div>
          )}
        </div>
      </section>

      {props.assessment && (
        <section className="py-16 sm:py-20">
          <div className="page-grid">
            <SectionHeading eyebrow={props.assessmentEyebrow ?? ""} title={props.assessmentTitle ?? ""} text={props.assessmentText} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {props.assessment.map((item, index) => {
                const Icon = icons[item.icon];
                const iconImage = props.assessmentIconImages?.[index];
                const isCompactAssessment = props.assessmentVariant === "compact";
                return (
                  <article key={item.title} className={`motion-card flex flex-col items-center rounded-2xl border border-slate-200 bg-white text-center shadow-sm transition-all hover:border-rose-500/40 dark:border-white/10 dark:bg-[#090d15] dark:shadow-none lg:col-span-2 ${isCompactAssessment ? "h-[190px] justify-center p-4" : "h-[280px] p-5"} ${props.assessment?.length === 8 && index === 6 ? "lg:col-start-2" : ""}`}>
                    <span className={`grid place-items-center text-rose-600 dark:text-rose-300 ${isCompactAssessment ? "mb-3 size-12" : "mb-3 size-16"}`}>
                      {iconImage ? (
                        <Image
                          src={publicAsset(iconImage)}
                          alt=""
                          width={64}
                          height={64}
                          sizes="64px"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className={`grid place-items-center rounded-lg bg-rose-500/10 ${isCompactAssessment ? "size-12" : "size-10"}`}>
                          <Icon className={isCompactAssessment ? "size-6" : "size-5"} />
                        </span>
                      )}
                    </span>
                    <h3 className={`flex items-center justify-center font-bold text-slate-900 dark:text-white ${isCompactAssessment ? "min-h-10 text-sm leading-5 sm:text-[15px]" : "min-h-12 text-[15px] leading-6 sm:text-base"}`}>{item.title}</h3>
                    {item.text && <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {props.deliverables && (
        <section className="border-y border-slate-200/80 bg-slate-50/70 py-16 transition-colors dark:border-white/5 dark:bg-[#070a12] sm:py-20">
          <div className="page-grid">
            <SectionHeading eyebrow={props.deliverablesEyebrow ?? ""} title={props.deliverablesTitle ?? ""} text={props.deliverablesText} />
            <div className={`grid gap-4 sm:grid-cols-2 ${props.deliverablesVariant === "centeredGrid" ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
              {props.deliverables.map((item, index) => {
                const Icon = icons[item.icon];
                const iconImage = props.deliverableIconImages?.[index];
                const deliverableImage = props.deliverableImages?.[index];
                return (
                  <article key={item.title} className={`motion-card flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-rose-500/40 dark:border-white/10 dark:bg-[#090d15] dark:shadow-none ${props.deliverablesVariant === "centeredGrid" ? `h-[280px] lg:col-span-2 ${props.deliverables?.length === 7 && index === 6 ? "lg:col-start-3" : ""}` : "h-full min-h-[152px]"}`}>
                    {deliverableImage ? (
                      <span className="relative mb-4 block size-20">
                        <Image
                          src={publicAsset(deliverableImage)}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      </span>
                    ) : iconImage ? (
                      <span className="relative mb-4 block size-16 sm:size-20">
                        <Image
                          src={publicAsset(iconImage.light)}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 64px, 80px"
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src={publicAsset(iconImage.dark)}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 64px, 80px"
                          className="hidden object-contain dark:block"
                        />
                      </span>
                    ) : (
                      <span className="mb-4 grid size-10 place-items-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-300">
                        <Icon className="size-5" />
                      </span>
                    )}
                    <h3 className="flex min-h-12 items-center justify-center text-sm font-bold leading-6 text-slate-900 dark:text-white">{item.title}</h3>
                    {item.text && <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {hasPackages && <section className="py-16 sm:py-20">
        <div className="page-grid"><SectionHeading eyebrow={props.packagesEyebrow} title={props.packagesTitle} text={props.packagesText} />
          <div className={`grid items-stretch gap-6 ${props.packagesVariant === "balanced" || props.packagesVariant === "highlighted" ? "mx-auto max-w-5xl lg:grid-cols-2" : "lg:grid-cols-3"}`}>{props.packages.map((pkg) => {
            const isBalanced = props.packagesVariant === "balanced";
            const isHighlighted = props.packagesVariant === "highlighted";
            return (
              <article key={pkg.name} className={isBalanced ? "relative flex h-full min-h-[360px] flex-col rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all hover:border-rose-500/40 dark:border-white/10 dark:bg-[#090d15] dark:shadow-none" : `relative flex h-full flex-col rounded-2xl border p-7 transition-all ${pkg.featured || isHighlighted ? "border-2 border-rose-500/80 dark:border-rose-500 bg-gradient-to-b from-rose-50/80 via-white to-white dark:bg-[linear-gradient(145deg,rgba(66,12,34,.72),rgba(7,10,18,.95))] shadow-[0_12px_40px_rgba(244,63,94,0.12)] dark:shadow-[0_0_50px_rgba(244,63,94,.18)]" : "border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#090d15] shadow-sm dark:shadow-none hover:border-rose-500/40"}`}>
                {pkg.featured && !isHighlighted && (
                  <span className={isBalanced ? "absolute right-5 top-5 rounded-full border border-rose-500/25 bg-rose-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:border-rose-300/20 dark:bg-rose-500/10 dark:text-rose-300" : "absolute inset-x-0 top-0 rounded-t-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-500 py-1.5 text-center text-[10px] font-black uppercase tracking-widest text-white shadow-sm"}>
                    {props.recommended}
                  </span>
                )}
                <h3 className={isBalanced ? "pr-28 text-xl font-bold text-slate-900 dark:text-white" : `text-center text-xl font-bold ${pkg.featured && !isHighlighted ? "mt-5 text-rose-600 dark:text-rose-300" : pkg.featured || isHighlighted ? "text-rose-600 dark:text-rose-300" : "text-slate-900 dark:text-white"}`}>{pkg.name}</h3>
                <p className={isBalanced ? "mt-3 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400" : "mt-3 min-h-12 text-center text-sm leading-6 text-slate-600 dark:text-slate-400"}>{pkg.description}</p>
                <ul className="mt-7 flex-1 space-y-3 text-sm text-slate-700 dark:text-slate-300">{pkg.items.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-rose-500" />{item}</li>)}</ul>
              </article>
            );
          })}</div>
        </div>
      </section>}

      {hasAudience && <section className="border-y border-slate-200/80 dark:border-white/5 bg-slate-50/70 dark:bg-[#070a12] py-16 sm:py-20 transition-colors">
        <div className="page-grid grid gap-10 lg:grid-cols-2">
          <div><p className="eyebrow">{props.audienceEyebrow}</p><h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">{props.audienceTitle}</h2><ul className="mt-7 space-y-4 text-sm text-slate-700 dark:text-slate-300">{props.audience.map((item) => <li key={item} className="flex gap-3"><Check className="size-5 shrink-0 text-rose-500" />{item}</li>)}</ul></div>
          <div className="grid gap-4 sm:grid-cols-2">{props.benefits.map((item) => { const Icon = icons[item.icon]; return <div key={item.title} className="motion-card flex h-full flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#090d15] p-5 shadow-sm dark:shadow-none"><Icon className="size-7 text-rose-500 dark:text-orange-300" /><h3 className="mt-4 font-bold text-slate-900 dark:text-white min-h-[2.5rem] flex items-center">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 flex-1">{item.text}</p></div>; })}</div>
        </div>
      </section>}

      <section className="py-16 sm:py-20">
        <div className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 dark:from-[#0c101d] dark:via-[#080c16] dark:to-[#04060b] px-6 py-14 text-center sm:px-12 shadow-lg dark:shadow-[0_0_50px_rgba(244,63,94,0.15)]">
          <p className="eyebrow justify-center">{props.ctaEyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{props.ctaTitle}</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <RequestDemoCta>{props.ctaButton}</RequestDemoCta>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
