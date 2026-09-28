"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePublicPreferences } from "@/lib/public-preferences";

export function RequestDemoForm() {
  const [sent, setSent] = useState(false);
  const { t } = usePublicPreferences();

  const fields = t({
    id: [
      { id: "name", label: "Nama Lengkap", placeholder: "Nama Anda", type: "text" },
      { id: "company", label: "Perusahaan / Organisasi", placeholder: "Nama organisasi", type: "text" },
      { id: "email", label: "Email Bisnis", placeholder: "nama@perusahaan.com", type: "email" },
      { id: "phone", label: "Nomor Telepon", placeholder: "+62 812-3456-7890", type: "tel" },
      { id: "country", label: "Negara Kantor Pusat", placeholder: "Indonesia", type: "text" },
      { id: "interest", label: "Solusi yang Diminati", placeholder: "SOC / Cyber Drill / Tabletop", type: "text" },
    ],
    en: [
      { id: "name", label: "Full Name", placeholder: "Your name", type: "text" },
      { id: "company", label: "Company / Organization", placeholder: "Organization name", type: "text" },
      { id: "email", label: "Business Email", placeholder: "name@company.com", type: "email" },
      { id: "phone", label: "Phone Number", placeholder: "+1 555-0123", type: "tel" },
      { id: "country", label: "HQ Country", placeholder: "United States", type: "text" },
      { id: "interest", label: "Solution of Interest", placeholder: "SOC / Cyber Drill / Tabletop", type: "text" },
    ],
  });

  if (sent) {
    return (
      <div className="cyber-card rounded-3xl p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto size-16 text-emerald-500 dark:text-emerald-400" />
        <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">{t({ id: "Pesan Anda Diterima", en: "Your Message Has Been Received" })}</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
          {t({
            id: "Tim CyberXatria akan menghubungi Anda untuk menindaklanjuti pesan tersebut.",
            en: "The CyberXatria team will contact you to follow up on your message.",
          })}
        </p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition">
          {t({ id: "Kirim pesan lain", en: "Send another message" })}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="cyber-card rounded-3xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t({ id: "Form Kontak", en: "Contact Form" })}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t({ id: "Lengkapi informasi di bawah ini. Seluruh kolom wajib diisi.", en: "Complete the information below. All fields are required." })}</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id} className="text-slate-800 dark:text-slate-200 font-medium">{field.label} *</Label>
            <Input id={field.id} required type={field.type} placeholder={field.placeholder} className="mt-2 h-12 border-slate-300 dark:border-white/10 bg-white/70 dark:bg-white/[0.025] text-slate-900 dark:text-white placeholder:text-slate-400 px-4 focus-visible:border-rose-500 focus-visible:ring-rose-500/20" />
          </div>
        ))}
      </div>
      <Button type="submit" className="glow-button mt-7 h-12 w-full rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2">
        {t({ id: "Kirim Pesan", en: "Send Message" })} <Send className="size-4" />
      </Button>
    </form>
  );
}
