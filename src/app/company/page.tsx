import type { Metadata } from "next";
import { CompanyPageContent } from "@/components/company-page-content";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali layanan, pengalaman, dan pendekatan kesiapan siber CyberXatria.",
};

export default function CompanyPage() {
  return <CompanyPageContent />;
}
