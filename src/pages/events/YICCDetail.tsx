// ================================================================
// YICCDetail.tsx — YICC 2026 Event Detail Page
// ================================================================
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Music2, Shirt, Mic2, Users, Award, Calendar, MapPin, Clock, ChevronRight, FileText } from "lucide-react";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import {
  competitionCategories, divisions, judgingCriteria,
  awards, schedule, domesticSongs, type BilingualText,
} from "@/components/icc/iccData";

const YICCDetail = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  const LABELS = {
    registerBtn:   { en: "Register Now",               id: "Daftar Sekarang" },
    divisions:     { en: "Participant Divisions",      id: "Divisi Peserta" },
    divisionsSub:  { en: "Open to all school levels and communities", id: "Terbuka untuk semua jenjang sekolah dan komunitas" },
    categories:    { en: "Competition Categories",     id: "Kategori Kompetisi" },
    judging:       { en: "Judging Criteria",           id: "Kriteria Penilaian" },
    judgingDance:  { en: "Dance (Solo & Group)",       id: "Tari (Solo & Grup)" },
    judgingCostume:{ en: "Costume Show",               id: "Pertunjukan Kostum" },
    judgingVocal:  { en: "Traditional Song Solo",      id: "Lagu Tradisional Solo" },
    awards:        { en: "Awards & Recognition",       id: "Penghargaan & Pengakuan" },
    awardsSub:     { en: "Recognition based on passing grade system", id: "Penghargaan berbasis sistem nilai kelulusan" },
    schedule:      { en: "Event Schedule",             id: "Jadwal Acara" },
    scheduleSub:   { en: "5 days of culture, performance, and celebration", id: "5 hari budaya, penampilan, dan perayaan" },
    songs:         { en: "Official Song List",         id: "Daftar Lagu Resmi" },
    songsSub:      { en: "For Traditional Song Solo — domestic participants", id: "Untuk Lagu Tradisional Solo — peserta domestik" },
    documents:     { en: "Required Documents",         id: "Dokumen yang Diperlukan" },
    guideBtn:      { en: "Download Guidebook",         id: "Unduh Buku Panduan" },
    back:          { en: "← Back",                    id: "← Kembali" },
  };

  const docsByCategory = {
    dance: {
      en: ["Title of dance", "Cultural origin / region / country", "Short performance description", "Music file (MP3/WAV)", "Property declaration (if applicable)"],
      id: ["Judul tari", "Asal budaya / daerah / negara", "Deskripsi singkat penampilan", "File musik (MP3/WAV)", "Deklarasi properti (jika ada)"],
    },
    costume: {
      en: ["Costume title / theme", "Cultural inspiration", "Short costume description", "Music file (MP3/WAV)"],
      id: ["Judul/tema kostum", "Inspirasi budaya", "Deskripsi singkat kostum", "File musik (MP3/WAV)"],
    },
    vocal: {
      en: ["Song title", "Cultural origin / region / country", "Short song description or meaning", "Instrumental backing track", "Lyrics (if required)"],
      id: ["Judul lagu", "Asal budaya / daerah / negara", "Deskripsi singkat atau makna lagu", "Iringan instrumental", "Lirik (jika diperlukan)"],
    },
  };

  return (
    <IccShell>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-fuchsia-950 to-amber-950" />
        <div className="absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse at 25% 30%, hsl(38 95% 55% / 0.25) 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, hsl(350 75% 55% / 0.3) 0%, transparent 55%)" }} />
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        {/* Floating ornaments */}
        {["🌺","🎭","🪗","🏮","🌸","🎶"].map((icon, i) => (
          <motion.div key={i}
            className="absolute text-3xl opacity-15 pointer-events-none"
            style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 20}%` }}
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7 + i, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}>
            {icon}
          </motion.div>
        ))}

        <div className="container relative z-10">
          <button onClick={() => navigate(-1)}
            className="mb-6 text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1">
            {LABELS.back[lang]}
          </button>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">Competition</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">2026</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
              Yogyakarta<br />
              <span style={{
                background: "linear-gradient(135deg, hsl(38 95% 62%), hsl(350 80% 68%))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>International Cultural</span><br />
              Competition
            </h1>
            <p className="text-white/70 text-base leading-7 max-w-xl">
              {lang === "en"
                ? "An international cultural competition celebrating traditional arts, ethnic identity, and global cultural exchange through performance-based categories."
                : "Kompetisi budaya internasional merayakan seni tradisional, identitas etnik, dan pertukaran budaya global melalui kategori berbasis penampilan."}
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-white/60">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Yogyakarta, Indonesia</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> TBA, 2026</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 {lang === "en" ? "days" : "hari"}</div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm hover:brightness-110 transition-all"
                style={{ background: "linear-gradient(135deg, hsl(38 95% 55%), hsl(350 75% 55%))", color: "#fff" }}>
                {LABELS.registerBtn[lang]}
              </button>
              <a href="/guide" className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-all">
                <FileText className="h-4 w-4" /> {LABELS.guideBtn[lang]}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PARTICIPANT DIVISIONS ──────────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(38 95% 55%)" }}>Who Can Join</p>
          <h2 className="text-3xl font-bold font-display">{LABELS.divisions[lang]}</h2>
          <p className="text-muted-foreground text-sm">{LABELS.divisionsSub[lang]}</p>
        </SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((div, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className="cultural-shell rounded-2xl p-5 text-center space-y-2">
                <div className="text-3xl">{["🏫","🏃","👨‍🎓","🌍"][i]}</div>
                <h3 className="font-bold text-foreground text-sm">{div.level[lang]}</h3>
                <p className="text-xs text-muted-foreground">{div.age[lang]}</p>
                <span className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold"
                  style={{ background: "hsl(38 95% 55% / 0.12)", color: "hsl(38 95% 55%)" }}>
                  {div.note[lang]}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── COMPETITION CATEGORIES ────────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(350 75% 60%)" }}>Performances</p>
            <h2 className="text-3xl font-bold font-display">{LABELS.categories[lang]}</h2>
          </SectionReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {competitionCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <SectionReveal key={cat.letter} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }}
                    className="cultural-shell rounded-2xl p-6 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cat. {cat.letter}</span>
                    <h3 className="font-bold text-foreground text-sm leading-snug mt-1 mb-2">{cat.title[lang]}</h3>
                    <p className="text-xs text-muted-foreground leading-6 flex-1">{cat.description[lang]}</p>
                    <div className="mt-4 pt-4 border-t border-border/40 space-y-1 text-[11px] text-muted-foreground">
                      <p>👥 {cat.participants[lang]}</p>
                      <p>⏱ {cat.duration[lang]}</p>
                    </div>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── JUDGING CRITERIA ──────────────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(270 70% 65%)" }}>Assessment</p>
          <h2 className="text-3xl font-bold font-display">{LABELS.judging[lang]}</h2>
        </SectionReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { key: "dance",   label: LABELS.judgingDance,   criteria: judgingCriteria.dance,   icon: "💃", color: "hsl(350 75% 55%)" },
            { key: "costume", label: LABELS.judgingCostume, criteria: judgingCriteria.costume, icon: "👘", color: "hsl(270 70% 60%)" },
            { key: "vocal",   label: LABELS.judgingVocal,   criteria: judgingCriteria.vocal,   icon: "🎤", color: "hsl(175 70% 45%)" },
          ].map(({ key, label, criteria, icon, color }) => (
            <SectionReveal key={key}>
              <div className="cultural-shell rounded-2xl p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{icon}</span>
                  <h3 className="font-bold text-foreground text-sm">{label[lang]}</h3>
                </div>
                <div className="space-y-3">
                  {criteria.map((c, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground flex-1">{c.aspect[lang]}</span>
                      <span className="text-xs font-bold shrink-0" style={{ color }}>{c.weight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── AWARDS ────────────────────────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(38 95% 55%)" }}>Recognition</p>
            <h2 className="text-3xl font-bold font-display">{LABELS.awards[lang]}</h2>
            <p className="text-muted-foreground text-sm">{LABELS.awardsSub[lang]}</p>
          </SectionReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {awards.map((award, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}
                  className="cultural-shell rounded-2xl px-6 py-5 flex flex-col items-center gap-2 min-w-[130px]">
                  <span className="text-3xl">{award.icon}</span>
                  <span className="text-sm font-bold text-foreground text-center">{award.label[lang]}</span>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT SCHEDULE ────────────────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(350 75% 60%)" }}>Itinerary</p>
          <h2 className="text-3xl font-bold font-display">{LABELS.schedule[lang]}</h2>
          <p className="text-muted-foreground text-sm">{LABELS.scheduleSub[lang]}</p>
        </SectionReveal>
        <div className="space-y-4 max-w-3xl mx-auto">
          {schedule.map((day, i) => (
            <SectionReveal key={day.day} delay={i * 0.07}>
              <div className="cultural-shell rounded-2xl p-5 flex gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: i % 2 === 0 ? "hsl(38 95% 55% / 0.15)" : "hsl(350 75% 55% / 0.15)" }}>
                    {day.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Day {day.day}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">{day.title[lang]}</h3>
                  <ul className="space-y-1">
                    {day.highlights[lang].map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ChevronRight className="h-3 w-3 shrink-0" style={{ color: i % 2 === 0 ? "hsl(38 95% 55%)" : "hsl(350 75% 55%)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── OFFICIAL SONG LIST ────────────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(175 70% 45%)" }}>🎵</p>
            <h2 className="text-3xl font-bold font-display">{LABELS.songs[lang]}</h2>
            <p className="text-muted-foreground text-sm">{LABELS.songsSub[lang]}</p>
          </SectionReveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {domesticSongs.map((song, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="cultural-shell rounded-xl p-4 flex items-center gap-3">
                  <span className="text-lg">🎵</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">{song.title}</p>
                    <p className="text-[11px] text-muted-foreground">{song.region[lang]}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUIRED DOCUMENTS ───────────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(38 95% 55%)" }}>Submission</p>
          <h2 className="text-3xl font-bold font-display">{LABELS.documents[lang]}</h2>
        </SectionReveal>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: "🕺", title: { en: "Dance Categories", id: "Kategori Tari" }, docs: docsByCategory.dance },
            { icon: "👘", title: { en: "Costume Show",     id: "Pertunjukan Kostum" }, docs: docsByCategory.costume },
            { icon: "🎤", title: { en: "Traditional Song", id: "Lagu Tradisional" }, docs: docsByCategory.vocal },
          ].map(({ icon, title, docs }, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="cultural-shell rounded-2xl p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-bold text-foreground">{title[lang]}</h3>
                </div>
                <ul className="space-y-2">
                  {docs[lang].map((doc, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 shrink-0" style={{ color: "hsl(38 95% 55%)" }}>•</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA */}
        <SectionReveal className="mt-14 text-center">
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold hover:brightness-110 hover:scale-[1.02] transition-all"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--primary-foreground))",
                }}>
             {LABELS.registerBtn[lang]}
          </button>
        </SectionReveal>
      </section>
    </IccShell>
  );
};

export default YICCDetail;