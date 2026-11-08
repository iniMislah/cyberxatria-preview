"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePublicPreferences } from "@/lib/public-preferences";

export function ServiceScroll({ headingId, children }: { headingId: string; children: ReactNode }) {
  const { t } = usePublicPreferences();
  const railRef = useRef<HTMLDivElement>(null);
  const railId = `${headingId}-scroll`;
  const scroll = (direction: -1 | 1) => {
    const rail = railRef.current;
    const card = rail?.firstElementChild;
    if (!rail || !card) return;
    rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap)) });
  };

  return (
    <>
      <div className="mb-2 flex justify-end gap-2">
        <button type="button" aria-label={t({ id: "Layanan sebelumnya", en: "Previous service" })} aria-controls={railId} onClick={() => scroll(-1)} className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-rose-500 hover:text-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
        <button type="button" aria-label={t({ id: "Layanan berikutnya", en: "Next service" })} aria-controls={railId} onClick={() => scroll(1)} className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-rose-500 hover:text-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div id={railId} ref={railRef} role="region" aria-labelledby={headingId} tabIndex={0} className="grid min-w-0 snap-x snap-mandatory grid-flow-col auto-cols-[88%] gap-5 overflow-x-auto overscroll-x-contain scroll-smooth scroll-px-1 rounded-2xl px-1 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 motion-reduce:scroll-auto sm:auto-cols-[360px]">
        {children}
      </div>
    </>
  );
}
