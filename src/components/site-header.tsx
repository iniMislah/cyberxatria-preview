"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { usePublicPreferences, type Language } from "@/lib/public-preferences";
import { publicAsset } from "@/lib/asset-path";

type SolutionItem =
  | { href: string; label: string; comingSoon?: false }
  | { label: string; comingSoon: true };

const solutions: SolutionItem[] = [
  { href: "/solutions/cyber-drill", label: "Cyber Drill Exercise" },
  { href: "/solutions/tabletop", label: "Tabletop Exercise" },
  { label: "SOC AI", comingSoon: true },
];

function IndonesiaFlag() {
  return (
    <svg
      viewBox="0 0 18 12"
      width="18"
      height="12"
      className="inline-block shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] align-middle"
      aria-hidden="true"
    >
      <rect width="18" height="6" fill="#e11d48" />
      <rect y="6" width="18" height="6" fill="#ffffff" />
    </svg>
  );
}

function UKFlag() {
  const clipId = useId();
  return (
    <svg
      viewBox="0 0 60 40"
      width="18"
      height="12"
      className="inline-block shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] align-middle"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`${clipId}-t`}>
          <path d="M30 20h30v20zv20h-30zh-30v-20zv-20h30z" />
        </clipPath>
      </defs>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40m0-40L0 40" stroke="#ffffff" strokeWidth="8" />
      <path d="M0 0l60 40m0-40L0 40" clipPath={`url(#${clipId}-t)`} stroke="#c8102e" strokeWidth="5" />
      <path d="M30 0v40M0 20h60" stroke="#ffffff" strokeWidth="12" />
      <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="7" />
    </svg>
  );
}

const languageOptions: { code: Language; label: string; Flag: () => React.JSX.Element }[] = [
  { code: "id", label: "ID", Flag: IndonesiaFlag },
  { code: "en", label: "EN", Flag: UKFlag },
];

function LanguageSwitcher() {
  const { language, setLanguage } = usePublicPreferences();

  return (
    <div className="flex rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.03] p-1">
      {languageOptions.map(({ code, label, Flag }) => {
        const active = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-bold transition ${
              active
                ? "bg-rose-500 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
            }`}
            aria-pressed={active}
          >
            <Flag />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, t } = usePublicPreferences();

  const normalizedPath = pathname
    ? pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname
    : "/";

  const isHome = normalizedPath === "/" || normalizedPath === "";
  const isSolutions = normalizedPath.startsWith("/solutions");
  const isCompany = normalizedPath === "/company" || normalizedPath.startsWith("/company/");
  const isContact = normalizedPath === "/request-demo" || normalizedPath.startsWith("/request-demo/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = {
    home: t({ id: "Beranda", en: "Home Page" }),
    solutions: t({ id: "Solusi", en: "Solution" }),
    company: t({ id: "Tentang Kami", en: "About Us" }),
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

        <nav className="hidden items-center gap-8 font-sans text-sm font-medium leading-6 lg:flex">
          {/* Home Link */}
          <Link
            href="/"
            className={`relative py-1 transition duration-150 ${
              isHome
                ? "text-rose-600 dark:text-white font-semibold [text-shadow:0_0_10px_rgba(225,29,72,0.35)] dark:[text-shadow:0_0_12px_rgba(244,63,94,0.65)]"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {nav.home}
            {isHome && (
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* Solutions Dropdown */}
          <div className="group relative py-7">
            <button
              type="button"
              className={`relative flex items-center gap-1.5 py-1 transition duration-150 ${
                isSolutions
                  ? "text-rose-600 dark:text-white font-semibold [text-shadow:0_0_10px_rgba(225,29,72,0.35)] dark:[text-shadow:0_0_12px_rgba(244,63,94,0.65)]"
                  : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
              }`}
            >
              {nav.solutions} <ChevronDown className="size-4 transition group-hover:rotate-180" />
              {isSolutions && (
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                  aria-hidden="true"
                />
              )}
            </button>
            <div className="invisible absolute left-1/2 top-[66px] w-64 -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0a0f1d] p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 backdrop-blur-md">
              {solutions.map((item) => item.comingSoon ? (
                <button key={item.label} type="button" disabled className="flex w-full cursor-not-allowed items-center justify-between rounded-lg px-4 py-3 text-left text-slate-500 dark:text-slate-500">
                  <span>{item.label}</span>
                  <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:border-white/10 dark:text-slate-400">Coming Soon</span>
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-4 py-3 transition ${
                    normalizedPath === item.href
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Link */}
          <Link
            href="/company"
            className={`relative py-1 transition duration-150 ${
              isCompany
                ? "text-rose-600 dark:text-white font-semibold [text-shadow:0_0_10px_rgba(225,29,72,0.35)] dark:[text-shadow:0_0_12px_rgba(244,63,94,0.65)]"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {nav.company}
            {isCompany && (
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* Contact Link */}
          <Link
            href="/request-demo"
            className={`relative py-1 transition duration-150 ${
              isContact
                ? "text-rose-600 dark:text-white font-semibold [text-shadow:0_0_10px_rgba(225,29,72,0.35)] dark:[text-shadow:0_0_12px_rgba(244,63,94,0.65)]"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {nav.contact}
            {isContact && (
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                aria-hidden="true"
              />
            )}
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
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
            <Link
              onClick={() => setOpen(false)}
              href="/"
              className={`border-b py-3 font-medium transition-colors ${
                isHome
                  ? "border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold pl-3 border-l-2 border-l-rose-500 bg-rose-500/[0.04] dark:bg-rose-500/10 rounded-r-lg"
                  : "border-slate-100 dark:border-white/5 text-slate-800 dark:text-slate-200"
              }`}
            >
              {nav.home}
            </Link>
            <span className={`pt-4 text-xs font-bold uppercase tracking-widest ${isSolutions ? "text-rose-600 dark:text-rose-400" : "text-rose-500 dark:text-rose-400"}`}>
              {nav.solutions}
            </span>
            {solutions.map((item) => item.comingSoon ? (
              <button key={item.label} type="button" disabled className="flex cursor-not-allowed items-center justify-between border-b border-slate-100 py-3 pl-3 text-left text-slate-500 dark:border-white/5 dark:text-slate-500">
                <span>{item.label}</span>
                <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:border-white/10 dark:text-slate-400">Coming Soon</span>
              </button>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                key={item.href}
                href={item.href}
                className={`border-b py-3 pl-3 transition-colors ${
                  normalizedPath === item.href
                    ? "border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold border-l-2 border-l-rose-500 bg-rose-500/[0.04] dark:bg-rose-500/10 rounded-r-lg"
                    : "border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              onClick={() => setOpen(false)}
              href="/company"
              className={`border-b py-3 font-medium transition-colors ${
                isCompany
                  ? "border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold pl-3 border-l-2 border-l-rose-500 bg-rose-500/[0.04] dark:bg-rose-500/10 rounded-r-lg"
                  : "border-slate-100 dark:border-white/5 text-slate-800 dark:text-slate-200"
              }`}
            >
              {nav.company}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/request-demo"
              className={`border-b py-3 font-medium transition-colors ${
                isContact
                  ? "border-rose-500/30 text-rose-600 dark:text-rose-400 font-semibold pl-3 border-l-2 border-l-rose-500 bg-rose-500/[0.04] dark:bg-rose-500/10 rounded-r-lg"
                  : "border-slate-100 dark:border-white/5 text-slate-800 dark:text-slate-200"
              }`}
            >
              {nav.contact}
            </Link>
            <div className="mt-5 flex items-center justify-between gap-3">
              <LanguageSwitcher />
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
