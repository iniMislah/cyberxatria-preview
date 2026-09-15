import { Suspense } from "react";
import { PasswordActivationForm } from "@/components/password-activation-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#03060d]" />}>
      <PasswordActivationForm mode="reset" />
    </Suspense>
  );
}
