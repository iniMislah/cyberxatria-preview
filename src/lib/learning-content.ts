import type { Localized } from "@/lib/public-preferences";

export const learningRoute = "/solutions/cyberxatria-learning";
export const learningHeroImage = "/images/Hero_Banner_Learning.png";

type LearningItem = { title: string; description: string };
type LearningCopy = {
  hero: LearningItem & { label: string; accent: string; start: string; categories: string; imageAlt: string };
  about: LearningItem & { label: string };
  benefits: { label: string; title: string; items: LearningItem[] };
  categories: { label: string; title: string; items: (LearningItem & { cta: string })[] };
  audience: { label: string; title: string; items: LearningItem[] };
  closing: LearningItem & { contact: string };
};

export const learningImages = {
  about: "/images/about_learning-icon.png",
  benefits: [
    "/images/manfaat-learning_meningkatkan-kesadaran-siber.png",
    "/images/manfaat-learning_mengembangkan-keterampilan.png",
    "/images/manfaat-learning_memperkuat-budaya-keamanan.png",
    "/images/manfaat-learning_fleksibel-dan-mandiri.png",
    "/images/manfaat-learning_mengukur-progres.png",
    "/images/manfaat-learning_mengurangi-risiko-manusia.png",
  ],
  categories: [
    "/images/kategori-pembelajaran_cybersecurity-awareness.png",
    "/images/kategori-pembelajaran_cybersecurity-learning.png",
  ],
  audience: [
    "/images/peserta_seluruh-karyawan.png",
    "/images/peserta_tim-it-dan-keamanan-siber.png",
    "/images/peserta_manajemen-dan-pengambil-keputusan.png",
    "/images/peserta_tim_kepatuhan_risiko.png",
    "/images/peserta_pelajar-dan-pemula.png",
    "/images/peserta_organisasi-dan-perusahaan.png",
  ],
};

