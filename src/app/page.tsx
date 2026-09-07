import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Check,
  DatabaseZap,
  Factory,
  Landmark,
  LockKeyhole,
  Network,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const threats = [
  { icon: LockKeyhole, label: "Ransomware Trend", value: "49%", note: "grup ransomware aktif", tone: "text-fuchsia-500" },
  { icon: ShieldAlert, label: "Phishing Trend", value: "13.8%", note: "serangan phishing", tone: "text-rose-500" },
  { icon: DatabaseZap, label: "Data Breach Trend", value: "22.000+", note: "data breach terkonfirmasi", tone: "text-red-500" },
  { icon: UsersRound, label: "Insider Threat", value: "US$19.5M", note: "rata-rata biaya risiko tahunan", tone: "text-orange-400" },
];

const impacts = [
  { icon: ShieldAlert, title: "Serangan Siber", text: "Kerentanan dieksploitasi oleh penyerang." },
  { icon: DatabaseZap, title: "Kebocoran Data", text: "Data sensitif organisasi dikompromikan." },
  { icon: BadgeDollarSign, title: "Dampak Finansial", text: "Kerugian dan gangguan operasional." },
  { icon: LockKeyhole, title: "Dampak Kepatuhan", text: "Denda, sanksi, dan kewajiban hukum." },
  { icon: UsersRound, title: "Dampak Reputasi", text: "Kepercayaan pelanggan dan citra menurun." },
];

const services = [
  { icon: Radar, title: "SOC as a Service", href: "/solutions/soc", text: "Monitoring keamanan 24/7 untuk mendeteksi, menganalisis, dan merespons ancaman secara real-time.", points: ["Security Monitoring", "Threat Detection", "Incident Response", "Security Reporting"] },
  { icon: Target, title: "Cyber Drill Exercise", href: "/solutions/cyber-drill", text: "Simulasi serangan teknis yang realistis untuk menguji kemampuan deteksi dan respons organisasi.", points: ["Simulated Attack", "Blue Team Validation", "Gap Assessment", "Performance Evaluation"] },
  { icon: UsersRound, title: "Tabletop Exercise", href: "/solutions/tabletop", text: "Simulasi krisis berbasis skenario untuk menguji keputusan, koordinasi, dan prosedur respons.", points: ["Crisis Simulation", "Executive Readiness", "Stakeholder Coordination", "Action Plan"] },
];

const industries = [
  { icon: Factory, name: "Manufaktur", text: "Melindungi sistem produksi dan data operasional." },
  { icon: Landmark, name: "Perbankan", text: "Menjaga transaksi, data nasabah, dan kepatuhan." },
  { icon: Building2, name: "Pemerintahan", text: "Memperkuat keamanan sistem dan data publik." },
  { icon: Network, name: "Infrastruktur", text: "Menjaga layanan dan sistem kritikal tetap tersedia." },
];

