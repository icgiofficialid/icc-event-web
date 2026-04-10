// ================================================================
// iccData.ts — ICC Portal Site Data
// Based on YICC Guidebook Draft Stage 3
// ================================================================

import {
  Music2,
  Shirt,
  Mic2,
  Users,
  Globe2,
  Mail,
  Instagram,
  Youtube,
  CircleHelp,
  BookOpen,
  Award,
  CalendarDays,
  MapPin,
} from "lucide-react";

export type Lang = "en" | "id";
export type BilingualText = { en: string; id: string };

// ── CATEGORIES (Competition) ──────────────────────────────────────
export const competitionCategories = [
  {
    letter: "A",
    title: {
      en: "Traditional / Cultural-Based Dance Solo",
      id: "Tari Tradisional / Berbasis Budaya Solo",
    },
    description: {
      en: "A solo dance performance based on traditional culture or cultural heritage. Creative adaptation allowed as long as cultural identity remains dominant.",
      id: "Penampilan tari solo berbasis budaya tradisional atau warisan budaya. Adaptasi kreatif diperbolehkan selama identitas budaya tetap dominan.",
    },
    duration: { en: "Max 5 minutes", id: "Maks 5 menit" },
    participants: { en: "Solo (1 person)", id: "Solo (1 orang)" },
    icon: Music2,
    color: "from-rose-500 to-pink-600",
  },
  {
    letter: "B",
    title: {
      en: "Traditional / Cultural-Based Dance Group",
      id: "Tari Tradisional / Berbasis Budaya Grup",
    },
    description: {
      en: "A group dance performance based on traditional culture or cultural heritage. Creative adaptation allowed with clear cultural identity.",
      id: "Penampilan tari grup berbasis budaya tradisional. Adaptasi kreatif diperbolehkan dengan identitas budaya yang jelas.",
    },
    duration: { en: "Max 7 minutes", id: "Maks 7 menit" },
    participants: { en: "Group (5–10 persons)", id: "Grup (5–10 orang)" },
    icon: Users,
    color: "from-orange-500 to-amber-600",
  },
  {
    letter: "C",
    title: {
      en: "Ethnic / Cultural Creative Costume Show",
      id: "Pertunjukan Kostum Kreatif Etnik / Budaya",
    },
    description: {
      en: "A solo costume presentation inspired by traditional or cultural identity. Modern interpretation allowed as long as cultural roots are clearly reflected.",
      id: "Presentasi kostum solo terinspirasi dari identitas tradisional atau budaya. Interpretasi modern diperbolehkan selama akar budaya tercermin jelas.",
    },
    duration: { en: "Max 2 minutes", id: "Maks 2 menit" },
    participants: { en: "Solo (1 person)", id: "Solo (1 orang)" },
    icon: Shirt,
    color: "from-violet-500 to-purple-600",
  },
  {
    letter: "D",
    title: {
      en: "Traditional Song Solo",
      id: "Lagu Tradisional Solo",
    },
    description: {
      en: "A solo vocal performance of a traditional song. Domestic participants choose from the official list; international participants represent their own cultural origin.",
      id: "Penampilan vokal solo lagu tradisional. Peserta domestik memilih dari daftar resmi; peserta internasional mewakili asal budaya mereka.",
    },
    duration: { en: "Max 5 minutes", id: "Maks 5 menit" },
    participants: { en: "Solo (1 person)", id: "Solo (1 orang)" },
    icon: Mic2,
    color: "from-teal-500 to-cyan-600",
  },
];

