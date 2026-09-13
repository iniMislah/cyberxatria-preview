"use client";

import { useCurrentUser } from "@/lib/current-user";

export function DashboardGreeting() {
  const { fullName } = useCurrentUser();

  return (
    <>
      <p className="text-sm font-semibold text-rose-400">Selamat datang kembali,</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
        {fullName} <span aria-hidden>👋</span>
      </h1>
    </>
  );
}
