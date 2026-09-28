"use client";

import { Check, Clock3, Headphones } from "lucide-react";
import { RequestDemoForm } from "@/components/request-demo-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { usePublicPreferences } from "@/lib/public-preferences";

export function RequestDemoPageContent() {
  const { t } = usePublicPreferences();
  const copy = t({
    id: {
      eyebrow: "Kontak CyberXatria",
      title: "Kontak Kami",
      description: "Hubungi kami untuk informasi lebih lanjut, konsultasi, atau kerja sama.",
      bullets: ["Informasi layanan CyberXatria", "Konsultasi kebutuhan keamanan", "Diskusi kerja sama", "Tindak lanjut dari tim kami"],
      responseTitle: "Respons awal",
      responseText: "Tim akan menindaklanjuti pesan Anda",
      expertTitle: "Security Expert",
      expertText: "Pendamping konsultasi",
    },
    en: {
      eyebrow: "Contact CyberXatria",
      title: "Contact Us",
      description: "Contact us for more information, consultation, or partnership opportunities.",
      bullets: ["CyberXatria service information", "Security needs consultation", "Partnership discussion", "Follow-up from our team"],
      responseTitle: "Initial response",
      responseText: "Our team will follow up on your message",
      expertTitle: "Security Expert",
      expertText: "Consultation support",
    },
  });

  return (
    <main className="site-shell min-h-screen bg-[#03060d] text-white">
      <SiteHeader />
      <section className="py-20">
        <div className="page-grid grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
            <p className="mt-6 leading-7 text-slate-400">{copy.description}</p>
            <div className="mt-8 space-y-4">{copy.bullets.map((item) => <p key={item} className="flex items-center gap-3 text-sm text-slate-300"><Check className="size-5 text-rose-500" />{item}</p>)}</div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#090d15] p-4"><Clock3 className="size-6 text-rose-400" /><p className="mt-3 font-semibold">{copy.responseTitle}</p><p className="mt-1 text-xs text-slate-500">{copy.responseText}</p></div>
              <div className="rounded-xl border border-white/10 bg-[#090d15] p-4"><Headphones className="size-6 text-rose-400" /><p className="mt-3 font-semibold">{copy.expertTitle}</p><p className="mt-1 text-xs text-slate-500">{copy.expertText}</p></div>
            </div>
          </div>
          <RequestDemoForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