export default function Home() {
  return (
    <main className="site-shell min-h-screen bg-[#03060d] text-white">
      <SiteHeader />

      <section className="relative min-h-[720px] overflow-hidden border-b border-white/5">
        <Image src="/images/cyber-shield-hero.png" alt="Perisai digital CyberXatria" fill priority sizes="100vw" className="object-cover object-[66%_center] opacity-90" />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03060d] via-transparent to-transparent" />
        <div className="page-grid relative z-10 flex min-h-[690px] items-center py-24">
          <div className="max-w-[660px] pt-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-rose-300">
              <ShieldCheck className="size-4" /> Cyber readiness platform
            </div>
            <h1 className="text-5xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-6xl lg:text-[74px]">Deteksi Lebih Cepat.<br />Respons Lebih Tepat.<br /><span className="text-gradient">Tetap Terlindungi.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Lindungi organisasi Anda melalui SOC 24/7, Cyber Drill Exercise yang realistis, dan Tabletop Exercise strategis dalam satu ekosistem terintegrasi.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="glow-button inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold transition hover:brightness-110"><ShieldCheck className="size-5" /> Coba Gratis</Link>
              <Link href="#solutions" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-black/20 px-6 font-semibold backdrop-blur-sm transition hover:border-rose-500/60 hover:bg-rose-500/8">Lihat Solusi <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="page-grid">
          <div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Tren ancaman siber</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Ancaman Bersifat <span className="text-gradient">Global</span></h2><p className="mt-4 text-slate-400">Organisasi membutuhkan kesiapan yang selalu aktif untuk menghadapi risiko yang terus berkembang.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {threats.map((item) => <div key={item.label} className="cyber-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-rose-500/50"><item.icon className={`mb-7 size-9 ${item.tone}`} /><p className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</p><p className={`mt-3 text-4xl font-black ${item.tone}`}>{item.value}</p><p className="mt-2 text-sm text-slate-500">{item.note}</p></div>)}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-orange-500/25 bg-orange-500/5 px-5 py-4 text-sm text-slate-300"><ShieldAlert className="mt-0.5 size-5 shrink-0 text-orange-400" /><p>Ancaman siber tidak mengenal batas. Satu insiden dapat berdampak besar pada bisnis, reputasi, dan kepercayaan.</p></div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#070a12] py-24">
        <div className="page-grid"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Cyber resilience</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Mengapa <span className="text-gradient">Kesiapan Siber</span> Penting?</h2><p className="mt-4 text-slate-400">Kesiapan siber membantu organisasi menghadapi rangkaian dampak sebelum sebuah ancaman berkembang menjadi krisis.</p></div>
          <div className="grid gap-3 md:grid-cols-5">{impacts.map((item, index) => <div key={item.title} className="relative rounded-2xl border border-white/8 bg-[#0a0e17] p-5 text-center"><div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl border border-rose-500/30 bg-rose-500/8 text-rose-400"><item.icon className="size-6" /></div><h3 className="text-sm font-bold uppercase text-rose-400">{item.title}</h3><p className="mt-2 text-xs leading-5 text-slate-400">{item.text}</p>{index < impacts.length - 1 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden size-6 -translate-y-1/2 text-rose-700 md:block" />}</div>)}</div>
        </div>
      </section>

      <section id="solutions" className="relative py-24">
        <div className="dot-field absolute inset-x-0 top-0 h-52 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="page-grid relative"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Perlindungan terintegrasi</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Solusi <span className="text-gradient">Kami</span></h2><p className="mt-4 text-slate-400">Layanan keamanan siber untuk memantau, menguji, dan memperkuat kesiapan organisasi.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">{services.map((service) => <article key={service.title} className="cyber-card flex min-h-[390px] flex-col rounded-2xl p-7 transition hover:-translate-y-1 hover:border-rose-500/55"><div className="mb-6 grid size-12 place-items-center rounded-xl border border-rose-500/35 bg-rose-500/8 text-rose-400"><service.icon className="size-6" /></div><h3 className="text-xl font-bold">{service.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{service.text}</p><ul className="mt-6 space-y-3 text-sm text-slate-300">{service.points.map((point) => <li key={point} className="flex items-center gap-2"><Check className="size-4 text-rose-500" /> {point}</li>)}</ul><Link href={service.href} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-rose-400 hover:text-rose-300">Pelajari Lebih Lanjut <ArrowRight className="size-4" /></Link></article>)}</div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#070a12] py-24">
        <div className="page-grid"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Pendekatan kami</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Kenapa <span className="text-gradient">Memilih Kami?</span></h2></div>
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-[#090d15] p-7"><h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500">Pendekatan Tradisional</h3><ul className="space-y-4 text-sm text-slate-400">{["Keamanan reaktif", "Penilaian pada satu titik waktu", "Manual dan terfragmentasi", "Merespons setelah insiden", "Pelaporan berfokus pada teknis", "Latihan dilakukan secara berkala"].map((item) => <li key={item} className="flex gap-3"><span className="text-slate-600">○</span>{item}</li>)}</ul></div><div className="cyber-card rounded-2xl p-7 shadow-[0_0_60px_rgba(244,63,94,0.08)]"><h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-rose-400">Pendekatan CyberXatria</h3><ul className="space-y-4 text-sm text-slate-200">{["Keamanan proaktif", "Kesiapan berkelanjutan", "Pendekatan terintegrasi", "Bersiap sebelum insiden terjadi", "Insight bisnis yang dapat ditindaklanjuti", "Pengujian berbasis skenario"].map((item) => <li key={item} className="flex gap-3"><Check className="size-4 shrink-0 text-rose-500" />{item}</li>)}</ul></div></div>
        </div>
      </section>

      <section className="py-24"><div className="page-grid"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow justify-center">Dipercaya berbagai industri</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Ketahanan untuk Setiap <span className="text-gradient">Sektor</span></h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{industries.map((industry) => <div key={industry.name} className="rounded-2xl border border-white/10 bg-[#080c14] p-6 text-center transition hover:border-orange-500/40"><industry.icon className="mx-auto size-10 text-rose-500" /><h3 className="mt-5 font-bold uppercase">{industry.name}</h3><p className="mt-2 text-xs leading-5 text-slate-400">{industry.text}</p></div>)}</div></div></section>

      <section className="pb-24"><div className="page-grid overflow-hidden rounded-3xl border border-rose-500/30 bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,0.20),transparent_34%),linear-gradient(135deg,#0b0f19,#05070c)] px-6 py-12 text-center sm:px-12 lg:flex lg:items-center lg:justify-between lg:text-left"><div><p className="text-sm font-bold uppercase tracking-widest text-rose-400">Siap meningkatkan kesiapan?</p><h2 className="mt-3 text-3xl font-bold">Bangun ketahanan siber sebelum insiden terjadi.</h2></div><Link href="/request-demo" className="glow-button mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold lg:mt-0">Request Demo <ArrowRight className="size-4" /></Link></div></section>

      <SiteFooter />
    </main>
  );
}
