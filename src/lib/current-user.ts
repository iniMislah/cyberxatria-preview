"use client";

import { useMemo, useSyncExternalStore } from "react";

export const AUTH_SESSION_KEY = "cyberxatria-test-session";

export type ActiveRole = {
  bindingId: string;
  code: string;
  name: string;
  scopeType: "platform" | "tenant" | "organization" | "application";
  tenantId: string | null;
  organizationId: string | null;
  validFrom: string | null;
  validUntil: string | null;
};

export type EffectiveRole = ActiveRole & {
  source: "database" | "default";
};

const DEFAULT_USER_ROLE: EffectiveRole = {
  bindingId: "",
  code: "user",
  name: "User",
  scopeType: "platform",
  tenantId: null,
  organizationId: null,
  validFrom: null,
  validUntil: null,
  source: "default",
};

export type IdentityLoginSession = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    status: string;
  };
  roles: ActiveRole[];
  session: {
    id: string;
    expiresAt: string;
    refreshToken: string;
  };
};

function subscribe() {
  return () => undefined;
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

export function useCurrentUser() {
  const rawSession = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return useMemo(() => {
    let session: IdentityLoginSession | null = null;
    try {
      session = rawSession ? (JSON.parse(rawSession) as IdentityLoginSession) : null;
    } catch {
      session = null;
    }

    const roles = session?.roles ?? [];
    const databaseRole = [...roles].sort(
      (left, right) => rolePriority(right) - rolePriority(left),
    )[0];
    const effectiveRole: EffectiveRole = databaseRole
      ? { ...databaseRole, source: "database" }
      : DEFAULT_USER_ROLE;
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
      roleLabel: effectiveRole.name,
      roleCode: effectiveRole.code,
      effectiveRole,
      roles,
      hasDatabaseRole: effectiveRole.source === "database",
    };
  }, [rawSession]);
}
