import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth-experience";

export const metadata: Metadata = { title: "Buat Akun" };
export default function SignupPage() { return <AuthExperience mode="signup" />; }
