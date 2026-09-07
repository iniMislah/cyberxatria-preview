import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://cyberxatria.workspace-133468.chatgpt.site",
  ),
  title: {
    default: "CyberXatria | Cyber Readiness & Security Operations",
    template: "%s | CyberXatria",
  },
  description:
    "Perkuat ketahanan siber organisasi melalui SOC, Cyber Drill Exercise, dan Tabletop Exercise yang terintegrasi.",
  openGraph: {
    title: "CyberXatria",
    description: "Deteksi Lebih Cepat. Respons Lebih Tepat. Tetap Terlindungi.",
    type: "website",
    locale: "id_ID",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "CyberXatria — Deteksi Lebih Cepat. Respons Lebih Tepat. Tetap Terlindungi." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberXatria",
    description: "Deteksi Lebih Cepat. Respons Lebih Tepat. Tetap Terlindungi.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="dark h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
