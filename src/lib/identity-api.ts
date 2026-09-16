import {
  AUTH_SESSION_KEY,
  type IdentityLoginSession,
} from "@/lib/current-user";

const IDENTITY_API_URL = (
  process.env.NEXT_PUBLIC_IDENTITY_API_URL ?? "http://localhost:3000/api/v1"
).replace(/\/$/, "");

type ApiErrorBody = {
  message?: string | string[];
  error?: string;
};

export async function identityApiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${IDENTITY_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const body = (await response.json().catch(() => null)) as
    (ApiErrorBody & T) | null;

  if (!response.ok) {
    const message = body?.message;
    throw new Error(
      Array.isArray(message)
        ? message.join(", ")
        : message ||
            body?.error ||
            "Identity API tidak dapat memproses request",
    );
  }

  return body as T;
}

export async function authenticatedIdentityRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const rawSession = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!rawSession) throw new Error("Sesi login tidak ditemukan");

  let session: IdentityLoginSession;
  try {
    session = JSON.parse(rawSession) as IdentityLoginSession;
  } catch {
    throw new Error("Sesi login tidak valid");
  }
  if (!session.accessToken) throw new Error("Access token tidak ditemukan");

  return identityApiRequest<T>(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      ...init?.headers,
    },
  });
}

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type RequestOtpResponse = {
  registrationId: string;
  email: string;
  status: string;
  expiresAt: string;
  otpExpiresAt: string;
  emailDelivery: "sent" | "failed";
  developmentOtp?: string;
};

export type VerifyOtpResponse = {
  registrationId: string;
  email: string;
  status: "activation_pending";
  activationExpiresAt: string;
  adminApprovalRequired: false;
  passwordSetupRequired: true;
  emailDelivery: "sent" | "failed";
  developmentActivationUrl?: string;
};

export type CompleteRegistrationResponse = {
  registrationId: string;
  userId: string;
  email: string;
  status: "completed";
  loginRequired: true;
};
