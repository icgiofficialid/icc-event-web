// ================================================================
// IccEventDetailPage.tsx
// Path: src/pages/events/IccEventDetailPage.tsx
//
// Template halaman detail event ICC — English only.
// Untuk event ICC baru, buat slim wrapper:
//   const YICCDetail = () => <IccEventDetailPage slug="yicc-2026" />;
// ================================================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ChevronRight, FileText, ExternalLink } from "lucide-react";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useEvent } from "@/hooks/useEvents";
import {
  competitionCategories, divisions, judgingCriteria,
  awards, schedule, domesticSongs,
} from "@/components/icc/iccData";

// ── Props ─────────────────────────────────────────────────────────
interface Props { slug: string; }

// ── Static content from ICC 2026 Guidebook ────────────────────────

const DIVISIONS = [
  { level: "Primary / Elementary School", age: "7–12 years old",  note: "Student Division" },
  { level: "Junior High School",          age: "13–15 years old", note: "Student Division" },
  { level: "Senior High School",          age: "16–18 years old", note: "Student Division" },
  { level: "Open Division",               age: "University / Community / Studio", note: "No age limit" },
];

const CATEGORIES = [
  {
    letter: "A",
    color: "from-rose-500 to-pink-600",
    title: "Traditional / Cultural-Based Dance Solo",
    description: "A solo dance performance based on traditional culture or cultural heritage. Creative adaptation is allowed as long as the cultural identity remains clear and dominant.",
    format: "Solo",
    participants: "1 person",
    duration: "Max 5 minutes",
    setupTime: "1 minute",
    docs: ["Title of dance", "Cultural origin / region / country", "Short performance description", "Music file (MP3/WAV)", "Property declaration (if applicable)"],
  },
  {
    letter: "B",
    color: "from-fuchsia-500 to-purple-600",
    title: "Traditional / Cultural-Based Dance Group",
    description: "A group dance performance based on traditional culture or cultural heritage. Creative adaptation is allowed as long as the cultural identity remains clear and dominant.",
    format: "Group",
    participants: "5–10 persons",
    duration: "Max 7 minutes",
    setupTime: "1 minute",
    docs: ["Title of dance", "Cultural origin / region / country", "Short performance description", "List of members", "Music file (MP3/WAV)", "Property declaration (if applicable)"],
  },
  {
    letter: "C",
    color: "from-amber-500 to-orange-600",
    title: "Ethnic / Cultural Creative Costume Show",
    description: "A costume show presenting traditional or ethnic attire with creative presentation. The costume must clearly represent a cultural identity.",
    format: "Solo or Group",
    participants: "1–10 persons",
    duration: "TBA",
    setupTime: "TBA",
    docs: ["Costume title / theme", "Cultural inspiration", "Short costume description", "Music file (MP3/WAV)"],
  },
  {
    letter: "D",
    color: "from-teal-500 to-cyan-600",
    title: "Traditional Song Solo",
    description: "A solo vocal performance presenting a traditional or cultural song. Domestic participants must select from the official song list. International participants may present a traditional song from their own country.",
    format: "Solo",
    participants: "1 person",
    duration: "TBA",
    setupTime: "TBA",
    docs: ["Song title", "Cultural origin / region / country", "Short song description or meaning", "Instrumental backing track", "Lyrics (if required)"],
  },
];

const JUDGING_DANCE = [
  { aspect: "Technique & Execution",               weight: "30%" },
  { aspect: "Cultural Interpretation / Authenticity", weight: "25%" },
  { aspect: "Choreography / Composition",          weight: "20%" },
  { aspect: "Stage Presence & Expression",         weight: "15%" },
  { aspect: "Costume & Overall Presentation",      weight: "10%" },
];

const JUDGING_COSTUME = [
  { aspect: "Cultural Authenticity & Identity",    weight: "30%" },
  { aspect: "Creativity & Aesthetic Quality",      weight: "25%" },
  { aspect: "Craftsmanship & Detail",              weight: "20%" },
  { aspect: "Stage Presentation & Confidence",     weight: "15%" },
  { aspect: "Overall Impact",                      weight: "10%" },
];

const JUDGING_VOCAL = [
  { aspect: "Vocal Technique & Intonation",        weight: "30%" },
  { aspect: "Cultural Authenticity",               weight: "25%" },
  { aspect: "Musicality & Expression",             weight: "20%" },
  { aspect: "Stage Presence",                      weight: "15%" },
  { aspect: "Costume & Overall Presentation",      weight: "10%" },
];

