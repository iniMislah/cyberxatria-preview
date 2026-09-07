import type { Metadata } from "next";
import { Activity, BellRing, Binoculars, ChartNoAxesCombined, Clock3, Eye, Gauge, RadioTower, ScanSearch, ShieldCheck, Siren, UsersRound } from "lucide-react";
import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = { title: "SOC as a Service", description: "Monitoring, deteksi, dan respons ancaman keamanan 24/7 bersama SOC CyberXatria." };

export default function SocPage() {
  return <ServicePage
    eyebrow="Security Operations Center"
    title="Monitor. Detect."
    accent="Respond."
    summary="Lindungi infrastruktur digital Anda dengan monitoring keamanan siber yang membantu mendeteksi, menganalisis, dan merespons ancaman secara cepat dan terukur."
    image="/images/cyber-shield-hero.png"
    imageAlt="Operasi keamanan digital CyberXatria"
    aboutTitle="Apa itu SOC CyberXatria?"
    about={["Security Operations Center (SOC) adalah layanan terpusat yang memantau aktivitas keamanan pada lingkungan IT organisasi untuk mengidentifikasi potensi ancaman, menganalisis indikasi serangan, dan membantu proses respons terhadap insiden.", "SOC CyberXatria memberikan visibilitas terhadap kondisi keamanan sehingga potensi ancaman dapat diketahui dan ditindaklanjuti sebelum berkembang menjadi insiden yang lebih besar."]}
    challenges={[
      { icon: Eye, title: "Ancaman Sulit Dipantau", text: "Aktivitas keamanan tersebar di berbagai sistem dan perlu dipantau secara terus-menerus." },
      { icon: BellRing, title: "Alert Overload", text: "Alert terlalu banyak dan sulit diprioritaskan oleh tim internal." },
      { icon: UsersRound, title: "Keterbatasan Keahlian", text: "Tenaga dan keahlian cybersecurity belum mencukupi kebutuhan operasional." },
      { icon: ScanSearch, title: "Visibilitas Terbatas", text: "Aktivitas mencurigakan sulit terlihat tanpa monitoring yang terintegrasi." },
      { icon: Siren, title: "Respons Belum Terkoordinasi", text: "Penanganan insiden membutuhkan alur eskalasi dan peran yang jelas." },
      { icon: Clock3, title: "Kebutuhan Monitoring 24/7", text: "Ancaman dapat terjadi kapan saja, termasuk di luar jam operasional." },
    ]}
    features={[
      { icon: RadioTower, title: "Security Monitoring", text: "Monitoring aktivitas keamanan untuk membantu mengidentifikasi potensi ancaman." },
      { icon: ScanSearch, title: "Threat Detection", text: "Mendeteksi aktivitas atau pola yang berindikasi sebagai ancaman keamanan." },
      { icon: Siren, title: "Alert & Incident Handling", text: "Memberikan alert dan membantu proses penanganan potensi insiden." },
      { icon: ChartNoAxesCombined, title: "Security Reporting", text: "Laporan dan insight terkait aktivitas keamanan lingkungan yang dimonitor." },
      { icon: Binoculars, title: "Vulnerability Monitoring", text: "Memantau eksposur dan membantu memprioritaskan risiko yang perlu ditangani." },
      { icon: ShieldCheck, title: "Security Expert Support", text: "Dukungan tim security untuk analisis dan tindak lanjut terhadap temuan." },
    ]}
    flow={["Data Source", "Monitoring", "Threat Detection", "Analysis", "Alert / Incident", "Response", "Report & Improvement"]}
    packages={[
      { name: "SOC Lite", description: "Entry-level reactive SOC untuk organisasi dengan cakupan aset terbatas.", items: ["Layanan 8 × 5 hari kerja", "First response 30 menit", "SD-WAN & endpoint", "Incident response reaktif", "SLA best effort"] },
      { name: "SOC Essential", description: "Pemantauan dan respons berkelanjutan untuk seluruh aset terintegrasi.", featured: true, items: ["Monitoring 24 × 7", "First response 15 menit", "Seluruh tipe aset", "Incident response reaktif", "SLA 95%"] },
      { name: "SOC Advanced", description: "Threat hunting proaktif dan SLA tinggi untuk risiko yang lebih kompleks.", items: ["Monitoring 24 × 7", "Respons reaktif + proaktif", "Threat hunting 4× / tahun", "Annual Cyber Drill", "SLA 99%"] },
    ]}
    audience={["Memiliki infrastruktur IT yang kompleks", "Membutuhkan monitoring keamanan berkelanjutan", "Memiliki keterbatasan security personnel", "Ingin meningkatkan kemampuan detection & response", "Membutuhkan dukungan security operation"]}
    benefits={[
      { icon: Gauge, title: "Deteksi Lebih Cepat", text: "Identifikasi indikasi ancaman sebelum berdampak lebih luas." },
      { icon: Activity, title: "Dampak Insiden Berkurang", text: "Percepat respons dan minimalkan gangguan operasional." },
      { icon: Eye, title: "Visibilitas Lebih Baik", text: "Dapatkan gambaran keamanan lintas lingkungan IT." },
      { icon: ShieldCheck, title: "Kesiapan Kepatuhan", text: "Dukungan reporting untuk kebutuhan audit dan regulasi." },
    ]}
    ctaTitle="Tingkatkan visibilitas. Percepat respons. Lindungi bisnis Anda."
  />;
}
