import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
  ArrowLeft, MapPin, Mail, Globe, Calendar,
  Trophy, ChevronRight, CheckCircle2,
} from "lucide-react";
import SiteShell from "@/components/iesf/SiteShell";
import SectionReveal from "@/components/iesf/SectionReveal";
import { yiesf } from "@/components/iesf/eventsData";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/LanguageProvider";

// ── TYPES ──────────────────────────────────────────────────────────
type Lang = "en" | "id";
const TABS_EN = ["Home", "About", "Categories", "Schedule", "Registration"] as const;
const TABS_ID = ["Beranda", "Tentang", "Kategori", "Jadwal", "Pendaftaran"] as const;
type Tab = (typeof TABS_EN)[number];

const iconMap: Record<string, React.ElementType> = {
  Cpu, Leaf, HeartPulse, FlaskConical, Users,
};

// ── ALL LABELS ─────────────────────────────────────────────────────
const L = {
  // Navbar
  backToEvents:   { en: "Back to Upcoming Events",    id: "Kembali ke Event Mendatang" },
  eventBadge:     { en: "IESF · Competition 2026",    id: "IESF · Kompetisi 2026" },

  // HomeTab
  heroBadge:      { en: "Competition · Yogyakarta, Indonesia", id: "Kompetisi · Yogyakarta, Indonesia" },
  registerNow:    { en: "Register Now",               id: "Daftar Sekarang" },
  learnMore:      { en: "Learn More",                 id: "Pelajari Lebih" },
  guidebook:      { en: "Guidebook",                  id: "Panduan" },
  teamsExpected:  { en: "Teams Expected",             id: "Tim Peserta" },
  categories:     { en: "Competition Categories",     id: "Kategori Kompetisi" },
  participants:   { en: "Participants Overall",        id: "Total Peserta" },
  daysOf:         { en: "of Innovation",              id: "Hari Inovasi" },
  venue:          { en: "Venue",                      id: "Lokasi" },
  contact:        { en: "Contact",                    id: "Kontak" },
  website:        { en: "Website",                    id: "Website" },

  // AboutTab
  welcomeNote:    { en: "Welcome Note",               id: "Sambutan" },
  objectives:     { en: "Objectives",                 id: "Tujuan" },
  divisions:      { en: "Participant Divisions",      id: "Divisi Peserta" },
  judgingCriteria:{ en: "Judging Criteria",           id: "Kriteria Penilaian" },

  // CategoriesTab
  categoriesDesc: {
    en: "YIESF is designed as an academic fair-style competition across five core categories. Participants present projects directly to judges through exhibition and oral explanation.",
    id: "YIESF dirancang sebagai kompetisi bergaya pameran akademik dalam lima kategori utama. Peserta mempresentasikan proyek langsung kepada juri melalui pameran dan penjelasan lisan.",
  },
  categoryLabel:  { en: "Category",                  id: "Kategori" },

  // ScheduleTab
  scheduleDesc: {
    en: "The YIESF event spans 5 days including registration, main competition, workshops, networking, and the awarding ceremony.",
    id: "Acara YIESF berlangsung selama 5 hari mencakup registrasi, kompetisi utama, workshop, networking, dan upacara penghargaan.",
  },
  dayLabel:       { en: "Day",                        id: "Hari" },

  // RegistrationTab
  howToRegister:  { en: "How to Register",            id: "Cara Mendaftar" },
  regSteps: {
    en: [
      "Choose your participant category (Indonesian or International) and competition format (Online or Offline).",
      "Review and agree to the Terms & Conditions for your chosen format.",
      "Fill in the Registration Form with your team's biodata, school data, supervisor info, and project details.",
      "Upload your payment proof via Google Drive and submit the form.",
      "Your Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.",
    ],
    id: [
      "Pilih kategori peserta (Indonesia atau Internasional) dan format kompetisi (Online atau Offline).",
      "Baca dan setujui Syarat & Ketentuan untuk format yang dipilih.",
      "Isi Formulir Pendaftaran dengan biodata tim, data sekolah, info pembimbing, dan detail proyek.",
      "Unggah bukti pembayaran melalui Google Drive dan kirimkan formulir.",
      "Surat Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja.",
    ],
  },
  awards:         { en: "Awards",                     id: "Penghargaan" },
  readyToJoin:    { en: "Ready to join YIESF?",       id: "Siap bergabung di YIESF?" },
  readyDesc: {
    en: "Submit your team's registration now. Deadline is H-14 before the event. Secure your spot in this international innovation fair.",
    id: "Kirimkan pendaftaran tim Anda sekarang. Batas waktu H-14 sebelum acara. Amankan tempat Anda di pameran inovasi internasional ini.",
  },
};

