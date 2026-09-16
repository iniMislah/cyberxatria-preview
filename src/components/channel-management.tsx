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

type ChannelStatus = "active" | "suspended" | "disabled";

type Channel = {
  id: string;
  code: string;
  name: string;
  status: ChannelStatus;
  createdAt: string;
  updatedAt: string;
};

const fieldClass =
  "h-11 border-white/10 bg-black/20 px-3 text-white placeholder:text-slate-600";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}

export function ChannelManagement() {
  const { roleCode } = useCurrentUser();
  const canManage = roleCode === "SUPER_ADMIN";
  const [items, setItems] = useState<Channel[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<Channel | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) params.set("search", search);
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<Channel>
      >(`/channels?${params.toString()}`);
      setItems(result.data);
      setTotal(result.meta.total);
      setTotalPages(Math.max(1, result.meta.totalPages));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  async function openDetail(id: string) {
    setError("");
    try {
      setSelected(
        await authenticatedIdentityRequest<Channel>(`/channels/${id}`),
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
      const body = JSON.stringify({
        code: String(form.get("code") ?? "")
          .trim()
          .toLowerCase(),
        name: String(form.get("name") ?? "").trim(),
      });
      if (formMode === "create") {
        await authenticatedIdentityRequest<Channel>("/channels", {
          method: "POST",
          body,
        });
      } else if (selected) {
        await authenticatedIdentityRequest<Channel>(
          `/channels/${selected.id}`,
          {
            method: "PATCH",
            body,
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

  async function setStatus(channel: Channel, active: boolean) {
    setSubmitting(true);
    setError("");
    try {
      await authenticatedIdentityRequest<Channel>(
        `/channels/${channel.id}/${active ? "activate" : "deactivate"}`,
        { method: "PATCH" },
      );
      if (selected?.id === channel.id) setSelected(null);
      await load();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1320px]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Directory management</p>
          <h1 className="mt-3 text-3xl font-bold">Channel</h1>
          <p className="mt-2 text-sm text-slate-500">
            {canManage
              ? "Kelola channel secara global, termasuk status aktifnya."
              : "Lihat informasi channel yang menjadi scope akun Anda."}
          </p>
        </div>
        {canManage && (
          <Button
            onClick={() => {
              setSelected(null);
              setFormMode("create");
            }}
            className="glow-button h-10 px-4"
          >
            <Plus /> Tambah Channel
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
          placeholder="Cari nama atau code channel..."
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
                ? "Create Channel"
                : formMode === "edit"
                  ? "Update Channel"
                  : "Detail Channel"}
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
                <Label htmlFor="channel-code">Code</Label>
                <Input
                  id="channel-code"
                  name="code"
                  defaultValue={selected?.code}
                  required
                  pattern="[a-z0-9][a-z0-9_-]{1,62}"
                  className={`${fieldClass} mt-2`}
                />
              </div>
              <div>
                <Label htmlFor="channel-name">Nama Channel</Label>
                <Input
                  id="channel-name"
                  name="name"
                  defaultValue={selected?.name}
                  required
                  maxLength={150}
                  className={`${fieldClass} mt-2`}
                />
              </div>
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
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-slate-500">Code</dt>
                <dd className="mt-1 font-semibold">{selected.code}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Nama</dt>
                <dd className="mt-1 font-semibold">{selected.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="mt-1">
                  <StatusBadge status={selected.status} />
                </dd>
              </div>
            </dl>
          ) : null}
        </section>
      )}

      <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#090e18]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Channel</th>
                <th className="px-5 py-4">Code</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((channel) => (
                <tr
                  key={channel.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-4 font-semibold">{channel.name}</td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-400">
                    {channel.code}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={channel.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void openDetail(channel.id)}
                      >
                        <Eye /> View
                      </Button>
                      {canManage && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelected(channel);
                            setFormMode("edit");
                          }}
                        >
                          <Pencil /> Update
                        </Button>
                      )}
                      {canManage &&
                        (channel.status === "active" ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={submitting}
                            onClick={() => void setStatus(channel, false)}
                          >
                            <PowerOff /> Deactivate
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={submitting}
                            className="border-emerald-500/30 text-emerald-300"
                            onClick={() => void setStatus(channel, true)}
                          >
                            <Power /> Activate
                          </Button>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && items.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Channel tidak ditemukan.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    Memuat channel...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-slate-500">
          <span>{total} channel</span>
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

function StatusBadge({ status }: { status: ChannelStatus }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${active ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-500/10 text-slate-400"}`}
    >
      {status}
    </span>
  );
}
