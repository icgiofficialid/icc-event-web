import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, ArrowRight,  MapPin, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SiteShell from "@/components/iesf/SiteShell";
import SectionReveal from "@/components/iesf/SectionReveal";
import { events } from "@/components/iesf/eventsData";
import { categories, pageMeta } from "@/components/iesf/siteData";
import { useLang } from "@/components/LanguageProvider";
import { useRef } from "react";


// ── EVENT CARD — elevated poster style ────────────────────────────
const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const navigate = useNavigate();
  return (
    <SectionReveal delay={index * 0.07} className="h-full">
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={() => navigate(`/events/${event.slug}`)}
        className="cursor-pointer group h-full"
      >
        {/* Poster card */}
        <div className={`relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br ${event.coverGradient}`}>
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          />
          {/* Radial glows */}
          <div className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(ellipse at 85% 15%, rgba(255,255,255,0.22) 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(255,255,255,0.12) 0%, transparent 45%)" }}
          />

          {/* Aspect ratio wrapper */}
          <div className="relative aspect-[3/4] flex flex-col justify-between p-5">
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                {event.type}
              </div>
              <span className="text-white/30 text-[9px] tracking-[0.3em] font-black">IESF</span>
            </div>

            {/* Center decorative element */}
            <div className="flex-1 flex items-center justify-center pointer-events-none select-none">
            <p className="text-white/[0.06] text-[7rem] font-black leading-none tracking-tighter">
              YIESF
            </p>
            </div>

            {/* Bottom info */}
            <div className="space-y-1.5">
              {/* Thin separator */}
              <div className="w-8 h-px bg-white/30 mb-3" />
              <p className="text-white/50 text-[9px] uppercase tracking-[0.25em] font-semibold">{event.subtitle}</p>
              <h3 className="text-white text-lg font-black leading-tight tracking-tight">{event.title}</h3>
              <div className="pt-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-2.5 w-2.5 text-white/50 shrink-0" />
                  <p className="text-white/65 text-[11px] truncate">{event.location}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-2.5 w-2.5 text-white/50 shrink-0" />
                  <p className="text-white/50 text-[11px]">{event.dateRange}</p>
                </div>
              </div>

              {/* CTA strip */}
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


// ── POPUP NOTIFICATION ─────────────────────────────────────────────
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
      <div className="rounded-2xl bg-panel border border-border shadow-panel overflow-hidden">
        {/* Top accent line */}
        <div className="h-[2px] bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />

        <div
          className="p-4 cursor-pointer group"
          onClick={() => { navigate("/events/yiesf"); onClose(); }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">New Event</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Event info */}
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest">Competition · 2026</p>
            <p className="text-lg font-bold text-foreground leading-tight">YIESF 2026</p>
            <p className="text-xs text-muted-foreground">Yogyakarta, Indonesia</p>
          </div>

          {/* CTA */}
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-[11px] text-primary font-medium">Registration open</span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground group-hover:text-foreground group-hover:gap-1.5 transition-all">
              View <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// ── MAIN ──────────────────────────────────────────────────────────
const Index = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { lang } = useLang();
  const meta = pageMeta.about;

const popupSound = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  // Gunakan suara notifikasi dari URL publik
  popupSound.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
  popupSound.current.volume = 0.4;

  const show = setTimeout(() => {
    setShowPopup(true);
    popupSound.current?.play().catch(() => {}); // catch: browser block autoplay
  }, 2000);

  const hide = setTimeout(() => setShowPopup(false), 5000);

  return () => {
    clearTimeout(show);
    clearTimeout(hide);
  };
}, []);

  const upcomingEvents = events.filter((e) => e.status === "upcoming");

  return (
    <SiteShell>

      {/* ── SECTION 1: BIG LOGO HERO ────────────────────────────── */}
      <section  className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/4 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative space-y-5"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.45em] text-primary font-semibold"
          >
            International Engineering Science Fair
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
            className="text-7xl md:text-9xl lg:text-[11rem] font-black text-foreground leading-none tracking-tighter"
          >
            IESF
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground font-light tracking-[0.2em]"
          >
            BY ICGI
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-sm text-muted-foreground leading-7 max-w-md mx-auto"
          >
            A global portal for academic innovation competitions. Discover events, register your team, and compete internationally.
          </motion.p>
        </motion.div>
      </section>

      {/* ── SECTION 2: ABOUT (from About page) ──────────────────── */}
      <section className="min-h-screen flex flex-col justify-center py-16 md:py-24 relative">
      {/* Background layer */}
      <div className="absolute inset-0 bg-surface/60 border-y border-border/40" />
      {/* Subtle tint overlay */}
      <div className="absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, hsl(var(--accent) / 0.06) 0%, transparent 60%)" }}
      />
      <div className="container relative z-10">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">
            {meta.eyebrow[lang]}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{meta.title[lang]}</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-7">
            {meta.description[lang]}
          </p>
        </SectionReveal>

        {/* Grid fix — 1 col mobile, 2 col tablet, 5 col desktop */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isLast = index === categories.length - 1;
            const isOdd = categories.length % 2 !== 0;
            return (
              <SectionReveal
                key={category.title.en}
                delay={index * 0.08}
                className={`h-full ${isLast && isOdd ? "sm:col-span-2 lg:col-span-1 flex justify-center" : ""}`}
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`tech-shell h-full rounded-[1.75rem] p-6 cursor-pointer group w-full ${isLast && isOdd ? "sm:max-w-sm lg:max-w-none" : ""}`}
                >
                  <Icon className="h-9 w-9 text-primary" />
                  <h2 className="mt-5 text-xl text-foreground font-semibold">{category.title[lang]}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description[lang]}</p>
                  <div className="mt-6 flex items-center text-sm text-primary gap-0.5 group-hover:gap-1.5 transition-all">
                    Explore track <ChevronRight className="h-4 w-4" />
                  </div>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
        </div>
      </section>


      {/* ── SECTION 3: UPCOMING EVENTS ──────────────────────────── */}
      <section className="container min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-20 md:pb-28">
        <SectionReveal className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">What's Coming</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Upcoming Events</h2>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="self-start sm:self-auto flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            All events <ArrowRight className="h-4 w-4" />
          </button>
        </SectionReveal>

        {upcomingEvents.length === 0 ? (
          <SectionReveal className="py-20 text-center text-muted-foreground">No events found.</SectionReveal>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </section>


      {/* ── POPUP ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showPopup && <EventPopup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>

    </SiteShell>
  );
};

export default Index;