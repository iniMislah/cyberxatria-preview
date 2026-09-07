import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, Camera, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#02040a] py-12">
      <div className="page-grid grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image src="/images/cyberxatria-logo.png" alt="CyberXatria" width={426} height={114} className="mb-4 h-auto w-48" />
          <p className="max-w-sm text-sm leading-6 text-slate-400">Platform cybersecurity terintegrasi untuk membantu organisasi mempersiapkan diri, mendeteksi ancaman, dan merespons insiden.</p>
          <div className="mt-5 flex gap-3 text-slate-400">
            <a href="#" aria-label="Instagram" className="grid size-9 place-items-center rounded-lg border border-white/10 hover:border-rose-500/50 hover:text-rose-400"><Camera className="size-4" /></a>
            <a href="#" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-lg border border-white/10 hover:border-rose-500/50 hover:text-rose-400"><BriefcaseBusiness className="size-4" /></a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Solusi Kami</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-rose-400" href="/solutions/soc">SOC as a Service</Link>
            <Link className="block hover:text-rose-400" href="/solutions/cyber-drill">Cyber Drill Exercise</Link>
            <Link className="block hover:text-rose-400" href="/solutions/tabletop">Tabletop Exercise</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Perusahaan</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-rose-400" href="/company">Tentang Kami</Link>
            <Link className="block hover:text-rose-400" href="/request-demo">Request Demo</Link>
            <Link className="block hover:text-rose-400" href="/pricing">Pricing</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Kontak Kami</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <a className="flex items-center gap-2 hover:text-rose-400" href="mailto:cyberxatria@snc.id"><Mail className="size-4 text-rose-500" /> cyberxatria@snc.id</a>
            <a className="flex items-center gap-2 hover:text-rose-400" href="tel:+628575365051"><Phone className="size-4 text-rose-500" /> +62 857-536-5051</a>
            <p className="flex items-center gap-2"><MapPin className="size-4 text-rose-500" /> Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
      <div className="page-grid mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 CyberXatria. Semua hak dilindungi.</p>
        <div className="flex gap-5"><a href="#">Kebijakan Privasi</a><a href="#">Syarat & Ketentuan</a></div>
      </div>
    </footer>
  );
}
