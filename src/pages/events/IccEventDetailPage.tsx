// ================================================================
// IccEventDetailPage.tsx
// Path: src/pages/events/IccEventDetailPage.tsx
// ================================================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar, MapPin, Clock, FileText, ExternalLink,
  ArrowLeft, ChevronRight, Check,
} from "lucide-react";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useEvent } from "@/hooks/useEvents";
import { getEventMeta } from "@/config/eventRegistry";

interface Props { slug: string; }

// ── Static data ───────────────────────────────────────────────────

const DIVISIONS = [
  { level: "Primary / Elementary",  age: "Age 7–12",                        note: "Student Division" },
  { level: "Junior High School",    age: "Age 13–15",                       note: "Student Division" },
  { level: "Senior High School",    age: "Age 16–18",                       note: "Student Division" },
  { level: "Open Division",         age: "University / Community / Studio", note: "No age limit" },
];

const CATEGORIES = [
  {
    letter: "A",
    accent: "#f43f5e",
    title: "Traditional Dance Solo",
    subtitle: "Cultural / Heritage-Based",
    description: "A solo performance rooted in traditional culture or heritage. Creative adaptation is permitted as long as cultural identity remains clear and dominant.",
    specs: [{ label: "Format", value: "Solo" }, { label: "Members", value: "1 person" }, { label: "Duration", value: "Max 5 min" }, { label: "Setup", value: "1 min" }],
    docs: ["Title of dance", "Cultural origin / region / country", "Performance description", "Music file (MP3/WAV)", "Property declaration"],
  },
  {
    letter: "B",
    accent: "#a855f7",
    title: "Traditional Dance Group",
    subtitle: "Cultural / Heritage-Based",
    description: "A group dance performance rooted in traditional culture or heritage. Cultural identity must remain the dominant element throughout the performance.",
    specs: [{ label: "Format", value: "Group" }, { label: "Members", value: "5–10 persons" }, { label: "Duration", value: "Max 7 min" }, { label: "Setup", value: "1 min" }],
    docs: ["Title of dance", "Cultural origin / region / country", "Performance description", "Member list", "Music file (MP3/WAV)", "Property declaration"],
  },
  {
    letter: "C",
    accent: "#f59e0b",
    title: "Ethnic Costume Show",
    subtitle: "Cultural Creative Presentation",
    description: "A costume presentation showcasing traditional or ethnic attire with creative flair. The costume must clearly represent a distinct cultural identity.",
    specs: [{ label: "Format", value: "Solo or Group" }, { label: "Members", value: "1–10 persons" }, { label: "Duration", value: "TBA" }, { label: "Setup", value: "TBA" }],
    docs: ["Costume title / theme", "Cultural inspiration", "Costume description", "Music file (MP3/WAV)"],
  },
  {
    letter: "D",
    accent: "#14b8a6",
    title: "Traditional Song Solo",
    subtitle: "Vocal Performance",
    description: "A solo vocal performance of a traditional or cultural song. Domestic participants must choose from the official song list. International participants may present a song from their own culture.",
    specs: [{ label: "Format", value: "Solo" }, { label: "Members", value: "1 person" }, { label: "Duration", value: "TBA" }, { label: "Setup", value: "TBA" }],
    docs: ["Song title", "Cultural origin / region / country", "Song description or meaning", "Instrumental backing track", "Lyrics (if required)"],
  },
];

