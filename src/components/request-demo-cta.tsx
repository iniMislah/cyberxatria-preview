import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

type RequestDemoCtaProps = {
  children?: ReactNode;
  className?: string;
};

export function RequestDemoCta({ children = "Request Demo", className = "" }: RequestDemoCtaProps) {
  return (
    <Link
      href="/request-demo"
      className={`glow-button inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-sm font-semibold text-white ${className}`}
    >
      <ShieldCheck className="size-4" />
      <span>{children}</span>
    </Link>
  );
}