// ── TAB: HOME ──────────────────────────────────────────────────────
const HomeTab = ({ onTabChange, lang }: { onTabChange: (t: Tab) => void; lang: Lang }) => (
  <div className="space-y-10">
    <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex items-end bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.3) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.3) 40px)" }}
      />
      <div className="relative p-8 md:p-12 w-full">
        <span className="inline-block rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">
          {L.heroBadge[lang]}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
          {yiesf.name}
        </h2>
        <p className="mt-3 text-white/70 text-sm md:text-base max-w-xl leading-7">
          {yiesf.about.welcome[lang]}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="hero" onClick={() => onTabChange("Registration")} className="gap-2">
            {L.registerNow[lang]} <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="hero-outline" onClick={() => onTabChange("About")} className="text-white border-white/30 hover:bg-white/10">
            {L.learnMore[lang]}
          </Button>
          <a
            href="https://drive.google.com/file/d/YOUR_FILE_ID/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            {L.guidebook[lang]}
          </a>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: "🏆", label: "500+",   sub: L.teamsExpected[lang] },
        { icon: "🌏", label: "5",      sub: L.categories[lang] },
        { icon: "👥", label: "1,800+", sub: L.participants[lang] },
        { icon: "📅", label: "5 Days", sub: L.daysOf[lang] },
      ].map((item) => (
        <div key={item.label} className="tech-shell rounded-2xl p-5 text-center space-y-1">
          <p className="text-2xl">{item.icon}</p>
          <p className="text-2xl font-bold text-primary">{item.label}</p>
          <p className="text-xs text-muted-foreground">{item.sub}</p>
        </div>
      ))}
    </div>

    <div className="tech-shell rounded-2xl p-6 grid md:grid-cols-3 gap-6 text-sm">
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-foreground">{L.venue[lang]}</p>
          <p className="text-muted-foreground">{yiesf.venue}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-foreground">{L.contact[lang]}</p>
          <p className="text-muted-foreground">{yiesf.email}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Globe className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-foreground">{L.website[lang]}</p>
          <p className="text-muted-foreground">{yiesf.website}</p>
        </div>
      </div>
    </div>
  </div>
);

