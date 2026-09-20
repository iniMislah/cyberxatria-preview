"use client";

import { Boxes, Plus, ShieldCheck } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticatedIdentityRequest, type PaginatedResponse } from "@/lib/identity-api";
import { useCurrentUser } from "@/lib/current-user";

type Company = { id: string; code: string; name: string; status: string };
type Plan = { id: string; code: string; name: string; status: string };
type Feature = { id: string; code: string; name: string; status: string; plans: Plan[] };
type Entitlement = { id: string; companyId: string; status: string; startsAt: string | null; expiresAt: string | null; feature: Feature; featurePlan: Plan };
type Asset = { id: string; displayName: string | null; externalAssetId: string; assetType: string; metadata: { ip?: string } | null };
type AccessResource = { companyAssetId: string; companyAsset: Asset };
type AccessSet = { id: string; companyEntitlementId: string; name: string; description: string | null; resources: AccessResource[] };

const selectClass = "mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-rose-500/50";
const fieldClass = "mt-2 h-11 border-white/10 bg-black/20 px-3 text-white";

export function PrivilegeConfigurationManagement() {
  const { hasPermission } = useCurrentUser();
  const canManageEntitlement = hasPermission("entitlement.manage");
  const canManageAccessSet = hasPermission("access_set.manage");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [entitlementId, setEntitlementId] = useState("");
  const [accessSets, setAccessSets] = useState<AccessSet[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadCatalogs = useCallback(async () => {
    setLoading(true);
    try {
      const [companyResult, featureResult] = await Promise.all([
        authenticatedIdentityRequest<PaginatedResponse<Company>>("/companies?page=1&limit=100"),
        authenticatedIdentityRequest<{ data: Feature[] }>("/features"),
      ]);
      const activeCompanies = companyResult.data.filter((company) => company.status === "active");
      setCompanies(activeCompanies);
      setFeatures(featureResult.data);
      setCompanyId((current) => current || activeCompanies[0]?.id || "");
    } catch (caught) {
      setError(message(caught));
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCompany = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    setError("");
    try {
      const [entitlementResult, assetResult] = await Promise.all([
        authenticatedIdentityRequest<{ data: Entitlement[] }>(`/company-entitlements?companyId=${companyId}`),
        authenticatedIdentityRequest<PaginatedResponse<Asset>>(`/company-assets?companyId=${companyId}&page=1&limit=100`),
      ]);
      setEntitlements(entitlementResult.data);
      setAssets(assetResult.data);
      setEntitlementId((current) => entitlementResult.data.some((item) => item.id === current) ? current : entitlementResult.data[0]?.id || "");
    } catch (caught) {
      setError(message(caught));
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const loadAccessSets = useCallback(async () => {
    if (!entitlementId) { setAccessSets([]); return; }
    try {
      const result = await authenticatedIdentityRequest<{ data: AccessSet[] }>(`/access-sets?companyEntitlementId=${entitlementId}`);
      setAccessSets(result.data);
    } catch (caught) {
      setError(message(caught));
    }
  }, [entitlementId]);

  useEffect(() => { const id = window.setTimeout(() => void loadCatalogs(), 0); return () => window.clearTimeout(id); }, [loadCatalogs]);
  useEffect(() => { const id = window.setTimeout(() => void loadCompany(), 0); return () => window.clearTimeout(id); }, [loadCompany]);
  useEffect(() => { const id = window.setTimeout(() => void loadAccessSets(), 0); return () => window.clearTimeout(id); }, [loadAccessSets]);

  const activePlans = useMemo(() => features.flatMap((feature) => feature.status === "active" ? feature.plans.filter((plan) => plan.status === "active").map((plan) => ({ ...plan, featureName: feature.name })) : []), [features]);

  async function createEntitlement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await mutate("/company-entitlements", "POST", {
      companyId,
      featurePlanId: String(form.get("featurePlanId") ?? ""),
      startsAt: toIso(form.get("startsAt")),
      expiresAt: toIso(form.get("expiresAt")),
    }, "Entitlement company berhasil dibuat.", event.currentTarget, loadCompany);
  }

  async function createAccessSet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await mutate("/access-sets", "POST", {
      companyEntitlementId: entitlementId,
      name: String(form.get("name") ?? "").trim(),
      description: String(form.get("description") ?? "").trim() || undefined,
      companyAssetIds: selectedAssets,
    }, "Access set berhasil dibuat.", event.currentTarget, async () => { setSelectedAssets([]); await loadAccessSets(); });
  }

  async function mutate(path: string, method: string, body: unknown, success: string, form: HTMLFormElement, reload: () => Promise<void>) {
    setSubmitting(true); setError(""); setNotice("");
    try {
      await authenticatedIdentityRequest(path, { method, body: JSON.stringify(body) });
      form.reset(); setNotice(success); await reload();
    } catch (caught) { setError(message(caught)); }
    finally { setSubmitting(false); }
  }

  function toggleAsset(id: string) { setSelectedAssets((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]); }

  return (
    <div className="mx-auto max-w-[1320px]">
      <div><p className="eyebrow">Privilege provisioning</p><h1 className="mt-3 text-3xl font-bold">Entitlements & Access Sets</h1><p className="mt-2 text-sm text-slate-500">Aktifkan feature plan untuk company, lalu kelompokkan aset yang dapat diberikan ke user.</p></div>
      {error && <Feedback tone="error">{error}</Feedback>}{notice && <Feedback tone="success">{notice}</Feedback>}

      <section className="mt-7 rounded-2xl border border-white/10 bg-[#090e18] p-5">
        <Label htmlFor="config-company">Company</Label>
        <select id="config-company" value={companyId} onChange={(event) => { setCompanyId(event.target.value); setEntitlementId(""); setAccessSets([]); setSelectedAssets([]); }} className={`${selectClass} max-w-xl`}>
          <option value="">Pilih company</option>{companies.map((company) => <option key={company.id} value={company.id}>{company.name} ({company.code})</option>)}
        </select>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <section className="cyber-card rounded-2xl p-5">
          <div className="flex gap-3"><span className="grid size-10 place-items-center rounded-lg bg-rose-500/10 text-rose-300"><ShieldCheck className="size-5" /></span><div><h2 className="font-bold">Company Entitlements</h2><p className="text-xs text-slate-500">Feature plan aktif yang dimiliki company.</p></div></div>
          {canManageEntitlement && <form onSubmit={createEntitlement} className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><Label htmlFor="entitlement-plan">Feature Plan</Label><select id="entitlement-plan" name="featurePlanId" className={selectClass} required><option value="">Pilih plan</option>{activePlans.map((plan) => <option key={plan.id} value={plan.id}>{plan.featureName} — {plan.name}</option>)}</select></div>
            <DateField label="Mulai" name="startsAt" /><DateField label="Berakhir" name="expiresAt" />
            <Button type="submit" className="glow-button sm:col-span-2" disabled={submitting || !companyId}><Plus /> Add Entitlement</Button>
          </form>}
          <div className="mt-5 space-y-2">{entitlements.map((item) => <button type="button" key={item.id} onClick={() => setEntitlementId(item.id)} className={`w-full rounded-xl border p-4 text-left transition ${entitlementId === item.id ? "border-rose-500/40 bg-rose-500/10" : "border-white/10 bg-black/20 hover:border-white/20"}`}><div className="flex justify-between"><div><p className="font-semibold">{item.feature.name}</p><p className="text-xs text-slate-500">{item.featurePlan.name}</p></div><Status value={item.status} /></div></button>)}{!loading && entitlements.length === 0 && <p className="py-6 text-center text-sm text-slate-500">Belum ada entitlement.</p>}</div>
        </section>

        <section className="cyber-card rounded-2xl p-5">
          <div className="flex gap-3"><span className="grid size-10 place-items-center rounded-lg bg-fuchsia-500/10 text-fuchsia-300"><Boxes className="size-5" /></span><div><h2 className="font-bold">Access Sets</h2><p className="text-xs text-slate-500">Kelompok aset untuk entitlement yang dipilih.</p></div></div>
          {canManageAccessSet && <form onSubmit={createAccessSet} className="mt-5">
            <div className="grid gap-4 sm:grid-cols-2"><Field label="Name" name="name" placeholder="Server Production" /><Field label="Description" name="description" placeholder="Aset production Jakarta" required={false} /></div>
            <div className="mt-4"><Label>Company Assets</Label><div className="mt-2 max-h-56 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3">{assets.map((asset) => <label key={asset.id} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/[0.04]"><input type="checkbox" checked={selectedAssets.includes(asset.id)} onChange={() => toggleAsset(asset.id)} className="size-4 accent-rose-500" /><span><span className="block text-sm font-semibold">{asset.displayName ?? asset.externalAssetId}</span><span className="text-xs text-slate-500">{asset.metadata?.ip ?? asset.assetType}</span></span></label>)}{assets.length === 0 && <p className="py-4 text-center text-xs text-slate-500">Belum ada asset aktif untuk company.</p>}</div></div>
            <Button type="submit" className="glow-button mt-4 w-full" disabled={submitting || !entitlementId}><Plus /> Create Access Set</Button>
          </form>}
          <div className="mt-5 space-y-2">{accessSets.map((set) => <div key={set.id} className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex justify-between gap-3"><div><p className="font-semibold">{set.name}</p><p className="text-xs text-slate-500">{set.description ?? "Tanpa deskripsi"}</p></div><span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400">{set.resources.length} assets</span></div><div className="mt-3 flex flex-wrap gap-2">{set.resources.map((resource) => <span key={resource.companyAssetId} className="rounded-md bg-rose-500/10 px-2 py-1 text-xs text-rose-300">{resource.companyAsset.displayName ?? resource.companyAsset.externalAssetId}</span>)}</div></div>)}{entitlementId && accessSets.length === 0 && <p className="py-6 text-center text-sm text-slate-500">Belum ada access set.</p>}</div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, name, placeholder, required = true }: { label: string; name: string; placeholder: string; required?: boolean }) { return <div><Label htmlFor={`access-${name}`}>{label}</Label><Input id={`access-${name}`} name={name} placeholder={placeholder} required={required} className={fieldClass} /></div>; }
function DateField({ label, name }: { label: string; name: string }) { return <div><Label htmlFor={`entitlement-${name}`}>{label}</Label><Input id={`entitlement-${name}`} name={name} type="datetime-local" className={fieldClass} /></div>; }
function toIso(value: FormDataEntryValue | null) { const text = String(value ?? "").trim(); return text ? new Date(text).toISOString() : undefined; }
function message(error: unknown) { return error instanceof Error ? error.message : "Terjadi kesalahan"; }
function Status({ value }: { value: string }) { return <span className={`rounded-full px-2.5 py-1 text-xs ${value === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>{value}</span>; }
function Feedback({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) { return <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${tone === "error" ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}>{children}</div>; }
