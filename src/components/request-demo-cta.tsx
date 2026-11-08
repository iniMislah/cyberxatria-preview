"use client";

import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { usePublicPreferences } from "@/lib/public-preferences";
import { WHATSAPP_URL } from "@/lib/contact-links";

type RequestDemoCtaProps = {
  children?: ReactNode;
  className?: string;
};

export function RequestDemoCta({ children, className = "" }: RequestDemoCtaProps) {
  const { language } = usePublicPreferences();
  const label = children ?? (language === "id" ? "Ajukan Demo" : "Request Demo");

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`glow-button inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-sm font-semibold text-white ${className}`}
    >
      <ShieldCheck className="size-4" />
      <span>{label}</span>
    </a>
  );
}
