import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth-experience";

export const metadata: Metadata = { title: "Reset Password" };

export default function ForgotPasswordPage() {
  return <AuthExperience mode="forgot" />;
}
