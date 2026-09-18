"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Link2,
  Power,
  PowerOff,
  RefreshCw,
  Search,
  ServerCog,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/current-user";
import {
  authenticatedIdentityRequest,
  type PaginatedResponse,
} from "@/lib/identity-api";

type Company = { id: string; name: string; code: string; status: string };
type AssetStatus = "active" | "inactive";
type AssetMetadata = {
  ip?: string | null;
  agentId?: string | null;
  clientCode?: string | null;
  typeAgent?: string | null;
  sourceStatus?: string | null;
  os?: unknown;
  sourceUpdatedAt?: string | null;
};
type CompanyAsset = {
  id: string;
  companyId: string;
  assetType: string;
  sourceService: string;
  externalAssetId: string;
  displayName: string | null;
  status: AssetStatus;
  metadata: AssetMetadata | null;
  company: Company;
  createdAt: string;
  updatedAt: string;
};
type SiemAgent = {
  id: number;
  agentId: string | null;
  name: string | null;
  clientCode: string | null;
  typeAgent: string | null;
  ip: string | null;
  status: string | null;
  mapping: CompanyAsset | null;
};

const fieldClass =
  "h-11 border-white/10 bg-black/20 px-3 text-white placeholder:text-slate-600";
const selectClass =
  "h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-rose-500/50";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}

function agentLabel(agent: SiemAgent) {
  return agent.name || agent.ip || agent.agentId || `Agent ${agent.id}`;
}

