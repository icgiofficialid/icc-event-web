import {
  BookOpen,
  CircleHelp,
  FileBadge2,
  Globe2,
  Mail,
  Microscope,
  Newspaper,
  Rocket,
  ScrollText,
  Sparkles,
  Cpu,
  Leaf,
  HeartPulse,
  FlaskConical,
  Users,
} from "lucide-react";

export type Lang = "en" | "id";
export type BilingualText = { en: string; id: string };

// ── NAVBAR ────────────────────────────────────────────────────────
export const navItems = [
  { label: { en: "Home",        id: "Beranda"    }, href: "/" },
  { label: { en: "About",       id: "Tentang"    }, href: "/about" },
  { label: { en: "Certificate", id: "Sertifikat" }, href: "/sertifikat" },
  { label: { en: "Curation",    id: "Kurasi"     }, href: "/curation" },
  { label: { en: "FAQ",         id: "FAQ"        }, href: "/faq" },
  { label: { en: "Contact",     id: "Kontak"     }, href: "/contact" },
];

// ── CATEGORIES ────────────────────────────────────────────────────
export const categories = [
  {
    title:       { en: "Engineering & Technology",               id: "Teknik & Teknologi" },
    description: { en: "Projects focused on engineering design, machinery, electronics, robotics, renewable systems, applied technology, smart devices, or technical innovation.", id: "Proyek yang berfokus pada desain teknik, mesin, elektronik, robotika, sistem energi terbarukan, teknologi terapan, perangkat pintar, atau inovasi teknis." },
    icon: Cpu,
  },
  {
    title:       { en: "Environmental Science & Sustainability", id: "Ilmu Lingkungan & Keberlanjutan" },
    description: { en: "Projects related to environmental protection, waste management, water treatment, renewable energy, green innovation, biodiversity, or climate solutions.", id: "Proyek terkait perlindungan lingkungan, pengelolaan sampah, pengolahan air, energi terbarukan, inovasi hijau, keanekaragaman hayati, atau solusi iklim." },
    icon: Leaf,
  },
  {
    title:       { en: "Health, Life Science & Biotechnology",  id: "Kesehatan, Ilmu Hayati & Bioteknologi" },
    description: { en: "Projects related to biology, public health, nutrition, microbiology, biomedical innovation, biotechnology, or life-science applications.", id: "Proyek terkait biologi, kesehatan masyarakat, gizi, mikrobiologi, inovasi biomedis, bioteknologi, atau aplikasi ilmu hayati." },
    icon: HeartPulse,
  },
  {
    title:       { en: "Applied Science & Experimental Research", id: "Sains Terapan & Penelitian Eksperimental" },
    description: { en: "Projects emphasizing scientific experiments, chemistry, physics, mathematics applications, materials testing, or interdisciplinary scientific analysis.", id: "Proyek yang menekankan eksperimen ilmiah, kimia, fisika, aplikasi matematika, pengujian material, atau analisis ilmiah antardisiplin." },
    icon: FlaskConical,
  },
  {
    title:       { en: "Social Innovation & Educational Technology", id: "Inovasi Sosial & Teknologi Pendidikan" },
    description: { en: "Projects combining STEM thinking with social impact, digital learning tools, community-based innovation, accessibility, or educational problem solving.", id: "Proyek yang menggabungkan pemikiran STEM dengan dampak sosial, alat pembelajaran digital, inovasi berbasis komunitas, aksesibilitas, atau pemecahan masalah pendidikan." },
    icon: Users,
  },
];

// ── HIGHLIGHTS ────────────────────────────────────────────────────
export const highlights = [
  { value: "500+",  label: { en: "Teams Expected",         id: "Tim yang Diharapkan"  } },
  { value: "5",     label: { en: "Competition Categories", id: "Kategori Kompetisi"   } },
  { value: "1800+", label: { en: "Participants Overall",   id: "Total Peserta"        } },
  { value: "5",     label: { en: "Days of Innovation",     id: "Hari Penuh Inovasi"   } },
];

