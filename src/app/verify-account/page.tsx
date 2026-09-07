import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth-experience";

export const metadata: Metadata = { title: "Verifikasi Akun" };
export default function VerifyAccountPage() { return <AuthExperience mode="verify" />; }
