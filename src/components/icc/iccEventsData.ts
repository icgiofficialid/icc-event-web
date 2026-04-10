// ── EVENTS DATA ──────────────────────────────────────────────────
// Portal events for IESF — add more events here as needed

export type EventType = "Competition" | "Education" | "Workshop";
export type EventStatus = "upcoming" | "past";

export interface IESFEvent {
  id: string;
  slug: string;
  type: EventType;
  status: EventStatus;
  title: string;
  subtitle: string;
  location: string;
  country: string;
  dateRange: string;
  year: number;
  registrationDeadline: string;
  coverGradient: string;
  accentColor: string;
  description: string;
  tags: string[];
}

export const events: IESFEvent[] = [
  {
    id: "yiesf-2026",
    slug: "yiesf",
    type: "Competition",
    status: "upcoming",
    title: "Yogyakarta International Engineering Science Fair",
    subtitle: "YIESF 2026",
    location: "Yogyakarta, Indonesia",
    country: "Indonesia",
    dateRange: "TBA, 2026",
    year: 2026,
    registrationDeadline: "TBA",
    coverGradient: "from-blue-900 via-indigo-800 to-purple-900",
    accentColor: "#6366f1",
    description:
      "An international academic competition platform for students and young innovators to present research, invention, engineering design, and scientific innovation on a global stage. Held in Yogyakarta — a city of education, culture, and tourism.",
    tags: ["Engineering", "Science", "Innovation", "International"],
  },
];

// ── BILINGUAL TEXT HELPER ─────────────────────────────────────────
export type Lang = "en" | "id";
export interface BilingualText {
  en: string;
  id: string;
}