const JUDGING_SHOW = [
  { aspect: "Cultural Authenticity & Identity",    weight: "30%" },
  { aspect: "Creativity & Aesthetic Quality",      weight: "25%" },
  { aspect: "Craftsmanship & Detail",              weight: "20%" },
  { aspect: "Stage Presentation & Confidence",     weight: "15%" },
  { aspect: "Overall Impact",                      weight: "10%" },
];

const SCHEDULE = [
  {
    day: 1,
    title: "Opening & Technical Meeting",
    highlights: ["Opening Ceremony", "Technical Meeting / Briefing for Cultural Participants", "Registration & Accreditation"],
  },
  {
    day: 2,
    title: "Technical Rehearsal",
    highlights: ["Technical Rehearsal (Dance Solo: 3 min | Dance Group: 5 min)", "Stage Checking & Sound Check", "Costume Preparation"],
  },
  {
    day: 3,
    title: "Cultural Main Competition",
    highlights: ["Main Competition Day", "All performance categories", "Judging Session"],
  },
  {
    day: 4,
    title: "Gala Night & Cultural Expo",
    highlights: ["Cultural Expo / Booth", "Gala Night", "Cultural Showcase / Exchange Performance (non-competitive, voluntary or by invitation)"],
  },
  {
    day: 5,
    title: "Awarding Ceremony",
    highlights: ["Awarding Ceremony", "Certificate Distribution", "Closing"],
  },
];

const GENERAL_RULES = [
  "All required technical files and supporting information must be submitted no later than 14 days before the event (H-14).",
  "The performance order will be determined by the committee. Requests to change the assigned schedule will not be accepted.",
  "Participants who are late may lose their performance opportunity, subject to committee decision.",
  "Music must be submitted in advance in MP3 / WAV format. Participants must also bring backup files on the event day.",
  "Prohibited stage properties include fire, smoke, liquids, sharp weapons, glass or breakable materials, dangerous substances, live animals, confetti, and glitter.",
  "Costumes must remain appropriate for a public cultural competition.",
  "Performances must not contain hate speech, offensive content, explicit violence, or inappropriate material.",
  "All jury decisions are final and cannot be contested.",
];