// ── GOALS ─────────────────────────────────────────────────────────
export const goals: BilingualText[] = [
  { en: "Provide an international competition platform for engineering, science, research, and innovation projects.",                                        id: "Menyediakan platform kompetisi internasional untuk proyek teknik, sains, penelitian, dan inovasi." },
  { en: "Encourage students and young innovators to develop critical thinking, creativity, scientific inquiry, and problem-solving skills.",                 id: "Mendorong siswa dan inovator muda mengembangkan pemikiran kritis, kreativitas, penyelidikan ilmiah, dan kemampuan pemecahan masalah." },
  { en: "Facilitate cross-border academic exchange between participants, mentors, institutions, and judges.",                                                id: "Memfasilitasi pertukaran akademik lintas batas antara peserta, mentor, institusi, dan juri." },
  { en: "Strengthen the image of Yogyakarta as an international destination for education, innovation, and youth development.",                             id: "Memperkuat citra Yogyakarta sebagai destinasi internasional untuk pendidikan, inovasi, dan pengembangan pemuda." },
];

// ── CERTIFICATES ──────────────────────────────────────────────────
export const certificates: BilingualText[] = [
  { en: "Gold, Silver, and Bronze Medal + Certificate for top-ranking teams.",                 id: "Medali Emas, Perak, dan Perunggu + Sertifikat untuk tim peringkat teratas." },
  { en: "Honorable Mention certificate for outstanding entries selected by the jury.",         id: "Sertifikat Honorable Mention untuk karya unggulan yang dipilih juri." },
  { en: "Finalist recognition certificate for all verified participating teams.",              id: "Sertifikat pengakuan Finalis untuk semua tim peserta terverifikasi." },
];

// ── MEDIA ITEMS ───────────────────────────────────────────────────
export const mediaItems: BilingualText[] = [
  { en: "International press kit & event coverage support.",               id: "Dukungan press kit internasional & liputan acara." },
  { en: "Post-event spotlight for standout inventions and teams.",          id: "Sorotan pasca-acara untuk penemuan dan tim unggulan." },
  { en: "Social campaign assets for schools, institutions, and mentors.",   id: "Aset kampanye sosial untuk sekolah, institusi, dan mentor." },
];

// ── GALLERY ITEMS ─────────────────────────────────────────────────
export const galleryItems: BilingualText[] = [
  { en: "Prototype Showcase",     id: "Pameran Prototipe"    },
  { en: "Jury Session",           id: "Sesi Juri"            },
  { en: "Awarding Moment",        id: "Momen Penghargaan"    },
  { en: "Networking Lounge",      id: "Ruang Networking"     },
  { en: "Pitch Presentation",     id: "Presentasi Pitch"     },
  { en: "Exhibition Walkthrough", id: "Tur Pameran"          },
];

// ── CURATION STEPS ────────────────────────────────────────────────
export const curationSteps: BilingualText[] = [
  { en: "Submit your project profile, category selection, and team member data.",      id: "Kirimkan profil proyek, pilihan kategori, dan data anggota tim." },
  { en: "Prepare mandatory documents: abstract, methodology, results, and poster.",    id: "Siapkan dokumen wajib: abstrak, metodologi, hasil, dan poster." },
  { en: "Pass technical review and receive curator feedback before the event.",        id: "Lewati tinjauan teknis dan terima umpan balik kurator sebelum acara." },
  { en: "Finalize registration and prepare booth/display for the competition day.",    id: "Selesaikan pendaftaran dan siapkan booth/display untuk hari kompetisi." },
];