export const learningContent: Localized<LearningCopy> = {
  id: {
    hero: {
      label: "CyberXatria Learning",
      title: "Tingkatkan Kapabilitas Keamanan Siber Tim Anda",
      accent: "Keamanan Siber Tim Anda",
      description: "Program pembelajaran keamanan siber yang terstruktur, relevan, dan praktis untuk membangun kesadaran, meningkatkan keterampilan, serta memperkuat kepatuhan keamanan siber di organisasi Anda.",
      start: "Mulai Belajar",
      categories: "Lihat Kategori",
      imageAlt: "Pembelajaran keamanan siber CyberXatria Learning",
    },
    about: {
      label: "Tentang CyberXatria Learning",
      title: "Pembelajaran Keamanan Siber untuk Masa Depan yang Lebih Aman",
      description: "CyberXatria Learning adalah program pembelajaran keamanan siber yang dirancang untuk meningkatkan kompetensi, membangun kesadaran, serta mendukung kepatuhan keamanan siber melalui materi yang relevan dan terstruktur.",
    },
    benefits: {
      label: "Manfaat Learning",
      title: "Tingkatkan Kapabilitas & Ketahanan Siber Organisasi",
      items: [
        { title: "Meningkatkan Kesadaran Siber", description: "Membantu peserta mengenali ancaman siber dan memahami langkah pencegahan dalam aktivitas sehari-hari." },
        { title: "Mengembangkan Keterampilan", description: "Meningkatkan pengetahuan dan keterampilan keamanan siber melalui pembelajaran yang aplikatif." },
        { title: "Memperkuat Budaya Keamanan", description: "Mendorong penerapan perilaku aman dan tanggung jawab keamanan informasi di seluruh organisasi." },
        { title: "Fleksibel & Mandiri", description: "Memberikan kemudahan belajar secara mandiri sesuai kebutuhan dan waktu masing-masing peserta." },
        { title: "Mengukur Progres", description: "Memantau perkembangan pembelajaran dan tingkat pemahaman peserta secara terstruktur." },
        { title: "Mengurangi Risiko Manusia", description: "Meminimalkan potensi insiden keamanan akibat kesalahan manusia melalui peningkatan kesadaran dan kompetensi." },
      ],
    },
    categories: {
      label: "Kategori Pembelajaran",
      title: "Pilih Jalur Pembelajaran yang Sesuai dengan Kebutuhan Anda",
      items: [
        { title: "Cybersecurity Awareness", description: "Bangun kesadaran keamanan siber melalui pembelajaran dasar mengenai ancaman digital, perlindungan informasi, dan kebiasaan aman dalam menggunakan teknologi.", cta: "Jelajahi Awareness" },
        { title: "Cybersecurity Learning", description: "Tingkatkan kompetensi keamanan siber melalui materi pembelajaran yang lebih mendalam, terstruktur, dan relevan untuk pengembangan keterampilan profesional.", cta: "Jelajahi Learning" },
      ],
    },
    audience: {
      label: "Siapa Saja yang Dapat Mengikuti?",
      title: "Untuk Semua Peran, di Semua Level",
      items: [
        { title: "Seluruh Karyawan", description: "Meningkatkan kesadaran dan kebiasaan aman dalam penggunaan teknologi di lingkungan kerja." },
        { title: "Tim IT & Keamanan Siber", description: "Mengembangkan pengetahuan dan keterampilan dalam menghadapi tantangan keamanan siber." },
        { title: "Manajemen & Pengambil Keputusan", description: "Memahami risiko siber dan mendukung pengambilan keputusan yang tepat bagi organisasi." },
        { title: "Tim Kepatuhan & Risiko", description: "Memperkuat pemahaman terkait perlindungan informasi, manajemen risiko, dan kepatuhan keamanan." },
        { title: "Pelajar & Pemula", description: "Membangun fondasi pengetahuan keamanan siber sebagai langkah awal pengembangan kompetensi." },
        { title: "Organisasi & Perusahaan", description: "Meningkatkan kesiapan dan ketahanan siber melalui pengembangan kompetensi sumber daya manusia." },
      ],
    },
    closing: {
      title: "Bangun Tim yang Lebih Siap, Aman, dan Tangguh",
      description: "Mulai perjalanan pembelajaran keamanan siber bersama CyberXatria Learning untuk meningkatkan kompetensi tim dan memperkuat ketahanan digital organisasi Anda.",
      contact: "Hubungi Kami",
    },
  },
  en: {
    hero: {
      label: "CyberXatria Learning",
      title: "Strengthen Your Team’s Cybersecurity Capabilities",
      accent: "Cybersecurity Capabilities",
      description: "A structured, relevant, and practical cybersecurity learning program to build awareness, develop skills, and strengthen cybersecurity compliance within your organization.",
      start: "Start Learning",
      categories: "View Categories",
      imageAlt: "Cybersecurity learning with CyberXatria Learning",
    },
    about: {
      label: "About CyberXatria Learning",
      title: "Cybersecurity Learning for a Safer Future",
      description: "CyberXatria Learning is a cybersecurity learning program designed to develop competencies, build awareness, and support cybersecurity compliance through relevant, structured materials.",
    },
    benefits: {
      label: "Learning Benefits",
      title: "Strengthen Your Organization’s Cybersecurity Capabilities & Resilience",
      items: [
        { title: "Build Cybersecurity Awareness", description: "Help participants recognize cyber threats and understand preventive measures in their everyday activities." },
        { title: "Develop Skills", description: "Develop cybersecurity knowledge and skills through practical learning." },
        { title: "Strengthen Security Culture", description: "Encourage secure behavior and responsibility for information security throughout the organization." },
        { title: "Flexible & Self-Paced", description: "Enable independent learning that fits each participant’s needs and schedule." },
        { title: "Measure Progress", description: "Track learning progress and participants’ understanding in a structured way." },
        { title: "Reduce Human Risk", description: "Minimize the potential for security incidents caused by human error by improving awareness and competencies." },
      ],
    },
    categories: {
      label: "Learning Categories",
      title: "Choose the Learning Path That Fits Your Needs",
      items: [
        { title: "Cybersecurity Awareness", description: "Build cybersecurity awareness through foundational learning about digital threats, information protection, and safe habits when using technology.", cta: "Explore Awareness" },
        { title: "Cybersecurity Learning", description: "Develop cybersecurity competencies through in-depth, structured learning materials relevant to professional skills development.", cta: "Explore Learning" },
      ],
    },
    audience: {
      label: "Who Can Participate?",
      title: "For Every Role, at Every Level",
      items: [
        { title: "All Employees", description: "Build awareness and safe habits when using technology in the workplace." },
        { title: "IT & Cybersecurity Teams", description: "Develop knowledge and skills to address cybersecurity challenges." },
        { title: "Management & Decision-Makers", description: "Understand cyber risks and support sound organizational decision-making." },
        { title: "Compliance & Risk Teams", description: "Strengthen understanding of information protection, risk management, and security compliance." },
        { title: "Students & Beginners", description: "Build a foundation of cybersecurity knowledge as the first step in developing competencies." },
        { title: "Organizations & Businesses", description: "Improve cyber readiness and resilience by developing workforce competencies." },
      ],
    },
    closing: {
      title: "Build a More Prepared, Secure, and Resilient Team",
      description: "Begin your cybersecurity learning journey with CyberXatria Learning to develop your team’s competencies and strengthen your organization’s digital resilience.",
      contact: "Contact Us",
    },
  },
};
