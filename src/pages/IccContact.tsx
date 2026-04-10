// ================================================================
// IccContact.tsx
// ================================================================
import { useState } from "react";
import { Mail, PhoneCall, MapPin, Instagram, Youtube, Globe } from "lucide-react";
import IccShell from "@/components/icc/IccShell";
import SectionReveal from "@/components/icc/SectionReveal";
import { useLang } from "@/components/LanguageProvider";

const IccContact = () => {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Contact from ${form.name} - ICC`);
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`);
    window.location.href = `mailto:icgi.official.id@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <IccShell>
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <SectionReveal>
          <div className="hero-cultural cultural-shell rounded-[2rem] p-8 md:p-10">
            <div className="relative max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.24em]"
                style={{ borderColor: "hsl(38 95% 55% / 0.35)", background: "hsl(38 95% 55% / 0.08)", color: "hsl(38 95% 55%)" }}>
                <Mail className="h-4 w-4" />
                {lang === "en" ? "Contact" : "Kontak"}
              </div>
              <h1 className="font-display text-4xl md:text-5xl">
                {lang === "en" ? "Connect with the ICC Team" : "Terhubung dengan Tim ICC"}
              </h1>
              <p className="max-w-xl leading-8 text-muted-foreground">
                {lang === "en"
                  ? "Reach out for registration support, collaboration, or any questions about ICC events."
                  : "Hubungi kami untuk dukungan pendaftaran, kolaborasi, atau pertanyaan tentang event ICC."}
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="container pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-border/50 grid md:grid-cols-[1fr_1.2fr]">
            {/* Left info */}
            <div className="bg-background p-8 md:p-10 flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold font-display mb-2" style={{ color: "hsl(38 95% 55%)" }}>
                  {lang === "en" ? "Let's get in touch" : "Mari terhubung"}
                </h3>
                <p className="text-muted-foreground text-sm leading-7">
                  {lang === "en"
                    ? "We're here to help you with registration, event information, and collaboration."
                    : "Kami siap membantu Anda dengan pendaftaran, informasi event, dan kolaborasi."}
                </p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 shrink-0 mt-1" style={{ color: "hsl(38 95% 55%)" }} />
                  <span>Jl. Kemang RT 03 RW 06, Yogyakarta, Indonesia</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 shrink-0 mt-1" style={{ color: "hsl(38 95% 55%)" }} />
                  <span>icgi.official.id@gmail.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneCall className="h-4 w-4 shrink-0 mt-1" style={{ color: "hsl(38 95% 55%)" }} />
                  <a href="https://wa.me/628139905880" target="_blank" rel="noopener noreferrer"
                    className="hover:text-primary transition-colors">+62 813-9905-880</a>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 shrink-0 mt-1" style={{ color: "hsl(38 95% 55%)" }} />
                  <span>www.icgi.or.id</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">
                  {lang === "en" ? "Follow us:" : "Ikuti kami:"}
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, href: "https://www.instagram.com/icgi.id" },
                    { icon: Youtube,   href: "/" },
                    { icon: Globe,     href: "https://icgi.or.id" },
                  ].map(({ icon: Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all hover:scale-105"
                      style={{ borderColor: "hsl(38 95% 55% / 0.3)", background: "hsl(38 95% 55% / 0.08)", color: "hsl(38 95% 55%)" }}>
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="p-8 md:p-10 flex flex-col gap-5"
              style={{ background: "linear-gradient(135deg, hsl(20 50% 12%), hsl(350 40% 14%))" }}>
              <h3 className="text-xl font-bold text-white font-display">Contact us</h3>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder={lang === "en" ? "Name" : "Nama"}
                className="w-full rounded-xl border border-white/15 bg-white/5 text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none focus:border-white/40 transition" />
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="Email" type="email"
                className="w-full rounded-xl border border-white/15 bg-white/5 text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none focus:border-white/40 transition" />
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder={lang === "en" ? "Message" : "Pesan"} rows={5}
                className="w-full rounded-xl border border-white/15 bg-white/5 text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none focus:border-white/40 transition resize-none" />
              <button onClick={handleSend}
                disabled={!form.name || !form.email || !form.message}
                className="font-bold px-8 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, hsl(38 95% 55%), hsl(350 75% 55%))", color: "#fff" }}>
                {sent ? (lang === "en" ? "Sent! ✓" : "Terkirim! ✓") : (lang === "en" ? "Send" : "Kirim")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </IccShell>
  );
};

export default IccContact;