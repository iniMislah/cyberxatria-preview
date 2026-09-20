import type { Metadata } from "next";
import { FeatureCatalogManagement } from "@/components/feature-catalog-management";
import { PortalShell } from "@/components/portal-shell";

export const metadata: Metadata = { title: "Features & Plans" };

export default function FeaturesPage() {
  return <PortalShell><FeatureCatalogManagement /></PortalShell>;
}
