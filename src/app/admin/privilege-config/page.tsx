import type { Metadata } from "next";
import { PortalShell } from "@/components/portal-shell";
import { PrivilegeConfigurationManagement } from "@/components/privilege-configuration-management";

export const metadata: Metadata = { title: "Privilege Configuration" };

export default function PrivilegeConfigurationPage() {
  return <PortalShell><PrivilegeConfigurationManagement /></PortalShell>;
}
