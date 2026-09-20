"use client";

import { Layers3, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticatedIdentityRequest } from "@/lib/identity-api";
import { useCurrentUser } from "@/lib/current-user";

type Status = "active" | "disabled";
type Plan = { id: string; featureId: string; code: string; name: string; status: Status };
type Feature = {
  id: string;
  code: string;
  name: string;
  owningService: string | null;
  status: Status;
  plans: Plan[];
};

const fieldClass = "mt-2 h-11 border-white/10 bg-black/20 px-3 text-white";

export function FeatureCatalogManagement() {
  const { hasPermission } = useCurrentUser();
  const canManage = hasPermission("feature.manage");
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeatureId, setSelectedFeatureId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await authenticatedIdentityRequest<{ data: Feature[] }>("/features");
      setFeatures(result.data);
      setSelectedFeatureId((current) => current || result.data[0]?.id || "");
    } catch (caught) {
      setError(message(caught));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(id);
  }, [load]);

  async function createFeature(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await mutate("/features", "POST", {
      code: String(form.get("code") ?? "").trim().toLowerCase(),
      name: String(form.get("name") ?? "").trim(),
      owningService: String(form.get("owningService") ?? "").trim() || undefined,
    }, "Feature berhasil dibuat.", event.currentTarget);
  }

  async function createPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await mutate(`/features/${selectedFeatureId}/plans`, "POST", {
      code: String(form.get("code") ?? "").trim().toLowerCase(),
      name: String(form.get("name") ?? "").trim(),
    }, "Feature plan berhasil dibuat.", event.currentTarget);
  }

  async function toggleFeature(feature: Feature) {
    await mutate(`/features/${feature.id}`, "PATCH", {
      status: feature.status === "active" ? "disabled" : "active",
    }, `Feature ${feature.name} diperbarui.`);
  }

  async function togglePlan(feature: Feature, plan: Plan) {
    await mutate(`/features/${feature.id}/plans/${plan.id}`, "PATCH", {
      status: plan.status === "active" ? "disabled" : "active",
    }, `Plan ${plan.name} diperbarui.`);
  }

  async function mutate(path: string, method: string, body: unknown, success: string, form?: HTMLFormElement) {
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      await authenticatedIdentityRequest(path, { method, body: JSON.stringify(body) });
      form?.reset();
      setNotice(success);
      await load();
    } catch (caught) {
      setError(message(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1320px]">
      <div>
        <p className="eyebrow">Privilege catalog</p>
        <h1 className="mt-3 text-3xl font-bold">Features & Plans</h1>
        <p className="mt-2 text-sm text-slate-500">Definisikan produk dan paket yang dapat diberikan sebagai entitlement company.</p>
      </div>
      {error && <Feedback tone="error">{error}</Feedback>}
      {notice && <Feedback tone="success">{notice}</Feedback>}

      {canManage && (
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <form onSubmit={createFeature} className="cyber-card rounded-2xl p-5">
            <h2 className="font-bold">Create Feature</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Code" name="code" placeholder="soc" />
              <Field label="Name" name="name" placeholder="Security Operations Center" />
              <div className="sm:col-span-2"><Field label="Owning Service" name="owningService" placeholder="be_siem_report" required={false} /></div>
            </div>
            <Button type="submit" className="glow-button mt-4 h-10" disabled={submitting}><Plus /> Create Feature</Button>
          </form>
          <form onSubmit={createPlan} className="cyber-card rounded-2xl p-5">
            <h2 className="font-bold">Create Feature Plan</h2>
            <div className="mt-4">
              <Label htmlFor="plan-feature">Feature</Label>
              <select id="plan-feature" value={selectedFeatureId} onChange={(event) => setSelectedFeatureId(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white" required>
                <option value="">Pilih feature</option>
                {features.map((feature) => <option key={feature.id} value={feature.id}>{feature.name}</option>)}
              </select>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Plan Code" name="code" placeholder="premium" />
              <Field label="Plan Name" name="name" placeholder="Premium" />
            </div>
            <Button type="submit" className="glow-button mt-4 h-10" disabled={submitting || !selectedFeatureId}><Plus /> Create Plan</Button>
          </form>
        </div>
      )}

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.id} className="rounded-2xl border border-white/10 bg-[#090e18] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3"><span className="grid size-10 place-items-center rounded-lg bg-rose-500/10 text-rose-300"><Layers3 className="size-5" /></span><div><h2 className="font-bold">{feature.name}</h2><p className="text-xs text-slate-500">{feature.code} · {feature.owningService ?? "No owning service"}</p></div></div>
              {canManage && <Button variant="outline" size="sm" disabled={submitting} onClick={() => void toggleFeature(feature)}>{feature.status === "active" ? <ToggleRight /> : <ToggleLeft />}{feature.status}</Button>}
            </div>
            <div className="mt-5 space-y-2">
              {feature.plans.map((plan) => <div key={plan.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"><div><p className="font-semibold">{plan.name}</p><p className="text-xs text-slate-500">{plan.code}</p></div>{canManage ? <Button variant="ghost" size="sm" disabled={submitting} onClick={() => void togglePlan(feature, plan)}>{plan.status}</Button> : <Status value={plan.status} />}</div>)}
              {feature.plans.length === 0 && <p className="py-4 text-center text-sm text-slate-500">Belum ada plan.</p>}
            </div>
          </article>
        ))}
        {!loading && features.length === 0 && <p className="text-sm text-slate-500">Belum ada feature.</p>}
      </section>
    </div>
  );
}

function Field({ label, name, placeholder, required = true }: { label: string; name: string; placeholder: string; required?: boolean }) {
  return <div><Label htmlFor={`catalog-${name}`}>{label}</Label><Input id={`catalog-${name}`} name={name} placeholder={placeholder} required={required} className={fieldClass} /></div>;
}
function Status({ value }: { value: Status }) { return <span className={`rounded-full px-2.5 py-1 text-xs ${value === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>{value}</span>; }
function message(error: unknown) { return error instanceof Error ? error.message : "Terjadi kesalahan"; }
function Feedback({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) { return <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${tone === "error" ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}>{children}</div>; }
