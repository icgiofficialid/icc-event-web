// ================================================================
// IccFaq.tsx
// ================================================================
import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";
import { motion } from "framer-motion";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { faqItems } from "@/components/icc/iccData";

const IccFaq = () => {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <IccShell>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <SectionReveal>
          <div className="hero-cultural cultural-shell rounded-[2rem] p-8 md:p-10">
            <div className="relative max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.24em]"
                style={{ borderColor: "hsl(38 95% 55% / 0.35)", background: "hsl(38 95% 55% / 0.08)", color: "hsl(38 95% 55%)" }}>
                <CircleHelp className="h-4 w-4" />
                FAQ
              </div>
              <h1 className="font-display text-4xl md:text-5xl">
                {lang === "en" ? "Quick Answers" : "Jawaban Cepat"}
              </h1>
              <p className="max-w-xl leading-8 text-muted-foreground">
                {lang === "en"
                  ? "Everything you need to know about participating in YICC and ICC events."
                  : "Semua yang perlu Anda ketahui tentang partisipasi dalam YICC dan event ICC."}
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="container pb-20">
        <div className="grid gap-4 max-w-3xl mx-auto">
          {faqItems.map((faq, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div
                className="cultural-shell rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 p-6">
                  <h2 className="text-base font-semibold text-foreground">{faq.question[lang]}</h2>
                  <ChevronDown
                    className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </div>
                <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                  <p className="px-6 pb-6 leading-7 text-sm text-muted-foreground">{faq.answer[lang]}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </IccShell>
  );
};

export default IccFaq;