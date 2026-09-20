"use client";

import { ShieldCheck, Trash2 } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticatedIdentityRequest } from "@/lib/identity-api";

type Feature = { id: string; code: string; name: string };
type FeaturePlan = { id: string; code: string; name: string };
type Entitlement = {
  id: string;
  feature: Feature;
  featurePlan: FeaturePlan;
};
type AccessSet = { id: string; companyEntitlementId: string; name: string };
type Channel = { id: string; code: string; name: string };
type PrivilegeAssignment = {
  id: string;
  status: "active" | "ended";
  startsAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  companyEntitlement: Entitlement;
  channel: Channel | null;
  accessSet: AccessSet | null;
};
type PrivilegeOptions = {
  companyId: string;
  entitlements: Entitlement[];
  accessSets: AccessSet[];
  channels: Channel[];
};

const selectClass =
  "mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-rose-500/50";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}

function localDateTime(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text ? new Date(text).toISOString() : undefined;
}

export function UserPrivilegePanel({
  userId,
  canAssign,
  canRemove,
}: {
  userId: string;
  canAssign: boolean;
  canRemove: boolean;
}) {
  const [items, setItems] = useState<PrivilegeAssignment[]>([]);
  const [options, setOptions] = useState<PrivilegeOptions | null>(null);
  const [entitlementId, setEntitlementId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [assignments, available] = await Promise.all([
        authenticatedIdentityRequest<{ data: PrivilegeAssignment[] }>(
          `/users/${userId}/privileges`,
        ),
        authenticatedIdentityRequest<PrivilegeOptions>(
          `/users/${userId}/privileges/options`,
        ),
      ]);
      setItems(assignments.data);
      setOptions(available);
      setEntitlementId((current) => current || available.entitlements[0]?.id || "");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const availableAccessSets = useMemo(
    () =>
      options?.accessSets.filter(
        (accessSet) => accessSet.companyEntitlementId === entitlementId,
      ) ?? [],
    [entitlementId, options],
  );

  async function assign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      await authenticatedIdentityRequest(`/users/${userId}/privileges`, {
        method: "POST",
        body: JSON.stringify({
          companyEntitlementId: entitlementId,
          channelId: String(form.get("channelId") ?? "") || undefined,
          accessSetId: String(form.get("accessSetId") ?? "") || undefined,
          startsAt: localDateTime(form.get("startsAt")),
          expiresAt: localDateTime(form.get("expiresAt")),
        }),
      });
      event.currentTarget.reset();
      setNotice("Privilege berhasil diberikan.");
      await load();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(assignment: PrivilegeAssignment) {
    if (!window.confirm(`Cabut privilege ${assignment.companyEntitlement.feature.name}?`)) {
      return;
    }
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      await authenticatedIdentityRequest(
        `/users/${userId}/privileges/${assignment.id}`,
        { method: "DELETE" },
      );
      setNotice("Privilege berhasil dicabut.");
      await load();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-lg bg-rose-500/10 text-rose-300">
          <ShieldCheck className="size-5" />
        </div>
        <div>
          <h3 className="font-semibold">User Privileges</h3>
          <p className="text-xs text-slate-500">
            Akses fitur berasal dari entitlement company dan dapat dibatasi dengan access set.
          </p>
        </div>
      </div>

      {error && <Feedback tone="error">{error}</Feedback>}
      {notice && <Feedback tone="success">{notice}</Feedback>}

      {canAssign && options && (
        <form onSubmit={assign} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <Label htmlFor="privilege-entitlement">Feature & plan</Label>
            <select
              id="privilege-entitlement"
              value={entitlementId}
              onChange={(event) => setEntitlementId(event.target.value)}
              className={selectClass}
              required
            >
              {options.entitlements.length === 0 && (
                <option value="">Tidak ada entitlement aktif</option>
              )}
              {options.entitlements.map((entitlement) => (
                <option key={entitlement.id} value={entitlement.id}>
                  {entitlement.feature.name} — {entitlement.featurePlan.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="privilege-channel">Channel scope</Label>
            <select id="privilege-channel" name="channelId" className={selectClass}>
              <option value="">Semua channel company</option>
              {options.channels.map((channel) => (
                <option key={channel.id} value={channel.id}>{channel.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="privilege-access-set">Access set</Label>
            <select id="privilege-access-set" name="accessSetId" className={selectClass}>
              <option value="">Tanpa akses asset</option>
              {availableAccessSets.map((accessSet) => (
                <option key={accessSet.id} value={accessSet.id}>{accessSet.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="privilege-start">Mulai (optional)</Label>
            <Input id="privilege-start" name="startsAt" type="datetime-local" className="mt-2 h-11 border-white/10 bg-black/20" />
          </div>
          <div>
            <Label htmlFor="privilege-expiry">Berakhir (optional)</Label>
            <Input id="privilege-expiry" name="expiresAt" type="datetime-local" className="mt-2 h-11 border-white/10 bg-black/20" />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={submitting || !entitlementId} className="glow-button h-11 w-full">
              {submitting ? "Menyimpan..." : "Assign Privilege"}
            </Button>
          </div>
        </form>
      )}

      <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Feature</th>
              <th className="px-4 py-3">Scope</th>
              <th className="px-4 py-3">Access set</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((assignment) => (
              <tr key={assignment.id} className="border-t border-white/5">
                <td className="px-4 py-3">
                  <p className="font-semibold">{assignment.companyEntitlement.feature.name}</p>
                  <p className="text-xs text-slate-500">{assignment.companyEntitlement.featurePlan.name}</p>
                </td>
                <td className="px-4 py-3 text-slate-400">{assignment.channel?.name ?? "Semua channel"}</td>
                <td className="px-4 py-3 text-slate-400">{assignment.accessSet?.name ?? "Tanpa akses asset"}</td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {formatDate(assignment.startsAt)} — {formatDate(assignment.expiresAt)}
                </td>
                <td className="px-4 py-3"><StatusBadge status={assignment.status} /></td>
                <td className="px-4 py-3 text-right">
                  {canRemove && assignment.status === "active" && (
                    <Button variant="destructive" size="sm" disabled={submitting} onClick={() => void remove(assignment)}>
                      <Trash2 /> Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">Belum ada privilege.</td></tr>
            )}
            {loading && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">Memuat privilege...</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleString("id-ID") : "Tanpa batas";
}

function StatusBadge({ status }: { status: "active" | "ended" }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>
      {status}
    </span>
  );
}

function Feedback({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  return (
    <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${tone === "error" ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}>
      {children}
    </div>
  );
}
