"use client";

import { useMemo, useSyncExternalStore } from "react";

export const AUTH_SESSION_KEY = "cyberxatria-test-session";

export type SystemRole = "SUPER_ADMIN" | "ADMIN" | "USER";
export type AdminScope = "CHANNEL" | "COMPANY";

export type ActiveRole = {
  bindingId?: string;
  code: string;
  name: string;
  scopeType?: "platform" | "channel" | "company" | "application";
  adminScope?: AdminScope | null;
  channelId?: string | null;
  companyId?: string | null;
  validFrom?: string | null;
  validUntil?: string | null;
};

export type EffectiveRole = ActiveRole & {
  source: "database" | "default";
};

const DEFAULT_USER_ROLE: EffectiveRole = {
  bindingId: "",
  code: "USER",
  name: "User",
  scopeType: "company",
  adminScope: null,
  channelId: null,
  companyId: null,
  validFrom: null,
  validUntil: null,
  source: "default",
};

export type IdentityLoginSession = {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    status: string;
  };
  roles: ActiveRole[];
  role?: SystemRole;
  adminScope?: AdminScope | null;
  channelId?: string | null;
  companyId?: string | null;
  session: {
    id: string;
    expiresAt: string;
    refreshToken: string;
    channelId?: string | null;
    companyId?: string | null;
  };
};

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("cyberxatria-session", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("cyberxatria-session", listener);
  };
}

function getClientSnapshot() {
  return sessionStorage.getItem(AUTH_SESSION_KEY) ?? "";
}

function getServerSnapshot() {
  return "";
}

function rolePriority(role: ActiveRole) {
  const identity = `${role.code} ${role.name}`
    .toLowerCase()
    .replace(/[.\s-]+/g, "_");
  if (identity.includes("super_admin")) return 3;
  if (identity.includes("admin")) return 2;
  if (identity.includes("user")) return 1;
  return 0;
}

export function normalizeRoleCode(value?: string | null): SystemRole {
  const normalized = value
    ?.trim()
    .toUpperCase()
    .replace(/[.\s-]+/g, "_");
  if (normalized?.includes("SUPER_ADMIN")) return "SUPER_ADMIN";
  if (normalized?.includes("ADMIN")) return "ADMIN";
  return "USER";
}

export function effectiveRoleFromSession(
  session: IdentityLoginSession | null,
): EffectiveRole {
  const roles = session?.roles ?? [];
  const databaseRole = [...roles].sort(
    (left, right) => rolePriority(right) - rolePriority(left),
  )[0];

  if (databaseRole) {
    return {
      ...databaseRole,
      code: normalizeRoleCode(session?.role ?? databaseRole.code),
      adminScope: session?.adminScope ?? databaseRole.adminScope ?? null,
      channelId: session?.channelId ?? databaseRole.channelId ?? null,
      companyId: session?.companyId ?? databaseRole.companyId ?? null,
      source: "database",
    };
  }

  if (session) {
    return {
      ...DEFAULT_USER_ROLE,
      code: normalizeRoleCode(session.role),
      adminScope: session.adminScope ?? null,
      channelId: session.channelId ?? null,
      companyId: session.companyId ?? null,
    };
  }

  return DEFAULT_USER_ROLE;
}

export function defaultRouteForRole(role: EffectiveRole) {
  const code = normalizeRoleCode(role.code);
  if (code === "SUPER_ADMIN") return "/admin/channels";
  if (code === "ADMIN") return "/admin/companies";
  return "/dashboard";
}

export function storeAuthSession(session: IdentityLoginSession) {
  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("cyberxatria-session"));
}

export function clearAuthSession() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  window.dispatchEvent(new Event("cyberxatria-session"));
}

export function useCurrentUser() {
  const rawSession = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return useMemo(() => {
    let session: IdentityLoginSession | null = null;
    try {
      session = rawSession
        ? (JSON.parse(rawSession) as IdentityLoginSession)
        : null;
    } catch {
      session = null;
    }

    const roles = session?.roles ?? [];
    const effectiveRole = effectiveRoleFromSession(session);
    const emailName = session?.user.email.split("@")[0] ?? "Pengguna";
    const fullName = session?.user.fullName?.trim() || emailName;
    const initials = fullName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

    return {
      session,
      fullName,
      initials: initials || "CX",
      roleLabel:
        normalizeRoleCode(effectiveRole.code) === "ADMIN"
          ? effectiveRole.adminScope === "CHANNEL"
            ? "Admin Channel"
            : "Admin Company"
          : effectiveRole.name,
      roleCode: normalizeRoleCode(effectiveRole.code),
      effectiveRole,
      roles,
      hasDatabaseRole: effectiveRole.source === "database",
    };
  }, [rawSession]);
}