// ── TAB: ABOUT ─────────────────────────────────────────────────────
const AboutTab = ({ lang }: { lang: Lang }) => (
  <div className="space-y-8">
    <SectionReveal>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{L.welcomeNote[lang]}</h3>
        <p className="text-muted-foreground leading-8">{yiesf.about.welcome[lang]}</p>
        <p className="text-muted-foreground leading-8">{yiesf.about.background[lang]}</p>
      </div>
    </SectionReveal>

    <SectionReveal delay={0.1}>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{L.objectives[lang]}</h3>
        <ul className="space-y-3">
          {yiesf.about.objectives[lang].map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-7">
              <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
              {obj}
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>

    <SectionReveal delay={0.15}>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{L.divisions[lang]}</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {yiesf.divisions.map((d, i) => (
            <div key={i} className="rounded-xl border border-border/60 bg-background/50 p-4 flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 text-primary font-bold text-sm w-8 h-8 flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{d.level[lang]}</p>
                <p className="text-xs text-muted-foreground">{d.age[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>

    <SectionReveal delay={0.2}>
      <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{L.judgingCriteria[lang]}</h3>
        <div className="space-y-3">
          {yiesf.judgingCriteria.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{c.aspect[lang]}</span>
                  <span className="text-primary font-bold">{c.weight}</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: c.weight }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  </div>
);

// ── TAB: CATEGORIES ────────────────────────────────────────────────
const CategoriesTab = ({ lang }: { lang: Lang }) => (
  <div className="space-y-5">
    <SectionReveal>
      <p className="text-muted-foreground leading-8 max-w-2xl">{L.categoriesDesc[lang]}</p>
    </SectionReveal>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {yiesf.categories.map((cat, i) => {
        const Icon = iconMap[cat.icon] ?? Cpu;
        return (
          <SectionReveal key={cat.letter} delay={i * 0.07} className="h-full">
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }} className="tech-shell h-full rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-primary/70 uppercase tracking-widest">
                  {L.categoryLabel[lang]} {cat.letter}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{cat.title[lang]}</h3>
              <p className="text-sm text-muted-foreground leading-7">{cat.description[lang]}</p>
            </motion.div>
          </SectionReveal>
        );
      })}
    </div>
  </div>
);

// ── TAB: SCHEDULE ──────────────────────────────────────────────────
const ScheduleTab = ({ lang }: { lang: Lang }) => (
  <div className="space-y-4">
    <SectionReveal>
      <p className="text-muted-foreground leading-8 max-w-2xl">{L.scheduleDesc[lang]}</p>
    </SectionReveal>
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border/60 hidden md:block" />
      <div className="space-y-4">
        {yiesf.schedule.map((day, i) => (
          <SectionReveal key={day.day} delay={i * 0.08}>
            <div className="md:pl-14 relative">
              <div className="absolute left-0 top-5 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-md">
                {day.day}
              </div>
              <div className="tech-shell rounded-2xl p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="md:hidden inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                    {day.day}
                  </span>
                  <div>
                    <p className="text-xs text-primary uppercase tracking-widest font-semibold">
                      {L.dayLabel[lang]} {day.day}
                    </p>
                    <h3 className="text-lg font-bold text-foreground">{day.title[lang]}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {day.items[lang].map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </div>
);

// ── TAB: REGISTRATION ──────────────────────────────────────────────
const RegistrationTab = ({ lang }: { lang: Lang }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <SectionReveal>
        <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-2xl font-bold text-foreground">{L.howToRegister[lang]}</h3>
          <ol className="space-y-4">
            {L.regSteps[lang].map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-sm text-muted-foreground leading-7">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="tech-shell rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-2xl font-bold text-foreground">{L.awards[lang]}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {yiesf.awards.map((award, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-background/50 p-4 flex items-center gap-3">
                <Trophy className={`h-5 w-5 shrink-0 ${
                  i === 0 ? "text-yellow-400" :
                  i === 1 ? "text-slate-400" :
                  i === 2 ? "text-amber-600" : "text-primary"
                }`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{award.place[lang]}</p>
                  <p className="text-xs text-muted-foreground">{award.medal[lang]} {award.extra[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-foreground">{L.readyToJoin[lang]}</h3>
            <p className="text-sm text-muted-foreground leading-7">{L.readyDesc[lang]}</p>
          </div>
          <Button variant="hero" size="lg" onClick={() => navigate("/register")} className="gap-2 shrink-0">
            {L.registerNow[lang]} <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </SectionReveal>
    </div>
  );
};

// ── MAIN PAGE ──────────────────────────────────────────────────────
const YIESFDetail = () => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const TABS = TABS_EN;
  const TAB_LABELS: Record<Tab, string> = {
    Home:         lang === "id" ? "Beranda"     : "Home",
    About:        lang === "id" ? "Tentang"     : "About",
    Categories:   lang === "id" ? "Kategori"    : "Categories",
    Schedule:     lang === "id" ? "Jadwal"      : "Schedule",
    Registration: lang === "id" ? "Pendaftaran" : "Registration",
  };

  const tabContent: Record<Tab, React.ReactNode> = {
    Home:         <HomeTab onTabChange={setActiveTab} lang={lang} />,
    About:        <AboutTab lang={lang} />,
    Categories:   <CategoriesTab lang={lang} />,
    Schedule:     <ScheduleTab lang={lang} />,
    Registration: <RegistrationTab lang={lang} />,
  };

  return (
    <SiteShell>
      <div className="container pt-6">
        <button
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {L.backToEvents[lang]}
        </button>
      </div>

      <div className="container pt-4 pb-0">
        <div className="relative rounded-3xl overflow-hidden h-28 md:h-36 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 flex items-center px-8">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(255,255,255,.3) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(255,255,255,.3) 30px)" }}
          />
          <div className="relative">
            <p className="text-white/60 text-xs uppercase tracking-[0.25em]">{L.eventBadge[lang]}</p>
            <h1 className="text-white text-xl md:text-3xl font-bold mt-1">
              Yogyakarta International Engineering Science Fair
            </h1>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 text-6xl font-black hidden md:block">
            YIESF
          </div>
        </div>
      </div>

      <div className="container pt-6 pb-0">
        <div className="flex gap-1 rounded-2xl bg-muted/40 border border-border/50 p-1.5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {TAB_LABELS[tab]}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <section className="container py-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </section>
    </SiteShell>
  );
};

export default YIESFDetail;