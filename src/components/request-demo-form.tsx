"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePublicPreferences } from "@/lib/public-preferences";

type SelectOption = { value: string; label: string; searchText?: string };

const countryOptions = [
  { value: "Indonesia", label: "Indonesia", code: "+62" },
  { value: "Singapore", label: "Singapore", code: "+65" },
  { value: "Malaysia", label: "Malaysia", code: "+60" },
  { value: "Thailand", label: "Thailand", code: "+66" },
  { value: "Vietnam", label: "Vietnam", code: "+84" },
  { value: "Philippines", label: "Philippines", code: "+63" },
  { value: "Brunei", label: "Brunei", code: "+673" },
  { value: "Cambodia", label: "Cambodia", code: "+855" },
  { value: "Japan", label: "Japan", code: "+81" },
  { value: "South Korea", label: "South Korea", code: "+82" },
  { value: "China", label: "China", code: "+86" },
  { value: "Hong Kong", label: "Hong Kong", code: "+852" },
  { value: "Taiwan", label: "Taiwan", code: "+886" },
  { value: "India", label: "India", code: "+91" },
  { value: "United Arab Emirates", label: "United Arab Emirates", code: "+971" },
  { value: "Saudi Arabia", label: "Saudi Arabia", code: "+966" },
  { value: "Australia", label: "Australia", code: "+61" },
  { value: "New Zealand", label: "New Zealand", code: "+64" },
  { value: "United States", label: "United States", code: "+1" },
  { value: "Canada", label: "Canada", code: "+1" },
  { value: "United Kingdom", label: "United Kingdom", code: "+44" },
  { value: "Germany", label: "Germany", code: "+49" },
  { value: "France", label: "France", code: "+33" },
  { value: "Netherlands", label: "Netherlands", code: "+31" },
  { value: "Switzerland", label: "Switzerland", code: "+41" },
];

const phoneCodeOptions = countryOptions.map((country) => ({
  value: country.value,
  label: `${country.label} ${country.code}`,
  searchText: `${country.label} ${country.code}`,
}));

const dropdownScrollClass =
  "max-h-64 overflow-y-auto py-1 [scrollbar-color:rgba(148,163,184,0.65)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[scrollbar-color:rgba(148,163,184,0.35)_transparent] dark:[&::-webkit-scrollbar-thumb]:bg-white/20 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/30";

