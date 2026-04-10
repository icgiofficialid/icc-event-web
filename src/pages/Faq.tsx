import { useState } from "react";
import { pageMeta, faqItems } from "@/components/iesf/siteData";
import PageHero from "@/components/iesf/PageHero";
import SectionReveal from "@/components/iesf/SectionReveal";
import SiteShell from "@/components/iesf/SiteShell";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

const Faq = () => {
  const meta = pageMeta.faq;
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SiteShell>
      <PageHero eyebrow={meta.eyebrow[lang]} title={meta.title[lang]} description={meta.description[lang]} icon={meta.icon} />
      <section className="container pb-16 md:pb-24">
        <div className="grid gap-4 max-w-3xl mx-auto">
          {faqItems.map((faq, index) => (
            <SectionReveal key={faq.question[lang]} delay={index * 0.05}>
              <div
                className="tech-shell rounded-[1.5rem] overflow-hidden cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {/* Question */}
                <div className="flex items-center justify-between gap-4 p-6">
                  <h2 className="text-lg text-foreground">{faq.question[lang]}</h2>
                  <ChevronDown
                    className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="px-6 pb-6 leading-8 text-muted-foreground">
                    {faq.answer[lang]}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
};

export default Faq;