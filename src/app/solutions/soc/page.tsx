"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicAsset } from "@/lib/asset-path";
import { getLocaleFromPath, localePath } from "@/lib/public-preferences";

export default function SocPage() {
  const pathname = usePathname();
  const language = getLocaleFromPath(pathname || "/") ?? "id";
  const solutionsHref = localePath("/#solutions", language);

  useEffect(() => {
    window.location.replace(publicAsset(solutionsHref));
  }, [solutionsHref]);

  return (
    <main className="site-shell grid min-h-screen place-items-center bg-background px-6 text-center text-foreground">
      <meta httpEquiv="refresh" content={`0;url=${publicAsset(solutionsHref)}`} />
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-rose-500">AI for SOC</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Coming Soon</h1>
        <Link href={solutionsHref} className="mt-6 inline-flex text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300">
          Back to solutions
        </Link>
      </div>
    </main>
  );
}
