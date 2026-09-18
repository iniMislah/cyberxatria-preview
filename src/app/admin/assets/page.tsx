import type { Metadata } from "next";
import { AssetMappingManagement } from "@/components/asset-mapping-management";
import { PortalShell } from "@/components/portal-shell";

export const metadata: Metadata = { title: "Asset Mapping Management" };

export default function AssetsPage() {
  return (
    <PortalShell>
      <AssetMappingManagement />
    </PortalShell>
  );
}
