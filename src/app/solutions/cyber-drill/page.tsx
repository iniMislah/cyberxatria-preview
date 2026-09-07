import type { Metadata } from "next";
import { Activity, BrainCircuit, Crosshair, Gauge, Network, Radar, RotateCcw, ScanSearch, ShieldCheck, Timer, UsersRound, Workflow } from "lucide-react";
import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = { title: "Cyber Drill Exercise", description: "Uji kesiapan teknis organisasi melalui simulasi serangan siber yang realistis dan terukur." };

export default function CyberDrillPage() {
  return <ServicePage
    eyebrow="Cyber Drill Exercise"
    title="Simulate. Respond."
    accent="Improve."
    summary="Uji kemampuan organisasi menghadapi serangan siber melalui simulasi serangan yang realistis, aman, dan terukur."
    image="/images/cyber-drill-hero.png"
    imageAlt="Simulasi serangan siber CyberXatria"
    aboutTitle="Apa itu Cyber Drill?"
    about={["Cyber Drill adalah latihan simulasi serangan siber yang dirancang untuk menguji kesiapan organisasi dalam mendeteksi, merespons, dan menangani serangan siber.", "Skenario yang menyerupai kondisi nyata membantu organisasi menemukan kelemahan pada proses, teknologi, koordinasi, dan kemampuan tim sebelum menghadapi insiden sebenarnya."]}
    challenges={[
      { icon: Gauge, title: "Kesiapan Belum Terukur", text: "Organisasi belum mengetahui seberapa siap menghadapi serangan nyata." },
      { icon: Crosshair, title: "Minim Pengalaman", text: "Tim belum terbiasa menangani serangan dalam lingkungan terkontrol." },
      { icon: Workflow, title: "Prosedur Belum Teruji", text: "Incident response plan belum pernah diuji dari awal hingga akhir." },
      { icon: UsersRound, title: "Koordinasi Belum Optimal", text: "Peran dan komunikasi antartim belum tervalidasi saat tekanan tinggi." },
      { icon: ScanSearch, title: "Gap Tidak Terlihat", text: "Kesenjangan detection dan response sulit ditemukan tanpa latihan." },
      { icon: Timer, title: "Response Time", text: "Efektivitas waktu respons belum memiliki benchmark yang jelas." },
    ]}
    features={[
      { icon: Crosshair, title: "Attack Simulation", text: "Simulasi serangan berdasarkan skenario yang telah ditentukan." },
      { icon: ShieldCheck, title: "Blue Team Exercise", text: "Menguji kemampuan tim dalam mendeteksi dan merespons serangan." },
      { icon: Radar, title: "Red Team Simulation", text: "Mensimulasikan aktivitas attacker untuk menguji kemampuan pertahanan." },
      { icon: BrainCircuit, title: "Custom Scenario", text: "Skenario disesuaikan dengan tujuan dan kebutuhan organisasi." },
      { icon: Activity, title: "Performance Assessment", text: "Mengukur performa tim selama exercise berlangsung." },
      { icon: RotateCcw, title: "Post-Exercise Report", text: "Temuan, gap analysis, evaluasi respons, dan rekomendasi perbaikan." },
    ]}
    flow={["Identify", "Detect", "Respond", "Contain", "Recover", "Evaluate", "Improve"]}
    packages={[
      { name: "Regular Scenario", description: "Skenario terstruktur untuk mengukur kesiapan dasar tim pertahanan.", items: ["Standard attack scenario", "Blue Team exercise", "Detection assessment", "Readiness score", "Exercise report"] },
      { name: "Cyber Drill Advanced", description: "Skenario serangan lanjutan dengan evaluasi Red & Blue Team.", featured: true, items: ["Advanced attack scenario", "Red & Blue Team", "Detection & response assessment", "Performance evaluation", "Detailed report"] },
      { name: "Customized Scenario", description: "Skenario, attack path, dan lingkup exercise disesuaikan kebutuhan.", items: ["Customized scenario", "Customized attack path", "Cross-team exercise", "Comprehensive assessment", "Improvement recommendation"] },
    ]}
    audience={["IT & Security Team", "SOC / CSIRT", "Blue Team", "Network & Infrastructure Team", "Incident Response Team", "Management & Business Stakeholder"]}
    benefits={[
      { icon: Gauge, title: "Ukur Kesiapan", text: "Dapatkan benchmark readiness berbasis performa selama latihan." },
      { icon: ScanSearch, title: "Temukan Gap", text: "Identifikasi kelemahan pada people, process, dan technology." },
      { icon: Timer, title: "Percepat Respons", text: "Latih tim mengambil tindakan yang tepat dalam waktu terbatas." },
      { icon: Network, title: "Perkuat Koordinasi", text: "Validasi alur komunikasi dan eskalasi lintas fungsi." },
    ]}
    ctaTitle="Uji kesiapan organisasi Anda sebelum penyerang sebenarnya melakukannya."
  />;
}
