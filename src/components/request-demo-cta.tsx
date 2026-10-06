"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { localePath, usePublicPreferences } from "@/lib/public-preferences";

type RequestDemoCtaProps = {
  children?: ReactNode;
  className?: string;
};

export function RequestDemoCta({ children = "Request Demo", className = "" }: RequestDemoCtaProps) {
  const { language } = usePublicPreferences();

  return (
    <Link
      href={localePath("/request-demo", language)}
      className={`glow-button inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-sm font-semibold text-white ${className}`}
    >
      <ShieldCheck className="size-4" />
      <span>{children}</span>
    </Link>
  );
}
