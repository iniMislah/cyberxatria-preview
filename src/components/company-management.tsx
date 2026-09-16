"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  Power,
  PowerOff,
  Search,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  authenticatedIdentityRequest,
  type PaginatedResponse,
} from "@/lib/identity-api";
import { useCurrentUser } from "@/lib/current-user";

type ResourceStatus = "active" | "suspended" | "disabled";
type LinkStatus = "active" | "inactive";

type Channel = {
  id: string;
  code: string;
  name: string;
  status: ResourceStatus;
};

type CompanyChannelLink = {
  channelId: string;
  status: LinkStatus;
  linkedAt?: string;
  channel?: Channel;
};

type Company = {
  id: string;
  code: string;
  name: string;
  status: ResourceStatus;
  parentId?: string | null;
  channelLinks?: CompanyChannelLink[];
  channels?: Channel[];
  createdAt: string;
  updatedAt: string;
};

const fieldClass =
  "h-11 border-white/10 bg-black/20 px-3 text-white placeholder:text-slate-600";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}

export function CompanyManagement() {
  const { roleCode, effectiveRole } = useCurrentUser();
  const isSuperAdmin = roleCode === "SUPER_ADMIN";
  const isChannelAdmin =
    roleCode === "ADMIN" && effectiveRole.adminScope === "CHANNEL";
  const canCreate = isSuperAdmin || isChannelAdmin;
  const canEdit = isSuperAdmin || isChannelAdmin;
  const canChangeAvailability = isSuperAdmin || isChannelAdmin;
  const [items, setItems] = useState<Company[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<Company | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) params.set("search", search);
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<Company>
      >(`/companies?${params.toString()}`);
      setItems(result.data);
      setTotal(result.meta.total);
      setTotalPages(Math.max(1, result.meta.totalPages));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  const loadChannels = useCallback(async () => {
    if (!canCreate) return;
    try {
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<Channel>
      >("/channels?page=1&limit=100");
      setChannels(result.data.filter((channel) => channel.status === "active"));
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }, [canCreate]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadChannels(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadChannels]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  async function openDetail(id: string) {
    setError("");
    try {
      setSelected(
        await authenticatedIdentityRequest<Company>(`/companies/${id}`),
      );
      setFormMode(null);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formMode) return;
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        code: String(form.get("code") ?? "")
          .trim()
          .toLowerCase(),
        name: String(form.get("name") ?? "").trim(),
      };
      if (formMode === "create") {
        const channelId = isChannelAdmin
          ? effectiveRole.channelId
          : String(form.get("channelId") ?? "");
        if (!channelId) throw new Error("Pilih channel untuk company");
        payload.channelIds = [channelId];
        await authenticatedIdentityRequest<Company>("/companies", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      } else if (selected) {
        await authenticatedIdentityRequest<Company>(
          `/companies/${selected.id}`,
          {
            method: "PATCH",
            body: JSON.stringify(payload),
          },
        );
      }
      setFormMode(null);
      setSelected(null);
      await load();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  async function setAvailability(company: Company, active: boolean) {
    setSubmitting(true);
    setError("");
    try {
      await authenticatedIdentityRequest<Company>(
        `/companies/${company.id}/${active ? "activate" : "deactivate"}`,
        { method: "PATCH" },
      );
      if (selected?.id === company.id) setSelected(null);
      await load();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  function scopedStatus(company: Company) {
    if (!isChannelAdmin) return company.status;
    return (
      company.channelLinks?.find(
        (link) => link.channelId === effectiveRole.channelId,
      )?.status ?? "inactive"
    );
  }

  return (
    <div className="mx-auto max-w-[1320px]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Directory management</p>
          <h1 className="mt-3 text-3xl font-bold">Company</h1>
          <p className="mt-2 text-sm text-slate-500">
            {isSuperAdmin
              ? "Kelola seluruh company dan status globalnya."
              : isChannelAdmin
                ? "Kelola company dalam channel Anda. Aktivasi hanya mengubah relasi pada channel ini."
                : "Lihat informasi company yang menjadi scope akun Anda."}
          </p>
        </div>
        {canCreate && (
          <Button
            onClick={() => {
              setSelected(null);
              setFormMode("create");
            }}
            className="glow-button h-10 px-4"
          >
            <Plus /> Tambah Company
          </Button>
        )}
      </div>

      <form
        onSubmit={submitSearch}
        className="mt-7 flex gap-2 rounded-2xl border border-white/10 bg-[#090e18] p-4"
      >
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Cari nama atau code company..."
          className={fieldClass}
        />
        <Button type="submit" variant="outline" className="h-11 px-4">
          <Search /> Cari
        </Button>
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {(formMode || selected) && (
        <section className="mt-5 rounded-2xl border border-rose-500/20 bg-[#090e18] p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              {formMode === "create"
                ? "Create Company"
                : formMode === "edit"
                  ? "Update Company"
                  : "Detail Company"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Tutup panel"
              onClick={() => {
                setFormMode(null);
                setSelected(null);
              }}
            >
              <X />
            </Button>
          </div>
          {formMode ? (
            <form onSubmit={save} className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="company-code">Code</Label>
                <Input
                  id="company-code"
                  name="code"
                  defaultValue={selected?.code}
                  required
                  pattern="[a-z0-9][a-z0-9_-]{1,62}"
                  className={`${fieldClass} mt-2`}
                />
              </div>
              <div>
                <Label htmlFor="company-name">Nama Company</Label>
                <Input
                  id="company-name"
                  name="name"
                  defaultValue={selected?.name}
                  required
                  maxLength={150}
                  className={`${fieldClass} mt-2`}
                />
              </div>
              {formMode === "create" && isSuperAdmin && (
                <div className="md:col-span-2">
                  <Label htmlFor="company-channel">Channel</Label>
                  <select
                    id="company-channel"
                    name="channelId"
                    required
                    defaultValue=""
                    className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-[#070b13] px-3 text-sm text-white outline-none focus:border-rose-500/60"
                  >
                    <option value="" disabled>
                      Pilih channel
                    </option>
                    {channels.map((channel) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.name} ({channel.code})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {formMode === "create" && isChannelAdmin && (
                <p className="md:col-span-2 text-xs text-slate-500">
                  Company otomatis dihubungkan hanya ke channel scope akun Anda.
                </p>
              )}
              <div className="flex gap-2 md:col-span-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="glow-button h-10 px-5"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 px-5"
                  onClick={() => setFormMode(null)}
                >
                  Batal
                </Button>
              </div>
            </form>
          ) : selected ? (
            <div className="mt-5">
              <dl className="grid gap-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-slate-500">Code</dt>
                  <dd className="mt-1 font-semibold">{selected.code}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Nama</dt>
                  <dd className="mt-1 font-semibold">{selected.name}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Status Global</dt>
                  <dd className="mt-1">
                    <StatusBadge status={selected.status} />
                  </dd>
                </div>
                {isChannelAdmin && (
                  <div>
                    <dt className="text-slate-500">Status di Channel</dt>
                    <dd className="mt-1">
                      <StatusBadge status={scopedStatus(selected)} />
                    </dd>
                  </div>
                )}
              </dl>
              {(isSuperAdmin || isChannelAdmin) &&
                selected.channelLinks &&
                selected.channelLinks.length > 0 && (
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Relasi Channel
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selected.channelLinks.map((link) => (
                        <span
                          key={link.channelId}
                          className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-300"
                        >
                          {link.channel?.name ?? link.channelId} · {link.status}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : null}
        </section>
      )}

      <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#090e18]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Code</th>
                <th className="px-5 py-4">Global</th>
                {isChannelAdmin && <th className="px-5 py-4">Pada Channel</th>}
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((company) => {
                const availability = scopedStatus(company);
                const activeForAction = availability === "active";
                return (
                  <tr
                    key={company.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-5 py-4 font-semibold">{company.name}</td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">
                      {company.code}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={company.status} />
                    </td>
                    {isChannelAdmin && (
                      <td className="px-5 py-4">
                        <StatusBadge status={availability} />
                      </td>
                    )}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => void openDetail(company.id)}
                        >
                          <Eye /> View
                        </Button>
                        {canEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelected(company);
                              setFormMode("edit");
                            }}
                          >
                            <Pencil /> Update
                          </Button>
                        )}
                        {canChangeAvailability &&
                          (activeForAction ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={submitting}
                              onClick={() =>
                                void setAvailability(company, false)
                              }
                            >
                              <PowerOff /> Deactivate
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={submitting}
                              className="border-emerald-500/30 text-emerald-300"
                              onClick={() =>
                                void setAvailability(company, true)
                              }
                            >
                              <Power /> Activate
                            </Button>
                          ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!loading && items.length === 0 && (
                <tr>
                  <td
                    colSpan={isChannelAdmin ? 5 : 4}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Company tidak ditemukan.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td
                    colSpan={isChannelAdmin ? 5 : 4}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Memuat company...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-slate-500">
          <span>{total} company</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Halaman sebelumnya"
              disabled={page <= 1 || loading}
              onClick={() => setPage((value) => value - 1)}
            >
              <ChevronLeft />
            </Button>
            <span>
              Halaman {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Halaman berikutnya"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((value) => value + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: ResourceStatus | LinkStatus }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${active ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-500/10 text-slate-400"}`}
    >
      {status}
    </span>
  );
}