const JUDGING = [
  {
    label: "Dance — Solo & Group",
    accent: "#f43f5e",
    criteria: [
      { aspect: "Technique & Execution",                weight: "30%" },
      { aspect: "Cultural Interpretation / Authenticity", weight: "25%" },
      { aspect: "Choreography / Composition",           weight: "20%" },
      { aspect: "Stage Presence & Expression",          weight: "15%" },
      { aspect: "Costume & Overall Presentation",       weight: "10%" },
    ],
  },
  {
    label: "Costume Show",
    accent: "#a855f7",
    criteria: [
      { aspect: "Cultural Authenticity & Identity",     weight: "30%" },
      { aspect: "Creativity & Aesthetic Quality",       weight: "25%" },
      { aspect: "Craftsmanship & Detail",               weight: "20%" },
      { aspect: "Stage Presentation & Confidence",      weight: "15%" },
      { aspect: "Overall Impact",                       weight: "10%" },
    ],
  },
  {
    label: "Traditional Song Solo",
    accent: "#14b8a6",
    criteria: [
      { aspect: "Vocal Technique & Intonation",         weight: "30%" },
      { aspect: "Cultural Authenticity",                weight: "25%" },
      { aspect: "Musicality & Expression",              weight: "20%" },
      { aspect: "Stage Presence",                       weight: "15%" },
      { aspect: "Costume & Overall Presentation",       weight: "10%" },
    ],
  },
];

const AWARDS = [
  { tier: "01", label: "Gold Award",               note: "Highest distinction" },
  { tier: "02", label: "Silver Award",             note: "Outstanding performance" },
  { tier: "03", label: "Bronze Award",             note: "Commendable performance" },
  { tier: "04", label: "Honorable Mention",        note: "Special recognition" },
  { tier: "05", label: "Certificate of Participation", note: "All participants" },
  { tier: "06", label: "Winner of Each Category",  note: "Category champion" },
  { tier: "07", label: "Special Awards",           note: "Committee selection" },
];

const SCHEDULE = [
  { day: "01", title: "Opening & Briefing",       items: ["Opening Ceremony", "Technical Meeting for Cultural Participants", "Registration & Accreditation"] },
  { day: "02", title: "Technical Rehearsal",      items: ["Technical Rehearsal — Dance Solo: 3 min / Dance Group: 5 min", "Stage & Sound Check", "Costume Preparation"] },
  { day: "03", title: "Main Competition",         items: ["Cultural Main Competition Day", "All performance categories judged", "Judging Session"] },
  { day: "04", title: "Gala Night & Expo",        items: ["Cultural Expo / Community Booth", "Gala Night Showcase", "Exchange Performances — non-competitive, voluntary or by invitation"] },
  { day: "05", title: "Awarding Ceremony",        items: ["Awarding & Recognition Ceremony", "Certificate Distribution", "Closing"] },
];

const RULES = [
  "All required technical files must be submitted no later than 14 days before the event (H-14).",
  "Performance order is determined by the committee. Schedule change requests will not be accommodated.",
  "Late participants may forfeit their performance slot, subject to committee discretion.",
  "Music files must be submitted in advance in MP3 or WAV format. Backup copies must be brought on event day.",
  "Prohibited properties: fire, smoke, liquids, sharp weapons, glass, breakable materials, live animals, confetti, and glitter.",
  "Costumes must remain appropriate for a public cultural event.",
  "Performances must not contain hate speech, offensive content, explicit violence, or inappropriate material.",
  "All jury decisions are final and cannot be contested.",
];

const GENERAL_DOCS = [
  "Registration form",
  "Participant identity card / student card / passport",
  "Participant or team photo",
  "Institution / community / studio information",
  "Consent for documentation and publication",
];

const OBJECTIVES = [
  "Provide an international platform for cultural-based performances.",
  "Encourage appreciation and preservation of traditional arts and heritage.",
  "Promote intercultural exchange across regions and countries.",
  "Support young talents and communities in presenting cultural identity.",
];

