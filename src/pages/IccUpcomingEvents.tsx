// ================================================================
// IccUpcomingEvents.tsx
// ================================================================
import { useState } from "react";
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { iccEvents } from "@/components/icc/iccEventsData";

const IccUpcomingEvents = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { lang } = useLang();

  const LABELS = {
    title:    { en: "Upcoming",      id: "Event" },
    titleSub: { en: "Events",        id: "Mendatang" },
    search:   { en: "Find event...", id: "Cari event..." },
    noEvents: { en: "No events found.", id: "Tidak ada event ditemukan." },
    deadline: { en: "Registration Deadline:", id: "Batas Pendaftaran:" },
    register: { en: "Register Now",  id: "Daftar Sekarang" },
  };

  const filtered = iccEvents
    .filter(e => e.status === "upcoming")
    .filter(e => search === "" ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <IccShell>
      <section className="container pt-16 pb-8 md:pt-20">
        <SectionReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center font-display">
            <span>{LABELS.title[lang]}</span>{" "}
            <span className="font-light text-muted-foreground">{LABELS.titleSub[lang]}</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input type="text" placeholder={LABELS.search[lang]}
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-5 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition"
              style={{ "--tw-ring-color": "hsl(38 95% 55% / 0.3)" } as React.CSSProperties} />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white"
              style={{ background: "linear-gradient(135deg, hsl(38 95% 55%), hsl(350 75% 55%))" }}>
              <Search className="h-4 w-4" />
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="container pb-20">
        {filtered.length === 0 ? (
          <SectionReveal className="py-24 text-center">
            <div className="space-y-3">
              <p className="text-5xl">🎭</p>
              <p className="text-xl font-semibold text-foreground">{LABELS.noEvents[lang]}</p>
            </div>
          </SectionReveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((event, i) => (
              <SectionReveal key={event.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => navigate(`/events/${event.slug}`)}
                  className="cursor-pointer group rounded-2xl overflow-hidden border border-border/70 bg-panel hover:shadow-xl transition-all duration-300"
                >
                  <div className={`relative h-52 bg-gradient-to-br ${event.coverGradient} flex items-end p-0`}>
                    <div className="absolute inset-0"
                      style={{ backgroundImage: "radial-gradient(ellipse at 70% 20%, rgba(255,200,100,0.2) 0%, transparent 55%)" }} />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {event.type}
                    </div>
                    <div className="absolute top-3 right-3 text-white/40 text-[10px] tracking-widest font-bold">ICC</div>
                    <div className="w-full bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8">
                      <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">{event.subtitle}</p>
                      <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 font-display">{event.title}</h3>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /><span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /><span>{event.dateRange}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: "hsl(38 95% 55% / 0.12)", color: "hsl(38 95% 55%)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        )}
      </section>
    </IccShell>
  );
};

export default IccUpcomingEvents;