export function AssetMappingManagement() {
  const { roleCode, effectiveRole } = useCurrentUser();
  const canMap =
    roleCode === "SUPER_ADMIN" ||
    (roleCode === "ADMIN" && effectiveRole.adminScope === "CHANNEL");
  const [assets, setAssets] = useState<CompanyAsset[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [agents, setAgents] = useState<SiemAgent[]>([]);
  const [selected, setSelected] = useState<CompanyAsset | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<SiemAgent | null>(null);
  const [mappingCompanyId, setMappingCompanyId] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [agentPage, setAgentPage] = useState(1);
  const [agentTotalPages, setAgentTotalPages] = useState(1);
  const [agentSearchInput, setAgentSearchInput] = useState("");
  const [agentSearch, setAgentSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [agentLoading, setAgentLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadAssets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        assetType: "siem_agent",
      });
      if (search) params.set("search", search);
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<CompanyAsset>
      >(`/company-assets?${params.toString()}`);
      setAssets(result.data);
      setTotal(result.meta.total);
      setTotalPages(Math.max(1, result.meta.totalPages));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  const loadCompanies = useCallback(async () => {
    try {
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<Company>
      >("/companies?page=1&limit=100");
      setCompanies(result.data.filter((item) => item.status === "active"));
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }, []);

  const loadAgents = useCallback(async () => {
    if (!canMap || !pickerOpen) return;
    setAgentLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(agentPage),
        limit: "8",
      });
      if (agentSearch) params.set("search", agentSearch);
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<SiemAgent>
      >(`/company-assets/siem-agents?${params.toString()}`);
      setAgents(result.data);
      setAgentTotalPages(Math.max(1, result.meta.totalPages));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setAgentLoading(false);
    }
  }, [agentPage, agentSearch, canMap, pickerOpen]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAssets();
      void loadCompanies();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadAssets, loadCompanies]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadAgents(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadAgents]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function submitAgentSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAgentPage(1);
    setAgentSearch(agentSearchInput.trim());
  }

  async function mapAgent() {
    if (!selectedAgent || !mappingCompanyId) {
      setError("Pilih Agent SIEM dan company tujuan terlebih dahulu.");
      return;
    }
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      await authenticatedIdentityRequest("/company-assets/siem-agents", {
        method: "POST",
        body: JSON.stringify({
          companyId: mappingCompanyId,
          agentRecordId: String(selectedAgent.id),
        }),
      });
      setNotice(`${agentLabel(selectedAgent)} berhasil dimapping ke company.`);
      setSelectedAgent(null);
      setMappingCompanyId("");
      await Promise.all([loadAssets(), loadAgents()]);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  async function updateAsset(
    asset: CompanyAsset,
    input: { companyId?: string; active?: boolean },
  ) {
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      const updated = input.companyId
        ? await authenticatedIdentityRequest<CompanyAsset>(
            `/company-assets/${asset.id}`,
            {
              method: "PATCH",
              body: JSON.stringify({ companyId: input.companyId }),
            },
          )
        : await authenticatedIdentityRequest<CompanyAsset>(
            `/company-assets/${asset.id}/${input.active ? "activate" : "deactivate"}`,
            { method: "PATCH" },
          );
      setSelected(updated);
      setNotice(
        input.companyId
          ? "Mapping company berhasil diperbarui."
          : `Asset berhasil ${input.active ? "diaktifkan" : "dinonaktifkan"}.`,
      );
      await loadAssets();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">SOC asset management</p>
          <h1 className="mt-3 text-3xl font-bold">Asset Mapping Management</h1>
          <p className="mt-2 text-sm text-slate-500">
            Kelola relasi IP Agent SIEM ke company tanpa mengubah data sumber Agent.
          </p>
        </div>
        {canMap && (
          <Button
            onClick={() => {
              setPickerOpen(true);
              setSelected(null);
            }}
            className="glow-button h-10 px-4"
          >
            <Link2 /> Map IP Agent
          </Button>
        )}
      </div>

      {roleCode === "ADMIN" && effectiveRole.adminScope === "COMPANY" && (
        <div className="mt-5 rounded-xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
          Company Admin memiliki akses view-only untuk asset pada company sendiri.
        </div>
      )}

      <form
        onSubmit={submitSearch}
        className="mt-7 flex gap-2 rounded-2xl border border-white/10 bg-[#090e18] p-4"
      >
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Cari nama agent, IP, ID agent, atau company..."
          className={fieldClass}
        />
        <Button type="submit" variant="outline" className="h-11 px-4">
          <Search /> Search
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label="Refresh mapping"
          onClick={() => void loadAssets()}
        >
          <RefreshCw />
        </Button>
      </form>

      {error && <Feedback tone="error">{error}</Feedback>}
      {notice && <Feedback tone="success">{notice}</Feedback>}

      {pickerOpen && canMap && (
        <section className="mt-5 rounded-2xl border border-rose-500/20 bg-[#090e18] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-bold">Map Agent SIEM</h2>
              <p className="mt-1 text-xs text-slate-500">
                Pilih satu IP Agent yang belum dimapping, lalu tentukan company.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Tutup Agent picker"
              onClick={() => setPickerOpen(false)}
            >
              <X />
            </Button>
          </div>
          <form onSubmit={submitAgentSearch} className="mt-5 flex gap-2">
            <Input
              value={agentSearchInput}
              onChange={(event) => setAgentSearchInput(event.target.value)}
              placeholder="Cari Agent SIEM berdasarkan nama, IP, atau Agent ID..."
              className={fieldClass}
            />
            <Button type="submit" variant="outline" className="h-11 px-4">
              <Search /> Search
            </Button>
          </form>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {agents.map((agent) => {
              const mapped = Boolean(agent.mapping);
              const active = selectedAgent?.id === agent.id;
              return (
                <button
                  key={agent.id}
                  type="button"
                  disabled={mapped}
                  onClick={() => setSelectedAgent(agent)}
                  className={`rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${active ? "border-rose-500 bg-rose-500/10" : "border-white/10 bg-black/20 hover:border-white/20"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{agentLabel(agent)}</p>
                      <p className="mt-1 font-mono text-xs text-slate-400">
                        {agent.ip || "IP tidak tersedia"}
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${mapped ? "bg-slate-500/10 text-slate-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                      {mapped ? `Mapped: ${agent.mapping?.company.name}` : "Available"}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Agent ID: {agent.agentId || agent.id} · {agent.typeAgent || "unknown type"}
                  </p>
                </button>
              );
            })}
            {!agentLoading && agents.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500 lg:col-span-2">
                Agent SIEM tidak ditemukan.
              </p>
            )}
            {agentLoading && (
              <p className="py-8 text-center text-sm text-slate-500 lg:col-span-2">
                Memuat katalog Agent SIEM...
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Button variant="outline" size="icon-sm" disabled={agentPage <= 1} onClick={() => setAgentPage((value) => value - 1)}><ChevronLeft /></Button>
              <span>Page {agentPage} / {agentTotalPages}</span>
              <Button variant="outline" size="icon-sm" disabled={agentPage >= agentTotalPages} onClick={() => setAgentPage((value) => value + 1)}><ChevronRight /></Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_auto] sm:items-end">
              <div>
                <Label htmlFor="mapping-company">Company tujuan</Label>
                <select id="mapping-company" value={mappingCompanyId} onChange={(event) => setMappingCompanyId(event.target.value)} className={`${selectClass} mt-2`}>
                  <option value="">Pilih company</option>
                  {companies.map((company) => <option key={company.id} value={company.id}>{company.name} ({company.code})</option>)}
                </select>
              </div>
              <Button onClick={() => void mapAgent()} disabled={submitting || !selectedAgent || !mappingCompanyId} className="glow-button h-11 px-5"><Link2 /> {submitting ? "Mapping..." : "Map Asset"}</Button>
            </div>
          </div>
        </section>
      )}

      {selected && (
        <section className="mt-5 rounded-2xl border border-rose-500/20 bg-[#090e18] p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-rose-500/10 text-rose-400"><ServerCog /></span><div><h2 className="font-bold">Asset Detail</h2><p className="text-xs text-slate-500">{selected.displayName}</p></div></div>
            <Button variant="ghost" size="icon" aria-label="Tutup detail" onClick={() => setSelected(null)}><X /></Button>
          </div>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <Detail label="IP Address" value={selected.metadata?.ip || "-"} mono />
            <Detail label="Agent ID" value={selected.metadata?.agentId || selected.externalAssetId} />
            <Detail label="Company" value={selected.company.name} />
            <Detail label="Mapping Status" value={selected.status} />
            <Detail label="Agent Type" value={selected.metadata?.typeAgent || "-"} />
            <Detail label="Client Code" value={selected.metadata?.clientCode || "-"} />
            <Detail label="Source Status" value={selected.metadata?.sourceStatus || "-"} />
            <Detail label="Source" value={selected.sourceService} />
          </dl>
          {canMap && (
            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row md:items-end">
              <div className="w-full md:max-w-sm">
                <Label htmlFor="detail-company">Assign Company</Label>
                <select id="detail-company" value={selected.companyId} className={`${selectClass} mt-2`} onChange={(event) => void updateAsset(selected, { companyId: event.target.value })} disabled={submitting}>
                  {companies.map((company) => <option key={company.id} value={company.id}>{company.name} ({company.code})</option>)}
                </select>
              </div>
              {selected.status === "active" ? (
                <Button variant="destructive" className="h-11 px-5" disabled={submitting} onClick={() => void updateAsset(selected, { active: false })}><PowerOff /> Deactivate Mapping</Button>
              ) : (
                <Button variant="outline" className="h-11 px-5" disabled={submitting} onClick={() => void updateAsset(selected, { active: true })}><Power /> Activate Mapping</Button>
              )}
            </div>
          )}
        </section>
      )}

      <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#090e18]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500">
              <tr><th className="px-5 py-4">IP Agent</th><th className="px-5 py-4">Agent ID</th><th className="px-5 py-4">Company</th><th className="px-5 py-4">Type</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Action</th></tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-4"><p className="font-semibold">{asset.displayName || "Unnamed Agent"}</p><p className="mt-1 font-mono text-xs text-slate-500">{asset.metadata?.ip || "IP unavailable"}</p></td>
                  <td className="px-5 py-4 text-slate-400">{asset.metadata?.agentId || asset.externalAssetId}</td>
                  <td className="px-5 py-4"><p className="font-semibold">{asset.company.name}</p><p className="mt-1 text-xs text-slate-500">{asset.company.code}</p></td>
                  <td className="px-5 py-4 text-slate-400">{asset.metadata?.typeAgent || "-"}</td>
                  <td className="px-5 py-4"><StatusBadge status={asset.status} /></td>
                  <td className="px-5 py-4 text-right"><Button variant="outline" size="sm" onClick={() => setSelected(asset)}><Eye /> View</Button></td>
                </tr>
              ))}
              {!loading && assets.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">Belum ada IP Agent yang dimapping.</td></tr>}
              {loading && <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-500">Memuat asset mapping...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-slate-500">
          <span>{total} mapped asset</span>
          <div className="flex items-center gap-2"><Button variant="outline" size="icon-sm" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft /></Button><span>Page {page} / {totalPages}</span><Button variant="outline" size="icon-sm" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}><ChevronRight /></Button></div>
        </div>
      </section>
    </div>
  );
}

function Detail({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div><dt className="text-slate-500">{label}</dt><dd className={`mt-1 break-all font-semibold ${mono ? "font-mono" : ""}`}>{value}</dd></div>;
}

function StatusBadge({ status }: { status: AssetStatus }) {
  const active = status === "active";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${active ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>{status}</span>;
}

function Feedback({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  return <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${tone === "error" ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}>{children}</div>;
}
