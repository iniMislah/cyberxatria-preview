"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export interface ComparisonPair {
  traditional: string;
  cyberxatria: string;
}

interface ApproachComparisonProps {
  traditionalTitle: string;
  cyberxatriaTitle: string;
  pairs: ComparisonPair[];
}

const NOTCH_RADIUS = 36;

function VsMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative grid place-items-center rounded-full bg-gradient-to-br from-fuchsia-400/60 via-rose-500 to-orange-400 p-[2px] shadow-[0_14px_34px_rgba(244,63,94,0.18)] ring-4 ring-rose-500/10 dark:shadow-[0_0_34px_rgba(244,63,94,0.22)] dark:ring-rose-500/20 ${
        compact ? "size-12" : "size-16"
      }`}
    >
      <div className="grid size-full place-items-center rounded-full bg-white/95 dark:bg-[#090d15]/95">
        <span className={`font-black tracking-[-0.08em] ${compact ? "text-lg" : "text-2xl"}`}>
          <span className="inline-block -translate-y-0.5 -rotate-3 text-rose-600 dark:text-rose-300">V</span>
          <span className="inline-block translate-y-1 skew-x-[-8deg] text-orange-500 dark:text-orange-300">S</span>
        </span>
      </div>
    </div>
  );
}

export function ApproachComparison({
  traditionalTitle,
  cyberxatriaTitle,
  pairs,
}: ApproachComparisonProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Desktop & Tablet: Symmetrical Two-Panel Infographic with Center Notches and Medallion */}
      <div className="relative hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {/* LEFT: PENDEKATAN TRADISIONAL */}
        <div className="relative h-full">
          <div
            className="h-full rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#090d15] p-7 sm:p-8 pr-12 lg:pr-14 flex flex-col justify-between shadow-sm dark:shadow-none"
            style={{
              WebkitMaskImage: `radial-gradient(circle ${NOTCH_RADIUS}px at 100% 50%, transparent ${NOTCH_RADIUS - 0.5}px, black ${NOTCH_RADIUS}px)`,
              maskImage: `radial-gradient(circle ${NOTCH_RADIUS}px at 100% 50%, transparent ${NOTCH_RADIUS - 0.5}px, black ${NOTCH_RADIUS}px)`,
            }}
          >
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
                {traditionalTitle}
              </h3>
              <div className="space-y-2.5">
                {pairs.map((pair, index) => {
                  const isHovered = hoveredIndex === index;
                  const isOtherHovered = hoveredIndex !== null && !isHovered;
                  return (
                    <div
                      key={pair.traditional}
                      tabIndex={0}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      className={`flex min-h-12 items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-default ${
                        isHovered
                          ? "bg-slate-100/90 dark:bg-white/[0.06] text-slate-900 dark:text-white"
                          : isOtherHovered
                          ? "opacity-60 text-slate-600 dark:text-slate-400"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <span
                        className={`size-5 shrink-0 rounded-full border grid place-items-center transition-colors ${
                          isHovered
                            ? "border-slate-400 bg-slate-200/80 dark:border-slate-500 dark:bg-white/15"
                            : "border-slate-300 dark:border-white/20 bg-slate-100/80 dark:bg-white/5"
                        }`}
                      >
                        <span className="size-1.5 rounded-full bg-slate-400 dark:bg-slate-400" />
                      </span>
                      <span className={`text-sm leading-5 ${isHovered ? "font-semibold" : ""}`}>
                        {pair.traditional}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Semicircular Notch Border on Right Edge */}
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-200/90 dark:text-white/10"
            width={NOTCH_RADIUS}
            height={NOTCH_RADIUS * 2}
            viewBox={`0 0 ${NOTCH_RADIUS} ${NOTCH_RADIUS * 2}`}
            fill="none"
            aria-hidden="true"
          >
            <path
              d={`M ${NOTCH_RADIUS - 0.5},0 A ${NOTCH_RADIUS - 0.5} ${NOTCH_RADIUS - 0.5} 0 0 0 ${NOTCH_RADIUS - 0.5},${NOTCH_RADIUS * 2}`}
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* RIGHT: PENDEKATAN CYBERXATRIA */}
        <div className="relative h-full">
          <div
            className="h-full rounded-3xl border border-rose-500/35 dark:border-rose-500/40 bg-gradient-to-br from-rose-500/[0.03] to-transparent dark:from-rose-500/[0.05] dark:to-transparent bg-white dark:bg-[#090d15] p-7 sm:p-8 pl-12 lg:pl-14 flex flex-col justify-between shadow-[0_0_40px_rgba(244,63,94,0.06)] dark:shadow-[0_0_40px_rgba(244,63,94,0.1)]"
            style={{
              WebkitMaskImage: `radial-gradient(circle ${NOTCH_RADIUS}px at 0% 50%, transparent ${NOTCH_RADIUS - 0.5}px, black ${NOTCH_RADIUS}px)`,
              maskImage: `radial-gradient(circle ${NOTCH_RADIUS}px at 0% 50%, transparent ${NOTCH_RADIUS - 0.5}px, black ${NOTCH_RADIUS}px)`,
            }}
          >
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-6">
                {cyberxatriaTitle}
              </h3>
              <div className="space-y-2.5">
                {pairs.map((pair, index) => {
                  const isHovered = hoveredIndex === index;
                  const isOtherHovered = hoveredIndex !== null && !isHovered;
                  return (
                    <div
                      key={pair.cyberxatria}
                      tabIndex={0}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      className={`flex min-h-12 items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-default ${
                        isHovered
                          ? "bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/25"
                          : isOtherHovered
                          ? "opacity-60 text-slate-800 dark:text-slate-200"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <span
                        className={`size-5 shrink-0 rounded-full grid place-items-center transition-colors ${
                          isHovered
                            ? "bg-rose-500 text-white ring-2 ring-rose-500/40"
                            : "bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 ring-1 ring-rose-500/30"
                        }`}
                      >
                        <Check className="size-3.5 stroke-[2.5]" />
                      </span>
                      <span className={`text-sm leading-5 ${isHovered ? "font-bold text-rose-600 dark:text-rose-300" : "font-medium"}`}>
                        {pair.cyberxatria}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Semicircular Notch Border on Left Edge */}
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none text-rose-500/35 dark:text-rose-500/40"
            width={NOTCH_RADIUS}
            height={NOTCH_RADIUS * 2}
            viewBox={`0 0 ${NOTCH_RADIUS} ${NOTCH_RADIUS * 2}`}
            fill="none"
            aria-hidden="true"
          >
            <path
              d={`M 0.5,0 A ${NOTCH_RADIUS - 0.5} ${NOTCH_RADIUS - 0.5} 0 0 1 0.5,${NOTCH_RADIUS * 2}`}
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Central Circular Comparison Medallion */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none"
          aria-hidden="true"
        >
          <VsMark />
        </div>
      </div>

      {/* Mobile View: Paired Vertical Stack Cards */}
      <div className="space-y-3.5 md:hidden">
        <div className="mb-4 flex justify-center" aria-hidden="true">
          <VsMark compact />
        </div>
        {pairs.map((pair, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={pair.traditional}
              tabIndex={0}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
              className={`overflow-hidden rounded-2xl border transition-all duration-200 bg-white dark:bg-[#090d15] p-4 shadow-sm ${
                isHovered
                  ? "border-rose-500/50 ring-1 ring-rose-500/20"
                  : "border-slate-200/90 dark:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3 pb-3 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-white/5">
                <span className="size-4 shrink-0 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 grid place-items-center">
                  <span className="size-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                </span>
                <span>{pair.traditional}</span>
              </div>
              <div className="flex items-center gap-3 pt-3 text-sm font-semibold text-slate-900 dark:text-white">
                <span className="size-4.5 shrink-0 rounded-full bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 ring-1 ring-rose-500/30 grid place-items-center">
                  <Check className="size-2.5 stroke-[2.5]" />
                </span>
                <span className="text-rose-600 dark:text-rose-400">{pair.cyberxatria}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
