import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth-experience";

export const metadata: Metadata = { title: "Akun Terverifikasi" };
export default function AccountCreatedPage() { return <AuthExperience mode="success" />; }
