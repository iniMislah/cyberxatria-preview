"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { APP_VERSION } from "@/lib/app-version";
import { publicAsset } from "@/lib/asset-path";
import { localePath, usePublicPreferences } from "@/lib/public-preferences";

const footerIconClass =
  "grid size-12 shrink-0 place-items-center rounded-[13px] border border-rose-500/15 bg-white/45 text-rose-600 shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-[2px] transition group-hover:border-rose-500/25 group-hover:bg-white/55 dark:border-rose-200/10 dark:bg-white/[0.045] dark:text-rose-400 dark:group-hover:border-rose-300/20 dark:group-hover:bg-white/[0.07]";
const footerIconInnerClass =
  "grid size-full place-items-center rounded-[12px] transition";
const footerRowClass =
  "group flex items-center gap-3 py-2.5 text-sm text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white";
const socialIconClass =
  "grid size-11 place-items-center rounded-[13px] border border-rose-500/15 bg-white/45 text-rose-600 shadow-[0_4px_14px_rgba(15,23,42,0.04)] backdrop-blur-[2px] transition hover:border-rose-500/25 hover:bg-white/55 hover:text-orange-500 dark:border-rose-200/10 dark:bg-white/[0.045] dark:text-rose-400 dark:hover:border-rose-300/20 dark:hover:bg-white/[0.07] dark:hover:text-orange-300";

function FooterIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className={footerIconClass}>
      <span className={`${footerIconInnerClass} group-hover:text-orange-500 dark:group-hover:text-orange-300`}>
        <Icon className="size-5" />
      </span>
    </span>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.4" cy="7.6" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 9.5V18M6.5 6.4V6.5M10.2 18V9.5M10.2 13.25C10.2 11.15 11.45 9.35 13.75 9.35C16.05 9.35 17.5 10.85 17.5 13.65V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramSocialIcon() {
  return (
    <a href="#" aria-label="Instagram" className={socialIconClass}>
      <span className="grid size-full place-items-center rounded-[12px] transition">
        <InstagramIcon className="size-5" />
      </span>
    </a>
  );
}

function LinkedInSocialIcon() {
  return (
    <a href="#" aria-label="LinkedIn" className={socialIconClass}>
      <span className="grid size-full place-items-center rounded-[12px] transition">
        <LinkedInIcon className="size-5" />
      </span>
    </a>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-950 dark:text-white">{children}</h3>
      <span className="mt-2 block h-0.5 w-9 rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-orange-400" />
    </div>
  );
}

export function SiteFooter() {
  const { language, t } = usePublicPreferences();
  const href = (path: string) => localePath(path, language);
  const comingSoon = t({ id: "Coming Soon", en: "Coming Soon" });

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-slate-200 bg-white py-12 font-sans leading-6 transition-colors before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_18%_12%,rgba(244,63,94,0.08),transparent_30%),radial-gradient(circle_at_88%_86%,rgba(251,113,33,0.08),transparent_28%)] dark:border-white/10 dark:bg-[#02040a] dark:before:bg-[radial-gradient(circle_at_18%_12%,rgba(244,63,94,0.12),transparent_30%),radial-gradient(circle_at_85%_92%,rgba(190,18,60,0.14),transparent_28%),radial-gradient(circle_at_55%_100%,rgba(168,85,247,0.08),transparent_24%)]"
    >
      <div className="page-grid relative grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:gap-12 xl:gap-14">
        <div>
          <Image src={publicAsset("/images/cyberxatria-logo.png")} alt="CyberXatria" width={426} height={114} className="brand-logo mb-5 h-auto w-48" />
          <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
            {t({
              id: "Platform cybersecurity terintegrasi untuk membantu organisasi mempersiapkan diri, mendeteksi ancaman, dan merespons insiden.",
              en: "An integrated cybersecurity platform that helps organizations prepare, detect threats, and respond to incidents.",
            })}
          </p>
          <div className="mt-6 flex gap-3">
            <InstagramSocialIcon />
            <LinkedInSocialIcon />
          </div>
        </div>

        <div>
          <FooterHeading>{t({ id: "Solusi", en: "Solution" })}</FooterHeading>
          <div className="space-y-2">
            <Link className={footerRowClass} href={href("/solutions/cyber-drill")}>
              <FooterIcon Icon={ShieldCheck} />
              <span className="min-w-0 flex-1">Cyber Drill Exercise</span>
              <ChevronRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-rose-500 dark:text-slate-500" />
            </Link>
            <Link className={footerRowClass} href={href("/solutions/tabletop")}>
              <FooterIcon Icon={UsersRound} />
              <span className="min-w-0 flex-1">Tabletop Exercise</span>
              <ChevronRight className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-rose-500 dark:text-slate-500" />
            </Link>
            <span className="flex cursor-not-allowed items-center gap-3 py-2.5 text-sm text-slate-500 dark:text-slate-500">
              <span className={footerIconClass}>
                <span className={footerIconInnerClass}>
                  <Clock3 className="size-5" />
                </span>
              </span>
              <span className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="whitespace-nowrap">AI for SOC</span>
                <span className="rounded-md border border-rose-500/25 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-600 dark:border-white/10 dark:text-rose-400">
                  {comingSoon}
                </span>
              </span>
            </span>
          </div>
        </div>

        <div>
          <FooterHeading>{t({ id: "Company", en: "Company" })}</FooterHeading>
          <div className="space-y-2">
            <Link className={footerRowClass} href={href("/company")}>
              <FooterIcon Icon={Building2} />
              <span className="min-w-0 flex-1">{t({ id: "Tentang Kami", en: "About Us" })}</span>
            </Link>
            <Link className={footerRowClass} href={href("/request-demo")}>
              <FooterIcon Icon={MessageSquareText} />
              <span className="min-w-0 flex-1">Request Demo</span>
            </Link>
          </div>
        </div>

        <div>
          <FooterHeading>{t({ id: "Contact", en: "Contact" })}</FooterHeading>
          <div className="divide-y divide-slate-200/70 dark:divide-white/8">
            <a className={footerRowClass} href="mailto:admin@cyberxatria.id">
              <FooterIcon Icon={Mail} />
              <span className="break-all">admin@cyberxatria.id</span>
            </a>
            <a className={footerRowClass} href="tel:+628575365051">
              <FooterIcon Icon={Phone} />
              <span>+62 857-0536-5051</span>
            </a>
            <p className="flex items-center gap-3 py-2.5 text-sm text-slate-700 dark:text-slate-300">
              <span className={footerIconClass}>
                <span className={footerIconInnerClass}>
                  <MapPin className="size-5" />
                </span>
              </span>
              <span>Jakarta, Indonesia</span>
            </p>
          </div>
        </div>
      </div>

      <div className="page-grid relative mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/8">
        <p>&copy; 2026 CyberXatria. {t({ id: "Semua hak dilindungi.", en: "All rights reserved." })} &middot; v{APP_VERSION}</p>
        <div className="flex gap-5">
          <a href="#" className="transition hover:text-rose-600 dark:hover:text-rose-400">{t({ id: "Kebijakan Privasi", en: "Privacy Policy" })}</a>
          <a href="#" className="transition hover:text-rose-600 dark:hover:text-rose-400">{t({ id: "Syarat & Ketentuan", en: "Terms & Conditions" })}</a>
        </div>
      </div>
    </footer>
  );
}