// ── FAQ ───────────────────────────────────────────────────────────
export const faqItems = [
  {
    question: { en: "Who can join IESF?",                  id: "Siapa yang bisa mengikuti IESF?" },
    answer:   { en: "IESF is open to primary, junior high, and senior high school students, as well as university students, independent researchers, STEM clubs, and young innovators. International teams are also welcome.", id: "IESF terbuka untuk siswa SD, SMP, SMA, serta mahasiswa, peneliti independen, klub STEM, dan inovator muda. Tim internasional juga disambut." },
  },
  {
    question: { en: "What is the team composition?",        id: "Bagaimana komposisi tim?" },
    answer:   { en: "Recommended team size is 1–3 students per team. Each team may be accompanied by 1 mentor/teacher/advisor. One participant may only represent one main project entry.", id: "Ukuran tim yang disarankan adalah 1–3 siswa per tim. Setiap tim dapat didampingi 1 mentor/guru/pembimbing. Satu peserta hanya boleh mewakili satu entri proyek utama." },
  },
  {
    question: { en: "What are the competition categories?", id: "Apa saja kategori kompetisi?" },
    answer:   { en: "There are 5 categories: Engineering & Technology, Environmental Science & Sustainability, Health, Life Science & Biotechnology, Applied Science & Experimental Research, and Social Innovation & Educational Technology.", id: "Ada 5 kategori: Teknik & Teknologi, Ilmu Lingkungan & Keberlanjutan, Kesehatan & Bioteknologi, Sains Terapan & Penelitian Eksperimental, dan Inovasi Sosial & Teknologi Pendidikan." },
  },
  {
    question: { en: "What awards are available?",           id: "Penghargaan apa saja yang tersedia?" },
    answer:   { en: "Awards include Gold, Silver, Bronze Medal + Certificate, Honorable Mention, and Finalist recognition. Additional prizes such as cash, scholarships, gadgets, and trip packages are under discussion.", id: "Penghargaan meliputi Medali Emas, Perak, Perunggu + Sertifikat, Honorable Mention, dan pengakuan Finalis. Hadiah tambahan seperti uang tunai, beasiswa, gadget, dan paket perjalanan sedang dalam pembahasan." },
  },
  {
    question: { en: "What is the submission deadline?",     id: "Apa batas waktu pengiriman?" },
    answer:   { en: "All required registration data and project documents must be submitted no later than H-14 (14 days before the event). Late or incomplete submissions may affect eligibility.", id: "Semua data pendaftaran dan dokumen proyek harus dikirimkan selambat-lambatnya H-14 (14 hari sebelum acara). Pengiriman terlambat atau tidak lengkap dapat memengaruhi kelayakan." },
  },
  {
    question: { en: "What language should be used?",        id: "Bahasa apa yang digunakan?" },
    answer:   { en: "Project titles and abstracts are recommended in English. Oral presentation may be conducted in English or bilingual format. Teams should prepare basic English explanation for international judging.", id: "Judul proyek dan abstrak disarankan dalam bahasa Inggris. Presentasi lisan dapat dilakukan dalam bahasa Inggris atau format dwibahasa. Tim harus menyiapkan penjelasan dasar bahasa Inggris untuk penjurian internasional." },
  },
];

// ── PARTNERS ──────────────────────────────────────────────────────
export const partners = ["IESF", "ICGI", "Yogyakarta", "STEM", "EduLab", "InnovaHub", "TechVerse", "RoboNext"] as const;

// ── FOOTER COLUMNS ────────────────────────────────────────────────
export const footerColumns = [
  {
    title: { en: "Event",     id: "Acara"       },
    links: [
      { en: "About IESF",  id: "Tentang IESF" },
      // { en: "Tracks",       id: "Jalur"         },
      { en: "Timeline",     id: "Timeline"      },
      // { en: "Registration", id: "Pendaftaran"   },
    ],
  },
  {
    title: { en: "Resources", id: "Sumber Daya" },
    links: [
      { en: "Guidebook",    id: "Buku Panduan"  },
      // { en: "Certificates", id: "Sertifikat"    },
      // { en: "Media Kit",    id: "Media Kit"     },
      { en: "FAQ",          id: "FAQ"           },
    ],
  },
  {
    title: { en: "Support",   id: "Dukungan"    },
    links: [
      { en: "Contact Team",   id: "Tim Kontak"       },
      // { en: "WhatsApp Help",  id: "Bantuan WhatsApp" },
      { en: "Email Support",  id: "Dukungan Email"   },
      // { en: "Venue Info",     id: "Info Venue"       },
    ],
  },
  {
    title: { en: "Social",    id: "Sosial"      },
    links: [
      { en: "Instagram",    id: "Instagram"     },
      // { en: "LinkedIn",     id: "LinkedIn"      },
      { en: "YouTube",      id: "YouTube"       },
      // { en: "X / Twitter",  id: "X / Twitter"  },
    ],
  },
];

