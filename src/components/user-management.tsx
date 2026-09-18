"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  KeyRound,
  Pencil,
  Plus,
  Power,
  PowerOff,
  Search,
  UserRoundCog,
  X,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/current-user";
import {
  authenticatedIdentityRequest,
  type PaginatedResponse,
} from "@/lib/identity-api";

type UserStatus = "pending" | "active" | "suspended" | "disabled";
type UserAccess = {
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  adminScope: "CHANNEL" | "COMPANY" | null;
  channelId: string | null;
  companyId: string | null;
};
type IdentityUser = {
  id: string;
  email: string;
  status: UserStatus;
  lastLoginAt: string | null;
  passwordResetRequired: boolean;
  profile: {
    firstName: string;
    lastName: string;
    phone: string | null;
    locale: string | null;
    timezone: string | null;
  };
  access: UserAccess;
};
type Company = { id: string; name: string; code: string; status: string };

const fieldClass =
  "h-11 border-white/10 bg-black/20 px-3 text-white placeholder:text-slate-600";
const selectClass =
  "h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-rose-500/50";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan";
}

function fullName(user: IdentityUser) {
  return (
    `${user.profile?.firstName ?? ""} ${user.profile?.lastName ?? ""}`.trim() ||
    user.email
  );
}

export function UserManagement() {
  const { roleCode } = useCurrentUser();
  const isSuperAdmin = roleCode === "SUPER_ADMIN";
  const [items, setItems] = useState<IdentityUser[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<IdentityUser | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [assignedCompanyId, setAssignedCompanyId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) params.set("search", search);
      const result = await authenticatedIdentityRequest<
        PaginatedResponse<IdentityUser>
      >(`/users?${params.toString()}`);
      setItems(result.data);
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
      setCompanies(result.data.filter((company) => company.status === "active"));
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void load();
      void loadCompanies();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load, loadCompanies]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  async function openDetail(id: string) {
    setError("");
    try {
      const user = await authenticatedIdentityRequest<IdentityUser>(
        `/users/${id}`,
      );
      setSelected(user);
      setAssignedCompanyId(user.access.companyId ?? "");
      setMode(null);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "").trim();
    const body: Record<string, unknown> = {
      email: String(form.get("email") ?? "").trim(),
      firstName: String(form.get("firstName") ?? "").trim(),
      lastName: String(form.get("lastName") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim() || undefined,
      locale: "id-ID",
      timezone: "Asia/Jakarta",
    };
    if (mode === "create") {
      body.companyId = String(form.get("companyId") ?? "") || undefined;
      if (password) body.password = password;
    }
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      if (mode === "create") {
        const created = await authenticatedIdentityRequest<
          IdentityUser & { passwordSetupEmailSent?: boolean }
        >("/users", { method: "POST", body: JSON.stringify(body) });
        setNotice(
          created.passwordSetupEmailSent
            ? "User dibuat dan email pengaturan password sudah dikirim."
            : "User berhasil dibuat.",
        );
      } else if (selected) {
        await authenticatedIdentityRequest(`/users/${selected.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
        setNotice("Data user berhasil diperbarui.");
      }
      setMode(null);
      setSelected(null);
      await load();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  async function setStatus(user: IdentityUser, active: boolean) {
    setSubmitting(true);
    setError("");
    try {
      await authenticatedIdentityRequest(
        `/users/${user.id}/${active ? "activate" : "deactivate"}`,
        { method: "PATCH" },
      );
      setSelected(null);
      setNotice(`User berhasil ${active ? "diaktifkan" : "dinonaktifkan"}.`);
      await load();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  async function resetPassword(user: IdentityUser) {
    setSubmitting(true);
    setError("");
    try {
      await authenticatedIdentityRequest(`/users/${user.id}/password-reset`, {
        method: "POST",
      });
      setNotice(`Email reset password dikirim ke ${user.email}.`);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  async function assignCompany() {
    if (!selected) return;
    setSubmitting(true);
    setError("");
    try {
      await authenticatedIdentityRequest(
        `/authorization/users/${selected.id}/role`,
        {
          method: "PUT",
          body: JSON.stringify({
            role: "USER",
            companyId: assignedCompanyId || undefined,
          }),
        },
      );
      setNotice("Company user berhasil diperbarui.");
      await openDetail(selected.id);
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
          <p className="eyebrow">Identity management</p>
          <h1 className="mt-3 text-3xl font-bold">User Management</h1>
          <p className="mt-2 text-sm text-slate-500">
            Kelola akun, status, company, dan proses reset password user.
          </p>
        </div>
        <div className="flex gap-2">
          {isSuperAdmin && (
            <Link
              href="/admin/admin-scopes"
              className={buttonVariants({
                variant: "outline",
                className: "h-10 px-4",
              })}
            >
              <UserRoundCog /> Manage Role
            </Link>
          )}
          <Button
            onClick={() => {
              setSelected(null);
              setMode("create");
            }}
            className="glow-button h-10 px-4"
          >
            <Plus /> Create User
          </Button>
        </div>
      </div>

      <form
        onSubmit={submitSearch}
        className="mt-7 flex gap-2 rounded-2xl border border-white/10 bg-[#090e18] p-4"
      >
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Cari nama atau email user..."
          className={fieldClass}
        />
        <Button type="submit" variant="outline" className="h-11 px-4">
          <Search /> Search
        </Button>
      </form>

      {error && <Feedback tone="error">{error}</Feedback>}
      {notice && <Feedback tone="success">{notice}</Feedback>}

      {(mode || selected) && (
        <section className="mt-5 rounded-2xl border border-rose-500/20 bg-[#090e18] p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              {mode === "create"
                ? "Create User"
                : mode === "edit"
                  ? "Update User"
                  : "User Detail"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Tutup panel"
              onClick={() => {
                setMode(null);
                setSelected(null);
              }}
            >
              <X />
            </Button>
          </div>
          {mode ? (
            <form onSubmit={save} className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="First Name" name="firstName" value={selected?.profile.firstName} />
              <Field label="Last Name" name="lastName" value={selected?.profile.lastName} />
              <Field label="Email" name="email" type="email" value={selected?.email} />
              <Field label="Phone" name="phone" value={selected?.profile.phone ?? ""} required={false} />
              {mode === "create" && (
                <>
                  <div>
                    <Label htmlFor="user-company">Company</Label>
                    <select id="user-company" name="companyId" className={`${selectClass} mt-2`}>
                      <option value="">Pilih company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name} ({company.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field
                    label="Initial Password (optional)"
                    name="password"
                    type="password"
                    value=""
                    required={false}
                    minLength={8}
                  />
                </>
              )}
              <div className="flex gap-2 md:col-span-2">
                <Button type="submit" disabled={submitting} className="glow-button h-10 px-5">
                  {submitting ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button type="button" variant="outline" className="h-10 px-5" onClick={() => setMode(null)}>
                  Batal
                </Button>
              </div>
            </form>
          ) : selected ? (
            <div className="mt-5 space-y-5">
              <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <Detail label="Name" value={fullName(selected)} />
                <Detail label="Email" value={selected.email} />
                <Detail label="Status" value={selected.status} />
                <Detail label="Role" value={selected.access.role} />
                <Detail label="Admin Scope" value={selected.access.adminScope ?? "-"} />
                <Detail label="Company ID" value={selected.access.companyId ?? "-"} />
                <Detail label="Channel ID" value={selected.access.channelId ?? "-"} />
                <Detail label="Last Login" value={selected.lastLoginAt ? new Date(selected.lastLoginAt).toLocaleString("id-ID") : "-"} />
              </dl>
              {selected.access.role === "USER" && (
                <div className="grid gap-3 rounded-xl border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <Label htmlFor="assign-company">Assign Company</Label>
                    <select
                      id="assign-company"
                      value={assignedCompanyId}
                      onChange={(event) => setAssignedCompanyId(event.target.value)}
                      className={`${selectClass} mt-2`}
                    >
                      <option value="">Tanpa company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={() => void assignCompany()} disabled={submitting} className="h-11 px-5">
                    Assign Company
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setMode("edit")}><Pencil /> Update</Button>
                <Button variant="outline" onClick={() => void resetPassword(selected)} disabled={submitting}><KeyRound /> Reset Password</Button>
                {selected.status === "active" ? (
                  <Button variant="destructive" onClick={() => void setStatus(selected, false)} disabled={submitting}><PowerOff /> Deactivate</Button>
                ) : (
                  <Button variant="outline" onClick={() => void setStatus(selected, true)} disabled={submitting}><Power /> Activate</Button>
                )}
              </div>
            </div>
          ) : null}
        </section>
      )}

      <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#090e18]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500">
              <tr><th className="px-5 py-4">User</th><th className="px-5 py-4">Role</th><th className="px-5 py-4">Scope</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Action</th></tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-4"><p className="font-semibold">{fullName(user)}</p><p className="mt-1 text-xs text-slate-500">{user.email}</p></td>
                  <td className="px-5 py-4 font-semibold text-rose-300">{user.access.role}</td>
                  <td className="px-5 py-4 text-slate-400">{user.access.adminScope ?? (user.access.companyId ? "COMPANY USER" : "-")}</td>
                  <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                  <td className="px-5 py-4"><div className="flex justify-end gap-2"><Button variant="outline" size="sm" onClick={() => void openDetail(user.id)}><Eye /> View</Button></div></td>
                </tr>
              ))}
              {!loading && items.length === 0 && <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-500">User tidak ditemukan.</td></tr>}
              {loading && <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-500">Memuat user...</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-slate-500">
          <span>{total} user</span>
          <div className="flex items-center gap-2"><Button variant="outline" size="icon-sm" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft /></Button><span>Page {page} / {totalPages}</span><Button variant="outline" size="icon-sm" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}><ChevronRight /></Button></div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, value, type = "text", required = true, minLength }: { label: string; name: string; value?: string; type?: string; required?: boolean; minLength?: number }) {
  return <div><Label htmlFor={`user-${name}`}>{label}</Label><Input id={`user-${name}`} name={name} type={type} defaultValue={value} required={required} minLength={minLength} className={`${fieldClass} mt-2`} /></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-slate-500">{label}</dt><dd className="mt-1 break-all font-semibold">{value}</dd></div>;
}

function StatusBadge({ status }: { status: UserStatus }) {
  const active = status === "active";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${active ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>{status}</span>;
}

function Feedback({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  return <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${tone === "error" ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}>{children}</div>;
}
