// ================================================================
// bicc.ts
// Path: src/config/events/bicc.ts
// Disesuaikan dengan Guidebook BICC 2026
// ================================================================

import type { EventDetailData } from "@/config/eventDetailTypes";

const bicc: EventDetailData = {
  slug: "bicc-2026",
  organizers: [
    { name: "ICGI", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_ICGI_Bg_Transparant_1_rdvff1.png" },
    { name: "IYSA", logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/logo_IYSA_bagus_e6uai3.png" },
    { name: "IPB",  logo: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778572483/Logo_IPB_1_bqies4.png" },
  ],
  guidebookUrl: "https://drive.google.com/file/d/1fRGtFeaW6Yo0WeVcIXEzgTRTfvmJnEBC/view?usp=sharing",

  email:   "iccfofficial.icgi@gmail.com",
  website: "iccofficial.or.id",
  venue:   "Bali, Indonesia",

  labels: {
    eventBadge:    { en: "ICC · BICC Competition 2026",             id: "ICC · Kompetisi 2026" },
    heroBadge:     { en: "Competition · Denpasar, Bali",        id: "Kompetisi · Denpasar, Bali" },
    categoriesDesc: {
      en: "Participants may register their projects under the following 8 competition categories.",
      id: "Peserta dapat mendaftarkan proyek mereka dalam 8 kategori kompetisi berikut.",
    },
    scheduleDesc: {
      en: "BICC 2026 takes place from November 16–20, 2026 across 5 days of competition, judging, cultural exchange, and awarding ceremony.",
      id: "BICC 2026 berlangsung pada 16–20 November 2026 selama 5 hari yang mencakup kompetisi, penjurian, pertukaran budaya, dan upacara penghargaan.",
    },
  },

  stats: [
    { value: "500+",  label: { en: "Teams Expected",         id: "Tim Peserta" } },
    { value: "8",     label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
    { value: "1000+", label: { en: "Participants Overall",   id: "Total Peserta" } },
    { value: "5",     label: { en: "Days of Innovation",     id: "Hari Inovasi" } },
  ],

  regSteps: {
    en: [
      "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
      "Review and agree to the Terms & Conditions for your chosen format.",
      "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details.",
      "Upload your payment proof via Google Drive and submit the form. Transfer news: IESF2026_Leader Name_Name of Institution.",
      "Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
    ],
    id: [
      "Pilih kategori peserta (Indonesia atau Internasional) dan format kompetisi (Online atau Offline).",
      "Baca dan setujui Syarat & Ketentuan untuk format yang dipilih.",
      "Isi Formulir Pendaftaran dengan biodata tim, data sekolah, info pembimbing, dan detail proyek.",
      "Unggah bukti pembayaran melalui Google Drive dan kirimkan formulir. Berita transfer: IESF2026_Nama Ketua_Nama Institusi.",
      "Surat Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja.",
    ],
  },

about: {
  welcome: {
    en: "Bali International Engineering Science Fair (BIESF) is an international science competition will be held for the first time in Bali as a platform for students to showcase their innovations, research, and projects in the fields of science, technology, and engineering, while fostering global collaboration and the development of critical and creative thinking skills. The event will take place from November 16–20, 2026, with a series of activities including the Opening Ceremony & Judging Session Day 1 (November 16, 2026), Judging Session Day 2 (November 17, 2026), Private Judging Session (Selective) and Afternoon Tea & Cultural Exchange (November 18, 2026), Awarding Ceremony (November 19, 2026), and FunEdu Trip (November 20, 2026).",
    id: "Bali International Engineering Science Fair (BIESF) adalah kompetisi sains internasional yang akan diselenggarakan untuk pertama kalinya di Bali sebagai platform bagi pelajar untuk memamerkan inovasi, penelitian, dan proyek di bidang sains, teknologi, dan rekayasa, sekaligus mendorong kolaborasi global dan pengembangan keterampilan berpikir kritis dan kreatif. Acara ini akan berlangsung dari 16–20 November 2026, dengan serangkaian kegiatan termasuk Upacara Pembukaan & Sesi Penjurian Hari 1 (16 November 2026), Sesi Penjurian Hari 2 (17 November 2026), Sesi Penjurian Privat (Selektif) dan Afternoon Tea & Pertukaran Budaya (18 November 2026), Upacara Penghargaan (19 November 2026), dan FunEdu Trip (20 November 2026).",
  },
  background: {
    en: "The competition categories in BIESF include: Mathematics, Science & Technology, Environmental, IoT & Robotics, Informatics & Artificial Intelligence, Life Sciences, Social Sciences & Humanities, Physics, Energy & Engineering, and Health & Medicine.",
    id: "Kategori kompetisi dalam BIESF meliputi: Matematika, Sains & Teknologi, Lingkungan, IoT & Robotika, Informatika & Kecerdasan Buatan, Ilmu Hayati, Ilmu Sosial & Humaniora, Fisika, Energi & Rekayasa, dan Kesehatan & Kedokteran.",
  },
  objectives: {
    en: [
      "To provide a prestigious international stage for students to present original research, inventions, and engineering designs.",
      "To encourage critical thinking, creativity, and professional problem-solving through expert jury evaluations.",
      "To facilitate academic networking and cross-border knowledge exchange between young innovators and global experts.",
    ],
    id: [
      "Menyediakan panggung internasional bergengsi bagi pelajar untuk mempresentasikan penelitian orisinal, invensi, dan desain rekayasa.",
      "Mendorong pemikiran kritis, kreativitas, dan pemecahan masalah profesional melalui evaluasi juri ahli.",
      "Memfasilitasi jaringan akademik dan pertukaran pengetahuan lintas batas antara inovator muda dan pakar global.",
    ],
  },
},

  divisions: [
    { level: { en: "Elementary School",  id: "Sekolah Dasar" },   age: { en: "Elementary level", id: "Jenjang SD" } },
    { level: { en: "Secondary School",   id: "Sekolah Menengah" }, age: { en: "Secondary level",  id: "Jenjang SMP/SMA" } },
    { level: { en: "University",         id: "Universitas" },      age: { en: "University level", id: "Jenjang Universitas" } },
  ],

  categories: [
    {
      letter: "1",
      title:       { en: "Mathematics, Science & Technology",         id: "Matematika, Sains & Teknologi" },
      description: { en: "Focuses on developing innovations based on mathematical, scientific, and technological concepts to effectively and practically solve various problems.", id: "Berfokus pada pengembangan inovasi berdasarkan konsep matematika, sains, dan teknologi untuk memecahkan berbagai masalah secara efektif dan praktis." },
      icon: "Cpu",
    },
    {
      letter: "2",
      title:       { en: "Environmental",                             id: "Lingkungan Hidup" },
      description: { en: "Covers projects offering solutions to environmental issues such as climate change, waste management, conservation, and sustainability.", id: "Mencakup proyek yang menawarkan solusi untuk masalah lingkungan seperti perubahan iklim, pengelolaan sampah, konservasi, dan keberlanjutan." },
      icon: "Leaf",
    },
    {
      letter: "3",
      title:       { en: "IoT & Robotics",                            id: "IoT & Robotik" },
      description: { en: "Features the development of Internet of Things (IoT)-based devices and robotics aimed at improving efficiency and automation across various fields.", id: "Menampilkan pengembangan perangkat berbasis IoT dan robotik yang bertujuan meningkatkan efisiensi dan otomasi di berbagai bidang." },
      icon: "Cpu",
    },
    {
      letter: "4",
      title:       { en: "Informatics & Artificial Intelligence",     id: "Informatika & Kecerdasan Buatan" },
      description: { en: "Focuses on the development of software, information systems, and the application of artificial intelligence to solve problems innovatively.", id: "Berfokus pada pengembangan perangkat lunak, sistem informasi, dan penerapan kecerdasan buatan untuk memecahkan masalah secara inovatif." },
      icon: "Cpu",
    },
    {
      letter: "5",
      title:       { en: "Life Sciences",                             id: "Ilmu Hayati" },
      description: { en: "Covers research in biology and life sciences, including health, genetics, microbiology, and biotechnology.", id: "Mencakup penelitian di bidang biologi dan ilmu hayati, termasuk kesehatan, genetika, mikrobiologi, dan bioteknologi." },
      icon: "HeartPulse",
    },
    {
      letter: "6",
      title:       { en: "Social Sciences & Humanities",              id: "Ilmu Sosial & Humaniora" },
      description: { en: "Examines social, cultural, and humanities phenomena to provide solutions to societal problems through a scientific approach.", id: "Mengkaji fenomena sosial, budaya, dan humaniora untuk memberikan solusi atas permasalahan masyarakat melalui pendekatan ilmiah." },
      icon: "Users",
    },
    {
      letter: "7",
      title:       { en: "Physics, Energy & Engineering",             id: "Fisika, Energi & Rekayasa" },
      description: { en: "Focuses on the application of concepts in physics, energy, and engineering to create efficient and sustainable technological innovations.", id: "Berfokus pada penerapan konsep fisika, energi, dan rekayasa untuk menciptakan inovasi teknologi yang efisien dan berkelanjutan." },
      icon: "FlaskConical",
    },
    {
      letter: "8",
      title:       { en: "Health & Medicine",                         id: "Kesehatan & Kedokteran" },
      description: { en: "Covers innovations and research in the fields of health and medicine aimed at improving quality of life and healthcare services.", id: "Mencakup inovasi dan penelitian di bidang kesehatan dan kedokteran yang bertujuan meningkatkan kualitas hidup dan layanan kesehatan." },
      icon: "HeartPulse",
    },
  ],

  judgingCriteria: [
    { aspect: { en: "Originality & Innovation",          id: "Orisinalitas & Inovasi" },          weight: "30%" },
    { aspect: { en: "Methodology / Engineering Process", id: "Metodologi / Proses Rekayasa" },     weight: "25%" },
    { aspect: { en: "Practical Application / Impact",    id: "Aplikasi Praktis / Dampak" },        weight: "20%" },
    { aspect: { en: "Presentation & Communication",      id: "Presentasi & Komunikasi" },           weight: "15%" },
    { aspect: { en: "Booth / Poster / Visual Display",   id: "Booth / Poster / Tampilan Visual" }, weight: "10%"  },
  ],

  awards: [
    { place: { en: "1st Place",                id: "Juara 1" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: 86–100",  id: "Nilai: 86–100" } },
    { place: { en: "2nd Place",                id: "Juara 2" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: 71–85",   id: "Nilai: 71–85" } },
    { place: { en: "3rd Place",                id: "Juara 3" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: 55–70",   id: "Nilai: 55–70" } },
    { place: { en: "4th Place",                id: "Juara 4" },              medal: { en: "Certificate & Medal",         id: "Sertifikat & Medali" },        extra: { en: "Score: ≤54",     id: "Nilai: ≤54" } },
  ],

  scheduleOffline: [
      {
        day: 1,
        date: { en: "November 16th, 2026", id: "16 November 2026" },
        title: { en: "Opening Ceremony & Judging Session Day 1", id: "Upacara Pembukaan & Sesi Penilaian Hari 1" },
        items: [
          { time: "08:00 AM – 09:00 AM", description: { en: "Opening Ceremony for Offline Participants",  id: "Upacara Pembukaan untuk Peserta Offline" }, location: { en: "Denpasar, Bali", id: "Denpasar, Bali" } },
          { time: "10:00 AM – 04:00 PM", description: { en: "Offline Judging Session Day 1",              id: "Sesi Penilaian Offline Hari 1" },            location: { en: "Denpasar, Bali", id: "Denpasar, Bali" } },
        ],
      },
      {
        day: 2,
        date: { en: "November 17th, 2026", id: "17 November 2026" },
        title: { en: "Judging Session Day 2 (Tentative)", id: "Sesi Penilaian Hari 2 (Tentatif)" },
        items: [
          { time: "10:00 AM – 04:00 PM", description: { en: "Offline Judging Session Day 2 (Tentative)", id: "Sesi Penilaian Offline Hari 2 (Tentatif)" }, location: { en: "Denpasar, Bali", id: "Denpasar, Bali" } },
        ],
      },
      {
        day: 3,
        date: { en: "November 18th, 2026", id: "18 November 2026" },
        title: { en: "Private Judging & Cultural Exchange", id: "Private Judging & Pertukaran Budaya" },
        items: [
          { time: "08:00 AM – 11:00 AM", description: { en: "Private Judging Session for Offline Participants", id: "Sesi Private Judging untuk Peserta Offline" }, location: { en: "Denpasar, Bali", id: "Denpasar, Bali" } },
          { time: "03:00 PM – 06:00 PM", description: { en: "Afternoon Tea & Cultural Exchange",               id: "Afternoon Tea & Pertukaran Budaya" },          location: { en: "Denpasar, Bali", id: "Denpasar, Bali" } },
        ],
      },
      {
        day: 4,
        date: { en: "November 19th, 2026", id: "19 November 2026" },
        title: { en: "Awarding Ceremony & Closing", id: "Upacara Penghargaan & Penutupan" },
        items: [
          { time: "10:00 AM – Finish", description: { en: "Awarding Ceremony for Offline Participants", id: "Upacara Penghargaan untuk Peserta Offline" }, location: { en: "Denpasar, Bali", id: "Denpasar, Bali" } },
        ],
      },
      {
        day: 5,
        date: { en: "November 20th, 2026", id: "20 November 2026" },
        title: { en: "FunEdu Trip (Optional)", id: "FunEdu Trip (Opsional)" },
        items: [
          { time: "07:00 AM – Finish", description: { en: "FunEdu Trip for Offline Participants", id: "FunEdu Trip untuk Peserta Offline" }, location: { en: "Bali", id: "Bali" } },
        ],
      },
    ],

    scheduleOnline: [
      {
        day: 1,
        date: { en: "November 25th, 2026", id: "25 November 2026" },
        title: { en: "Opening Ceremony & Judging Session Day 1", id: "Upacara Pembukaan & Sesi Penilaian Hari 1" },
        items: [
          { time: "08:30 AM – Finish", description: { en: "Opening Ceremony & Online Judging Session Day 1", id: "Upacara Pembukaan & Sesi Penilaian Online Hari 1" }, location: { en: "ZOOM", id: "ZOOM" } },
        ],
      },
      {
        day: 2,
        date: { en: "November 26th, 2026", id: "26 November 2026" },
        title: { en: "Online Judging Session Day 2 (Tentative)", id: "Sesi Penilaian Online Hari 2 (Tentatif)" },
        items: [
          { time: "10:00 AM – Finish", description: { en: "Online Judging Session Day 2 (Tentative)", id: "Sesi Penilaian Online Hari 2 (Tentatif)" }, location: { en: "ZOOM", id: "ZOOM" } },
        ],
      },
      {
        day: 3,
        date: { en: "November 27th, 2026", id: "27 November 2026" },
        title: { en: "Awarding Ceremony", id: "Upacara Penghargaan" },
        items: [
          { time: "02:00 PM – Finish", description: { en: "Awarding Ceremony for Online Participants", id: "Upacara Penghargaan untuk Peserta Online" }, location: { en: "ZOOM", id: "ZOOM" } },
        ],
      },
    ],

    schedule: [], // kept for type compatibility
};

export default bicc;