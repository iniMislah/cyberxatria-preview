import type { Metadata } from "next";
import { PortalShell } from "@/components/portal-shell";
import { UserManagement } from "@/components/user-management";

export const metadata: Metadata = { title: "User Management" };

export default function UsersPage() {
  return (
    <PortalShell>
      <UserManagement />
    </PortalShell>
  );
}
