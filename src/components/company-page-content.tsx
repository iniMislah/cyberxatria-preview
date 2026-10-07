"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Flag, GraduationCap } from "lucide-react";
import { RequestDemoCta } from "@/components/request-demo-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { publicAsset } from "@/lib/asset-path";
import { localePath, usePublicPreferences } from "@/lib/public-preferences";
import { solutionServiceMeta } from "@/lib/solution-services";

const experienceImages = [
  "/images/Mini Bootcamp.png",
  "/images/CTF.png",
  "/images/CDE & TTX.png",
];

const experienceMeta = [
  { number: "01", Icon: GraduationCap },
  { number: "02", Icon: Flag },
  { number: "03", Icon: ClipboardCheck },
];

const heroImageClass = "hero-visual object-contain object-center opacity-95 scale-110";

export function CompanyPageContent() {
  const { language, t } = usePublicPreferences();

  const copy = t({
    id: {
      heroEyebrow: "TENTANG KAMI",
      heroTitle: ["Membangun Kesiapan Siber", "melalui Pengalaman Nyata"],
      heroParagraphs: [
        "CyberXatria membantu organisasi meningkatkan kesiapan menghadapi ancaman siber melalui pelatihan, simulasi, dan exercise yang dirancang berdasarkan kebutuhan serta skenario dunia nyata.",
        "Kami menggabungkan cybersecurity knowledge, hands-on practice, dan realistic simulation untuk membantu tim membangun kemampuan teknis, koordinasi, dan pengambilan keputusan saat menghadapi insiden keamanan siber.",
      ],
      heroSupport: ["Dari Pembelajaran hingga Simulasi,", "CyberXatria Membantu Membangun Kesiapan Siber"],
      aboutParagraphs: [
        "CyberXatria merupakan ekosistem pembelajaran dan exercise keamanan siber yang dirancang untuk membantu individu maupun organisasi mengembangkan kompetensi dan kesiapan menghadapi ancaman siber.",
        "Program kami mencakup berbagai area keamanan siber, mulai dari Offensive Security, Defensive Security, Security Operations, hingga Governance, Risk & Compliance.",
        "Melalui pendekatan People, Process, dan Technology, CyberXatria menghubungkan pembelajaran dengan praktik sehingga kemampuan yang dibangun dapat diterapkan dalam situasi yang lebih realistis.",
      ],
      servicesEyebrow: "LAYANAN KAMI",
      servicesTitle: "Layanan Utama Kami",
      servicesDescription:
        "Kami menyediakan layanan terintegrasi untuk membantu organisasi membangun kesiapan siber yang lebih kuat dan berkelanjutan.",
      learnMore: "Pelajari Lebih Lanjut",
      services: [
        {
          title: "CYBER DRILL EXERCISE",
          description:
            "Simulasi serangan siber dari sisi teknis yang dirancang untuk menguji kemampuan organisasi dalam mendeteksi, merespons, dan menangani insiden keamanan secara nyata.",
        },
        {
          title: "TABLETOP EXERCISE",
          description:
            "Simulasi berbasis skenario yang melibatkan berbagai fungsi dalam organisasi untuk menguji pengambilan keputusan, koordinasi, dan prosedur respons insiden siber.",
        },
        {
          title: "AI FOR SOC",
          description:
            "Solusi berbasis kecerdasan buatan yang membantu tim SOC menganalisis peringatan, mengidentifikasi potensi ancaman, memprioritaskan risiko, serta mempercepat penyelidikan dan respons keamanan.",
        },
      ],
      experienceEyebrow: "PENGALAMAN KAMI",
      experienceTitle: "Jejak Kolaborasi Kami",
      experienceDescription:
        "Berbagai pengalaman dan pencapaian yang menjadi bagian dari perjalanan kami dalam mendukung peningkatan kesiapan di berbagai sektor.",
      experiences: [
        {
          title: "Mini Bootcamp",
          subtitle: "Red Team dan Blue Team for Beginner",
          description: "Program pembelajaran terarah untuk pengenalan kemampuan red team dan blue team.",
        },
        {
          title: "Public CTF",
          subtitle: "Kurusetra Warrior 2025 dan CTF Forage",
          description: "Kegiatan praktik berbasis tantangan untuk mengasah kemampuan keamanan siber.",
        },
        {
          title: "Cyber Drill dan Tabletop Exercise",
          subtitle: "di berbagai industri",
          description: "Latihan berbasis skenario untuk membantu tim memahami koordinasi respons insiden.",
        },
      ],
      ctaTitle: "Siap Memperkuat Ketahanan Siber Organisasi Anda?",
      ctaText: "Temukan bagaimana CyberXatria membantu organisasi mempersiapkan diri, mendeteksi, dan merespons ancaman siber.",
      cta: "Request Demo",
    },
    en: {
      heroEyebrow: "ABOUT US",
      heroTitle: ["Building Cyber Readiness", "through Real-World Experience"],
      heroParagraphs: [
        "CyberXatria helps organizations improve their readiness against cyber threats through training, simulations, and exercises designed around real-world needs and scenarios.",
        "We combine cybersecurity knowledge, hands-on practice, and realistic simulation to help teams build technical capabilities, coordination, and decision-making skills when facing cybersecurity incidents.",
      ],
      heroSupport: ["From Learning to Simulation,", "CyberXatria Helps Build Cyber Readiness"],
      aboutParagraphs: [
        "CyberXatria is a cybersecurity learning and exercise ecosystem designed to help individuals and organizations develop the competencies and readiness needed to face cyber threats.",
        "Our programs cover various cybersecurity areas, including Offensive Security, Defensive Security, Security Operations, and Governance, Risk & Compliance.",
        "Through a People, Process, and Technology approach, CyberXatria connects learning with hands-on practice so the capabilities developed can be applied in more realistic situations.",
      ],
      servicesEyebrow: "OUR EXPERTISE",
      servicesTitle: "Our Core Services",
      servicesDescription:
        "We provide integrated services to help organizations build stronger and more sustainable cyber readiness.",
      learnMore: "Learn More",
      services: [
        {
          title: "CYBER DRILL EXERCISE",
          description:
            "A technical cyberattack simulation designed to test an organization's ability to detect, respond to, and handle real-world security incidents.",
        },
        {
          title: "TABLETOP EXERCISE",
          description:
            "A scenario-based simulation involving various functions within an organization to test decision-making, coordination, and cyber incident response procedures.",
        },
        {
          title: "AI FOR SOC",
          description:
            "An artificial intelligence-based solution that helps SOC teams analyze alerts, identify potential threats, prioritize risks, and accelerate security investigations and responses.",
        },
      ],
      experienceEyebrow: "OUR EXPERIENCE",
      experienceTitle: "Our Collaboration Journey",
      experienceDescription:
        "Various experiences and achievements that have become part of our journey in supporting cybersecurity readiness across different sectors.",
      experiences: [
        {
          title: "Mini Bootcamp",
          subtitle: "Red Team and Blue Team for Beginner",
          description: "A focused learning program introducing red team and blue team capabilities.",
        },
        {
          title: "Public CTF",
          subtitle: "Kurusetra Warrior 2025 and CTF Forage",
          description: "Challenge-based practice activities to sharpen cybersecurity capabilities.",
        },
        {
          title: "Cyber Drill and Tabletop Exercise",
          subtitle: "across various industries",
          description: "Scenario-based exercises to help teams understand incident response coordination.",
        },
      ],
      ctaTitle: "Ready to Strengthen Your Organization's Cyber Resilience?",
      ctaText: "Discover how CyberXatria helps organizations prepare for, detect, and respond to cyber threats.",
      cta: "Request Demo",
    },
  });

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/5">
        <div className="home-hero-artwork absolute inset-y-0 right-0" style={{ transform: "translateX(clamp(-3.5rem, -4vw, -2rem))" }}>
          <Image
            src={publicAsset("/images/Tentang Kami Light.png")}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 126vw, (max-width: 1024px) 82vw, 66vw"
            className={`${heroImageClass} dark:hidden`}
          />
          <Image
            src={publicAsset("/images/Tentang Kami.png")}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 126vw, (max-width: 1024px) 82vw, 66vw"
            className={`${heroImageClass} hidden dark:block`}
          />
        </div>
        <div className="dot-field absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,63,94,.14),transparent_36%)]" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-ambient" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-95" />
        <div className="page-grid relative z-10 flex min-h-[720px] items-center py-20 sm:py-24 xl:min-h-[760px]">
          <div className="max-w-[660px] -translate-y-10 pt-8 lg:-translate-y-14">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl">
              {copy.heroTitle[0]}
              <br />
              <span className="text-gradient">{copy.heroTitle[1]}</span>
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {copy.heroParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 border-l-4 border-rose-500 pl-5">
              <p className="text-xl font-bold leading-tight text-slate-900 dark:text-white sm:text-2xl">
                {copy.heroSupport[0]}
                <br />
                <span className="text-gradient">{copy.heroSupport[1]}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid">
          <div className="cyber-card grid items-center gap-5 rounded-3xl border-slate-200/80 p-5 shadow-sm dark:border-white/10 dark:shadow-none sm:p-6 lg:grid-cols-[0.48fr_0.52fr] lg:gap-6">
            <div className="space-y-5 text-base leading-7 text-slate-600 dark:text-slate-400">
              {copy.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
              <Image
                src={publicAsset("/images/Tentang Kami 2.png")}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-slate-50/70 py-16 transition-colors dark:border-white/5 dark:bg-[#070a12] sm:py-20">
        <div className="page-grid">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.servicesEyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.servicesTitle}</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.servicesDescription}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {copy.services.map((service, index) => {
              const meta = solutionServiceMeta[index];
              return (
                <article key={service.title} className="cyber-card motion-card flex h-full flex-col rounded-2xl p-4">
                  <div className="solution-card-image relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10">
                    <Image
                      src={publicAsset(meta.imageLight)}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover dark:hidden"
                    />
                    <Image
                      src={publicAsset(meta.image)}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="hidden object-cover dark:block"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3 pt-5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{service.description}</p>
                    {meta.href ? (
                      <Link
                        href={localePath(meta.href, language)}
                        className="motion-link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-rose-500 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-rose-400 dark:hover:text-rose-300"
                      >
                        {copy.learnMore} <ArrowRight className="size-4" />
                      </Link>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-slate-500 dark:text-slate-500"
                      >
                        {copy.learnMore}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="page-grid">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">{copy.experienceEyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.experienceTitle}</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{copy.experienceDescription}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {copy.experiences.map((experience, index) => {
              const image = experienceImages[index];
              const meta = experienceMeta[index];
              const Icon = meta.Icon;
              return (
                <article
                  key={experience.title}
                  className="cyber-card motion-card flex h-full flex-col rounded-2xl p-4"
                >
                  <div className="solution-card-image relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10">
                    <Image
                      src={publicAsset(image)}
                      alt={experience.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-sm font-bold text-rose-600 shadow-sm backdrop-blur dark:text-rose-400">
                      {meta.number}
                    </span>
                    <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90 text-rose-600 shadow-sm backdrop-blur dark:text-rose-300">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3 pt-5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{experience.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-rose-600 dark:text-rose-400">{experience.subtitle}</p>
                    <p className="mt-4 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{experience.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="page-grid premium-panel rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50 via-white to-rose-100/50 px-6 py-14 text-center shadow-lg dark:bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,.22),transparent_35%),#080c14] dark:shadow-[0_0_50px_rgba(244,63,94,0.15)] sm:px-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{copy.ctaText}</p>
          <RequestDemoCta className="mt-8">{copy.cta}</RequestDemoCta>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
