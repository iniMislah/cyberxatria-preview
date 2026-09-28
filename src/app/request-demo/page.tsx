import type { Metadata } from "next";
import { RequestDemoPageContent } from "@/components/request-demo-page-content";

export const metadata: Metadata = { title: "Kontak Kami" };

export default function RequestDemoPage() {
  return <RequestDemoPageContent />;
}
