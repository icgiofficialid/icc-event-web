// ================================================================
// IccIndex.tsx — ICC Portal Home Page (v3)
// ================================================================
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MapPin, Calendar, Users, Globe, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { iccEvents } from "@/components/icc/iccEventsData";
import { competitionCategories, goals, pageMeta } from "@/components/icc/iccData";

// ── STATS DATA (hardcoded, no emoji) ─────────────────────────────
const STATS = [
  { value: "4",    label: { en: "Competition Categories", id: "Kategori Kompetisi" } },
  { value: "5",    label: { en: "Days of Culture",        id: "Hari Penuh Budaya"  } },
  { value: "Open", label: { en: "to All Ages",            id: "untuk Semua Usia"   } },
  { value: "Intl", label: { en: "Stage",                  id: "Panggung"           } },
];

// ── EVENT CARD ────────────────────────────────────────────────────
const EventCard = ({ event, index }: { event: typeof iccEvents[0]; index: number }) => {
  const navigate = useNavigate();
  return (
    <SectionReveal delay={index * 0.08} className="h-full">
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ duration: 0.25 }}
        onClick={() => navigate(`/events/${event.slug}`)}
        className="cursor-pointer group h-full"
      >
        <div className={`relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br ${event.coverGradient}`}>
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
          <div className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(ellipse at 80% 20%, rgba(255,200,100,0.25) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(255,100,120,0.18) 0%, transparent 50%)" }} />
          <div className="relative aspect-[3/4] flex flex-col justify-between p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                {event.type}
              </div>
              <span className="text-white/30 text-[9px] tracking-[0.3em] font-black">ICC</span>
            </div>
            <div className="flex-1 flex items-center justify-center pointer-events-none select-none">
              <p className="text-white/[0.06] text-[5.5rem] font-black leading-none tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>YICC</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-px bg-white/30 mb-3" />
              <p className="text-white/50 text-[9px] uppercase tracking-[0.25em] font-semibold">{event.subtitle}</p>
              <h3 className="text-white text-base font-bold leading-tight">{event.title}</h3>
              <div className="pt-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-2.5 w-2.5 text-white/50 shrink-0" />
                  <p className="text-white/65 text-[11px]">{event.location}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-2.5 w-2.5 text-white/50 shrink-0" />
                  <p className="text-white/50 text-[11px]">{event.dateRange}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 group-hover:bg-white/18 transition-colors">
                <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">View Details</span>
                <ArrowRight className="h-3 w-3 text-white/60 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionReveal>
  );
};

