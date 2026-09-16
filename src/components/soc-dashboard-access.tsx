"use client";

import { Building2, ShieldAlert } from "lucide-react";
import { useCurrentUser } from "@/lib/current-user";

export function SocDashboardAccess({
  children,
}: {
  children: React.ReactNode;
}) {
  const { effectiveRole } = useCurrentUser();

  if (!effectiveRole.companyId) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-500/25 bg-[#090e18] p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-500/10 text-amber-300">
          <Building2 />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Menunggu assignment company</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
          Akun Anda sudah aktif dan dapat login, tetapi data SOC belum tersedia
          sampai Super Admin menetapkan company untuk akun ini.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-xs text-slate-400">
          <ShieldAlert className="size-4 text-amber-300" /> Akses API SOC juga
          tetap diblokir selama company belum ditetapkan.
        </div>
      </div>
    );
  }

  return children;
}
