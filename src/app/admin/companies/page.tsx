import type { Metadata } from "next";
import { CompanyManagement } from "@/components/company-management";
import { PortalShell } from "@/components/portal-shell";

export const metadata: Metadata = { title: "Company Management" };

export default function CompaniesPage() {
  return (
    <PortalShell>
      <CompanyManagement />
    </PortalShell>
  );
}
