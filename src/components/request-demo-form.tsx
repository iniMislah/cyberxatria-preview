"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RequestDemoForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="cyber-card rounded-3xl p-8 text-center sm:p-10"><CheckCircle2 className="mx-auto size-16 text-emerald-400" /><h2 className="mt-5 text-2xl font-bold">Permintaan Demo Diterima</h2><p className="mt-3 leading-7 text-slate-400">Tim CyberXatria akan menghubungi Anda untuk menentukan jadwal demo.</p><button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-rose-400">Kirim permintaan lain</button></div>;
  return <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="cyber-card rounded-3xl p-6 sm:p-8">
    <h2 className="text-2xl font-bold">Request Demo</h2><p className="mt-2 text-sm text-slate-400">Lengkapi informasi di bawah ini. Seluruh kolom wajib diisi.</p>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      {[{id:"name",label:"Nama Lengkap",placeholder:"Nama Anda",type:"text"},{id:"company",label:"Perusahaan / Organisasi",placeholder:"Nama organisasi",type:"text"},{id:"email",label:"Business Email",placeholder:"nama@perusahaan.com",type:"email"},{id:"phone",label:"Nomor Telepon",placeholder:"+62 812-3456-7890",type:"tel"},{id:"country",label:"HQ Country",placeholder:"Indonesia",type:"text"},{id:"interest",label:"Solusi yang Diminati",placeholder:"SOC / Cyber Drill / Tabletop",type:"text"}].map(field => <div key={field.id}><Label htmlFor={field.id}>{field.label} *</Label><Input id={field.id} required type={field.type} placeholder={field.placeholder} className="mt-2 h-12 border-white/10 bg-white/[0.025] px-4 focus-visible:border-rose-500/70 focus-visible:ring-rose-500/20" /></div>)}
    </div>
    <Button type="submit" className="glow-button mt-7 h-12 w-full text-base">Request Demo <Send className="size-4" /></Button>
  </form>;
}
