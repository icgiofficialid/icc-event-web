// ================================================================
// IccAbout.tsx
// ================================================================
import { motion } from "framer-motion";
import { Globe, Heart, Users, Star, Music2, Shirt, Mic2 } from "lucide-react";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { competitionCategories, goals } from "@/components/icc/iccData";

const IccAbout = () => {
  const { lang } = useLang();

  return (
    <IccShell>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <SectionReveal>
          <div className="hero-cultural cultural-shell rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ background: "radial-gradient(ellipse at 70% 50%, hsl(38 95% 55% / 0.3) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, hsl(350 75% 55% / 0.2) 0%, transparent 60%)" }} />
            <div className="relative max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.24em]"
                style={{ borderColor: "hsl(38 95% 55% / 0.35)", background: "hsl(38 95% 55% / 0.08)", color: "hsl(38 95% 55%)" }}>
                <Globe className="h-4 w-4" />
                {lang === "en" ? "About ICC" : "Tentang ICC"}
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-tight text-balance">
                {lang === "en"
                  ? "A global stage for cultural identity and heritage"
                  : "Panggung global untuk identitas dan warisan budaya"}
              </h1>
              <p className="max-w-2xl leading-8 text-muted-foreground">
                {lang === "en"
                  ? "ICC (International Cultural Competition) is ICGI's platform for celebrating traditional arts, ethnic identity, and global cultural exchange. Unlike IESF which focuses on academic innovation, ICC is dedicated to the richness of cultural performance."
                  : "ICC (International Cultural Competition) adalah platform ICGI untuk merayakan seni tradisional, identitas etnik, dan pertukaran budaya global. Berbeda dengan IESF yang berfokus pada inovasi akademik, ICC didedikasikan untuk kekayaan penampilan budaya."}
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ICGI Ecosystem */}
      <section className="bg-surface/60 border-y border-border/40 py-16">
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: "hsl(38 95% 55%)" }}>The ICGI Family</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "Two Portals, One Vision" : "Dua Portal, Satu Visi"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              {lang === "en"
                ? "ICGI runs two distinct international competition portals for academic and cultural excellence."
                : "ICGI menjalankan dua portal kompetisi internasional berbeda untuk keunggulan akademik dan budaya."}
            </p>
          </SectionReveal>
          <div className="grid gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
            {[
              {
                name: "IESF",
                full: { en: "International Engineering Science Fair", id: "International Engineering Science Fair" },
                desc: { en: "Academic innovation platform — engineering, science, research & technology", id: "Platform inovasi akademik — teknik, sains, penelitian & teknologi" },
                color: "from-blue-500 to-cyan-500",
                icon: "🔬",
                href: "https://iesf.icgi.or.id",
              },
              {
                name: "ICC",
                full: { en: "International Cultural Competition", id: "International Cultural Competition" },
                desc: { en: "Cultural performance platform — dance, costume, vocal & cultural heritage", id: "Platform penampilan budaya — tari, kostum, vokal & warisan budaya" },
                color: "from-rose-500 to-amber-500",
                icon: "🌺",
                href: "/",
              },
            ].map((portal, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }}
                  className="cultural-shell rounded-2xl p-6 text-center space-y-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center text-2xl mx-auto`}>
                    {portal.icon}
                  </div>
                  <div>
                    <p className="font-cinzel font-bold text-lg text-foreground">{portal.name}</p>
                    <p className="text-xs text-muted-foreground">{portal.full[lang]}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-6">{portal.desc[lang]}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="container py-16">
        <SectionReveal className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: "hsl(350 75% 60%)" }}>Mission</p>
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {lang === "en" ? "Our Goals" : "Tujuan Kami"}
          </h2>
        </SectionReveal>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {goals.map((goal, i) => {
            const icons = [Globe, Heart, Users, Star];
            const Icon = icons[i % icons.length];
            return (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="cultural-shell rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: i % 2 === 0 ? "hsl(38 95% 55% / 0.15)" : "hsl(350 75% 55% / 0.15)" }}>
                    <Icon className="h-4 w-4" style={{ color: i % 2 === 0 ? "hsl(38 95% 55%)" : "hsl(350 75% 55%)" }} />
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">{goal[lang]}</p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>

      {/* Categories preview */}
      <section className="bg-surface/60 border-y border-border/40 py-16">
        <div className="container">
          <SectionReveal className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              {lang === "en" ? "What We Celebrate" : "Apa yang Kami Rayakan"}
            </h2>
          </SectionReveal>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {competitionCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <SectionReveal key={cat.letter} delay={i * 0.08}>
                  <div className="cultural-shell rounded-2xl p-5 text-center space-y-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{cat.title[lang]}</h3>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </IccShell>
  );
};

export default IccAbout;