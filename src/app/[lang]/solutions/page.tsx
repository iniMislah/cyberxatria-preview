"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath, localePath } from "@/lib/public-preferences";

export default function LocaleSolutionsPage() {
  const pathname = usePathname();
  const language = getLocaleFromPath(pathname || "/") ?? "id";
  const href = localePath("/#solutions", language);

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main className="site-shell grid min-h-screen place-items-center bg-background px-6 text-center text-foreground">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-rose-500">CyberXatria</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Solutions</h1>
        <Link href={href} className="mt-6 inline-flex text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300">
          Back to solutions
        </Link>
      </div>
    </main>
  );
}
