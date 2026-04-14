// ================================================================
// IccFaq.tsx
// ================================================================
import { useState, useRef } from "react";
import { ChevronDown, CircleHelp, Sparkles, Send, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";
import { faqItems } from "@/components/icc/iccData";
import AiChatbot from "@/components/chatbot/AiChatbot";
import { ICC_CONFIG } from "@/components/chatbot/useChatbot";

// ── Inline AI Ask Box ─────────────────────────────────────────────
const InlineAskAI = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleAsk = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setAnswer("");
    setHasAsked(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch(ICC_CONFIG.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
        body: JSON.stringify({
          systemPrompt: ICC_CONFIG.systemPrompt,
          messages: [{ role: "user", content: question.trim() }],
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Error ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              setAnswer(prev => prev + parsed.text);
            }
          } catch { /* skip */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setAnswer("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="cultural-shell rounded-2xl p-6 md:p-8 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "hsl(38 95% 55% / 0.15)", color: "hsl(38 95% 55%)" }}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Ask AI Assistant</p>
          <p className="text-xs text-muted-foreground">Can't find your answer above? Ask me anything.</p>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-3 items-end">
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question here... (e.g. How do I register as a group?)"
          rows={2}
          disabled={isLoading}
          className="flex-1 resize-none rounded-xl px-4 py-3 text-sm outline-none leading-relaxed bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors"
          style={{ maxHeight: "120px" }}
          onInput={e => {
            const t = e.currentTarget;
            t.style.height = "auto";
            t.style.height = Math.min(t.scrollHeight, 120) + "px";
          }}
        />
        <motion.button
          onClick={isLoading ? handleStop : handleAsk}
          disabled={!isLoading && !question.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: isLoading ? "hsl(0 72% 51%)" : "hsl(38 95% 55%)",
            color: "#0a0a0a",
          }}
        >
          {isLoading
            ? <Square className="w-4 h-4" />
            : <Send className="w-4 h-4" />
          }
        </motion.button>
      </div>

      {/* Answer */}
      <AnimatePresence>
        {hasAsked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl p-4 text-sm leading-7 text-muted-foreground"
            style={{
              background: "hsl(38 95% 55% / 0.06)",
              border: "1px solid hsl(38 95% 55% / 0.15)",
              minHeight: "56px",
            }}
          >
            {answer ? (
              <p className="whitespace-pre-wrap">{answer}</p>
            ) : isLoading ? (
              <div className="flex items-center gap-1.5 py-1">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(38 95% 55%)" }}
                    animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── MAIN PAGE ─────────────────────────────────────────────────────
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

      {/* FAQ List */}
      <section className="container pb-12">
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

      {/* Inline AI Ask Box */}
      <section className="container pb-20">
        <SectionReveal>
          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold px-1">
              Still have questions?
            </p>
            <InlineAskAI />
          </div>
        </SectionReveal>
      </section>

      {/* Floating chatbot tetap ada */}
      <AiChatbot config={ICC_CONFIG} />
    </IccShell>
  );
};

export default IccFaq;