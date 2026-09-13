"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Eye, EyeOff, KeyRound } from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  type CompleteRegistrationResponse,
  identityApiRequest,
} from "@/lib/identity-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const inputClass =
  "h-12 border-white/10 bg-white/[0.025] px-4 pr-12 text-white placeholder:text-slate-600 focus-visible:border-rose-500/70 focus-visible:ring-rose-500/20";

export function PasswordActivationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const passwordConfirmation = String(
      form.get("passwordConfirmation") ?? "",
    );

    if (!token) {
      setError("Token create password tidak ditemukan pada link ini.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setSubmitting(true);
    try {
      await identityApiRequest<CompleteRegistrationResponse>(
        "/auth/registration/complete",
        {
          method: "POST",
          body: JSON.stringify({ token, password, passwordConfirmation }),
        },
      );
      sessionStorage.removeItem("cyberxatria-registration-id");
      sessionStorage.removeItem("cyberxatria-registration-email");
      sessionStorage.removeItem("cyberxatria-registration-phone");
      sessionStorage.removeItem("cyberxatria-development-otp");
      sessionStorage.removeItem("cyberxatria-development-activation-url");
      setCompleted(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Aktivasi gagal");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="site-shell min-h-screen bg-[#03060d] text-white">
      <SiteHeader />
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div className="dot-field absolute inset-0 opacity-15 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
        <div className="page-grid relative">
          <div className="cyber-card mx-auto max-w-xl rounded-3xl p-7 sm:p-10">
            {completed ? (
              <div className="text-center">
                <div className="mx-auto grid size-20 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                  <Check className="size-10 text-emerald-400" />
                </div>
                <h1 className="mt-7 text-3xl font-bold">Password berhasil dibuat</h1>
                <p className="mt-3 leading-7 text-slate-400">
                  Akun CyberXatria Anda sudah aktif dan sekarang dapat digunakan
                  untuk login.
                </p>
                <Link
                  href="/login"
                  className="glow-button mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg font-semibold"
                >
                  Masuk ke akun
                </Link>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-700 to-red-500">
                  <KeyRound />
                </div>
                <p className="eyebrow mt-7">Aktivasi akun</p>
                <h1 className="mt-4 text-3xl font-bold">Buat password Anda</h1>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Email telah terverifikasi. Buat password minimal 8 karakter
                  untuk menyelesaikan registrasi.
                </p>

                {!token && (
                  <div className="mt-6 rounded-xl border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-200">
                    Link tidak memiliki token. Buka kembali link create password
                    yang dikirim oleh Identity.
                  </div>
                )}

                <div className="mt-7 space-y-5">
                  <div>
                    <Label htmlFor="password">Password baru *</Label>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        minLength={8}
                        maxLength={128}
                        required
                        autoComplete="new-password"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="passwordConfirmation">Ulangi password *</Label>
                    <Input
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type={showPassword ? "text" : "password"}
                      minLength={8}
                      maxLength={128}
                      required
                      autoComplete="new-password"
                      className={`${inputClass} mt-2`}
                    />
                  </div>
                </div>

                {error && (
                  <div role="alert" className="mt-5 rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitting || !token}
                  className="glow-button mt-7 h-12 w-full text-base disabled:opacity-50"
                >
                  {submitting ? "Mengaktifkan akun..." : "Simpan password & aktifkan akun"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

