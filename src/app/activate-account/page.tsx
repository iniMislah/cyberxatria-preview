import { Suspense } from "react";
import { PasswordActivationForm } from "@/components/password-activation-form";

export default function ActivateAccountPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#03060d]" />}>
      <PasswordActivationForm />
    </Suspense>
  );
}