export function RequestDemoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState("Indonesia");
  const [interest, setInterest] = useState("");
  const [requestType, setRequestType] = useState("");
  const { language, t } = usePublicPreferences();
  const selectedPhoneCountry = countryOptions.find((option) => option.value === phoneCountry) ?? countryOptions[0];

  const copy = t({
    id: {
      namePlaceholder: "Nama Anda",
      companyPlaceholder: "Nama organisasi",
      emailPlaceholder: "nama@perusahaan.com",
      phonePlaceholder: "812-3456-7890",
      productPlaceholder: "Pilih produk / solusi",
      requestTypePlaceholder: "Pilih tipe permintaan",
      phoneSearchPlaceholder: "Cari negara atau kode",
      noOptions: "Tidak ada pilihan",
      messagePlaceholder: "Ceritakan kebutuhan atau konteks singkat",
      formTitle: "Form Kontak",
      labels: {
        name: "Nama Lengkap *",
        company: "Perusahaan / Organisasi *",
        email: "Email Bisnis *",
        phone: "Nomor Telepon",
        phoneCode: "Kode negara",
        product: "Produk / Solusi *",
        requestType: "Tipe Permintaan *",
        message: "Pesan / Kebutuhan",
      },
      productOptions: [
        { value: "Cyber Drill Exercise", label: "Cyber Drill Exercise" },
        { value: "Tabletop Exercise", label: "Tabletop Exercise" },
      ],
      requestTypeOptions: [
        { value: "Demo", label: "Demo" },
        { value: "Consultation", label: "Konsultasi" },
        { value: "Pricing", label: "Harga" },
      ],
      submit: "Kirim Permintaan",
      submitting: "Mengirim...",
      intro: "Lengkapi informasi di bawah ini. Pesan bersifat opsional.",
    },
    en: {
      namePlaceholder: "Your name",
      companyPlaceholder: "Organization name",
      emailPlaceholder: "name@company.com",
      phonePlaceholder: "812-3456-7890",
      productPlaceholder: "Select product / solution",
      requestTypePlaceholder: "Select request type",
      phoneSearchPlaceholder: "Search country or code",
      noOptions: "No options found",
      messagePlaceholder: "Share brief needs or context",
      formTitle: "Contact Form",
      labels: {
        name: "Full Name *",
        company: "Company / Organization *",
        email: "Business Email *",
        phone: "Phone Number",
        phoneCode: "Country code",
        product: "Product / Solution *",
        requestType: "Request Type *",
        message: "Message / Requirements",
      },
      productOptions: [
        { value: "Cyber Drill Exercise", label: "Cyber Drill Exercise" },
        { value: "Tabletop Exercise", label: "Tabletop Exercise" },
      ],
      requestTypeOptions: [
        { value: "Demo", label: "Demo" },
        { value: "Consultation", label: "Consultation" },
        { value: "Pricing", label: "Pricing" },
      ],
      submit: "Submit Request",
      submitting: "Sending...",
      intro: "Complete the information below. Message is optional.",
    },
  });
  const inputClass = "mt-2 h-12 border-slate-300 bg-white/70 px-4 text-slate-900 placeholder:text-slate-400 focus-visible:border-rose-500 focus-visible:ring-rose-500/20 dark:border-white/10 dark:bg-white/[0.025] dark:text-white";

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
    const phoneCountryCode = selectedPhoneCountry.code;
    const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
    const payload = {
      ...Object.fromEntries(formData.entries()),
      country: selectedPhoneCountry.value,
      phoneCountryCode,
      phone: phoneNumber ? `${phoneCountryCode} ${phoneNumber}` : "",
    };

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, language }),
      });

      if (!response.ok) throw new Error("Request demo submission failed");

      formRef.current?.reset();
      setPhoneCountry("Indonesia");
      setInterest("");
      setRequestType("");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="cyber-card rounded-3xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{copy.formTitle}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{copy.intro}</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="font-medium text-slate-800 dark:text-slate-200">{copy.labels.name}</Label>
          <Input id="name" name="name" required disabled={submitting} type="text" placeholder={copy.namePlaceholder} className={inputClass} />
        </div>
        <div>
          <Label htmlFor="company" className="font-medium text-slate-800 dark:text-slate-200">{copy.labels.company}</Label>
          <Input id="company" name="company" required disabled={submitting} type="text" placeholder={copy.companyPlaceholder} className={inputClass} />
        </div>
        <div>
          <Label htmlFor="email" className="font-medium text-slate-800 dark:text-slate-200">{copy.labels.email}</Label>
          <Input id="email" name="email" required disabled={submitting} type="email" placeholder={copy.emailPlaceholder} className={inputClass} />
        </div>
        <div>
          <Label htmlFor="phoneNumber" className="font-medium text-slate-800 dark:text-slate-200">{copy.labels.phone}</Label>
          <div className="mt-2 flex h-12 rounded-lg border border-slate-300 bg-white/70 transition-colors focus-within:border-rose-500 focus-within:ring-3 focus-within:ring-rose-500/20 dark:border-white/10 dark:bg-white/[0.025]">
            <CustomSelect
              name="phoneCountry"
              ariaLabel={copy.labels.phoneCode}
              value={phoneCountry}
              onChange={setPhoneCountry}
              options={phoneCodeOptions}
              disabled={submitting}
              searchPlaceholder={copy.phoneSearchPlaceholder}
              noOptionsText={copy.noOptions}
              searchable
              compact
            />
            <span className="my-2 w-px bg-slate-300 dark:bg-white/10" />
            <input id="phoneNumber" name="phoneNumber" disabled={submitting} type="tel" placeholder={copy.phonePlaceholder} className="h-full min-w-0 flex-1 rounded-r-lg border-0 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-70 dark:text-white" />
          </div>
          <input type="hidden" name="phoneCountryCode" value={selectedPhoneCountry.code} />
          <input type="hidden" name="country" value={selectedPhoneCountry.value} />
        </div>
        <div>
          <Label htmlFor="interest" className="font-medium text-slate-800 dark:text-slate-200">{copy.labels.product}</Label>
          <CustomSelect id="interest" name="interest" value={interest} onChange={setInterest} options={copy.productOptions} disabled={submitting} placeholder={copy.productPlaceholder} noOptionsText={copy.noOptions} required />
        </div>
        <div>
          <Label htmlFor="requestType" className="font-medium text-slate-800 dark:text-slate-200">{copy.labels.requestType}</Label>
          <CustomSelect id="requestType" name="requestType" value={requestType} onChange={setRequestType} options={copy.requestTypeOptions} disabled={submitting} placeholder={copy.requestTypePlaceholder} noOptionsText={copy.noOptions} required />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message" className="font-medium text-slate-800 dark:text-slate-200">{copy.labels.message}</Label>
          <textarea id="message" name="message" disabled={submitting} placeholder={copy.messagePlaceholder} rows={5} className="mt-2 min-h-32 w-full resize-y rounded-lg border border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus-visible:border-rose-500 focus-visible:ring-3 focus-visible:ring-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/[0.025] dark:text-white" />
        </div>
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
        {submitting ? copy.submitting : copy.submit} <Send className="size-4" />
      </Button>
    </form>
  );
}

