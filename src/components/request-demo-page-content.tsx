"use client";

import { Check, MapPin } from "lucide-react";
import { RequestDemoForm } from "@/components/request-demo-form";
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
            <p className="mt-6 leading-7 text-slate-600 dark:text-slate-400">{copy.description}</p>
            <div className="mt-8 space-y-4">{copy.bullets.map((item) => <p key={item} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"><Check className="size-5 text-rose-500" />{item}</p>)}</div>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#090d15] dark:shadow-none">
              <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><MapPin className="size-5 text-rose-500" />{copy.mapTitle}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{copy.mapAddress}</p>
            </div>
          </div>
          <RequestDemoForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

