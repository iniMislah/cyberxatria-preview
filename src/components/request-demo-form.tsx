"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePublicPreferences } from "@/lib/public-preferences";

export function RequestDemoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { language, t } = usePublicPreferences();

  const fields = t({
    id: [
      { id: "name", label: "Nama Lengkap", placeholder: "Nama Anda", type: "text" },
      { id: "company", label: "Perusahaan / Organisasi", placeholder: "Nama organisasi", type: "text" },
      { id: "email", label: "Email Bisnis", placeholder: "nama@perusahaan.com", type: "email" },
      { id: "phone", label: "Nomor Telepon", placeholder: "+62 812-3456-7890", type: "tel" },
      { id: "country", label: "Negara Kantor Pusat", placeholder: "Indonesia", type: "text" },
      { id: "interest", label: "Solusi yang Diminati", placeholder: "SOC / Cyber Drill / Tabletop", type: "text" },
      { id: "message", label: "Pesan", placeholder: "Ceritakan kebutuhan atau konteks singkat", type: "textarea" },
    ],
    en: [
      { id: "name", label: "Full Name", placeholder: "Your name", type: "text" },
      { id: "company", label: "Company / Organization", placeholder: "Organization name", type: "text" },
      { id: "email", label: "Business Email", placeholder: "name@company.com", type: "email" },
      { id: "phone", label: "Phone Number", placeholder: "+1 555-0123", type: "tel" },
      { id: "country", label: "HQ Country", placeholder: "United States", type: "text" },
      { id: "interest", label: "Solution of Interest", placeholder: "SOC / Cyber Drill / Tabletop", type: "text" },
      { id: "message", label: "Message", placeholder: "Share brief needs or context", type: "textarea" },
    ],
  });

  if (sent) {
    return (
      <div className="cyber-card rounded-3xl p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto size-16 text-emerald-500 dark:text-emerald-400" />
        <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">{t({ id: "Pesan Anda Diterima", en: "Your Message Has Been Received" })}</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
          {t({
            id: "Permintaan demo berhasil dikirim. Silakan periksa email Anda untuk konfirmasi.",
            en: "Your demo request has been sent successfully. Please check your email for confirmation.",
          })}
        </p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition">
          {t({ id: "Kirim pesan lain", en: "Send another message" })}
        </button>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(false);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, language }),
      });

      if (!response.ok) throw new Error("Request demo submission failed");

      formRef.current?.reset();
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="cyber-card rounded-3xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t({ id: "Form Kontak", en: "Contact Form" })}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t({ id: "Lengkapi informasi di bawah ini. Pesan bersifat opsional.", en: "Complete the information below. Message is optional." })}</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
            <Label htmlFor={field.id} className="text-slate-800 dark:text-slate-200 font-medium">{field.label}{field.type !== "textarea" ? " *" : ""}</Label>
            {field.type === "textarea" ? (
              <textarea id={field.id} name={field.id} disabled={submitting} placeholder={field.placeholder} rows={5} className="mt-2 min-h-32 w-full resize-y rounded-lg border border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus-visible:border-rose-500 focus-visible:ring-3 focus-visible:ring-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/[0.025] dark:text-white" />
            ) : (
              <Input id={field.id} name={field.id} required disabled={submitting} type={field.type} placeholder={field.placeholder} className="mt-2 h-12 border-slate-300 dark:border-white/10 bg-white/70 dark:bg-white/[0.025] text-slate-900 dark:text-white placeholder:text-slate-400 px-4 focus-visible:border-rose-500 focus-visible:ring-rose-500/20" />
            )}
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {t({
            id: "Permintaan demo belum berhasil dikirim. Silakan coba kembali.",
            en: "Your demo request could not be sent. Please try again.",
          })}
        </p>
      )}
      <Button disabled={submitting} type="submit" className="glow-button mt-7 h-12 w-full rounded-lg text-sm font-semibold text-white inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70">
        {submitting ? t({ id: "Mengirim...", en: "Sending..." }) : t({ id: "Kirim Pesan", en: "Send Message" })} <Send className="size-4" />
      </Button>
    </form>
  );
}