function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  required,
  compact,
  ariaLabel,
  searchable,
  searchPlaceholder,
  noOptionsText = "No options found",
}: {
  id?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  compact?: boolean;
  ariaLabel?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  noOptionsText?: string;
}) {
  const generatedId = useId();
  const buttonId = id ?? generatedId;
  const listboxId = `${buttonId}-listbox`;
  const selected = options.find((option) => option.value === value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredOptions = searchable && query.trim()
    ? options.filter((option) => (option.searchText ?? option.label).toLowerCase().includes(query.trim().toLowerCase()))
    : options;
  const [activeIndex, setActiveIndex] = useState(Math.max(0, options.findIndex((option) => option.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  function commit(option: SelectOption) {
    onChange(option.value);
    setOpen(false);
    setQuery("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) {
        const option = filteredOptions[activeIndex];
        if (option) commit(option);
      } else {
        setOpen(true);
      }
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (filteredOptions.length === 0) return;
      setOpen(true);
      setActiveIndex((current) => {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + filteredOptions.length) % filteredOptions.length;
      });
    }
  }

  return (
    <div ref={rootRef} className={compact ? "relative h-full w-32 shrink-0" : "relative mt-2"}>
      <input name={name} value={selected?.value ?? value} required={required} readOnly className="sr-only" tabIndex={-1} />
      <button
        id={buttonId}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={handleKeyDown}
        className={`${compact ? "h-full rounded-l-lg border-0 bg-transparent px-3" : "h-12 w-full rounded-lg border border-slate-300 bg-white/70 px-4 hover:border-rose-500/50 focus-visible:border-rose-500 focus-visible:ring-3 focus-visible:ring-rose-500/20 dark:border-white/10 dark:bg-white/[0.025]"} flex items-center justify-between gap-2 text-left text-sm text-slate-900 outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-70 dark:text-white`}
      >
        <span className={`truncate ${selected ? "" : "text-slate-400"}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown className={`size-4 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={buttonId}
          className={`${compact ? "left-0 min-w-72" : "left-0 right-0"} absolute top-[calc(100%+0.35rem)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-xl shadow-slate-950/10 dark:border-white/10 dark:bg-[#090d15] dark:shadow-black/30`}
        >
          {searchable && (
            <div className="border-b border-slate-200 p-2 dark:border-white/10">
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder={searchPlaceholder}
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
              />
            </div>
          )}
          <div className={dropdownScrollClass}>
          {filteredOptions.map((option, index) => {
            const active = index === activeIndex;
            const selectedOption = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selectedOption}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(option)}
                className={`flex w-full items-center px-4 py-2.5 text-left transition-colors ${
                  active || selectedOption
                    ? "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                    : "text-slate-700 hover:bg-rose-500/10 hover:text-rose-700 dark:text-slate-200 dark:hover:text-rose-300"
                }`}
              >
                {option.label}
              </button>
            );
          })}
          {filteredOptions.length === 0 && <p className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{noOptionsText}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
