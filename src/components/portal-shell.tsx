"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Boxes,
  Building2,
  Home,
  LifeBuoy,
  Layers3,
  LogOut,
  Menu,
  Network,
  ServerCog,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  AUTH_SESSION_KEY,
  clearAuthSession,
  defaultRouteForRole,
  useCurrentUser,
} from "@/lib/current-user";
import { identityApiRequest } from "@/lib/identity-api";

export function PortalShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const { fullName, initials, roleLabel, roleCode, effectiveRole, session, permissions } =
    useCurrentUser();
  const nav = useMemo(() => {
    if (roleCode === "SUPER_ADMIN") {
      return [
        { href: "/admin/channels", label: "Channel", icon: Network },
        { href: "/admin/companies", label: "Company", icon: Building2 },
        { href: "/admin/users", label: "User Management", icon: Users },
        {
          href: "/admin/admin-scopes",
          label: "Admin Scope",
          icon: ShieldCheck,
        },
        { href: "/admin/assets", label: "Asset Mapping", icon: ServerCog },
        ...(permissions.includes("feature.view") ? [{ href: "/admin/features", label: "Features & Plans", icon: Layers3 }] : []),
        ...(permissions.includes("entitlement.view") && permissions.includes("access_set.view") ? [{ href: "/admin/privilege-config", label: "Privilege Config", icon: Boxes }] : []),
      ];
    }
    if (roleCode === "ADMIN" && effectiveRole.adminScope === "CHANNEL") {
      return [
        { href: "/admin/channels", label: "Channel Saya", icon: Network },
        { href: "/admin/companies", label: "Company", icon: Building2 },
        { href: "/admin/users", label: "User Management", icon: Users },
        { href: "/admin/assets", label: "Asset Mapping", icon: ServerCog },
        ...(permissions.includes("feature.view") ? [{ href: "/admin/features", label: "Feature Catalog", icon: Layers3 }] : []),
        ...(permissions.includes("entitlement.view") && permissions.includes("access_set.view") ? [{ href: "/admin/privilege-config", label: "Privilege Config", icon: Boxes }] : []),
      ];
    }
    if (roleCode === "ADMIN" && effectiveRole.adminScope === "COMPANY") {
      return [
        { href: "/admin/companies", label: "Company Saya", icon: Building2 },
        { href: "/admin/users", label: "User Management", icon: Users },
        { href: "/admin/assets", label: "Asset Mapping", icon: ServerCog },
        ...(permissions.includes("feature.view") ? [{ href: "/admin/features", label: "Feature Catalog", icon: Layers3 }] : []),
        ...(permissions.includes("entitlement.view") && permissions.includes("access_set.view") ? [{ href: "/admin/privilege-config", label: "Privilege Config", icon: Boxes }] : []),
      ];
    }
    return [{ href: "/dashboard", label: "SOC Dashboard", icon: Home }];
  }, [effectiveRole.adminScope, permissions, roleCode]);

  const isAllowed = useMemo(() => {
    if (path.startsWith("/admin/channels")) {
      return (
        roleCode === "SUPER_ADMIN" ||
        (roleCode === "ADMIN" && effectiveRole.adminScope === "CHANNEL")
      );
    }
    if (path.startsWith("/admin/companies")) {
      return roleCode === "SUPER_ADMIN" || roleCode === "ADMIN";
    }
    if (path.startsWith("/admin/users")) {
      return roleCode === "SUPER_ADMIN" || roleCode === "ADMIN";
    }
    if (path.startsWith("/admin/admin-scopes")) {
      return roleCode === "SUPER_ADMIN";
    }
    if (path.startsWith("/admin/assets")) {
      return roleCode === "SUPER_ADMIN" || roleCode === "ADMIN";
    }
    if (path.startsWith("/admin/features")) {
      return permissions.includes("feature.view");
    }
    if (path.startsWith("/admin/privilege-config")) {
      return (
        permissions.includes("entitlement.view") &&
        permissions.includes("access_set.view")
      );
    }
    if (path === "/dashboard") return roleCode === "USER";
    return false;
  }, [effectiveRole.adminScope, path, permissions, roleCode]);

  useEffect(() => {
    if (!hydrated) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (!isAllowed) {
      router.replace(defaultRouteForRole(effectiveRole));
    }
  }, [effectiveRole, hydrated, isAllowed, router, session]);

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
    clearAuthSession();
  }
  if (!hydrated || !session || !isAllowed) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#03060d] text-sm text-slate-400">
        Memeriksa akses akun...
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#03060d] text-white">
      <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center border-b border-white/10 bg-[#050912]/95 px-4 backdrop-blur-xl lg:left-[254px] lg:px-7">
        <button
          onClick={() => setOpen(true)}
          className="mr-3 grid size-10 place-items-center rounded-lg border border-white/10 lg:hidden"
          aria-label="Buka navigasi"
        >
          <Menu />
        </button>
        <div className="relative hidden w-full max-w-sm sm:block">
          <input
            aria-label="Pencarian"
            className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.025] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-rose-500/50"
            placeholder="Cari layanan, laporan, atau fitur..."
          />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button
            aria-label="Notifikasi"
            className="relative grid size-10 place-items-center rounded-lg border border-white/10 text-slate-300"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{fullName}</p>
            <p className="text-xs text-slate-500">{roleLabel}</p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-700 to-red-500 text-sm font-bold">
            {initials}
          </span>
        </div>
      </header>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[254px] flex-col border-r border-white/10 bg-[#050912] transition-transform lg:z-30 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <Link href="/">
            <Image
              src="/images/cyberxatria-logo.png"
              alt="CyberXatria"
              width={426}
              height={114}
              className="h-auto w-44"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
            aria-label="Tutup navigasi"
          >
            <X />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
            Menu {roleLabel}
          </p>
          {nav.map((item) => {
            const active =
              path === item.href || path.startsWith(`${item.href}/`);
            return (
              <Link
                onClick={() => setOpen(false)}
                key={item.href}
                href={item.href}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${active ? "bg-gradient-to-r from-rose-600/25 to-transparent text-rose-300 ring-1 ring-inset ring-rose-500/30" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}
              >
                <item.icon className="size-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <LifeBuoy className="size-4 text-rose-400" />
              Butuh Bantuan?
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Tim kami siap membantu 24/7.
            </p>
            <a
              href="mailto:cyberxatria@snc.id"
              className="mt-3 block rounded-lg bg-rose-500/10 py-2 text-center text-xs font-semibold text-rose-400"
            >
              Hubungi Kami
            </a>
          </div>
          <Link
            href="/login"
            onClick={logout}
            className="flex items-center gap-3 px-3 py-3 text-sm text-slate-500 hover:text-white"
          >
            <LogOut className="size-4" />
            Keluar
          </Link>
          <button className="flex items-center gap-3 px-3 py-3 text-sm text-slate-500 hover:text-white">
            <Settings className="size-4" />
            Pengaturan
          </button>
        </div>
      </aside>
      {open && (
        <button
          aria-label="Tutup navigasi"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}
      <div className="min-h-screen pt-[72px] lg:pl-[254px]">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </main>
  );
}
