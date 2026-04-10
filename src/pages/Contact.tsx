import { useState } from "react";
import { Mail, PhoneCall, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import PageHero from "@/components/iesf/PageHero";
import SiteShell from "@/components/iesf/SiteShell";
import { pageMeta } from "@/components/iesf/siteData";

const Contact = () => {
  const meta = pageMeta.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Contact from ${form.name} - IESF`);
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\n\nPesan:\n${form.message}`);
    window.location.href = `mailto:bisf.official@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <SiteShell>
      <PageHero eyebrow={meta.eyebrow.en} title={meta.title.en} description={meta.description.en} icon={meta.icon} />

      <section className="container pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 grid md:grid-cols-[1fr_1.2fr]">

            {/* Left — Info */}
            <div className="bg-background p-8 md:p-10 flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">Let's get in touch</h3>
                <p className="text-muted-foreground text-sm leading-7">
                  Feel free to contact us. We are here to assist you with all your needs.
                </p>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>Jl. Kemang RT 03 RW 06</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>icgi.official.id@gmail.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneCall className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span>+62 882-1324-8890</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Connect with us :</p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Youtube, href: "#" },
                    { icon: Linkedin, href: "#" },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white hover:scale-105 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-[#065777b1] p-8 md:p-10 flex flex-col gap-5">
              <h3 className="text-2xl font-bold text-white">Contact us</h3>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full rounded-full border border-white/15 bg-white/5 text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none focus:border-white/40 transition"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="w-full rounded-full border border-white/15 bg-white/5 text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none focus:border-white/40 transition"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
                className="w-full rounded-2xl border border-white/15 bg-white/5 text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none focus:border-white/40 transition resize-none"
              />

              <div>
                <button
                  onClick={handleSend}
                  disabled={!form.name || !form.email || !form.message}
                  className="bg-white/10 hover:bg-white/15 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-all duration-200 hover:scale-[1.02]"
                >
                  {sent ? "Sent!" : "Send"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default Contact;