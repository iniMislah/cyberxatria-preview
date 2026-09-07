"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogIn, Menu, UserPlus, X } from "lucide-react";
import { useState } from "react";

const solutions = [
  { href: "/solutions/soc", label: "SOC as a Service" },
  { href: "/solutions/cyber-drill", label: "Cyber Drill Exercise" },
  { href: "/solutions/tabletop", label: "Tabletop Exercise" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rose-500/15 bg-[#03060d]/88 backdrop-blur-xl">
      <div className="page-grid flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="CyberXatria Beranda" className="shrink-0">
          <Image
            src="/images/cyberxatria-logo.png"
            alt="CyberXatria"
            width={426}
            height={114}
            className="h-auto w-[190px] sm:w-[214px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 lg:flex">
          <Link href="/" className="transition hover:text-white">Beranda</Link>
          <div className="group relative py-7">
            <button className="flex items-center gap-1.5 transition group-hover:text-rose-400">
              Solusi <ChevronDown className="size-4 transition group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-[66px] w-64 -translate-x-1/2 translate-y-2 rounded-xl border border-white/10 bg-[#090d15] p-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {solutions.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-slate-300 hover:bg-rose-500/10 hover:text-rose-400">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/company" className="transition hover:text-white">Tentang Kami</Link>
          <Link href="/#contact" className="transition hover:text-white">Kontak</Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="inline-flex h-10 items-center gap-2 rounded-lg border border-rose-500/50 px-4 text-sm font-semibold text-white transition hover:bg-rose-500/10">
            <LogIn className="size-4" /> Masuk
          </Link>
          <Link href="/signup" className="glow-button inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-110">
            <UserPlus className="size-4" /> Buat akun
          </Link>
        </div>

        <button onClick={() => setOpen((value) => !value)} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} className="grid size-11 place-items-center rounded-lg border border-white/10 text-white lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#050913] px-5 pb-6 pt-3 lg:hidden">
          <div className="mx-auto flex max-w-xl flex-col">
            <Link onClick={() => setOpen(false)} href="/" className="border-b border-white/5 py-3">Beranda</Link>
            <span className="pt-4 text-xs font-bold uppercase tracking-widest text-rose-400">Solusi</span>
            {solutions.map((item) => (
              <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className="border-b border-white/5 py-3 pl-3 text-slate-300">{item.label}</Link>
            ))}
            <Link onClick={() => setOpen(false)} href="/company" className="border-b border-white/5 py-3">Tentang Kami</Link>
            <Link onClick={() => setOpen(false)} href="/#contact" className="border-b border-white/5 py-3">Kontak</Link>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link href="/login" className="inline-flex h-11 items-center justify-center rounded-lg border border-rose-500/50 font-semibold">Masuk</Link>
              <Link href="/signup" className="glow-button inline-flex h-11 items-center justify-center rounded-lg font-semibold">Buat akun</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
