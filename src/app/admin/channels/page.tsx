import type { Metadata } from "next";
import { ChannelManagement } from "@/components/channel-management";
import { PortalShell } from "@/components/portal-shell";

export const metadata: Metadata = { title: "Channel Management" };

export default function ChannelsPage() {
  return (
    <PortalShell>
      <ChannelManagement />
    </PortalShell>
  );
}
