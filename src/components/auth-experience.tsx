"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ExternalLink,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  identityApiRequest,
  type RequestOtpResponse,
  type VerifyOtpResponse,
} from "@/lib/identity-api";
import { AUTH_SESSION_KEY, type IdentityLoginSession } from "@/lib/current-user";

type Mode = "login" | "signup" | "verify" | "success" | "forgot";

const inputClass =
  "h-12 border-white/10 bg-white/[0.025] px-4 text-white placeholder:text-slate-600 focus-visible:border-rose-500/70 focus-visible:ring-rose-500/20";

function messageFrom(caught: unknown, fallback: string) {
  return caught instanceof Error ? caught.message : fallback;
}

function subscribeToSessionStorage() {
  return () => undefined;
}

function useSessionStorageValue(key: string) {
  return useSyncExternalStore(
    subscribeToSessionStorage,
    () => sessionStorage.getItem(key) ?? "",
    () => "",
  );
}

export function AuthExperience({ mode }: { mode: Mode }) {
  return (
    <main className="site-shell min-h-screen bg-[#03060d] text-white">
      <SiteHeader />
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div className="dot-field absolute inset-0 opacity-15 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
        <div className="page-grid relative">
          {mode === "success" ? <ActivationSent /> : <AuthCard mode={mode} />}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function AuthCard({ mode }: { mode: Exclude<Mode, "success"> }) {
  const isLogin = mode === "login";
  const isRecovery = mode === "forgot";

  return (
    <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#070b13] shadow-2xl lg:grid-cols-[.9fr_1.1fr]">
      <div className="relative hidden min-h-[690px] overflow-hidden border-r border-white/10 lg:block">
        <Image
          src="/images/cyber-shield-hero.png"
          alt="CyberXatria secure access"
          fill
          sizes="45vw"
          className="object-cover object-[72%_center] opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050911]/20 to-[#050911]/80" />
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <div>
            <p className="eyebrow">Secure access</p>
            <h1 className="mt-5 max-w-md text-4xl font-bold leading-tight">
              {isLogin || isRecovery ? (
                <>Selamat datang kembali di <span className="text-gradient">CyberXatria</span></>
              ) : (
                <>Mulai Lindungi Bisnis Anda Bersama <span className="text-gradient">CyberXatria</span></>
              )}
            </h1>
            <p className="mt-5 max-w-sm leading-7 text-slate-300">
              {isLogin || isRecovery
                ? "Pulihkan akses akun Anda melalui link aman yang dikirim ke email terdaftar."
                : "Daftarkan email, verifikasi OTP, lalu buat password melalui link yang dikirim ke email Anda."}
            </p>
          </div>
          <div className="space-y-3">
            {["Keamanan proaktif", "Kesiapan berkelanjutan", "Pendekatan terintegrasi", "Insight yang actionable"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="grid size-8 place-items-center rounded-lg border border-rose-500/30 bg-rose-500/10"><Check className="size-4 text-rose-400" /></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10 lg:p-12">
        {mode === "verify" ? (
          <VerifyOtpForm />
        ) : isLogin ? (
          <LoginForm />
        ) : isRecovery ? (
          <ForgotPasswordForm />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
}

function SignupForm() {
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaVersion, setCaptchaVersion] = useState(0);
  const [captchaError, setCaptchaError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const receiveCaptchaToken = useCallback((token: string) => {
    setCaptchaToken(token);
    if (token) setCaptchaError(false);
  }, []);
  const handleCaptchaError = useCallback(() => setCaptchaError(true), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);

    if (!captchaToken) {
      setError("Selesaikan verifikasi CAPTCHA terlebih dahulu.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await identityApiRequest<RequestOtpResponse>(
        "/auth/registration/request-otp",
        {
          method: "POST",
          body: JSON.stringify({
            name: String(form.get("name") ?? ""),
            email: String(form.get("email") ?? ""),
            phone: String(form.get("phone") ?? ""),
            captchaToken,
          }),
        },
      );

      sessionStorage.setItem("cyberxatria-registration-id", result.registrationId);
      sessionStorage.setItem("cyberxatria-registration-email", result.email);
      sessionStorage.setItem("cyberxatria-registration-phone", String(form.get("phone") ?? ""));
      sessionStorage.setItem("cyberxatria-otp-expires-at", result.otpExpiresAt);
      if (result.developmentOtp) {
        sessionStorage.setItem("cyberxatria-development-otp", result.developmentOtp);
      } else {
        sessionStorage.removeItem("cyberxatria-development-otp");
      }
      router.push("/verify-account");
    } catch (caught) {
      setError(messageFrom(caught, "Gagal meminta OTP"));
      setCaptchaToken("");
      setCaptchaVersion((version) => version + 1);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg">
      <div className="mb-8 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-700 to-red-500 shadow-[0_0_35px_rgba(244,63,94,.22)]"><UserRound /></div>
      <h2 className="text-3xl font-bold">Buat Akun</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">Isi data awal untuk menerima OTP verifikasi melalui email.</p>

      <div className="mt-8 space-y-5">
        <div><Label htmlFor="name">Nama Lengkap *</Label><Input id="name" name="name" minLength={2} maxLength={200} required placeholder="Masukkan nama lengkap Anda" autoComplete="name" className={`${inputClass} mt-2`} /></div>
        <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" maxLength={320} required placeholder="nama@perusahaan.com" autoComplete="email" className={`${inputClass} mt-2`} /></div>
        <div><Label htmlFor="phone">Nomor Telepon *</Label><Input id="phone" name="phone" type="tel" required placeholder="+62 812-3456-7890" autoComplete="tel" className={`${inputClass} mt-2`} /></div>
        <div>
          <Label className="mb-2">Verifikasi keamanan *</Label>
          <TurnstileWidget key={captchaVersion} onToken={receiveCaptchaToken} onError={handleCaptchaError} />
          {captchaError && <p className="mt-2 text-xs text-amber-300">CAPTCHA gagal dimuat. Periksa koneksi lalu coba lagi.</p>}
        </div>
        <div className="flex items-start gap-3">
          <Checkbox id="terms" required className="mt-0.5" />
          <Label htmlFor="terms" className="text-xs font-normal leading-5 text-slate-400">
            Saya telah membaca dan menyetujui <a href="#" className="text-rose-400">Syarat &amp; Ketentuan</a> serta <a href="#" className="text-rose-400">Kebijakan Privasi</a>.
          </Label>
        </div>
      </div>

      {error && <ErrorNotice message={error} />}
      <Button type="submit" disabled={submitting || !captchaToken} className="glow-button mt-7 h-12 w-full text-base disabled:opacity-50">
        {submitting ? "Mengirim OTP..." : "Kirim OTP ke Email"}
      </Button>
      <p className="mt-7 text-center text-sm text-slate-500">Sudah memiliki akun? <Link href="/login" className="font-semibold text-rose-400">Masuk di sini</Link></p>
    </form>
  );
}

function VerifyOtpForm() {
  const router = useRouter();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const registrationId = useSessionStorageValue("cyberxatria-registration-id");
  const email = useSessionStorageValue("cyberxatria-registration-email");
  const phone = useSessionStorageValue("cyberxatria-registration-phone");
  const developmentOtp = useSessionStorageValue("cyberxatria-development-otp");
  const otpExpiresAt = useSessionStorageValue("cyberxatria-otp-expires-at");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function fillOtp(value: string) {
    const normalized = value.replace(/\D/g, "").slice(0, 6);
    setDigits(Array.from({ length: 6 }, (_, index) => normalized[index] ?? ""));
    inputs.current[Math.min(normalized.length, 5)]?.focus();
  }

  function changeDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setDigits((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)));
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    fillOtp(event.clipboardData.getData("text"));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const otp = digits.join("");
    if (!registrationId) {
      setError("Data registrasi tidak ditemukan. Mulai kembali dari halaman daftar.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Masukkan OTP 6 digit secara lengkap.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await identityApiRequest<VerifyOtpResponse>("/auth/registration/verify-otp", {
        method: "POST",
        body: JSON.stringify({ registrationId, otp }),
      });
      if (result.developmentActivationUrl) {
        sessionStorage.setItem("cyberxatria-development-activation-url", result.developmentActivationUrl);
      } else {
        sessionStorage.removeItem("cyberxatria-development-activation-url");
      }
      sessionStorage.setItem("cyberxatria-registration-email", result.email);
      sessionStorage.removeItem("cyberxatria-development-otp");
      router.push("/account-created");
    } catch (caught) {
      setError(messageFrom(caught, "OTP tidak dapat diverifikasi"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg">
      <div className="mb-10 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <span className="grid size-7 place-items-center rounded-full bg-rose-500 text-white">1</span><span>Informasi Akun</span><span className="h-px flex-1 bg-rose-500/40" /><span className="grid size-7 place-items-center rounded-full bg-rose-500 text-white">2</span><span className="text-white">Verifikasi OTP</span>
      </div>
      <p className="eyebrow">Verifikasi keamanan</p>
      <h2 className="mt-5 text-3xl font-bold">Verifikasi OTP</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">Masukkan kode OTP yang telah kami kirim ke email Anda. Setelah valid, link create password langsung dikirim tanpa menunggu admin.</p>
      <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
        <p className="flex items-center gap-3"><Mail className="size-4 text-rose-400" /> {email || "Email registrasi"}</p>
        <p className="flex items-center gap-3"><Phone className="size-4 text-rose-400" /> {phone || "Nomor telepon registrasi"}</p>
      </div>
      {developmentOtp && (
        <button type="button" onClick={() => fillOtp(developmentOtp)} className="mt-4 w-full rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-left text-xs text-cyan-100">
          Mode lokal — OTP: <strong className="tracking-[.25em]">{developmentOtp}</strong>. Klik untuk mengisi otomatis.
        </button>
      )}
      <Label className="mt-7">Kode OTP *</Label>
      <div className="mt-3 grid grid-cols-6 gap-2">
        {digits.map((digit, index) => (
          <Input
            key={index}
            ref={(element) => { inputs.current[index] = element; }}
            aria-label={`Digit OTP ${index + 1}`}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            onChange={(event) => changeDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className="h-14 border-white/15 bg-black/20 p-0 text-center text-xl font-bold focus-visible:border-rose-500"
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        {otpExpiresAt ? `OTP berlaku sampai ${new Date(otpExpiresAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}.` : "OTP memiliki masa berlaku terbatas."}
      </p>
      {error && <ErrorNotice message={error} />}
      <Button type="submit" disabled={submitting} className="glow-button mt-8 h-12 w-full text-base disabled:opacity-50">
        {submitting ? "Memverifikasi..." : "Verifikasi & Kirim Link Password"}
      </Button>
      <p className="mt-6 text-center text-sm text-slate-500">Perlu OTP baru? <Link href="/signup" className="font-semibold text-rose-400">Kembali ke form registrasi</Link></p>
    </form>
  );
}

function LoginForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      const result = await identityApiRequest<IdentityLoginSession>("/authentication/login", {
        method: "POST",
        body: JSON.stringify({ email: String(form.get("email") ?? ""), password: String(form.get("password") ?? ""), deviceName: "CyberXatria local web" }),
      });
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(result));
      router.push("/dashboard");
    } catch (caught) {
      setError(messageFrom(caught, "Login gagal"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg">
      <div className="mb-8 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-700 to-red-500 shadow-[0_0_35px_rgba(244,63,94,.22)]"><LockKeyhole /></div>
      <h2 className="text-3xl font-bold">Masuk ke Akun Anda</h2>
      <p className="mt-3 text-sm text-slate-400">Masukkan email dan password untuk melanjutkan.</p>
      <div className="mt-8 space-y-5">
        <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required autoComplete="email" placeholder="nama@perusahaan.com" className={`${inputClass} mt-2`} /></div>
        <div><div className="flex justify-between"><Label htmlFor="password">Password *</Label><Link href="/forgot-password" className="text-xs text-rose-400">Lupa password?</Link></div><Input id="password" name="password" type="password" required autoComplete="current-password" placeholder="Masukkan password Anda" className={`${inputClass} mt-2`} /></div>
        <div className="flex items-start gap-3"><Checkbox id="remember" className="mt-0.5" /><Label htmlFor="remember" className="text-xs font-normal leading-5 text-slate-400">Ingat saya</Label></div>
      </div>
      {error && <ErrorNotice message={error} />}
      <Button type="submit" disabled={submitting} className="glow-button mt-7 h-12 w-full text-base disabled:opacity-50">{submitting ? "Masuk..." : "Masuk"}</Button>
      <p className="mt-7 text-center text-sm text-slate-500">Belum memiliki akun? <Link href="/signup" className="font-semibold text-rose-400">Buat akun di sini</Link></p>
    </form>
  );
}

function ForgotPasswordForm() {
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaVersion, setCaptchaVersion] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!captchaToken) {
      setError("Selesaikan verifikasi CAPTCHA terlebih dahulu.");
      return;
    }
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      await identityApiRequest("/authentication/password-reset/request", {
        method: "POST",
        body: JSON.stringify({
          email: String(form.get("email") ?? ""),
          captchaToken,
        }),
      });
      setSent(true);
    } catch (caught) {
      setError(messageFrom(caught, "Gagal meminta reset password"));
      setCaptchaToken("");
      setCaptchaVersion((value) => value + 1);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
          <Mail className="size-9 text-emerald-400" />
        </div>
        <h2 className="mt-7 text-3xl font-bold">Periksa email Anda</h2>
        <p className="mt-3 leading-7 text-slate-400">
          Jika email terdaftar, link reset password sudah dikirim.
        </p>
        <Link href="/login" className="glow-button mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg font-semibold">
          Kembali ke login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg">
      <div className="mb-8 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-700 to-red-500">
        <KeyRound />
      </div>
      <h2 className="text-3xl font-bold">Reset password</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Masukkan email akun. Kami akan mengirim link reset yang hanya dapat digunakan satu kali.
      </p>
      <div className="mt-8 space-y-5">
        <div>
          <Label htmlFor="resetEmail">Email *</Label>
          <Input id="resetEmail" name="email" type="email" required autoComplete="email" className={`${inputClass} mt-2`} />
        </div>
        <TurnstileWidget
          key={captchaVersion}
          action="password_reset"
          onToken={setCaptchaToken}
          onError={() => setError("Widget CAPTCHA gagal dimuat.")}
        />
      </div>
      {error && <ErrorNotice message={error} />}
      <Button type="submit" disabled={submitting} className="glow-button mt-7 h-12 w-full text-base disabled:opacity-50">
        {submitting ? "Mengirim..." : "Kirim link reset password"}
      </Button>
      <p className="mt-7 text-center text-sm text-slate-500">
        Ingat password? <Link href="/login" className="font-semibold text-rose-400">Kembali ke login</Link>
      </p>
    </form>
  );
}

function ActivationSent() {
  const email = useSessionStorageValue("cyberxatria-registration-email");
  const developmentUrl = useSessionStorageValue("cyberxatria-development-activation-url");

  return (
    <div className="cyber-card mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12">
      <div className="mx-auto grid size-24 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_50px_rgba(34,197,94,.16)]"><Mail className="size-11 text-emerald-400" /></div>
      <h1 className="mt-8 text-3xl font-bold sm:text-4xl">Email create password <span className="text-emerald-400">sudah dikirim</span></h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
        OTP berhasil diverifikasi{email ? <> untuk <strong className="text-slate-200">{email}</strong></> : null}. Buka link pada email tersebut untuk membuat password dan mengaktifkan akun. Tidak diperlukan approval admin.
      </p>
      <div className="mx-auto mt-7 flex max-w-md items-start gap-4 rounded-xl border border-white/10 bg-black/20 p-4 text-left"><ShieldCheck className="mt-1 size-6 shrink-0 text-rose-400" /><div><p className="font-semibold">Link berlaku terbatas</p><p className="mt-1 text-sm text-slate-400">Gunakan link create password sebelum kedaluwarsa dan jangan bagikan kepada siapa pun.</p></div></div>
      {developmentUrl && (
        <a href={developmentUrl} className="glow-button mx-auto mt-8 inline-flex h-12 w-full max-w-md items-center justify-center gap-2 rounded-lg font-semibold">
          Buka Link Create Password Lokal <ExternalLink className="size-4" />
        </a>
      )}
      {developmentUrl && <p className="mt-3 text-xs text-cyan-200">Tombol ini hanya muncul saat backend memakai MAIL_TRANSPORT=log.</p>}
      <Link href="/login" className={`${developmentUrl ? "mt-5" : "mt-8"} block text-sm text-slate-400 hover:text-rose-400`}>Kembali ke halaman login</Link>
    </div>
  );
}

function ErrorNotice({ message }: { message: string }) {
  return <div role="alert" className="mt-5 rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">{message}</div>;
}
