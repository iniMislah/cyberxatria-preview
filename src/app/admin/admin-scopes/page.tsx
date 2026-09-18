import type { Metadata } from "next";
import { AdminScopeManagement } from "@/components/admin-scope-management";
import { PortalShell } from "@/components/portal-shell";

export const metadata: Metadata = { title: "Admin Scope Management" };

export default function AdminScopesPage() {
  return (
    <PortalShell>
      <AdminScopeManagement />
    </PortalShell>
  );
}
