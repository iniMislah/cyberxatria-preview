"use client";

import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShieldCheck,
  UserRoundCog,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  authenticatedIdentityRequest,
  type PaginatedResponse,
} from "@/lib/identity-api";

type Role = "SUPER_ADMIN" | "ADMIN" | "USER";
type AdminScope = "CHANNEL" | "COMPANY";
type ManagedUser = {
  id: string;
  email: string;
  status: string;
  profile: { firstName: string; lastName: string };
  access: {
    role: Role;
    adminScope: AdminScope | null;
    channelId: string | null;
    companyId: string | null;
  };
};
type DirectoryOption = { id: string; name: string; code: string; status: string };

const fieldClass =
  "h-11 border-white/10 bg-black/20 px-3 text-white placeholder:text-slate-600";
const selectClass =
  "h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-rose-500/50";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}

function nameOf(user: ManagedUser) {
  return (
    `${user.profile?.firstName ?? ""} ${user.profile?.lastName ?? ""}`.trim() ||
    user.email
  );
}

export function AdminScopeManagement() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [channels, setChannels] = useState<DirectoryOption[]>([]);
  const [companies, setCompanies] = useState<DirectoryOption[]>([]);
  const [selected, setSelected] = useState<ManagedUser | null>(null);
  const [role, setRole] = useState<Role>("USER");
  const [adminScope, setAdminScope] = useState<AdminScope>("CHANNEL");
  const [channelId, setChannelId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) params.set("search", search);
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<ManagedUser>
      >(`/users?${params.toString()}`);
      setUsers(result.data);
      setTotal(result.meta.total);
      setTotalPages(Math.max(1, result.meta.totalPages));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  const loadDirectories = useCallback(async () => {
    try {
      const [channelResult, companyResult] = await Promise.all([
        authenticatedIdentityRequest<PaginatedResponse<DirectoryOption>>(
          "/channels?page=1&limit=100",
        ),
        authenticatedIdentityRequest<PaginatedResponse<DirectoryOption>>(
          "/companies?page=1&limit=100",
        ),
      ]);
      setChannels(channelResult.data.filter((item) => item.status === "active"));
      setCompanies(companyResult.data.filter((item) => item.status === "active"));
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadUsers();
      void loadDirectories();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadDirectories, loadUsers]);

  function chooseUser(user: ManagedUser) {
    setSelected(user);
    setRole(user.access.role);
    setAdminScope(user.access.adminScope ?? "CHANNEL");
    setChannelId(user.access.channelId ?? "");
    setCompanyId(user.access.companyId ?? "");
    setError("");
    setNotice("");
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  async function assign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const payload: Record<string, string> = { role };
    if (role === "ADMIN") {
      payload.adminScope = adminScope;
      if (adminScope === "CHANNEL") payload.channelId = channelId;
      if (adminScope === "COMPANY") payload.companyId = companyId;
    } else if (role === "USER" && companyId) {
      payload.companyId = companyId;
    }

    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      await authenticatedIdentityRequest(
        `/authorization/users/${selected.id}/role`,
        { method: "PUT", body: JSON.stringify(payload) },
      );
      setNotice(`Role ${nameOf(selected)} berhasil diperbarui.`);
      const refreshed = await authenticatedIdentityRequest<ManagedUser>(
        `/users/${selected.id}`,
      );
      chooseUser(refreshed);
      setNotice(`Role ${nameOf(refreshed)} berhasil diperbarui.`);
      await loadUsers();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1320px]">
      <div>
        <p className="eyebrow">Authorization management</p>
        <h1 className="mt-3 text-3xl font-bold">Admin Scope Management</h1>
        <p className="mt-2 text-sm text-slate-500">
          Tetapkan role dan scope dengan kombinasi yang tervalidasi oleh Identity.
        </p>
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#090e18]">
          <form onSubmit={submitSearch} className="flex gap-2 border-b border-white/10 p-4">
            <Input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Cari user..." className={fieldClass} />
            <Button type="submit" variant="outline" className="h-11 px-4"><Search /> Search</Button>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">User</th><th className="px-5 py-4">Current Role</th><th className="px-5 py-4">Scope</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={`border-b border-white/5 last:border-0 ${selected?.id === user.id ? "bg-rose-500/5" : ""}`}>
                    <td className="px-5 py-4"><p className="font-semibold">{nameOf(user)}</p><p className="mt-1 text-xs text-slate-500">{user.email}</p></td>
                    <td className="px-5 py-4 text-rose-300">{user.access.role}</td>
                    <td className="px-5 py-4 text-slate-400">{user.access.adminScope ?? "-"}</td>
                    <td className="px-5 py-4 text-right"><Button variant="outline" size="sm" onClick={() => chooseUser(user)}><UserRoundCog /> Configure</Button></td>
                  </tr>
                ))}
                {!loading && users.length === 0 && <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-500">User tidak ditemukan.</td></tr>}
                {loading && <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-500">Memuat user...</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-slate-500"><span>{total} user</span><div className="flex items-center gap-2"><Button variant="outline" size="icon-sm" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft /></Button><span>Page {page} / {totalPages}</span><Button variant="outline" size="icon-sm" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}><ChevronRight /></Button></div></div>
        </section>

        <section className="h-fit rounded-2xl border border-rose-500/20 bg-[#090e18] p-5 xl:sticky xl:top-24">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-rose-500/10 text-rose-400"><ShieldCheck /></span><div><h2 className="font-bold">Role & Scope Assignment</h2><p className="text-xs text-slate-500">{selected ? selected.email : "Pilih user dari tabel"}</p></div></div>
          {error && <Feedback tone="error">{error}</Feedback>}
          {notice && <Feedback tone="success">{notice}</Feedback>}
          {selected ? (
            <form onSubmit={assign} className="mt-6 space-y-4">
              <SelectField label="Role" value={role} onChange={(value) => { setRole(value as Role); setChannelId(""); setCompanyId(""); }} options={[{ value: "USER", label: "USER" }, { value: "ADMIN", label: "ADMIN" }, { value: "SUPER_ADMIN", label: "SUPER ADMIN" }]} />
              {role === "ADMIN" && (
                <SelectField label="Admin Scope" value={adminScope} onChange={(value) => { setAdminScope(value as AdminScope); setChannelId(""); setCompanyId(""); }} options={[{ value: "CHANNEL", label: "CHANNEL" }, { value: "COMPANY", label: "COMPANY" }]} />
              )}
              {role === "ADMIN" && adminScope === "CHANNEL" && (
                <SelectField label="Channel" value={channelId} onChange={setChannelId} required options={channels.map((item) => ({ value: item.id, label: `${item.name} (${item.code})` }))} placeholder="Pilih channel" />
              )}
              {((role === "ADMIN" && adminScope === "COMPANY") || role === "USER") && (
                <SelectField label={role === "USER" ? "Company (optional)" : "Company"} value={companyId} onChange={setCompanyId} required={role === "ADMIN"} options={companies.map((item) => ({ value: item.id, label: `${item.name} (${item.code})` }))} placeholder={role === "USER" ? "Tanpa company" : "Pilih company"} />
              )}
              {role !== "ADMIN" && <p className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{role === "SUPER_ADMIN" ? "Super Admin selalu memiliki scope GLOBAL dan admin_scope dikosongkan." : "USER tidak memiliki admin_scope. Company menentukan cakupan SOC user."}</p>}
              <Button type="submit" disabled={submitting} className="glow-button h-11 w-full"><ShieldCheck /> {submitting ? "Menyimpan..." : "Assign Role & Scope"}</Button>
            </form>
          ) : <div className="mt-8 rounded-xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-slate-600">Belum ada user yang dipilih.</div>}
        </section>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder, required = true }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }>; placeholder?: string; required?: boolean }) {
  return <div><Label>{label}</Label><select value={value} onChange={(event) => onChange(event.target.value)} required={required} className={`${selectClass} mt-2`}>{placeholder !== undefined && <option value="">{placeholder}</option>}{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>;
}

function Feedback({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  return <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${tone === "error" ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}>{children}</div>;
}