// ── YIESF DETAIL DATA ─────────────────────────────────────────────
export const yiesf = {
  name: "Yogyakarta International Engineering Science Fair (YIESF)",
  shortName: "YIESF",
  edition: "2026",
  venue: "TBA — Yogyakarta, Indonesia",
  email: "icgi.official.id@gmail.com",
  website: "www.icgi.or.id",

  about: {
    welcome: {
      en: "Welcome to the Yogyakarta International Engineering Science Fair (YIESF), an international academic competition designed to provide a prestigious platform for students and young innovators to present research, invention, engineering design, and scientific innovation on a global stage.",
      id: "Selamat datang di Yogyakarta International Engineering Science Fair (YIESF), kompetisi akademik internasional yang dirancang untuk memberikan platform bergengsi bagi pelajar dan inovator muda dalam mempresentasikan penelitian, invensi, desain rekayasa, dan inovasi ilmiah di panggung global.",
    } as BilingualText,

    background: {
      en: "YIESF is established as a collaborative international event that combines academic competition, innovation exhibition, educational exchange, and youth inspiration. Held in Yogyakarta — widely recognized as a center of education, culture, and tourism in Indonesia.",
      id: "YIESF hadir sebagai ajang kolaborasi internasional yang menggabungkan kompetisi akademik, pameran inovasi, pertukaran pendidikan, dan inspirasi pemuda. Diselenggarakan di Yogyakarta — kota yang dikenal luas sebagai pusat pendidikan, budaya, dan pariwisata di Indonesia.",
    } as BilingualText,

    objectives: {
      en: [
        "Provide an international competition platform for engineering, science, research, and innovation projects.",
        "Encourage students and young innovators to develop critical thinking, creativity, scientific inquiry, and problem-solving skills.",
        "Promote research culture and innovation mindset among school and university participants.",
        "Facilitate cross-border academic exchange between participants, mentors, institutions, and judges.",
        "Strengthen the image of Yogyakarta as an international destination for education, innovation, and youth development.",
      ],
      id: [
        "Menyediakan platform kompetisi internasional untuk proyek rekayasa, sains, penelitian, dan inovasi.",
        "Mendorong pelajar dan inovator muda untuk mengembangkan pemikiran kritis, kreativitas, inkuiri ilmiah, dan kemampuan pemecahan masalah.",
        "Membudayakan riset dan mindset inovasi di kalangan peserta sekolah dan universitas.",
        "Memfasilitasi pertukaran akademik lintas batas antara peserta, mentor, institusi, dan juri.",
        "Memperkuat citra Yogyakarta sebagai destinasi internasional untuk pendidikan, inovasi, dan pengembangan pemuda.",
      ],
    },
  },

  divisions: [
    {
      level: { en: "Primary / Elementary School", id: "SD / Sekolah Dasar" },
      age:   { en: "7–12 years old",              id: "7–12 tahun" },
    },
    {
      level: { en: "Junior High School",           id: "SMP / Madrasah Tsanawiyah" },
      age:   { en: "13–15 years old",              id: "13–15 tahun" },
    },
    {
      level: { en: "Senior High School",           id: "SMA / SMK / Madrasah Aliyah" },
      age:   { en: "16–18 years old",              id: "16–18 tahun" },
    },
    {
      level: { en: "Open Division (University / Researchers)", id: "Divisi Terbuka (Universitas / Peneliti)" },
      age:   { en: "No age limit",                 id: "Tidak ada batasan usia" },
    },
  ],

  categories: [
    {
      letter: "A",
      title: {
        en: "Engineering & Technology",
        id: "Teknik & Teknologi",
      },
      description: {
        en: "Projects focused on engineering design, machinery, electronics, robotics, renewable systems, applied technology, smart devices, or technical innovation.",
        id: "Proyek yang berfokus pada desain teknik, mesin, elektronik, robotik, sistem energi terbarukan, teknologi terapan, perangkat pintar, atau inovasi teknis.",
      },
      icon: "Cpu",
    },
    {
      letter: "B",
      title: {
        en: "Environmental Science & Sustainability",
        id: "Ilmu Lingkungan & Keberlanjutan",
      },
      description: {
        en: "Projects related to environmental protection, waste management, water treatment, renewable energy, green innovation, biodiversity, or climate solutions.",
        id: "Proyek terkait perlindungan lingkungan, pengelolaan sampah, pengolahan air, energi terbarukan, inovasi hijau, keanekaragaman hayati, atau solusi iklim.",
      },
      icon: "Leaf",
    },
    {
      letter: "C",
      title: {
        en: "Health, Life Science & Biotechnology",
        id: "Kesehatan, Ilmu Hayati & Bioteknologi",
      },
      description: {
        en: "Projects related to biology, public health, nutrition, microbiology, biomedical innovation, biotechnology, or life-science applications.",
        id: "Proyek terkait biologi, kesehatan masyarakat, gizi, mikrobiologi, inovasi biomedis, bioteknologi, atau aplikasi ilmu hayati.",
      },
      icon: "HeartPulse",
    },
    {
      letter: "D",
      title: {
        en: "Applied Science & Experimental Research",
        id: "Sains Terapan & Penelitian Eksperimental",
      },
      description: {
        en: "Projects emphasizing scientific experiments, chemistry, physics, mathematics applications, materials testing, or interdisciplinary scientific analysis.",
        id: "Proyek yang menekankan eksperimen ilmiah, kimia, fisika, aplikasi matematika, pengujian material, atau analisis ilmiah antardisiplin.",
      },
      icon: "FlaskConical",
    },
    {
      letter: "E",
      title: {
        en: "Social Innovation & Educational Technology",
        id: "Inovasi Sosial & Teknologi Pendidikan",
      },
      description: {
        en: "Projects combining STEM thinking with social impact, digital learning tools, community-based innovation, accessibility, or educational problem solving.",
        id: "Proyek yang menggabungkan pemikiran STEM dengan dampak sosial, alat pembelajaran digital, inovasi berbasis komunitas, aksesibilitas, atau pemecahan masalah pendidikan.",
      },
      icon: "Users",
    },
  ],

  judgingCriteria: [
    {
      aspect: { en: "Originality & Innovation",           id: "Orisinalitas & Inovasi" },
      weight: "25%",
    },
    {
      aspect: { en: "Scientific / Technical Quality",     id: "Kualitas Ilmiah / Teknis" },
      weight: "25%",
    },
    {
      aspect: { en: "Methodology / Engineering Process",  id: "Metodologi / Proses Rekayasa" },
      weight: "20%",
    },
    {
      aspect: { en: "Practical Application / Impact",     id: "Aplikasi Praktis / Dampak" },
      weight: "15%",
    },
    {
      aspect: { en: "Presentation & Communication",       id: "Presentasi & Komunikasi" },
      weight: "10%",
    },
    {
      aspect: { en: "Booth / Poster / Visual Display",    id: "Booth / Poster / Tampilan Visual" },
      weight: "5%",
    },
  ],

  awards: [
    { place: { en: "1st Place",         id: "Juara 1" },         medal: { en: "Gold Medal",   id: "Medali Emas" },   extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "2nd Place",         id: "Juara 2" },         medal: { en: "Silver Medal", id: "Medali Perak" },  extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "3rd Place",         id: "Juara 3" },         medal: { en: "Bronze Medal", id: "Medali Perunggu" }, extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "4th Place",         id: "Juara 4" },         medal: { en: "Medal",        id: "Medali" },        extra: { en: "+ Certificate", id: "+ Sertifikat" } },
    { place: { en: "Honorable Mention", id: "Penghargaan Khusus" }, medal: { en: "Certificate", id: "Sertifikat" },  extra: { en: "only",          id: "saja" } },
    { place: { en: "Finalist",          id: "Finalis" },         medal: { en: "Recognition",  id: "Pengakuan" },     extra: { en: "Certificate",   id: "Sertifikat" } },
  ],

  schedule: [
    {
      day: 1,
      title: { en: "Registration & Opening",        id: "Registrasi & Pembukaan" },
      items: {
        en: [
          "Participant registration",
          "Booth setup / preparation for academic innovation teams",
          "Opening Ceremony & Welcome Speech",
          "Delegation introduction",
          "Welcoming Party (evening)",
        ],
        id: [
          "Registrasi peserta",
          "Persiapan booth / pameran tim inovasi akademik",
          "Upacara Pembukaan & Sambutan",
          "Perkenalan delegasi",
          "Welcoming Party (malam hari)",
        ],
      },
    },
    {
      day: 2,
      title: { en: "Main Competition Day",          id: "Hari Kompetisi Utama" },
      items: {
        en: [
          "Innovation project presentation",
          "Poster / booth presentation",
          "Jury evaluation & short interview",
          "Booth-based project observation",
          "Completion of academic judging process",
        ],
        id: [
          "Presentasi proyek inovasi",
          "Presentasi poster / booth",
          "Penilaian juri & wawancara singkat",
          "Observasi proyek berbasis booth",
          "Penyelesaian proses penilaian akademik",
        ],
      },
    },
    {
      day: 3,
      title: { en: "Workshop & Seminar (Optional)", id: "Workshop & Seminar (Opsional)" },
      items: {
        en: [
          "Innovation & Research Method",
          "Creative Thinking & Innovation",
          "Youth Entrepreneurship",
          "STEM Project Development",
          "Scientific Communication",
        ],
        id: [
          "Metode Inovasi & Penelitian",
          "Berpikir Kreatif & Inovasi",
          "Kewirausahaan Pemuda",
          "Pengembangan Proyek STEM",
          "Komunikasi Ilmiah",
        ],
      },
    },
    {
      day: 4,
      title: { en: "Gala & Networking",             id: "Gala & Networking" },
      items: {
        en: [
          "Delegation networking",
          "Project appreciation session",
          "Innovation exchange",
          "Gala dinner",
          "Cultural or institutional showcase",
        ],
        id: [
          "Networking delegasi",
          "Sesi apresiasi proyek",
          "Pertukaran inovasi",
          "Gala dinner",
          "Pameran budaya atau institusi",
        ],
      },
    },
    {
      day: 5,
      title: { en: "Awarding Ceremony",             id: "Upacara Penghargaan" },
      items: {
        en: [
          "Academic Awards Session",
          "Official announcement of medal recipients",
          "Closing Ceremony",
          "Official photo session",
          "End of event",
        ],
        id: [
          "Sesi Penghargaan Akademik",
          "Pengumuman resmi penerima medali",
          "Upacara Penutupan",
          "Sesi foto resmi",
          "Akhir acara",
        ],
      },
    },
  ],
};