// ================================================================
// IccIndex.tsx — Monochrome premium · obsidian black & white
// Cinematic · editorial · modern
// ================================================================
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ArrowRight, MapPin, Calendar, Users, Globe, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { iccEvents } from "@/components/icc/iccEventsData";
import { competitionCategories, goals, pageMeta } from "@/components/icc/iccData";

// ── SNOWFLAKE LOGO — matches the geometric crystal logo ───────────
const SnowflakeMark = ({
  size = 120,
  opacity = 0.1,
  className = "",
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) => {
  const arms = Array.from({ length: 6 }, (_, i) => i * 60);
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 200 200"
      fill="currentColor"
      style={{ opacity }}
      className={className}
    >
      <g transform="translate(100,100)">
        <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" />
        {arms.map(angle => (
          <g key={angle} transform={`rotate(${angle})`}>
            <polygon points="0,-36 12,-58 0,-80 -12,-58" />
            <circle cx="0" cy="-52" r="8" fill="none" stroke="currentColor" strokeWidth="5" />
            <circle cx="0" cy="-84" r="6" />
            <circle cx="11" cy="-44" r="4" />
            <circle cx="-11" cy="-44" r="4" />
          </g>
        ))}
        {arms.map(angle => (
          <g key={`t-${angle}`} transform={`rotate(${angle + 30})`}>
            <polygon points="0,-26 14,-46 -14,-46" />
          </g>
        ))}
      </g>
    </svg>
  );
};

