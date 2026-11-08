import type { ReactNode } from "react";

export function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }];
}

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return children;
}
