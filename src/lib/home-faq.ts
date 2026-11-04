import type { Localized } from "@/lib/public-preferences";

export type FaqEntry = {
  question: string;
  answer: string;
  link: { href: string; label: string };
};

export const homeFaq: Localized<{ title: string; entries: FaqEntry[] }> = {
  id: {
    title: "Pertanyaan yang Sering Diajukan",
    entries: [
      {
        question: "Apa itu CyberXatria dan bagaimana platform ini membantu kesiapan keamanan siber?",
        answer: "CyberXatria merupakan ekosistem pembelajaran dan latihan keamanan siber untuk membantu individu dan organisasi membangun kompetensi serta kesiapan menghadapi ancaman. Melalui pelatihan, praktik, dan simulasi berbasis skenario nyata, CyberXatria membantu tim mengembangkan kemampuan teknis, koordinasi, dan pengambilan keputusan saat menghadapi insiden siber.",
        link: { href: "/company", label: "Tentang CyberXatria" },
      },
      {
        question: "Layanan apa saja yang tersedia di CyberXatria?",
        answer: "CyberXatria menampilkan Cyber Drill Exercise, Tabletop Exercise, serta AI for SOC yang saat ini ditandai sebagai layanan yang akan hadir. Situs ini juga menjelaskan program pembelajaran dan pelatihan keamanan siber untuk individu dan organisasi.",
        link: { href: "/#solutions", label: "Lihat layanan CyberXatria" },
      },
      {
        question: "Apa perbedaan Cyber Drill Exercise dan Tabletop Exercise?",
        answer: "Cyber Drill Exercise berfokus pada simulasi serangan teknis untuk menguji kemampuan tim dalam mendeteksi, merespons, dan menangani insiden. Tabletop Exercise menggunakan diskusi skenario terstruktur untuk menguji keputusan, komunikasi, koordinasi, serta prosedur respons insiden lintas fungsi.",
        link: { href: "/solutions/tabletop", label: "Pelajari Tabletop Exercise" },
      },
      {
        question: "Apa manfaat Cyber Drill Exercise bagi perusahaan?",
        answer: "Cyber Drill Exercise membantu perusahaan mengukur kesiapan tim dan mengidentifikasi kesenjangan pada proses, teknologi, koordinasi, serta kemampuan deteksi dan respons. Hasil latihan mencakup penilaian kinerja, temuan, dan rekomendasi perbaikan yang dapat digunakan sebagai dasar peningkatan kesiapan siber.",
        link: { href: "/solutions/cyber-drill", label: "Pelajari Cyber Drill Exercise" },
      },
      {
        question: "Bagaimana Tabletop Exercise membantu kesiapan respons insiden siber?",
        answer: "Dalam Tabletop Exercise, peserta mendiskusikan tindakan, keputusan, komunikasi, dan eskalasi berdasarkan skenario insiden yang diberikan secara bertahap. Fasilitator mengevaluasi respons peserta untuk mengidentifikasi kesenjangan pada peran, koordinasi, serta prosedur dan menyusun rekomendasi perbaikan.",
        link: { href: "/solutions/tabletop", label: "Lihat alur Tabletop Exercise" },
      },
      {
        question: "Bagaimana CyberXatria membantu organisasi meningkatkan kesiapan menghadapi ancaman siber?",
        answer: "CyberXatria mendukung peningkatan kesiapan keamanan siber melalui latihan dan simulasi berbasis skenario. Melalui Cyber Drill Exercise dan Tabletop Exercise, organisasi dapat melatih kemampuan respons, mengevaluasi koordinasi tim, serta mengidentifikasi area yang perlu ditingkatkan dalam penanganan insiden siber.",
        link: { href: "/solutions/cyber-drill", label: "Pelajari Cyber Drill Exercise" },
      },
      {
        question: "Apakah CyberXatria cocok untuk pemula maupun profesional keamanan siber?",
        answer: "Ya, situs CyberXatria menjelaskan pembelajaran untuk berbagai tingkat keahlian. Pemula dapat mempelajari dasar keamanan siber melalui lab yang dipandu, sedangkan profesional dapat mengembangkan keahlian melalui skenario yang realistis dan kompleks.",
        link: { href: "/company", label: "Kenali pendekatan pembelajaran kami" },
      },
      {
        question: "Bagaimana cara mengetahui layanan CyberXatria yang sesuai untuk organisasi?",
        answer: "Gunakan Cyber Drill Exercise untuk menguji kesiapan teknis dan Tabletop Exercise untuk mengevaluasi keputusan, koordinasi, serta prosedur respons insiden. Sampaikan tujuan dan kebutuhan organisasi melalui formulir kontak pada halaman Ajukan Demo untuk mendiskusikan layanan dan skenario yang relevan.",
        link: { href: "/request-demo", label: "Ajukan demo dan diskusikan kebutuhan Anda" },
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    entries: [
      {
        question: "What is CyberXatria, and how does it support cybersecurity readiness?",
        answer: "CyberXatria is a cybersecurity learning and exercise ecosystem that helps individuals and organizations build skills and prepare for cyber threats. Through training, practical activities, and realistic scenario-based simulations, it helps teams develop technical capabilities, coordination, and decision-making skills for cyber incidents.",
        link: { href: "/company", label: "About CyberXatria" },
      },
      {
        question: "What services does CyberXatria offer?",
        answer: "CyberXatria presents Cyber Drill Exercise, Tabletop Exercise, and AI for SOC, which is currently marked as coming soon. The website also describes cybersecurity learning and training programs for individuals and organizations.",
        link: { href: "/#solutions", label: "Explore CyberXatria services" },
      },
      {
        question: "What is the difference between Cyber Drill Exercise and Tabletop Exercise?",
        answer: "Cyber Drill Exercise uses technical attack simulations to test a team's ability to detect, respond to, and handle incidents. Tabletop Exercise uses structured scenario discussions to test decisions, communication, coordination, and incident response procedures across organizational functions.",
        link: { href: "/solutions/tabletop", label: "Explore Tabletop Exercise" },
      },
      {
        question: "How can Cyber Drill Exercise benefit a company?",
        answer: "Cyber Drill Exercise helps companies assess team readiness and identify gaps in processes, technology, coordination, and detection and response capabilities. Exercise results include performance assessments, findings, and improvement recommendations that can inform further cybersecurity readiness work.",
        link: { href: "/solutions/cyber-drill", label: "Explore Cyber Drill Exercise" },
      },
      {
        question: "How does Tabletop Exercise support cyber incident response readiness?",
        answer: "During a Tabletop Exercise, participants discuss actions, decisions, communication, and escalation as an incident scenario unfolds in stages. Facilitators assess participants' responses to identify gaps in roles, coordination, and procedures and develop improvement recommendations.",
        link: { href: "/solutions/tabletop", label: "See the Tabletop Exercise process" },
      },
      {
        question: "How does CyberXatria help organizations improve their cybersecurity readiness?",
        answer: "CyberXatria helps organizations improve cybersecurity readiness through scenario-based exercises and simulations. Through Cyber Drill Exercise and Tabletop Exercise, organizations can practice incident response, evaluate team coordination, and identify areas for improvement in handling cyber incidents.",
        link: { href: "/solutions/cyber-drill", label: "Explore Cyber Drill Exercise" },
      },
      {
        question: "Is CyberXatria suitable for both cybersecurity beginners and professionals?",
        answer: "Yes, the CyberXatria website describes learning for different skill levels. Beginners can learn cybersecurity fundamentals through guided labs, while professionals can develop their skills through realistic, complex scenarios.",
        link: { href: "/company", label: "Learn about our learning approach" },
      },
      {
        question: "How can an organization choose the right CyberXatria service?",
        answer: "Choose Cyber Drill Exercise to test technical readiness and Tabletop Exercise to evaluate decisions, coordination, and incident response procedures. Share your organization's goals and needs through the contact form on the Request Demo page to discuss relevant services and scenarios.",
        link: { href: "/request-demo", label: "Request a demo and discuss your needs" },
      },
    ],
  },
};
