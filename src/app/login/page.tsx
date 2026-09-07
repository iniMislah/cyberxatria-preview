import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth-experience";

export const metadata: Metadata = { title: "Masuk" };
export default function LoginPage() { return <AuthExperience mode="login" />; }
