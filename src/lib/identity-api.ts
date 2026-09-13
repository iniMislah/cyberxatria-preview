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
    | (ApiErrorBody & T)
    | null;

  if (!response.ok) {
    const message = body?.message;
    throw new Error(
      Array.isArray(message)
        ? message.join(", ")
        : message || body?.error || "Identity API tidak dapat memproses request",
    );
  }

  return body as T;
}

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

