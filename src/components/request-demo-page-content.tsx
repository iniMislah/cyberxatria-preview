"use client";

import { Check, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { usePublicPreferences } from "@/lib/public-preferences";

export function RequestDemoPageContent() {
  const { t } = usePublicPreferences();
  const copy = t({
    id: {
      eyebrow: "Kontak CyberXatria",
      title: "Lihat Cara CyberXatria Melindungi Organisasi Anda",
      description: "Dapatkan walkthrough solusi sesuai kebutuhan organisasi. Tim kami akan membantu memetakan tantangan serta skenario yang relevan.",
      bullets: ["Informasi layanan CyberXatria", "Konsultasi kebutuhan keamanan", "Diskusi kerja sama", "Tindak lanjut dari tim kami"],
      mapTitle: "PT Media Telekomunikasi Mandiri / MTM",
      mapAddress: "ITS Tower 6th Floor, Jl. Raya Pasar Minggu No. 18, RT.1/RW.1, Pejaten Timur, Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12510",
    },
    en: {
      eyebrow: "Contact CyberXatria",
      title: "See How CyberXatria Protects Your Organization",
      description: "Get a solution walkthrough tailored to your organization's needs. Our team will help map relevant challenges and scenarios.",
      bullets: ["CyberXatria service information", "Security needs consultation", "Partnership discussion", "Follow-up from our team"],
      mapTitle: "PT Media Telekomunikasi Mandiri / MTM",
      mapAddress: "ITS Tower 6th Floor, Jl. Raya Pasar Minggu No. 18, RT.1/RW.1, Pejaten Timur, Ps. Minggu, South Jakarta City, DKI Jakarta 12510",
    },
  });

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="py-16 sm:py-20">
        <div className="page-grid grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"><span className="text-gradient">{copy.title}</span></h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">{copy.description}</p>
            <div className="mt-8 space-y-4">{copy.bullets.map((item) => <p key={item} className="flex items-center gap-3 text-base text-slate-700 dark:text-slate-300"><Check className="size-5 text-rose-500" />{item}</p>)}</div>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#090d15] dark:shadow-none">
              <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><MapPin className="size-5 text-rose-500" />{copy.mapTitle}</p>
              <p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">{copy.mapAddress}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#090d15] sm:p-8">
            <div className="grid size-14 place-items-center rounded-2xl bg-rose-50 dark:bg-rose-500/10">
              <WhatsAppIcon className="size-8 text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">{t({ id: "Hubungi Kami melalui WhatsApp", en: "Contact Us on WhatsApp" })}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{t({ id: "Diskusikan kebutuhan latihan, simulasi, dan layanan CyberXatria bersama tim kami melalui WhatsApp.", en: "Discuss your training, simulation, and CyberXatria service needs with our team on WhatsApp." })}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glow-button mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-center text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500">
              <WhatsAppIcon className="size-5 shrink-0" />
              {t({ id: "Chat melalui WhatsApp", en: "Chat on WhatsApp" })}
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

