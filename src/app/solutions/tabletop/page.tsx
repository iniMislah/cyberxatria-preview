import type { Metadata } from "next";
import { BookOpenCheck, ClipboardCheck, FileCheck2, Gavel, Landmark, Megaphone, MessageSquareText, Network, Scale, ShieldCheck, Siren, UsersRound } from "lucide-react";
import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = { title: "Tabletop Exercise", description: "Simulasi krisis siber untuk menguji keputusan eksekutif, koordinasi, dan kesiapan organisasi." };

export default function TabletopPage() {
  return <ServicePage
    eyebrow="Tabletop Exercise"
    title="Prepare Your Leaders."
    accent="Strengthen Response."
    summary="Simulasi krisis tingkat eksekutif untuk menguji pengambilan keputusan, komunikasi, dan kesiapan organisasi menghadapi insiden siber."
    image="/images/tabletop-hero.png"
    imageAlt="Simulasi krisis siber untuk eksekutif"
    aboutTitle="Apa itu Tabletop Exercise?"
    about={["Tabletop Exercise adalah simulasi berbasis diskusi yang membantu pimpinan dan stakeholder menguji respons terhadap skenario krisis siber tanpa mengganggu sistem operasional.", "Peserta menghadapi perkembangan skenario secara bertahap, mengambil keputusan, berkoordinasi, dan mengevaluasi kesiapan prosedur organisasi."]}
    challenges={[
      { icon: Gavel, title: "Keputusan Belum Teruji", text: "Pimpinan belum memiliki pengalaman mengambil keputusan saat krisis siber." },
      { icon: MessageSquareText, title: "Komunikasi Terfragmentasi", text: "Alur komunikasi internal dan eksternal belum terkoordinasi." },
      { icon: Siren, title: "Eskalasi Tidak Jelas", text: "Trigger eskalasi serta pemilik keputusan belum terdefinisi dengan baik." },
      { icon: Megaphone, title: "Risiko Reputasi", text: "Respons publik yang lambat dapat memperbesar dampak reputasi." },
      { icon: Scale, title: "Kewajiban Regulasi", text: "Tim perlu memahami batas waktu dan tanggung jawab pelaporan." },
      { icon: Network, title: "Ketergantungan Pihak Ketiga", text: "Peran vendor dan partner belum tervalidasi ketika krisis terjadi." },
    ]}
    features={[
      { icon: BookOpenCheck, title: "Realistic Scenario", text: "Skenario krisis disusun berdasarkan profil risiko dan industri organisasi." },
      { icon: UsersRound, title: "Executive Facilitation", text: "Diskusi terarah untuk manajemen, business owner, legal, dan tim teknis." },
      { icon: Siren, title: "Crisis Simulation", text: "Inject skenario bertahap untuk menguji respons terhadap perubahan situasi." },
      { icon: MessageSquareText, title: "Communication Review", text: "Evaluasi koordinasi, eskalasi, dan komunikasi dengan stakeholder." },
      { icon: ClipboardCheck, title: "Readiness Assessment", text: "Penilaian keputusan, proses, peran, dan kontrol organisasi." },
      { icon: FileCheck2, title: "Action Plan", text: "Gap analysis, lessons learned, dan roadmap peningkatan yang terukur." },
    ]}
    flow={["Preparation", "Scenario Design", "Exercise Session", "Decision & Response", "Evaluation", "Report", "Action Plan"]}
    packages={[
      { name: "Executive Readiness", description: "Latihan ringkas untuk memvalidasi pengambilan keputusan pimpinan.", items: ["Executive scenario", "Decision checkpoints", "Crisis communication", "Readiness summary", "Action items"] },
      { name: "Enterprise Exercise", description: "Simulasi lintas fungsi dengan skenario krisis yang berkembang.", featured: true, items: ["Cross-functional exercise", "Multi-stage injects", "Facilitated discussion", "Comprehensive gap analysis", "Executive report"] },
      { name: "Custom Crisis Scenario", description: "Simulasi yang dirancang khusus berdasarkan risiko dan regulasi.", items: ["Industry-specific scenario", "Third-party involvement", "Regulatory injects", "Custom assessment", "Improvement roadmap"] },
    ]}
    audience={["Board of Directors", "CEO / COO", "CISO dan IT Leadership", "Legal & Compliance", "Corporate Communication", "Business Continuity Team"]}
    benefits={[
      { icon: Gavel, title: "Executive Readiness", text: "Pimpinan memahami keputusan penting yang harus diambil saat krisis." },
      { icon: Network, title: "Koordinasi Lebih Baik", text: "Selaraskan komunikasi dan tanggung jawab lintas fungsi." },
      { icon: ShieldCheck, title: "Risk Awareness", text: "Pahami risiko bisnis serta dampak operasional dari insiden siber." },
      { icon: Landmark, title: "Compliance Support", text: "Uji kesiapan memenuhi kewajiban regulasi dan pelaporan." },
    ]}
    ctaTitle="Persiapkan organisasi Anda menghadapi krisis siber berikutnya."
  />;
}