// ── EVENT CARD ────────────────────────────────────────────────────
const EventCard = ({ event, index }: { event: typeof iccEvents[0]; index: number }) => {
  const navigate = useNavigate();
  return (
    <SectionReveal delay={index * 0.08} className="h-full">
      <motion.div
        whileHover={{ y: -8, scale: 1.018 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => navigate(`/events/${event.slug}`)}
        className="cursor-pointer group h-full"
      >
        <div
          className="relative rounded-2xl overflow-hidden h-full transition-all duration-300 group-hover:scale-[1.01]"
          style={{
            boxShadow: "0 12px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,200,80,0.12)",
            border: "1px solid rgba(255,180,60,0.18)",
          }}
        >
          {/* Card face — fixed warm gradient, theme-independent */}
          <div
            className="relative aspect-[3/4] flex flex-col justify-between p-5"
            style={{
              background: `
                radial-gradient(ellipse at 25% 15%, rgba(255,200,80,0.28) 0%, transparent 50%),
                radial-gradient(ellipse at 75% 80%, rgba(200,40,60,0.35) 0%, transparent 50%),
                linear-gradient(160deg, #1a1208 0%, #100a0a 50%, #0e0509 100%)
              `,
            }}
          >
            {/* Watermark snowflake */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <SnowflakeMark size={130} opacity={0.05} className="text-amber-300" />
            </div>

            {/* Subtle top vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, rgba(255,180,60,0.06) 0%, transparent 40%, rgba(160,20,40,0.12) 100%)",
              }}
            />

            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

            {/* Top row */}
            <div className="relative flex items-start justify-between z-10">
              <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest border border-white/15 bg-white/8">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                {event.type}
              </div>
              <span
                className="text-white/25 text-[9px] tracking-[0.35em] font-black"
                style={{ fontFamily: "'Cinzel', serif" }}
              >ICC</span>
            </div>

            {/* Bottom content */}
            <div className="relative z-10 space-y-1.5">
              <div className="w-6 h-px bg-white/25 mb-3" />
              <p className="text-white/45 text-[9px] uppercase tracking-[0.28em] font-semibold">{event.subtitle}</p>
              <h3
                className="text-white text-base font-medium leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >{event.title}</h3>
              <div className="pt-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-2.5 w-2.5 text-white/40 shrink-0" />
                  <p className="text-white/60 text-[11px]">{event.location}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-2.5 w-2.5 text-white/40 shrink-0" />
                  <p className="text-white/40 text-[11px]">{event.dateRange}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-white/6 border border-white/10 px-3 py-2 group-hover:bg-white/12 transition-colors">
                <span className="text-white/70 text-[10px] font-semibold uppercase tracking-wider">View Details</span>
                <ArrowRight className="h-3 w-3 text-white/50 group-hover:translate-x-0.5 transition-transform" />
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
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-4 sm:right-6 z-50 w-64 sm:w-72"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.10)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Top accent bar — warm gold-crimson sesuai card */}
        <div
          className="h-[3px]"
          style={{
            background: "linear-gradient(90deg, #f59e0b 0%, #ef4444 60%, transparent 100%)",
          }}
        />
        <div className="p-4 cursor-pointer group" onClick={() => { navigate("/events/yicc"); onClose(); }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#ef4444" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#ef4444" }} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#6b7280" }}>New Event</span>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onClose(); }}
              className="rounded-lg p-1 transition-colors hover:bg-gray-100"
              style={{ color: "#9ca3af" }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#9ca3af" }}>
              Cultural Competition · 2026
            </p>
            <p
              className="text-xl font-semibold leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#111827", fontWeight: 600 }}
            >
              YICC 2026
            </p>
            <p className="text-xs" style={{ color: "#6b7280" }}>Yogyakarta, Indonesia</p>
          </div>

          <div
            className="mt-3 pt-3 flex items-center justify-between"
            style={{ borderTop: "1px solid #f3f4f6" }}
          >
            <span className="text-[11px] font-semibold" style={{ color: "#111827" }}>
              Registration open
            </span>
            <span
              className="flex items-center gap-1 text-[11px] font-medium transition-all group-hover:gap-2"
              style={{ color: "#6b7280" }}
            >
              View <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── CINEMATIC COUNTER (letter by letter reveal) ───────────────────
const LetterReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "50% 100%" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// ── MAIN ──────────────────────────────────────────────────────────
const IccIndex = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { lang } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const upcomingEvents = iccEvents.filter(e => e.status === "upcoming");
  const meta = pageMeta.about;

  // Parallax for hero logo
  const { scrollY } = useScroll();
  const logoY = useTransform(scrollY, [0, 600], [0, -80]);
  const logoOpacity = useTransform(scrollY, [0, 400], [0.06, 0]);

  useEffect(() => {
    const show = setTimeout(() => setShowPopup(true), 2800);
    const hide = setTimeout(() => setShowPopup(false), 7500);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  const LABELS = {
    heroEyebrow: { en: "International Cultural Competition", id: "Kompetisi Budaya Internasional" },
    heroSub: {
      en: "A global stage celebrating traditional arts, ethnic identity, and cultural heritage through dance, costume, and vocal performance.",
      id: "Panggung global merayakan seni tradisional, identitas etnik, dan warisan budaya melalui tari, kostum, dan penampilan vokal.",
    },
    registerBtn: { en: "Register Now",      id: "Daftar Sekarang" },
    allEvents:   { en: "All Events",        id: "Semua Event" },
    catTitle:    { en: "Competition Categories", id: "Kategori Kompetisi" },
    catSub:      { en: "Four performance categories celebrating the richness of global culture", id: "Empat kategori penampilan merayakan kekayaan budaya global" },
    eventsTitle: { en: "Upcoming Events",   id: "Event Mendatang" },
    noEvents:    { en: "No events found.",  id: "Tidak ada event." },
    scrollLabel: { en: "Scroll",            id: "Gulir" },
  };

  return (
    <IccShell>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(0 0% 100% / 0.05) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Parallax large snowflake — background */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-foreground"
          style={{ y: logoY, opacity: logoOpacity }}
          animate={{ rotate: 360 }}
          transition={{ rotate: { duration: 120, repeat: Infinity, ease: "linear" } }}
        >
          <SnowflakeMark size={700} opacity={1} />
        </motion.div>

        {/* Top-right accent snowflake */}
        <motion.div
          className="absolute -top-12 -right-12 pointer-events-none select-none text-foreground"
          style={{ opacity: 0.04 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <SnowflakeMark size={320} opacity={1} />
        </motion.div>

        {/* Bottom-left accent */}
        <motion.div
          className="absolute -bottom-16 -left-16 pointer-events-none select-none text-foreground"
          style={{ opacity: 0.03 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <SnowflakeMark size={240} opacity={1} />
        </motion.div>

        {/* Horizontal scan lines (cinematic) */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: "30%", background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.06), transparent)" }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: "70%", background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.04), transparent)" }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
        />

        {/* Content */}
        <motion.div className="relative z-10 flex flex-col items-center gap-8 max-w-5xl w-full">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-foreground/5 px-5 py-2 text-[11px] uppercase tracking-[0.3em] font-semibold text-foreground/70">
              <SnowflakeMark size={11} opacity={0.7} />
              {LABELS.heroEyebrow[lang]}
            </div>
          </motion.div>

          {/* MAIN TITLE — cinematic letter reveal */}
          <div className="relative flex flex-col items-center gap-1 perspective-[800px]">
            {/* Glow bloom behind title */}
            <motion.div
              className="absolute inset-0 -z-10 blur-[120px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              transition={{ delay: 0.6, duration: 1.5 }}
              style={{ background: "radial-gradient(ellipse, hsl(var(--foreground)) 0%, transparent 70%)" }}
            />

            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(6rem, 22vw, 18rem)",
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: "0.06em",
                color: "hsl(var(--foreground))",
              }}
            >
              <LetterReveal text="ICC" delay={0.3} />
            </h1>

            {/* Decorative rule */}
            <div className="flex items-center gap-3 mt-3">
              <motion.div
                className="h-px"
                style={{ background: "linear-gradient(to right, transparent, hsl(var(--foreground) / 0.3))" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 64, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1 h-1 rounded-full bg-foreground" style={{ opacity: 0.3 + i * 0.2 }} />
                ))}
              </motion.div>
              <motion.span
                className="text-[10px] uppercase tracking-[0.5em] font-semibold text-muted-foreground"
                style={{ fontFamily: "'Cinzel', serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.5 }}
              >
                BY ICGI
              </motion.span>
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                {[2, 1, 0].map(i => (
                  <div key={i} className="w-1 h-1 rounded-full bg-foreground" style={{ opacity: 0.3 + i * 0.2 }} />
                ))}
              </motion.div>
              <motion.div
                className="h-px"
                style={{ background: "linear-gradient(to left, transparent, hsl(var(--foreground) / 0.3))" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 64, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base leading-7 max-w-md mx-auto text-muted-foreground"
          >
            {LABELS.heroSub[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => navigate("/events/yicc")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold overflow-hidden"
              style={{
                background: "hsl(var(--foreground))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 4px 32px hsl(var(--foreground) / 0.3)",
                letterSpacing: "0.02em",
              }}
            >
              {/* Shimmer sweep */}
              <motion.span
                className="absolute inset-0 -translate-x-full"
                style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.15), transparent)" }}
                animate={{ x: ["−100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <SnowflakeMark size={14} opacity={0.6} />
              {LABELS.registerBtn[lang]}
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={() => navigate("/events")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground"
            >
              {LABELS.allEvents[lang]} <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            {LABELS.scrollLabel[lang]}
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-foreground/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ABOUT / GOALS
      ══════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface/30 border-y border-border/30" />

        {/* BG ornament */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-foreground"
          style={{ opacity: 0.03 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        >
          <SnowflakeMark size={480} opacity={1} />
        </motion.div>

        <div className="container relative z-10">
          <SectionReveal className="mb-14 text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.45em] font-semibold text-muted-foreground">
              {meta.eyebrow[lang]}
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
            >
              {meta.title[lang]}
            </h2>
            <div className="flex justify-center">
              <div className="h-px w-16 bg-foreground/20" />
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-7">
              {meta.description[lang]}
            </p>
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal, i) => {
              const icons = [Globe, Heart, Users, Star];
              const Icon = icons[i % icons.length];
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="cultural-shell rounded-2xl p-5 flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border border-foreground/12 bg-foreground/5">
                      <Icon className="h-4 w-4 text-foreground/60" />
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{goal[lang]}</p>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          COMPETITION CATEGORIES
      ══════════════════════════════════════════════════════════ */}
      <section className="container min-h-screen flex flex-col justify-center py-20 md:py-28">
        <SectionReveal className="mb-14 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.45em] font-semibold text-muted-foreground">
            YICC 2026
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          >
            {LABELS.catTitle[lang]}
          </h2>
          <div className="flex justify-center">
            <div className="h-px w-16 bg-foreground/20" />
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">{LABELS.catSub[lang]}</p>
        </SectionReveal>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {competitionCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <SectionReveal key={cat.letter} delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="cultural-shell rounded-2xl p-6 h-full flex flex-col cursor-pointer group relative overflow-hidden"
                >
                  {/* Corner snowflake */}
                  <div className="absolute -top-5 -right-5 pointer-events-none text-foreground" style={{ opacity: 0.04 }}>
                    <SnowflakeMark size={90} opacity={1} />
                  </div>

                  <div className="w-10 h-10 rounded-xl border border-foreground/12 bg-foreground/5 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Cat. {cat.letter}
                  </div>
                  <h3
                    className="font-medium text-foreground text-base leading-snug mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {cat.title[lang]}
                  </h3>
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

      {/* ══════════════════════════════════════════════════════════
          UPCOMING EVENTS
      ══════════════════════════════════════════════════════════ */}
      <section className="container min-h-screen flex flex-col justify-center py-20 md:py-28">
        <SectionReveal className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.45em] font-semibold text-muted-foreground">
              What's Coming
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
            >
              {LABELS.eventsTitle[lang]}
            </h2>
          </div>
          <motion.button
            onClick={() => navigate("/events")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="self-start sm:self-auto flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all bg-transparent"
          >
            {LABELS.allEvents[lang]} <ArrowRight className="h-4 w-4" />
          </motion.button>
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