// ── SOCIAL ICONS ──────────────────────────────────────────────────
export const socialItems = [Globe2, Mail, Newspaper] as const;

// ── PAGE META ─────────────────────────────────────────────────────
export const pageMeta = {
  about: {
    eyebrow:     { en: "About IESF", id: "Tentang IESF" },
    title:       { en: "A global youth innovation festival", id: "Festival inovasi pemuda global" },
    description: { en: "IESF combines academic competition, innovation exhibition, educational exchange, and youth inspiration on an international stage.", id: "IESF menggabungkan kompetisi akademik, pameran inovasi, pertukaran pendidikan, dan inspirasi pemuda di panggung internasional." },
    icon: Microscope,
  },
  sertifikat: {
    eyebrow:     { en: "Certificate", id: "Sertifikat" },
    title:       { en: "Recognition that strengthens academic and innovation portfolios.", id: "Pengakuan yang memperkuat portofolio akademik dan inovasi." },
    description: { en: "Gold, Silver, Bronze medals for top teams. Honorable Mention and Finalist certificates for all verified participants.", id: "Medali Emas, Perak, Perunggu untuk tim terbaik. Sertifikat Honorable Mention dan Finalis untuk semua peserta terverifikasi." },
    icon: FileBadge2,
  },
  media: {
    eyebrow:     { en: "Media Coverage", id: "Liputan Media" },
    title:       { en: "Visibility designed to amplify the impact of every breakthrough.", id: "Visibilitas yang dirancang untuk memperkuat dampak setiap terobosan." },
    description: { en: "From press-ready assets to post-event promotion, IESF helps participants and institutions present their work professionally.", id: "Dari aset siap-cetak hingga promosi pasca-acara, IESF membantu peserta dan institusi mempresentasikan karya mereka secara profesional." },
    icon: Newspaper,
  },
  galery: {
    eyebrow:     { en: "Gallery", id: "Galeri" },
    title:       { en: "Moments, prototypes, and presentation energy captured in one place.", id: "Momen, prototipe, dan energi presentasi terekam dalam satu tempat." },
    description: { en: "The event gallery highlights the atmosphere of curation, pitching, networking, and awards in a clean visual showcase.", id: "Galeri acara menampilkan suasana kurasi, pitching, networking, dan penghargaan dalam tampilan visual yang bersih." },
    icon: Sparkles,
  },
  curation: {
    eyebrow:     { en: "Curation", id: "Kurasi" },
    title:       { en: "A guided path from project submission to event-ready presentation.", id: "Jalur terpandu dari pengiriman proyek hingga presentasi siap acara." },
    description: { en: "Participants follow a structured process that improves technical clarity, submission quality, and showcase readiness.", id: "Peserta mengikuti proses terstruktur yang meningkatkan kejelasan teknis, kualitas pengiriman, dan kesiapan pameran." },
    icon: BookOpen,
  },
  faq: {
    eyebrow:     { en: "FAQ",           id: "FAQ" },
    title:       { en: "Quick answers", id: "Jawaban Cepat" },
    description: { en: "A focused FAQ page reduces friction and gives schools, mentors, and delegates the essential guidance they need.", id: "Halaman FAQ yang terfokus mengurangi hambatan dan memberi sekolah, mentor, serta delegasi panduan penting yang mereka butuhkan." },
    icon: CircleHelp,
  },
  contact: {
    eyebrow:     { en: "Contact", id: "Kontak" },
    title:       { en: "Connect with the IESF team for registration and collaboration.", id: "Terhubung dengan tim IESF untuk pendaftaran dan kolaborasi." },
    description: { en: "Use the contact page for registration questions, institutional support, media coordination, and partnership inquiries.", id: "Gunakan halaman kontak untuk pertanyaan pendaftaran, dukungan institusi, koordinasi media, dan pertanyaan kemitraan." },
    icon: Mail,
  },
};