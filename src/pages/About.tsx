import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import SectionReveal from "@/components/iesf/SectionReveal";
import SiteShell from "@/components/iesf/SiteShell";
import PageHero from "@/components/iesf/PageHero";
import { categories, pageMeta } from "@/components/iesf/siteData";
import { useLang } from "@/components/LanguageProvider";

const About = () => {
  const meta = pageMeta.about;
  const { lang } = useLang();

  return (
    <SiteShell>
      <PageHero eyebrow={meta.eyebrow[lang]} title={meta.title[lang]} description={meta.description[lang]} icon={meta.icon} />

      <section className="container pb-16 md:pb-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <SectionReveal key={category.title.en} delay={index * 0.08} className="h-full">
                <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.25 }} className="tech-shell h-full rounded-[1.75rem] p-6">
                  <Icon className="h-9 w-9 text-primary" />
                  <h2 className="mt-5 text-xl text-foreground">{category.title[lang]}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description[lang]}</p>
                  <div className="mt-6 flex items-center text-sm text-primary">
                    Explore track <ChevronRight className="h-4 w-4" />
                  </div>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
};

export default About;