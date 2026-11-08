"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/public-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { publicAsset } from "@/lib/asset-path";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { learningContent, learningHeroImage, learningImages } from "@/lib/learning-content";
import { type Language, localePath, usePublicPreferences } from "@/lib/public-preferences";

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="eyebrow justify-center">{label}</p>
      <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

export function LearningPageContent({ language: routeLanguage }: { language?: Language }) {
  const { language } = usePublicPreferences();
  // Localized routes also render their correct wording in the static HTML.
  const locale = routeLanguage ?? language;
  const copy = learningContent[locale];
  const [titleBeforeAccent, titleAfterAccent] = copy.hero.title.split(copy.hero.accent);

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section aria-labelledby="learning-title" className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/5">
        <div className="page-grid grid items-center gap-10 py-16 sm:py-20 lg:min-h-[590px] lg:grid-cols-2 lg:gap-8">
          <Reveal className="min-w-0">
            <p className="eyebrow">{copy.hero.label}</p>
            <h1 id="learning-title" className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-5xl">{titleBeforeAccent}<span className="text-gradient">{copy.hero.accent}</span>{titleAfterAccent}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-9">{copy.hero.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={localePath("/request-demo", locale)} className="glow-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500">{copy.hero.start}</Link>
              <a href="#learning-categories" className="secondary-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500">{copy.hero.categories}</a>
            </div>
          </Reveal>
          <Reveal className="relative mx-auto w-full max-w-xl">
            <Image src={publicAsset(learningHeroImage)} alt={copy.hero.imageAlt} width={1832} height={858} priority sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full object-contain" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="learning-about-title" className="py-16 sm:py-20">
        <div className="page-grid grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal className="mx-auto w-full max-w-xs">
            <Image src={publicAsset(learningImages.about)} alt="" width={1448} height={1086} sizes="320px" className="h-auto w-full object-contain" />
          </Reveal>
          <Reveal>
            <p className="eyebrow">{copy.about.label}</p>
            <h2 id="learning-about-title" className="mt-5 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.about.title}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">{copy.about.description}</p>
          </Reveal>
        </div>
      </section>

      <section data-learning-section="benefits" className="border-y border-slate-200/80 bg-slate-50/70 py-16 dark:border-white/5 dark:bg-[#070a12] sm:py-20">
        <div className="page-grid">
          <SectionHeading {...copy.benefits} />
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.benefits.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="service-info-card motion-card flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-[#090d15] dark:shadow-none">
                  <Image src={publicAsset(learningImages.benefits[index])} alt="" width={80} height={80} className="size-20 object-contain" />
                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="learning-categories" data-learning-section="categories" className="scroll-mt-24 py-16 sm:py-20">
        <div className="page-grid">
          <SectionHeading {...copy.categories} />
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {copy.categories.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="cyber-card motion-card flex h-full flex-col items-center rounded-2xl p-6 text-center sm:p-8">
                  <Image src={publicAsset(learningImages.categories[index])} alt="" width={160} height={160} className="size-32 object-contain sm:size-40" />
                  <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mb-7 mt-4 flex-1 text-base leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="secondary-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500">{item.cta}</a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-learning-section="audience" className="border-y border-slate-200/80 bg-slate-50/70 py-16 dark:border-white/5 dark:bg-[#070a12] sm:py-20">
        <div className="page-grid">
          <SectionHeading {...copy.audience} />
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.audience.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="service-info-card motion-card flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-[#090d15] dark:shadow-none">
                  <Image src={publicAsset(learningImages.audience[index])} alt="" width={96} height={96} className="size-24 object-contain" />
                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="learning-cta-title" className="py-16 sm:py-20">
        <Reveal className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 px-6 py-14 text-center dark:from-[#0c101d] dark:via-[#080c16] dark:to-[#04060b] sm:px-12">
          <h2 id="learning-cta-title" className="mx-auto max-w-3xl text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.closing.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{copy.closing.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glow-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500">{copy.hero.start}</a>
            <Link href={localePath("/request-demo", locale)} className="secondary-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500">{copy.closing.contact}</Link>
          </div>
        </Reveal>
      </section>
      <SiteFooter />
    </main>
  );
}
