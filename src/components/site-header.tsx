"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePublicPreferences, type Language } from "@/lib/public-preferences";
import { publicAsset } from "@/lib/asset-path";

const solutions = [
  { href: "/solutions/soc", label: "SOC as a Service" },
  { href: "/solutions/cyber-drill", label: "Cyber Drill Exercise" },
  { href: "/solutions/tabletop", label: "Tabletop Exercise" },
];

const languageOptions: { code: Language; label: string }[] = [
  { code: "id", label: "\uD83C\uDDEE\uD83C\uDDE9 ID" },
  { code: "en", label: "\uD83C\uDDEC\uD83C\uDDE7 EN" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, theme, setTheme, t } = usePublicPreferences();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = {
    home: t({ id: "Beranda", en: "Home" }),
    solutions: t({ id: "Solusi", en: "Solutions" }),
    company: t({ id: "Perusahaan", en: "Company" }),
    contact: t({ id: "Kontak", en: "Contact" }),
    openMenu: t({ id: "Buka menu", en: "Open menu" }),
    closeMenu: t({ id: "Tutup menu", en: "Close menu" }),
    theme: theme === "dark" ? t({ id: "Aktifkan light mode", en: "Switch to light mode" }) : t({ id: "Aktifkan dark mode", en: "Switch to dark mode" }),
  };

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${scrolled ? "border-slate-200/90 dark:border-rose-500/25 bg-background/95 shadow-[0_10px_35px_rgba(15,23,42,0.06)] dark:shadow-[0_10px_40px_rgba(2,6,23,0.25)]" : "border-slate-200/70 dark:border-rose-500/15 bg-background/85"}`}>
      <div className="page-grid flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label={`CyberXatria ${nav.home}`} className="shrink-0">
          <Image src={publicAsset("/images/cyberxatria-logo.png")} alt="CyberXatria" width={426} height={114} className="brand-logo h-auto w-[190px] sm:w-[214px]" priority />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 dark:text-slate-300 lg:flex">
          <Link href="/" className="motion-link transition hover:text-rose-600 dark:hover:text-rose-400">{nav.home}</Link>
          <div className="group relative py-7">
            <button className="flex items-center gap-1.5 transition group-hover:text-rose-600 dark:group-hover:text-rose-400">
              {nav.solutions} <ChevronDown className="size-4 transition group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-[66px] w-64 -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0a0f1d] p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 backdrop-blur-md">
              {solutions.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/company" className="motion-link transition hover:text-rose-600 dark:hover:text-rose-400">{nav.company}</Link>
          <Link href="/request-demo" className="motion-link transition hover:text-rose-600 dark:hover:text-rose-400">{nav.contact}</Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.03] p-1">
            {languageOptions.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`h-9 rounded-md px-3 text-xs font-bold transition ${language === item.code ? "bg-rose-500 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"}`}
                aria-pressed={language === item.code}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={nav.theme}
            className="grid size-11 place-items-center rounded-lg border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-transparent text-slate-700 dark:text-slate-300 transition hover:border-rose-500/50 hover:text-rose-600 dark:hover:text-rose-400"
          >
            {theme === "dark" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </button>
        </div>

        <button onClick={() => setOpen((value) => !value)} aria-label={open ? nav.closeMenu : nav.openMenu} aria-expanded={open} className="grid size-11 place-items-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#090e18] px-5 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-xl flex-col">
            <Link onClick={() => setOpen(false)} href="/" className="border-b border-slate-100 dark:border-white/5 py-3 text-slate-800 dark:text-slate-200 font-medium">{nav.home}</Link>
            <span className="pt-4 text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">{nav.solutions}</span>
            {solutions.map((item) => (
              <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className="border-b border-slate-100 dark:border-white/5 py-3 pl-3 text-slate-700 dark:text-slate-300">{item.label}</Link>
            ))}
            <Link onClick={() => setOpen(false)} href="/company" className="border-b border-slate-100 dark:border-white/5 py-3 text-slate-800 dark:text-slate-200 font-medium">{nav.company}</Link>
            <Link onClick={() => setOpen(false)} href="/request-demo" className="border-b border-slate-100 dark:border-white/5 py-3 text-slate-800 dark:text-slate-200 font-medium">{nav.contact}</Link>
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.03] p-1">
                {languageOptions.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLanguage(item.code)}
                    className={`h-9 rounded-md px-3 text-xs font-bold transition ${language === item.code ? "bg-rose-500 text-white" : "text-slate-600 dark:text-slate-300"}`}
                    aria-pressed={language === item.code}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={nav.theme}
                className="grid size-10 place-items-center rounded-lg border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-transparent text-slate-700 dark:text-slate-300"
              >
                {theme === "dark" ? <Moon className="size-5" /> : <Sun className="size-5" />}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