// ── POPUP ─────────────────────────────────────────────────────────
const EventPopup = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-4 sm:right-6 z-50 w-64 sm:w-72"
    >
      <div className="rounded-2xl bg-panel border border-border shadow-xl overflow-hidden">
        <div className="h-[2px]" style={{ background: "linear-gradient(90deg, hsl(38 95% 55% / 0.8), hsl(350 75% 55% / 0.6), transparent)" }} />
        <div className="p-4 cursor-pointer group" onClick={() => { navigate("/events/yicc"); onClose(); }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-400" />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">New Event</span>
            </div>
            <button onClick={e => { e.stopPropagation(); onClose(); }} className="text-muted-foreground hover:text-foreground">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest">Cultural Competition · 2026</p>
            <p className="text-lg font-bold text-foreground leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>YICC 2026</p>
            <p className="text-xs text-muted-foreground">Yogyakarta, Indonesia</p>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-[11px] font-medium" style={{ color: "hsl(38 95% 58%)" }}>Registration open</span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground group-hover:text-foreground transition-all">
              View <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── FLOATING ORNAMENT ─────────────────────────────────────────────
const FloatingOrnament = ({ delay, x, y, icon }: { delay: number; x: string; y: string; icon: string }) => (
  <motion.div
    className="absolute text-xl pointer-events-none select-none"
    style={{ left: x, top: y, opacity: 0.18 }}
    animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
    transition={{ duration: 7 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    {icon}
  </motion.div>
);

// ── MAIN ──────────────────────────────────────────────────────────
const IccIndex = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { lang } = useLang();
  const upcomingEvents = iccEvents.filter(e => e.status === "upcoming");
  const meta = pageMeta.about;

  useEffect(() => {
    const show = setTimeout(() => setShowPopup(true), 2500);
    const hide = setTimeout(() => setShowPopup(false), 7000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  const LABELS = {
    heroEyebrow: { en: "International Cultural Competition", id: "Kompetisi Budaya Internasional" },
    heroSub:     { en: "A global stage celebrating traditional arts, ethnic identity, and cultural heritage through dance, costume, and vocal performance.", id: "Panggung global merayakan seni tradisional, identitas etnik, dan warisan budaya melalui tari, kostum, dan penampilan vokal." },
    registerBtn: { en: "Register Now",     id: "Daftar Sekarang" },
    allEvents:   { en: "All events",       id: "Semua event" },
    catTitle:    { en: "Competition Categories", id: "Kategori Kompetisi" },
    catSub:      { en: "Four performance categories celebrating the richness of global culture", id: "Empat kategori penampilan merayakan kekayaan budaya global" },
    eventsTitle: { en: "Upcoming Events",  id: "Event Mendatang" },
    noEvents:    { en: "No events found.", id: "Tidak ada event." },
    scrollLabel: { en: "Scroll",           id: "Gulir" },
  };

  return (
    <IccShell>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">

        {/* Warm dark background glows */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 0%,   hsl(28 80% 30% / 0.55) 0%, transparent 55%),
            radial-gradient(ellipse 70% 55% at 85% 100%, hsl(350 70% 28% / 0.55) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 50% 50%,  hsl(270 40% 15% / 0.30) 0%, transparent 70%)
          `
        }} />

        {/* Floating ornaments */}
        <FloatingOrnament delay={0}   x="7%"  y="12%" icon="🌺" />
        <FloatingOrnament delay={1.5} x="87%" y="10%" icon="🎭" />
        <FloatingOrnament delay={0.8} x="4%"  y="62%" icon="🪗" />
        <FloatingOrnament delay={2.2} x="91%" y="56%" icon="🎶" />
        <FloatingOrnament delay={1.2} x="12%" y="78%" icon="🏮" />
        <FloatingOrnament delay={3}   x="78%" y="80%" icon="🌸" />

        <motion.div className="relative z-10 flex flex-col items-center gap-6 max-w-5xl w-full">

          {/* Eyebrow badge */}
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.28em] font-bold"
              style={{
                borderColor: "hsl(38 90% 55% / 0.5)",
                background: "hsl(38 90% 55% / 0.12)",
                color: "hsl(38 95% 68%)",
              }}>
              <Globe className="h-3 w-3" />
              {LABELS.heroEyebrow[lang]}
            </div>
          </motion.div>

          {/* ── BIG ICC TITLE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Bloom glow */}
            <div className="absolute inset-0 -z-10 blur-[80px] opacity-40 scale-75"
              style={{ background: "linear-gradient(135deg, hsl(38 95% 55%), hsl(350 75% 55%))" }} />

            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(6rem, 20vw, 16rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                background: "linear-gradient(145deg, hsl(45 100% 80%) 0%, hsl(38 95% 62%) 25%, hsl(350 80% 65%) 65%, hsl(270 65% 72%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px hsl(38 95% 50% / 0.5))",
              }}
            >
              ICC
            </h1>
          </motion.div>

          {/* BY ICGI */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex items-center gap-3 -mt-2">
            <div className="w-14 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(38 90% 55% / 0.6))" }} />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase" style={{ color: "hsl(35 40% 58%)" }}>BY ICGI</span>
            <div className="w-14 h-px" style={{ background: "linear-gradient(to left, transparent, hsl(38 90% 55% / 0.6))" }} />
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-sm md:text-base leading-7 max-w-md mx-auto"
            style={{ color: "hsl(35 30% 65%)" }}>
            {LABELS.heroSub[lang]}
          </motion.p>

          {/* ── STATS — no emoji, clear text ── */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm divide-x divide-white/10">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center px-6 py-4 min-w-[90px]">
                <span
                  className="font-bold text-2xl leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: i % 2 === 0 ? "hsl(38 95% 65%)" : "hsl(350 80% 68%)",
                  }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] mt-1.5 text-center leading-4"
                  style={{ color: "hsl(35 25% 55%)" }}>
                  {s.label[lang]}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            className="flex items-center gap-3">
            <button
              onClick={() => navigate("/events/yicc")}
              className="flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, hsl(38 95% 52%), hsl(350 75% 50%))",
                boxShadow: "0 6px 28px hsl(38 90% 50% / 0.45), 0 0 0 1px hsl(38 95% 65% / 0.2)",
              }}
            >
              🌸 {LABELS.registerBtn[lang]}
            </button>
            <button
              onClick={() => navigate("/events")}
              className="flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{
                border: "1px solid hsl(35 30% 32%)",
                background: "hsl(20 30% 10% / 0.7)",
                color: "hsl(35 40% 72%)",
                backdropFilter: "blur(8px)",
              }}
            >
              {LABELS.allEvents[lang]} <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "hsl(35 20% 42%)" }}>
            {LABELS.scrollLabel[lang]}
          </span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, hsl(38 95% 55% / 0.5), transparent)" }} />
        </motion.div>
      </section>

      {/* ── ABOUT / GOALS ───────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-surface/60 border-y border-border/40" />
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(38 95% 55% / 0.08) 0%, transparent 60%)" }} />

        <div className="container relative z-10">
          <SectionReveal className="mb-12 text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(38 95% 58%)" }}>
              {meta.eyebrow[lang]}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {meta.title[lang]}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-7">{meta.description[lang]}</p>
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal, i) => {
              const icons = [Globe, Heart, Users, Star];
              const Icon = icons[i % icons.length];
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                    className="cultural-shell rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: i % 2 === 0 ? "hsl(38 95% 55% / 0.15)" : "hsl(350 75% 55% / 0.15)" }}>
                      <Icon className="h-4 w-4" style={{ color: i % 2 === 0 ? "hsl(38 95% 62%)" : "hsl(350 75% 62%)" }} />
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{goal[lang]}</p>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMPETITION CATEGORIES ─────────────────────── */}
      <section className="container min-h-screen flex flex-col justify-center py-20 md:py-28">
        <SectionReveal className="mb-12 text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(350 75% 62%)" }}>
            YICC 2026
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            {LABELS.catTitle[lang]}
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">{LABELS.catSub[lang]}</p>
        </SectionReveal>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {competitionCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <SectionReveal key={cat.letter} delay={i * 0.08}>
                <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }}
                  className="cultural-shell rounded-2xl p-6 h-full flex flex-col cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Cat. {cat.letter}</div>
                  <h3 className="font-bold text-foreground text-base leading-snug mb-2">{cat.title[lang]}</h3>
                  <p className="text-sm leading-6 text-muted-foreground flex-1">{cat.description[lang]}</p>
                  <div className="mt-4 pt-4 border-t border-border/50 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3 w-3 text-muted-foreground/60" />
                      <span className="text-[11px] text-muted-foreground">{cat.participants[lang]}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">⏱ {cat.duration[lang]}</span>
                  </div>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* ── UPCOMING EVENTS ─────────────────────────────── */}
      <section className="container min-h-screen flex flex-col justify-center py-20 md:py-28">
        <SectionReveal className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(38 95% 58%)" }}>
              What's Coming
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {LABELS.eventsTitle[lang]}
            </h2>
          </div>
          <button onClick={() => navigate("/events")}
            className="self-start sm:self-auto flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
            {LABELS.allEvents[lang]} <ArrowRight className="h-4 w-4" />
          </button>
        </SectionReveal>

        {upcomingEvents.length === 0 ? (
          <SectionReveal className="py-20 text-center text-muted-foreground">{LABELS.noEvents[lang]}</SectionReveal>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {showPopup && <EventPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>
    </IccShell>
  );
};

export default IccIndex;