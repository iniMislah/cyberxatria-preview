"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type Mode = "login" | "signup" | "verify" | "success";

const inputClass = "h-12 border-white/10 bg-white/[0.025] px-4 text-white placeholder:text-slate-600 focus-visible:border-rose-500/70 focus-visible:ring-rose-500/20";

export function AuthExperience({ mode }: { mode: Mode }) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const isLogin = mode === "login";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "signup") router.push("/verify-account");
    if (mode === "verify") router.push("/account-created");
    if (mode === "login") router.push("/dashboard");
  }

  return <main className="site-shell min-h-screen bg-[#03060d] text-white">
    <SiteHeader />
    <section className="relative overflow-hidden py-14 lg:py-20">
      <div className="dot-field absolute inset-0 opacity-15 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <div className="page-grid relative">
        {mode === "success" ? (
          <div className="cyber-card mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12">
            <div className="mx-auto grid size-24 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_50px_rgba(34,197,94,.16)]"><Check className="size-12 text-emerald-400" /></div>
            <h1 className="mt-8 text-3xl font-bold sm:text-4xl">Akun Anda <span className="text-emerald-400">Berhasil Diverifikasi!</span></h1>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">Email dan nomor telepon Anda telah berhasil diverifikasi. Akun CyberXatria sekarang aman dan siap digunakan.</p>
            <div className="mx-auto mt-7 flex max-w-md items-start gap-4 rounded-xl border border-white/10 bg-black/20 p-4 text-left"><ShieldCheck className="mt-1 size-6 shrink-0 text-rose-400" /><div><p className="font-semibold">Akun Anda kini lebih aman</p><p className="mt-1 text-sm text-slate-400">Verifikasi OTP membantu melindungi akses yang tidak sah.</p></div></div>
            <Link href="/login" className="glow-button mt-8 inline-flex h-12 w-full max-w-md items-center justify-center rounded-lg font-semibold">Masuk ke Akun Saya</Link>
            <Link href="/" className="mt-5 block text-sm text-slate-400 hover:text-rose-400">Kembali ke beranda</Link>
          </div>
        ) : (
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#070b13] shadow-2xl lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative hidden min-h-[690px] overflow-hidden border-r border-white/10 lg:block">
              <Image src="/images/cyber-shield-hero.png" alt="CyberXatria secure access" fill sizes="45vw" className="object-cover object-[72%_center] opacity-65" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050911]/20 to-[#050911]/80" />
              <div className="absolute inset-0 flex flex-col justify-between p-10">
                <div><p className="eyebrow">Secure access</p><h1 className="mt-5 max-w-md text-4xl font-bold leading-tight">{isLogin ? <>Selamat datang kembali di <span className="text-gradient">CyberXatria</span></> : <>Mulai Lindungi Bisnis Anda Bersama <span className="text-gradient">CyberXatria</span></>}</h1><p className="mt-5 max-w-sm leading-7 text-slate-300">{isLogin ? "Masuk untuk mengakses layanan keamanan dan meningkatkan kesiapan organisasi Anda." : "Buat akun untuk mengakses layanan keamanan siber terbaik dan tingkatkan ketahanan organisasi Anda."}</p></div>
                <div className="space-y-3">{["Keamanan proaktif", "Kesiapan berkelanjutan", "Pendekatan terintegrasi", "Insight yang actionable"].map(item => <div key={item} className="flex items-center gap-3 text-sm text-slate-300"><span className="grid size-8 place-items-center rounded-lg border border-rose-500/30 bg-rose-500/10"><Check className="size-4 text-rose-400" /></span>{item}</div>)}</div>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              {mode === "verify" ? (
                <form onSubmit={submit} className="mx-auto max-w-lg">
                  <div className="mb-10 flex items-center gap-2 text-xs font-semibold text-slate-500"><span className="grid size-7 place-items-center rounded-full bg-rose-500 text-white">1</span><span>Informasi Akun</span><span className="h-px flex-1 bg-rose-500/40" /><span className="grid size-7 place-items-center rounded-full bg-rose-500 text-white">2</span><span className="text-white">Verifikasi OTP</span></div>
                  <p className="eyebrow">Verifikasi keamanan</p><h2 className="mt-5 text-3xl font-bold">Verifikasi OTP</h2><p className="mt-3 text-sm leading-6 text-slate-400">Masukkan kode OTP yang telah kami kirimkan ke email atau nomor telepon Anda.</p>
                  <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"><p className="flex items-center gap-3"><Mail className="size-4 text-rose-400" /> nama@perusahaan.com</p><p className="flex items-center gap-3"><Phone className="size-4 text-rose-400" /> +62 812-3456-7890</p></div>
                  <Label className="mt-7">Kode OTP *</Label><div className="mt-3 grid grid-cols-6 gap-2">{Array.from({length: 6}).map((_, index) => <Input key={index} aria-label={`Digit OTP ${index + 1}`} inputMode="numeric" maxLength={1} className="h-14 border-white/15 bg-black/20 p-0 text-center text-xl font-bold focus-visible:border-rose-500" />)}</div>
                  <p className="mt-3 text-xs text-slate-500">Kode OTP akan kedaluwarsa dalam <span className="font-bold text-rose-400">05:00</span></p>
                  <Button type="submit" className="glow-button mt-8 h-12 w-full text-base">Verifikasi</Button>
                  <p className="mt-6 text-center text-sm text-slate-500">Belum menerima kode? <button type="button" className="font-semibold text-rose-400">Kirim ulang kode sekarang</button></p>
                </form>
              ) : (
                <form onSubmit={submit} className="mx-auto max-w-lg">
                  <div className="mb-8 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-700 to-red-500 shadow-[0_0_35px_rgba(244,63,94,.22)]">{isLogin ? <LockKeyhole /> : <UserRound />}</div>
                  <h2 className="text-3xl font-bold">{isLogin ? "Masuk ke Akun Anda" : "Buat Akun"}</h2><p className="mt-3 text-sm text-slate-400">{isLogin ? "Masukkan email dan password untuk melanjutkan." : "Lengkapi data di bawah ini untuk membuat akun Anda."}</p>
                  <div className="mt-8 space-y-5">
                    {isSignup && <div><Label htmlFor="name">Nama Lengkap *</Label><Input id="name" required placeholder="Masukkan nama lengkap Anda" className={`${inputClass} mt-2`} /></div>}
                    <div><Label htmlFor="email">Email Bisnis *</Label><Input id="email" type="email" required placeholder="nama@perusahaan.com" className={`${inputClass} mt-2`} /></div>
                    {isSignup && <div><Label htmlFor="phone">Nomor Telepon *</Label><Input id="phone" type="tel" required placeholder="812-3456-7890" className={`${inputClass} mt-2`} /></div>}
                    <div><div className="flex justify-between"><Label htmlFor="password">Password *</Label>{isLogin && <a href="#" className="text-xs text-rose-400">Lupa password?</a>}</div><Input id="password" type="password" required placeholder="Masukkan password Anda" className={`${inputClass} mt-2`} />{isSignup && <p className="mt-2 text-xs leading-5 text-slate-500">Minimal 8 karakter dengan kombinasi huruf besar, kecil, angka, dan karakter khusus.</p>}</div>
                    {isSignup && <div className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex gap-3"><ShieldCheck className="size-6 shrink-0 text-rose-400" /><div><p className="text-sm font-semibold">Verifikasi Keamanan (MFA)</p><p className="mt-1 text-xs leading-5 text-slate-500">Kami akan mengirimkan kode OTP ke email atau nomor telepon untuk verifikasi.</p></div></div></div>}
                    <div className="flex items-start gap-3"><Checkbox id="remember" required={isSignup} className="mt-0.5" /><Label htmlFor="remember" className="text-xs font-normal leading-5 text-slate-400">{isSignup ? <>Saya telah membaca dan menyetujui <a href="#" className="text-rose-400">Syarat & Ketentuan</a> serta <a href="#" className="text-rose-400">Kebijakan Privasi</a>.</> : "Ingat saya"}</Label></div>
                  </div>
                  <Button type="submit" className="glow-button mt-7 h-12 w-full text-base">{isLogin ? "Masuk" : "Buat Akun"}</Button>
                  {isLogin && <div className="mt-7"><div className="flex items-center gap-3 text-xs text-slate-600"><span className="h-px flex-1 bg-white/10" />atau masuk dengan<span className="h-px flex-1 bg-white/10" /></div><div className="mt-4 grid grid-cols-2 gap-3"><button type="button" className="h-11 rounded-lg border border-white/10 bg-black/20 text-sm hover:border-white/20">Google</button><button type="button" className="h-11 rounded-lg border border-white/10 bg-black/20 text-sm hover:border-white/20">Microsoft</button></div></div>}
                  <p className="mt-7 text-center text-sm text-slate-500">{isLogin ? "Belum memiliki akun?" : "Sudah memiliki akun?"} <Link href={isLogin ? "/signup" : "/login"} className="font-semibold text-rose-400">{isLogin ? "Buat akun di sini" : "Masuk di sini"}</Link></p>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
    <SiteFooter />
  </main>;
}