// ── HIGHLIGHTS ────────────────────────────────────────────────────
export const highlights = [
  { value: "4",    label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
  { value: "5",    label: { en: "Days of Culture",        id: "Hari Penuh Budaya"  } },
  { value: "Open", label: { en: "to All Ages",            id: "untuk Semua Usia"   } },
  { value: "🌏",   label: { en: "International Stage",   id: "Panggung Internasional" } },
];

// ── PARTICIPANT DIVISIONS ─────────────────────────────────────────
export const divisions = [
  {
    level: { en: "Primary / Elementary School", id: "SD / Sekolah Dasar" },
    age:   { en: "7–12 years old",              id: "7–12 tahun" },
    note:  { en: "Student Division",            id: "Divisi Pelajar" },
  },
  {
    level: { en: "Junior High School",          id: "SMP / Madrasah Tsanawiyah" },
    age:   { en: "13–15 years old",             id: "13–15 tahun" },
    note:  { en: "Student Division",            id: "Divisi Pelajar" },
  },
  {
    level: { en: "Senior High School",          id: "SMA / SMK / Madrasah Aliyah" },
    age:   { en: "16–18 years old",             id: "16–18 tahun" },
    note:  { en: "Student Division",            id: "Divisi Pelajar" },
  },
  {
    level: { en: "Open Division",               id: "Divisi Terbuka" },
    age:   { en: "No age limit",                id: "Tidak ada batasan usia" },
    note:  { en: "University / Community / Studio", id: "Universitas / Komunitas / Sanggar" },
  },
];

// ── JUDGING CRITERIA ─────────────────────────────────────────────
export const judgingCriteria = {
  dance: [
    { aspect: { en: "Technique & Execution",           id: "Teknik & Eksekusi" },           weight: "30%" },
    { aspect: { en: "Cultural Interpretation / Authenticity", id: "Interpretasi Budaya / Keaslian" }, weight: "25%" },
    { aspect: { en: "Choreography / Composition",      id: "Koreografi / Komposisi" },       weight: "20%" },
    { aspect: { en: "Stage Presence & Expression",     id: "Kehadiran Panggung & Ekspresi" }, weight: "15%" },
    { aspect: { en: "Costume & Overall Presentation",  id: "Kostum & Presentasi Keseluruhan" }, weight: "10%" },
  ],
  costume: [
    { aspect: { en: "Costume Concept & Cultural Relevance", id: "Konsep Kostum & Relevansi Budaya" }, weight: "35%" },
    { aspect: { en: "Creativity / Design Development", id: "Kreativitas / Pengembangan Desain" }, weight: "25%" },
    { aspect: { en: "Catwalk & Presentation",          id: "Catwalk & Presentasi" },          weight: "20%" },
    { aspect: { en: "Confidence / Expression",         id: "Kepercayaan Diri / Ekspresi" },   weight: "10%" },
    { aspect: { en: "Overall Visual Impact",           id: "Dampak Visual Keseluruhan" },      weight: "10%" },
  ],
  vocal: [
    { aspect: { en: "Vocal Quality / Technique",       id: "Kualitas Vokal / Teknik" },       weight: "35%" },
    { aspect: { en: "Musicality / Intonation / Rhythm", id: "Musikalitas / Intonasi / Ritme" }, weight: "25%" },
    { aspect: { en: "Interpretation & Expression",     id: "Interpretasi & Ekspresi" },       weight: "20%" },
    { aspect: { en: "Cultural Delivery / Song Character", id: "Penyampaian Budaya / Karakter Lagu" }, weight: "10%" },
    { aspect: { en: "Stage Presence / Appearance",     id: "Kehadiran Panggung / Penampilan" }, weight: "10%" },
  ],
};

// ── AWARDS ────────────────────────────────────────────────────────
export const awards = [
  { label: { en: "Gold Award",              id: "Penghargaan Emas" },         icon: "🥇", color: "text-yellow-400" },
  { label: { en: "Silver Award",            id: "Penghargaan Perak" },        icon: "🥈", color: "text-gray-300" },
  { label: { en: "Bronze Award",            id: "Penghargaan Perunggu" },     icon: "🥉", color: "text-amber-600" },
  { label: { en: "Honorable Mention",       id: "Penghargaan Khusus" },       icon: "🏅", color: "text-rose-400" },
  { label: { en: "Certificate of Participation", id: "Sertifikat Partisipasi" }, icon: "📜", color: "text-teal-400" },
];

// ── EVENT SCHEDULE ────────────────────────────────────────────────
export const schedule = [
  {
    day: 1,
    title: { en: "Registration & Opening",       id: "Registrasi & Pembukaan" },
    highlights: {
      en: ["Participant registration", "Opening Ceremony & Welcome Speech", "Delegation introduction", "Welcoming Party"],
      id: ["Registrasi peserta", "Upacara Pembukaan & Sambutan", "Perkenalan delegasi", "Welcoming Party"],
    },
    icon: "🎪",
  },
  {
    day: 2,
    title: { en: "Technical Rehearsal",          id: "Gladi Teknis" },
    highlights: {
      en: ["Stage checking", "Sound and lighting test", "Technical rehearsal per category", "Costume preparation"],
      id: ["Pengecekan panggung", "Tes suara dan pencahayaan", "Gladi teknis per kategori", "Persiapan kostum"],
    },
    icon: "🎭",
  },
  {
    day: 3,
    title: { en: "Main Competition Day",         id: "Hari Kompetisi Utama" },
    highlights: {
      en: ["Cultural performances", "Jury evaluation", "Costume show catwalk", "Vocal competition"],
      id: ["Penampilan budaya", "Penilaian juri", "Catwalk kostum", "Kompetisi vokal"],
    },
    icon: "🌟",
  },
  {
    day: 4,
    title: { en: "Cultural Expo & Gala Night",   id: "Expo Budaya & Gala Malam" },
    highlights: {
      en: ["Cultural Expo Booth", "Networking & cultural exchange", "Gala Night Showcase", "Cultural dinner"],
      id: ["Booth Expo Budaya", "Networking & pertukaran budaya", "Pertunjukan Gala Malam", "Makan malam budaya"],
    },
    icon: "🎆",
  },
  {
    day: 5,
    title: { en: "Awarding Ceremony",            id: "Upacara Penghargaan" },
    highlights: {
      en: ["Award announcements", "Medal ceremony", "Closing Ceremony", "Official photo session"],
      id: ["Pengumuman penghargaan", "Upacara medali", "Upacara Penutupan", "Sesi foto resmi"],
    },
    icon: "🏆",
  },
];

// ── DOMESTIC SONG LIST ────────────────────────────────────────────
export const domesticSongs = [
  { title: "Soleram",                       region: { en: "Riau",             id: "Riau" } },
  { title: "Jali-Jali",                     region: { en: "Betawi / DKI Jakarta", id: "Betawi / DKI Jakarta" } },
  { title: "Gambang Suling",                region: { en: "Central Java",     id: "Jawa Tengah" } },
  { title: "Cublak-Cublak Suweng",          region: { en: "Java",             id: "Jawa" } },
  { title: "Kampuang Nan Jauh di Mato",     region: { en: "West Sumatra",     id: "Sumatera Barat" } },
  { title: "Ampar-Ampar Pisang",            region: { en: "South Kalimantan", id: "Kalimantan Selatan" } },
  { title: "O Ina Ni Keke",                 region: { en: "North Sulawesi",   id: "Sulawesi Utara" } },
  { title: "Cik Cik Periuk",               region: { en: "West Kalimantan",  id: "Kalimantan Barat" } },
];

// ── FAQ ───────────────────────────────────────────────────────────
export const faqItems = [
  {
    question: { en: "Who can join YICC?",         id: "Siapa yang bisa mengikuti YICC?" },
    answer:   { en: "YICC is open to primary/elementary school students (7–12), junior high (13–15), senior high (16–18), and open division (university, communities, cultural studios) with no age limit.", id: "YICC terbuka untuk siswa SD (7–12 tahun), SMP (13–15 tahun), SMA/SMK (16–18 tahun), dan divisi terbuka (universitas, komunitas, sanggar budaya) tanpa batasan usia." },
  },
  {
    question: { en: "What competition categories are available?", id: "Apa saja kategori kompetisi?" },
    answer:   { en: "There are 4 categories: Traditional/Cultural Dance Solo, Traditional/Cultural Dance Group, Ethnic/Cultural Creative Costume Show, and Traditional Song Solo.", id: "Ada 4 kategori: Tari Tradisional/Budaya Solo, Tari Tradisional/Budaya Grup, Pertunjukan Kostum Kreatif Etnik/Budaya, dan Lagu Tradisional Solo." },
  },
  {
    question: { en: "What is the submission deadline?",          id: "Apa batas waktu pengiriman dokumen?" },
    answer:   { en: "All required technical files and supporting documents (music files, descriptions, property declarations) must be submitted no later than H-14 (14 days before the event).", id: "Semua file teknis dan dokumen pendukung (file musik, deskripsi, deklarasi properti) harus dikirim paling lambat H-14 (14 hari sebelum acara)." },
  },
  {
    question: { en: "What awards are given?",                    id: "Penghargaan apa yang diberikan?" },
    answer:   { en: "Awards include Gold, Silver, and Bronze Award, Honorable Mention, and Certificate of Participation. Additional special category awards are under discussion.", id: "Penghargaan meliputi Emas, Perak, dan Perunggu, Honorable Mention, dan Sertifikat Partisipasi. Penghargaan kategori khusus tambahan sedang dalam pembahasan." },
  },
  {
    question: { en: "What language is used in the competition?", id: "Bahasa apa yang digunakan dalam kompetisi?" },
    answer:   { en: "International participants must present cultural works representing their country's traditions. All official communication and descriptions may be in English or bilingual (English/Indonesian).", id: "Peserta internasional harus mempersembahkan karya budaya yang mewakili tradisi negaranya. Semua komunikasi resmi dan deskripsi boleh dalam bahasa Inggris atau bilingual (Inggris/Indonesia)." },
  },
  {
    question: { en: "Are there property restrictions?",          id: "Apakah ada pembatasan properti?" },
    answer:   { en: "Prohibited properties include fire, smoke, liquids, sharp weapons, glass, dangerous substances, live animals, confetti, and materials that dirty or make the stage slippery. All props must be declared H-14.", id: "Properti yang dilarang meliputi api, asap, cairan, senjata tajam, kaca, bahan berbahaya, hewan hidup, konfeti, dan material yang mengotori atau membuat panggung licin. Semua properti harus dideklarasikan H-14." },
  },
];

// ── FOOTER COLUMNS ────────────────────────────────────────────────
export const footerColumns = [
  {
    title: { en: "Event",     id: "Acara" },
    links: [
      { en: "About ICC",    id: "Tentang ICC" },
      { en: "Timeline",     id: "Timeline" },
    ],
  },
  {
    title: { en: "Resources", id: "Sumber Daya" },
    links: [
      { en: "Guidebook",    id: "Buku Panduan" },
      { en: "FAQ",          id: "FAQ" },
    ],
  },
  {
    title: { en: "Support",   id: "Dukungan" },
    links: [
      { en: "Contact Team", id: "Tim Kontak" },
      { en: "Email Support", id: "Dukungan Email" },
      { en: "WhatsApp Help", id: "Bantuan WhatsApp" },
    ],
  },
  {
    title: { en: "Social",    id: "Sosial" },
    links: [
      { en: "Instagram",    id: "Instagram" },
      { en: "YouTube",      id: "YouTube" },
    ],
  },
];

export const footerLinkMap: Record<string, string> = {
  "About ICC":     "/about",
  "Tentang ICC":   "/about",
  "Timeline":      "/events/yicc#timeline",
  "Guidebook":     "/guide",
  "Buku Panduan":  "/guide",
  "FAQ":           "/faq",
  "Contact Team":  "/contact",
  "Tim Kontak":    "/contact",
  "Email Support": "mailto:icgi.official.id@gmail.com",
  "Dukungan Email":"mailto:icgi.official.id@gmail.com",
  "WhatsApp Help": "https://wa.me/628139905880",
  "Bantuan WhatsApp": "https://wa.me/628139905880",
  "Instagram":     "https://www.instagram.com/icgi.id",
  "YouTube":       "/",
};

// ── PAGE META ─────────────────────────────────────────────────────
export const pageMeta = {
  about: {
    eyebrow:     { en: "About ICC",    id: "Tentang ICC" },
    title:       { en: "Where cultures unite on the world stage", id: "Di sinilah budaya bersatu di panggung dunia" },
    description: { en: "ICC (International Cultural Competition) is ICGI's platform celebrating traditional arts, cultural identity, and global cultural exchange through performance-based competitions.", id: "ICC (International Cultural Competition) adalah platform ICGI yang merayakan seni tradisional, identitas budaya, dan pertukaran budaya global melalui kompetisi berbasis penampilan." },
    icon: Globe2,
  },
  faq: {
    eyebrow:     { en: "FAQ",          id: "FAQ" },
    title:       { en: "Quick answers", id: "Jawaban Cepat" },
    description: { en: "Everything you need to know about participating in YICC and ICC events.", id: "Semua yang perlu Anda ketahui tentang partisipasi dalam YICC dan event ICC." },
    icon: CircleHelp,
  },
  contact: {
    eyebrow:     { en: "Contact",      id: "Kontak" },
    title:       { en: "Connect with the ICC team", id: "Terhubung dengan tim ICC" },
    description: { en: "Reach out for registration support, collaboration, or any questions about ICC events.", id: "Hubungi kami untuk dukungan pendaftaran, kolaborasi, atau pertanyaan tentang event ICC." },
    icon: Mail,
  },
};

// ── SOCIAL ICONS ──────────────────────────────────────────────────
export const socialItems = [Globe2, Mail, Instagram, Youtube] as const;

// ── GOALS ─────────────────────────────────────────────────────────
export const goals: BilingualText[] = [
  { en: "Provide an international competition platform for cultural-based performances.",                             id: "Menyediakan platform kompetisi internasional untuk penampilan berbasis budaya." },
  { en: "Encourage appreciation and preservation of traditional arts and cultural heritage.",                        id: "Mendorong apresiasi dan pelestarian seni tradisional serta warisan budaya." },
  { en: "Promote intercultural exchange among participants from different regions and countries.",                    id: "Mempromosikan pertukaran antarbudaya di antara peserta dari berbagai daerah dan negara." },
  { en: "Strengthen the image of Yogyakarta as a city of culture, education, and tourism.",                         id: "Memperkuat citra Yogyakarta sebagai kota budaya, pendidikan, dan pariwisata." },
];