// ── Helper ────────────────────────────────────────────────────────
function GradientText({ children, from, to }: { children: React.ReactNode; from: string; to: string }) {
  return (
    <span style={{
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      backgroundClip: "text", backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
    }}>
      {children}
    </span>
  );
}

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
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading event…</p>
        </div>
      </IccShell>
    );
  }

  if (!event) {
    return (
      <IccShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-6xl">🎭</p>
          <h1 className="text-2xl font-bold">Event not found</h1>
          <p className="text-muted-foreground text-sm max-w-xs">
            This event doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="mt-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            ← Back to Events
          </button>
        </div>
      </IccShell>
    );
  }

  const accentColor  = event.accentColor  || "hsl(38 95% 55%)";
  const accentColor2 = "#f43f5e";
  const coverGradient = event.coverGradient || "from-rose-950 via-fuchsia-950 to-amber-950";
  const tags = event.tags ?? [];

  const titleWords  = event.title.split(" ");
  const firstWord   = titleWords[0];
  const middleWords = titleWords.length > 2
    ? titleWords.slice(1, -1).join(" ")
    : titleWords.slice(1).join(" ");
  const lastWord = titleWords.length > 2 ? titleWords[titleWords.length - 1] : null;

  const registrationOpen = !!event.registrationUrl;

  return (
    <IccShell>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${coverGradient}`} />
        <div className="absolute inset-0 opacity-40" style={{
          background: `radial-gradient(ellipse at 25% 30%, ${accentColor}40 0%, transparent 55%),
                       radial-gradient(ellipse at 75% 70%, ${accentColor2}4D 0%, transparent 55%)`,
        }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        <div className="container relative z-10">
          <button onClick={() => navigate("/events")}
            className="mb-6 text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1">
            ← Back to Events
          </button>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                {event.type}
              </span>
              {event.year && (
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                  {event.year}
                </span>
              )}
              {tags.slice(0, 3).map(tag => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-medium text-white/80 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
              {firstWord}<br />
              <GradientText from={accentColor} to={accentColor2}>{middleWords}</GradientText>
              {lastWord && <><br />{lastWord}</>}
            </h1>

            {event.description && (
              <p className="text-white/70 text-base leading-7 max-w-xl">{event.description}</p>
            )}

            <div className="flex flex-wrap gap-4 pt-2 text-sm text-white/60">
              {event.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.location}</div>}
              {event.dateRange && <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{event.dateRange}</div>}
              {event.registrationDeadline && (
                <div className="flex items-center gap-2">
                  {/* <Clock className="h-4 w-4" />Registration Deadline: {event.registrationDeadline} */}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {registrationOpen ? (
                <button onClick={handleRegister}
                  className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm hover:brightness-110 transition-all"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`, color: "#fff" }}>
                  Register Now
                </button>
              ) : (
                <span className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-sm bg-white/10 border border-white/20 text-white/50 cursor-not-allowed">
                  Registration Closed
                </span>
              )}
              {event.guidebookUrl ? (
                <a href={event.guidebookUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-all">
                  <FileText className="h-4 w-4" /> Guidebook <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              ) : (
                <a href="/guide"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-all">
                  <FileText className="h-4 w-4" /> Guidebook
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BACKGROUND & OBJECTIVES ─────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor }}>About</p>
          <h2 className="text-3xl font-bold font-display">Background & Objectives</h2>
        </SectionReveal>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <SectionReveal>
            <div className="cultural-shell rounded-2xl p-8 h-full">
              <h3 className="font-bold text-foreground mb-4 text-base">Background</h3>
              <p className="text-muted-foreground text-sm leading-7">
                Culture is one of the most valuable identities of a nation, region, and community. In the modern era, cultural expression continues to evolve and adapt to contemporary trends, yet its roots, values, and local identity must continue to be preserved and appreciated.
              </p>
              <p className="text-muted-foreground text-sm leading-7 mt-3">
                ICC is designed as an international platform for cultural-based competition that highlights traditional arts, ethnic identity, and creative cultural presentation. The event is expected to encourage cultural pride, cross-cultural understanding, and the sustainability of traditional arts.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="cultural-shell rounded-2xl p-8 h-full">
              <h3 className="font-bold text-foreground mb-4 text-base">Objectives</h3>
              <ul className="space-y-3">
                {[
                  "Provide an international competition platform for cultural-based performances.",
                  "Encourage appreciation and preservation of traditional arts and cultural heritage.",
                  "Promote intercultural exchange among participants from different regions and countries.",
                  "Support young talents, communities, and cultural groups in presenting their cultural identity.",
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: `${accentColor}20`, color: accentColor }}>{i + 1}</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── PARTICIPANT DIVISIONS ────────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor }}>Who Can Join</p>
            <h2 className="text-3xl font-bold font-display">Participant Divisions</h2>
            <p className="text-muted-foreground text-sm">Open to all school levels, universities, and communities</p>
          </SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {DIVISIONS.map((div, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="cultural-shell rounded-2xl p-5 text-center space-y-2">
                  <div className="text-3xl"></div>
                  <h3 className="font-bold text-foreground text-sm">{div.level}</h3>
                  <p className="text-xs text-muted-foreground">{div.age}</p>
                  <span className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold"
                    style={{ background: `${accentColor}1F`, color: accentColor }}>
                    {div.note}
                  </span>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal className="mt-6 max-w-3xl mx-auto">
            <div className="rounded-xl p-4 text-sm text-muted-foreground leading-6"
              style={{ background: `${accentColor}0F`, border: `1px solid ${accentColor}30` }}>
              <strong className="text-foreground">Open Division</strong> is intended for university students, communities, cultural studios / sanggar, and general participants. No age limit applies. International participants are required to present cultural works that represent the tradition, identity, or artistic heritage of their country, region, city, or cultural community of origin.
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── COMPETITION CATEGORIES ───────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor2 }}>Performances</p>
          <h2 className="text-3xl font-bold font-display">Competition Categories</h2>
        </SectionReveal>
        <div className="grid gap-5 sm:grid-cols-2 max-w-5xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <SectionReveal key={cat.letter} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.22 }}
                className="cultural-shell rounded-2xl p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl`}>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category {cat.letter}</span>
                    <h3 className="font-bold text-foreground text-sm leading-snug">{cat.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-6 flex-1">{cat.description}</p>
                <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                  <div><span className="font-semibold text-foreground">Format:</span> {cat.format}</div>
                  <div><span className="font-semibold text-foreground">Members:</span> {cat.participants}</div>
                  <div><span className="font-semibold text-foreground">Duration:</span> {cat.duration}</div>
                  <div><span className="font-semibold text-foreground">Setup:</span> {cat.setupTime}</div>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── JUDGING CRITERIA ────────────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "hsl(270 70% 65%)" }}>Assessment</p>
            <h2 className="text-3xl font-bold font-display">Judging Criteria</h2>
            <p className="text-muted-foreground text-sm">The following criteria are the current draft basis and remain subject to final committee confirmation.</p>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { label: "Dance (Solo & Group)", criteria: JUDGING_DANCE,    color: accentColor2 },
              { label: "Costume Show",          criteria: JUDGING_COSTUME,  color: "hsl(270 70% 60%)" },
              { label: "Traditional Song Solo", criteria: JUDGING_VOCAL,    color: "hsl(175 70% 45%)" },
            ].map(({ label, criteria, color }) => (
              <SectionReveal key={label}>
                <div className="cultural-shell rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xl"></span>
                    <h3 className="font-bold text-foreground text-sm">{label}</h3>
                  </div>
                  <div className="space-y-3">
                    {criteria.map((c, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground flex-1">{c.aspect}</span>
                        <span className="text-xs font-bold shrink-0" style={{ color }}>{c.weight}</span>
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
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor }}>Recognition</p>
          <h2 className="text-3xl font-bold font-display">Awards & Recognition</h2>
          <p className="text-muted-foreground text-sm">Appreciation-based award system using passing grades. Final score bands will be determined in the official guidebook.</p>
        </SectionReveal>
        <div className="flex flex-wrap justify-center gap-4">
          {JUDGING_SHOW.map((award, i) => (
            <SectionReveal key={i} delay={i * 0.07}>
              <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}
                className="cultural-shell rounded-2xl px-6 py-5 flex flex-col items-center gap-2 min-w-[130px]">
                <span className="text-3xl"></span>
                <span className="text-sm font-bold text-foreground text-center">{award.aspect}</span>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── EVENT SCHEDULE ───────────────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor2 }}>Itinerary</p>
            <h2 className="text-3xl font-bold font-display">Event Schedule</h2>
            <p className="text-muted-foreground text-sm">5 days of culture, performance, and celebration (Tentative)</p>
          </SectionReveal>
          <div className="space-y-4 max-w-3xl mx-auto">
            {SCHEDULE.map((day, i) => (
              <SectionReveal key={day.day} delay={i * 0.07}>
                <div className="cultural-shell rounded-2xl p-5 flex gap-4">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: i % 2 === 0 ? `${accentColor}26` : `${accentColor2}26` }}>
                      
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Day {day.day}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-2">{day.title}</h3>
                    <ul className="space-y-1">
                      {day.highlights.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <ChevronRight className="h-3 w-3 shrink-0 mt-0.5"
                            style={{ color: i % 2 === 0 ? accentColor : accentColor2 }} />
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
      </section>

      {/* ── REQUIRED DOCUMENTS ──────────────────────────────────── */}
      <section className="container py-20">
        <SectionReveal className="mb-10 text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor }}>Submission</p>
          <h2 className="text-3xl font-bold font-display">Required Documents</h2>
          <p className="text-muted-foreground text-sm">All documents must be submitted no later than H-14 before the event.</p>
        </SectionReveal>

        {/* General documents */}
        <SectionReveal className="mb-8 max-w-3xl mx-auto">
          <div className="cultural-shell rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">General Documents (All Categories)</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Registration form",
                "Participant identity card / student card / passport",
                "Participant or team photo",
                "Institution / community / studio information",
                "Consent for documentation and publication",
              ].map((doc, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-0.5 shrink-0" style={{ color: accentColor }}>•</span>{doc}
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Per-category documents */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <SectionReveal key={cat.letter} delay={i * 0.08}>
              <div className="cultural-shell rounded-2xl p-5 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl"></span>
                  <h3 className="font-bold text-foreground text-xs leading-snug">Category {cat.letter}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.docs.map((doc, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 shrink-0" style={{ color: accentColor }}>•</span>{doc}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── GENERAL COMPETITION RULES ────────────────────────────── */}
      <section className="bg-surface/60 border-y border-border/40 py-20">
        <div className="container">
          <SectionReveal className="mb-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: accentColor2 }}>Rules</p>
            <h2 className="text-3xl font-bold font-display">General Competition Rules</h2>
          </SectionReveal>
          <div className="max-w-3xl mx-auto">
            <div className="cultural-shell rounded-2xl p-8">
              <ul className="space-y-4">
                {GENERAL_RULES.map((rule, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                        style={{ background: `${accentColor}20`, color: accentColor }}>{i + 1}</span>
                      {rule}
                    </li>
                  </SectionReveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="container py-20 text-center">
        <SectionReveal>
          <h2 className="text-2xl font-bold mb-4">Ready to Showcase Your Culture?</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Join ICC 2026 and represent your cultural heritage on an international stage.
          </p>
          {registrationOpen ? (
            <button onClick={handleRegister}
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold hover:brightness-110 hover:scale-[1.02] transition-all"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor2})`, color: "#fff" }}>
              Register Now
            </button>
          ) : (
            <p className="text-muted-foreground text-sm">Registration is currently closed.</p>
          )}
        </SectionReveal>
      </section>

    </IccShell>
  );
};

export default IccEventDetailPage;