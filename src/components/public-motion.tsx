"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
}: {
  as?: "div" | "section";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setReady(true);
    setVisible(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${className}`}
      data-reveal-ready={ready}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function CountUpValue({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const number = Number(value.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(number) || number <= 0) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const duration = 950;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = number * eased;

        if (value.includes("US$")) setShown(`US$${current.toFixed(1)}M`);
        else if (value.includes("+")) setShown(formatLarge(value, Math.round(current)));
        else if (value.includes(",")) setShown(`${current.toFixed(1).replace(".", ",")}%`);
        else if (value.includes(".")) setShown(`${current.toFixed(1)}%`);
        else setShown(`${Math.round(current)}%`);

        if (progress < 1) requestAnimationFrame(tick);
        else setShown(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.35 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className={className}>{shown}</span>;
}

function formatLarge(template: string, value: number) {
  const separator = template.includes(".") ? "." : ",";
  return `${Math.min(value, 22000).toLocaleString("en-US").replaceAll(",", separator)}+`;
}

