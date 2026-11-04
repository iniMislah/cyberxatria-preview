"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { homeFaq } from "@/lib/home-faq";
import { localePath, usePublicPreferences } from "@/lib/public-preferences";

export function HomeFaq() {
  const { language } = usePublicPreferences();
  const { lang } = useParams<{ lang?: string }>();
  // Use the static route locale before the preferences provider hydrates.
  const locale = lang === "id" || lang === "en" ? lang : language;
  const copy = homeFaq[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <section id="faq" aria-labelledby={`${id}-title`} className="border-y border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
      <div className="page-grid">
        <div className="mx-auto max-w-3xl">
          <h2 id={`${id}-title`} className="mb-8 text-center text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:mb-10 sm:text-4xl">
            {copy.title}
          </h2>
          <div className="divide-y divide-slate-200 dark:divide-white/10">
            {copy.entries.map((entry, index) => {
              const expanded = openIndex === index;
              const buttonId = `${id}-question-${index}`;
              const panelId = `${id}-answer-${index}`;

              return (
                <div key={buttonId}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(expanded ? null : index)}
                      className="flex w-full items-start justify-between gap-5 rounded-md py-5 text-left text-base font-semibold leading-7 text-slate-900 transition-colors hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500 dark:text-slate-100 dark:hover:text-rose-400 sm:text-lg"
                    >
                      <span>{entry.question}</span>
                      {expanded ? <Minus aria-hidden="true" className="mt-1 size-5 shrink-0 text-rose-600 dark:text-rose-400" /> : <Plus aria-hidden="true" className="mt-1 size-5 shrink-0 text-rose-600 dark:text-rose-400" />}
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!expanded}
                    inert={!expanded}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                        <p>{entry.answer}</p>
                        <Link href={localePath(entry.link.href, locale)} prefetch={false} className="mt-3 inline-block rounded-sm font-medium text-rose-700 underline decoration-rose-300 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500 dark:text-rose-400 dark:decoration-rose-500/40">
                          {entry.link.label}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
