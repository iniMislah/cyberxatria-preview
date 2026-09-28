import type { Metadata } from "next";
import { CompanyPageContent } from "@/components/company-page-content";

export const metadata: Metadata = { title: "Tentang Kami", description: "Kenali visi, misi, keahlian, dan pendekatan ketahanan siber CyberXatria." };

export default function CompanyPage() {
  return <CompanyPageContent />;
}
