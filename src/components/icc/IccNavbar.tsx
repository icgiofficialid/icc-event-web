// ================================================================
// IccNavbar.tsx — Monochrome premium · black & white · cinematic
// ================================================================
import { Menu, X } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: { en: "Upcoming Events", id: "Event Mendatang" }, href: "/events" },
  { label: { en: "Past Events",     id: "Event Lalu"      }, href: "/past-events" },
  { label: { en: "FAQ",             id: "FAQ"             }, href: "/faq" },
  { label: { en: "Contact Us",      id: "Kontak"          }, href: "/contact" },
];

// Snowflake logo SVG
const SnowflakeMark = ({ size = 20 }: { size?: number }) => {
  const arms = Array.from({ length: 6 }, (_, i) => i * 60);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="currentColor">
      <g transform="translate(100,100)">
        <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" />
        {arms.map(angle => (
          <g key={angle} transform={`rotate(${angle})`}>
            <polygon points="0,-36 12,-58 0,-80 -12,-58" />
            <circle cx="0" cy="-52" r="8" fill="none" stroke="currentColor" strokeWidth="5" />
            <circle cx="0" cy="-84" r="6" />
            <circle cx="11" cy="-44" r="4" />
            <circle cx="-11" cy="-44" r="4" />
          </g>
        ))}
        {arms.map(angle => (
          <g key={`t-${angle}`} transform={`rotate(${angle + 30})`}>
            <polygon points="0,-26 14,-46 -14,-46" />
          </g>
        ))}
      </g>
    </svg>
  );
};

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark"
        ? <Sun className="w-4 h-4 text-muted-foreground" />
        : <Moon className="w-4 h-4 text-muted-foreground" />}
    </button>
  );
};

const LangToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-muted transition-colors text-sm font-semibold text-muted-foreground"
    >
      {lang === "en" ? (
        <><img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-5 h-4 rounded-sm object-cover" /><span className="text-xs">EN</span></>
      ) : (
        <><img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-5 h-4 rounded-sm object-cover" /><span className="text-xs">ID</span></>
      )}
    </button>
  );
};

const IccNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/80 bg-background/92 backdrop-blur-2xl shadow-[0_1px_0_hsl(0_0%_100%/0.04)]"
          : "border-b border-transparent bg-background/70 backdrop-blur-xl"
      )}
    >
      <div className="container flex items-center justify-between gap-4 py-3">

        {/* ── LOGO ── */}
        <a href="/" className="flex items-center gap-3 group">
          <motion.div
            className="relative shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
          >
            {/* Emblem circle */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-foreground text-background">
              <SnowflakeMark size={20} />
            </div>
            {/* Live dot */}
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-foreground border-2 border-background"
              style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
          </motion.div>

          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[13px] font-bold text-foreground tracking-[0.08em] group-hover:opacity-70 transition-opacity font-display">
              ICC
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
              by ICGI
            </span>
          </div>
        </a>

        {/* ── MOBILE TOGGLE ── */}
        <button
          type="button"
          className="inline-flex rounded-xl border border-border/70 bg-surface/80 p-2 lg:hidden transition-colors hover:bg-muted"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </motion.span>
              : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-4 w-4 text-muted-foreground" />
                </motion.span>
            }
          </AnimatePresence>
        </button>

        {/* ── DESKTOP NAV ── */}
        <div className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            >
              <NavLink
                to={item.href}
                className="relative font-medium transition-colors hover:text-foreground group"
                activeClassName="text-foreground"
              >
                {item.label[lang]}
                {/* Underline on hover */}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* ── RIGHT CONTROLS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="hidden items-center gap-1 lg:flex"
        >
          <ThemeToggle />
          <LangToggle />

          <NavLink
            to="/events/yicc"
            className="ml-2 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all hover:scale-[1.04] hover:shadow-lg active:scale-[0.97]"
            style={{
              background: "hsl(var(--foreground))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 2px 16px hsl(var(--foreground) / 0.25)",
            }}
          >
            <SnowflakeMark size={13} />
            Register
          </NavLink>
        </motion.div>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border/60 bg-background/96 backdrop-blur-2xl lg:hidden overflow-hidden"
          >
            <div className="container grid gap-1.5 py-4 text-sm text-muted-foreground">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={item.href}
                    className="block rounded-xl border border-transparent px-3 py-2.5 font-medium transition-colors hover:border-border hover:bg-surface hover:text-foreground"
                    activeClassName="border-border bg-surface text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {item.label[lang]}
                  </NavLink>
                </motion.div>
              ))}

              <div className="flex items-center gap-1 pt-1 border-t border-border/40 mt-1">
                <ThemeToggle />
                <LangToggle />
              </div>

              <NavLink
                to="/events/yicc"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold mt-1"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                <SnowflakeMark size={13} />
                Register Now
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default IccNavbar;