// ── Component ─────────────────────────────────────────────────────
const IccEventDetailPage = ({ slug }: Props) => {
  const { event, loading } = useEvent(slug);
  const navigate           = useNavigate();

  const handleRegister = () => {
    sessionStorage.setItem("eventSlug", slug);
    navigate("/register");
  };

  if (loading) {
    return (
      <IccShell>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      </IccShell>
    );
  }

  if (!event) {
    return (
      <IccShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center px-4">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <p className="text-muted-foreground text-sm max-w-xs">This event doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/events")}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
            <ArrowLeft className="h-4 w-4" /> Back to Events
          </button>
        </div>
      </IccShell>
    );
  }

  const accent        = event.accentColor   || "#f43f5e";
  const accent2       = "#f59e0b";
  const coverGradient = event.coverGradient || "from-rose-950 via-fuchsia-950 to-amber-950";
  const tags          = event.tags ?? [];
  const meta             = getEventMeta(slug);
  const registrationOpen = !!meta?.registrationOpen;

  // Split title for gradient styling
  const words      = event.title.split(" ");
  const firstWord  = words[0];
  const midWords   = words.length > 2 ? words.slice(1, -1).join(" ") : words.slice(1).join(" ");
  const lastWord   = words.length > 2 ? words[words.length - 1] : null;

  return (
    <IccShell>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90svh] flex flex-col justify-end pb-12 md:pb-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${coverGradient}`} />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 60% 60% at 20% 20%, ${accent}33 0%, transparent 60%),
                       radial-gradient(ellipse 50% 50% at 80% 80%, ${accent2}22 0%, transparent 60%)`,
        }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 px-4 md:px-6 py-5 z-10 flex items-center justify-between">
          <button onClick={() => navigate("/events")}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs md:text-sm transition-colors">
            <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" /> Back to Events
          </button>
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border border-white/15 rounded-full px-2.5 py-1">
            {event.type} · {event.year}
          </span>
        </div>

        {/* Hero content */}
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-white/50 border border-white/15 rounded-full px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-[2.6rem] leading-[0.92] md:text-6xl lg:text-7xl font-bold text-white mb-5">
              {firstWord}<br />
              <span style={{
                backgroundImage: `linear-gradient(135deg, ${accent}, ${accent2})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {midWords}
              </span>
              {lastWord && <><br />{lastWord}</>}
            </h1>

            {/* Description */}
            {event.description && (
              <p className="text-white/55 text-sm md:text-base leading-7 max-w-xl mb-6">{event.description}</p>
            )}

            {/* Meta row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-5 mb-7 text-xs md:text-sm text-white/50">
              {event.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" /> {event.location}
                </span>
              )}
              {event.dateRange && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" /> {event.dateRange}
                </span>
              )}
              {event.registrationDeadline && event.registrationDeadline !== "TBA" && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" /> Deadline: {event.registrationDeadline}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {registrationOpen ? (
                <button onClick={handleRegister}
                  className="group flex items-center gap-2 rounded-xl px-6 py-3 md:px-7 md:py-3.5 font-bold text-sm text-white hover:opacity-90 transition-all"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }}>
                  Register Now
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <span className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm bg-white/8 border border-white/15 text-white/40 cursor-not-allowed">
                  Registration Closed
                </span>
              )}
              {event.guidebookUrl ? (
                <a href={event.guidebookUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/15 transition-all">
                  <FileText className="h-4 w-4" /> Guidebook
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              ) : (
                <a href="/guide"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/15 transition-all">
                  <FileText className="h-4 w-4" /> Guidebook
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <SectionReveal>
          <div className="grid md:grid-cols-[1fr_2px_1fr] gap-8 md:gap-10 max-w-5xl items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: accent }}>Background</p>
              <p className="text-muted-foreground text-sm leading-7">
                Culture is one of the most valuable identities of a nation, region, and community. In the modern era, cultural expression continues to evolve, yet its roots, values, and local identity must continue to be preserved and appreciated.
              </p>
              <p className="text-muted-foreground text-sm leading-7 mt-4">
                ICC is designed as an international platform for cultural-based competition — highlighting traditional arts, ethnic identity, and creative cultural presentation.
              </p>
            </div>
            <div className="hidden md:block bg-border/50 self-stretch" />
            <div>
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-3 mt-6 md:mt-0" style={{ color: accent }}>Objectives</p>
              <ul className="space-y-4">
                {OBJECTIVES.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[10px] font-bold mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: `${accent}18`, color: accent }}>
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground text-sm leading-6">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── DIVISIONS ───────────────────────────────────────────── */}
      <section className="border-y border-border/50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionReveal className="mb-8 md:mb-12">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: accent }}>Who Can Join</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">Participant Divisions</h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl">
            {DIVISIONS.map((div, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className="rounded-2xl border border-border/60 p-4 md:p-6 hover:border-border transition-colors h-full">
                  <div className="text-3xl md:text-4xl font-bold font-display mb-3 leading-none"
                    style={{ color: `${accent}40` }}>0{i + 1}</div>
                  <h3 className="font-bold text-foreground text-xs md:text-sm mb-1">{div.level}</h3>
                  <p className="text-[11px] md:text-xs text-muted-foreground mb-3">{div.age}</p>
                  <span className="inline-block text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1"
                    style={{ background: `${accent}12`, color: accent }}>
                    {div.note}
                  </span>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal className="mt-5 max-w-3xl">
            <p className="text-xs text-muted-foreground leading-6 border-l-2 pl-4" style={{ borderColor: `${accent}50` }}>
              <strong className="text-foreground">Open Division</strong> is open to university students, communities, cultural studios, and general participants with no age limit. International participants must present cultural works representing the tradition or artistic heritage of their origin.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────── */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <SectionReveal className="mb-8 md:mb-12">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: accent2 }}>Performances</p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">Competition Categories</h2>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-5xl">
          {CATEGORIES.map((cat, i) => (
            <SectionReveal key={cat.letter} delay={i * 0.07}>
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
                className="rounded-2xl border border-border/60 p-5 md:p-7 flex flex-col h-full hover:border-border transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: cat.accent }}>{cat.subtitle}</p>
                    <h3 className="font-bold text-foreground text-sm md:text-base leading-snug">{cat.title}</h3>
                  </div>
                  <span className="text-4xl md:text-5xl font-bold font-display leading-none shrink-0 ml-3"
                    style={{ color: `${cat.accent}20` }}>
                    {cat.letter}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-6 flex-1 mb-4">{cat.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {cat.specs.map(s => (
                    <div key={s.label} className="rounded-lg px-3 py-2" style={{ background: `${cat.accent}08` }}>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                      <p className="text-xs font-semibold text-foreground">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-border/50 mb-3" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Required Docs</p>
                <ul className="space-y-1.5">
                  {cat.docs.map((doc, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: cat.accent }} />
                      {doc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── JUDGING ─────────────────────────────────────────────── */}
      <section className="border-y border-border/50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionReveal className="mb-8 md:mb-12">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "hsl(270 70% 65%)" }}>Assessment</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">Judging Criteria</h2>
            <p className="text-muted-foreground text-sm mt-2">Subject to final committee confirmation.</p>
          </SectionReveal>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5 max-w-5xl">
            {JUDGING.map(({ label, accent: a, criteria }) => (
              <SectionReveal key={label}>
                <div className="rounded-2xl border border-border/60 p-5 md:p-6 h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: a }} />
                    <h3 className="font-bold text-foreground text-sm">{label}</h3>
                  </div>
                  <div className="h-px bg-border/50 my-4" />
                  <div className="space-y-4">
                    {criteria.map((c, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">{c.aspect}</span>
                          <span className="text-xs font-bold" style={{ color: a }}>{c.weight}</span>
                        </div>
                        <div className="h-1 rounded-full bg-border/50 overflow-hidden">
                          <div className="h-full rounded-full transition-all"
                            style={{ width: c.weight, background: `${a}60` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ──────────────────────────────────────────────── */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <SectionReveal className="mb-8 md:mb-12">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: accent }}>Recognition</p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">Awards</h2>
          <p className="text-muted-foreground text-sm mt-2">Appreciation-based system using passing grades. Final score bands will be confirmed in the official guidebook.</p>
        </SectionReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl">
          {AWARDS.map((award, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18 }}
                className="rounded-xl border border-border/60 px-4 py-3.5 md:px-5 md:py-4 hover:border-border transition-colors">
                <p className="text-[10px] font-bold text-muted-foreground/40 mb-1">{award.tier}</p>
                <p className="font-bold text-foreground text-xs md:text-sm mb-0.5">{award.label}</p>
                <p className="text-[10px] md:text-[11px] text-muted-foreground">{award.note}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── SCHEDULE ────────────────────────────────────────────── */}
      <section className="border-y border-border/50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionReveal className="mb-8 md:mb-12">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: accent2 }}>Itinerary</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">Event Schedule</h2>
            <p className="text-muted-foreground text-sm mt-2">5 days — tentative</p>
          </SectionReveal>
          <div className="max-w-2xl">
            {SCHEDULE.map((day, i) => (
              <SectionReveal key={day.day} delay={i * 0.06}>
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center shrink-0 w-9 md:w-12">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center text-[10px] md:text-xs font-bold"
                      style={{
                        borderColor: i < SCHEDULE.length - 1 ? `${accent}40` : accent,
                        color: accent,
                        background: i === 2 ? `${accent}12` : "transparent",
                      }}>
                      {day.day}
                    </div>
                    {i < SCHEDULE.length - 1 && (
                      <div className="flex-1 w-px my-2" style={{ background: `${accent}20` }} />
                    )}
                  </div>
                  <div className="pb-7 md:pb-8 flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm mb-2">{day.title}</h3>
                    <ul className="space-y-1.5">
                      {day.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <ChevronRight className="h-3 w-3 shrink-0 mt-0.5" style={{ color: `${accent}70` }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ───────────────────────────────────────────── */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <SectionReveal className="mb-8 md:mb-12">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: accent }}>Submission</p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">Required Documents</h2>
          <p className="text-muted-foreground text-sm mt-2">All files must be submitted no later than H-14 before the event.</p>
        </SectionReveal>
        <div className="max-w-5xl space-y-4">
          <SectionReveal>
            <div className="rounded-2xl border border-border/60 p-5 md:p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">General — All Categories</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {GENERAL_DOCS.map((doc, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: accent }} />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {CATEGORIES.map((cat, i) => (
              <SectionReveal key={cat.letter} delay={i * 0.07}>
                <div className="rounded-2xl border border-border/60 p-4 md:p-5 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0"
                      style={{ background: `${cat.accent}15`, color: cat.accent }}>
                      {cat.letter}
                    </span>
                    <h3 className="font-bold text-foreground text-[11px] md:text-xs leading-snug">{cat.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {cat.docs.map((doc, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-[10px] md:text-[11px] text-muted-foreground">
                        <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: cat.accent }} />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULES ───────────────────────────────────────────────── */}
      <section className="border-y border-border/50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionReveal className="mb-8 md:mb-12">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: accent2 }}>Regulations</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">Competition Rules</h2>
          </SectionReveal>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-4xl">
            {RULES.map((rule, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 md:gap-4 rounded-xl border border-border/50 p-4 md:p-5">
                  <span className="text-[10px] font-bold shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `${accent2}15`, color: accent2 }}>
                    {i + 1}
                  </span>
                  <p className="text-xs text-muted-foreground leading-6">{rule}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="container px-4 md:px-6 py-16 md:py-24">
        <SectionReveal>
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: accent }}>Join Us</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
              Ready to showcase<br />your culture?
            </h2>
            <p className="text-muted-foreground text-sm mb-8 leading-7">
              Represent your cultural heritage on an international stage. ICC 2026 welcomes performers, communities, and cultural groups from around the world.
            </p>
            {registrationOpen ? (
              <button onClick={handleRegister}
                className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm text-white hover:opacity-90 transition-all"
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }}>
                Register Now
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <p className="text-muted-foreground text-sm border border-border/60 rounded-xl px-5 py-3.5 inline-block">
                Registration is currently closed.
              </p>
            )}
          </div>
        </SectionReveal>
      </section>

    </IccShell>
  );
};

export default IccEventDetailPage;