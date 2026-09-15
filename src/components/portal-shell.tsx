"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CreditCard, FileText, Home, LifeBuoy, LogOut, Menu, Package, ReceiptText, Settings, ShieldCheck, Target, X } from "lucide-react";
import { useState } from "react";
import { AUTH_SESSION_KEY, useCurrentUser } from "@/lib/current-user";
import { identityApiRequest } from "@/lib/identity-api";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/solutions/soc", label: "SOC as a Service", icon: ShieldCheck },
  { href: "/solutions/cyber-drill", label: "Cyber Drill Exercise", icon: Target },
  { href: "/solutions/tabletop", label: "Tabletop Exercise", icon: Package },
  { href: "/request-demo", label: "Request Demo", icon: FileText },
  { href: "/pricing", label: "Pricing", icon: ReceiptText },
  { href: "/billing", label: "Billing & Subscription", icon: CreditCard },
];

export function PortalShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { fullName, initials, roleLabel } = useCurrentUser();

  function logout() {
    try {
      const session = JSON.parse(
        sessionStorage.getItem(AUTH_SESSION_KEY) ?? "null",
      ) as { accessToken?: string } | null;
      if (session?.accessToken) {
        void identityApiRequest("/authentication/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
      }
    } catch {
      // Local session is cleared even when its stored value is malformed.
    }
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }
  return <main className="min-h-screen bg-[#03060d] text-white">
    <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center border-b border-white/10 bg-[#050912]/95 px-4 backdrop-blur-xl lg:left-[254px] lg:px-7">
      <button onClick={() => setOpen(true)} className="mr-3 grid size-10 place-items-center rounded-lg border border-white/10 lg:hidden" aria-label="Buka navigasi"><Menu /></button>
      <div className="relative hidden w-full max-w-sm sm:block"><input aria-label="Pencarian" className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-rose-500/50" placeholder="Cari layanan, laporan, atau fitur..." /></div>
      <div className="ml-auto flex items-center gap-4"><button aria-label="Notifikasi" className="relative grid size-10 place-items-center rounded-lg border border-white/10 text-slate-300"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" /></button><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{fullName}</p><p className="text-xs text-slate-500">{roleLabel}</p></div><span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-700 to-red-500 text-sm font-bold">{initials}</span></div>
    </header>

    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[254px] flex-col border-r border-white/10 bg-[#050912] transition-transform lg:z-30 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5"><Link href="/"><Image src="/images/cyberxatria-logo.png" alt="CyberXatria" width={426} height={114} className="h-auto w-44" /></Link><button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Tutup navigasi"><X /></button></div>
      <nav className="flex-1 overflow-y-auto p-3"><p className="px-3 pb-2 pt-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">Solusi & Layanan</p>{nav.map(item => { const active = path === item.href; return <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${active ? "bg-gradient-to-r from-rose-600/25 to-transparent text-rose-300 ring-1 ring-inset ring-rose-500/30" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}><item.icon className="size-[18px]" />{item.label}</Link>; })}</nav>
      <div className="border-t border-white/10 p-3"><div className="mb-3 rounded-xl border border-white/10 bg-white/[0.025] p-4"><div className="flex items-center gap-2 text-sm font-semibold"><LifeBuoy className="size-4 text-rose-400" />Butuh Bantuan?</div><p className="mt-2 text-xs leading-5 text-slate-500">Tim kami siap membantu 24/7.</p><a href="mailto:cyberxatria@snc.id" className="mt-3 block rounded-lg bg-rose-500/10 py-2 text-center text-xs font-semibold text-rose-400">Hubungi Kami</a></div><Link href="/login" onClick={logout} className="flex items-center gap-3 px-3 py-3 text-sm text-slate-500 hover:text-white"><LogOut className="size-4" />Keluar</Link><button className="flex items-center gap-3 px-3 py-3 text-sm text-slate-500 hover:text-white"><Settings className="size-4" />Pengaturan</button></div>
    </aside>
    {open && <button aria-label="Tutup navigasi" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/70 lg:hidden" />}
    <div className="min-h-screen pt-[72px] lg:pl-[254px]"><div className="p-4 sm:p-6 lg:p-8">{children}</div></div>
  </main>;
}
