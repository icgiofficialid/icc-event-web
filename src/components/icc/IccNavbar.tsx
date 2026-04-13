// ================================================================
// IccNavbar.tsx — FIXED: ICC branding, warm cultural theme
// ================================================================
import { Menu, X } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: { en: "Upcoming Events", id: "Event Mendatang" }, href: "/events" },
  { label: { en: "Past Events",     id: "Event Lalu"      }, href: "/past-events" },
  { label: { en: "FAQ",             id: "FAQ"             }, href: "/faq" },
  { label: { en: "Contact Us",      id: "Kontak"          }, href: "/contact" },
];

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Toggle theme">
      {theme === "dark" ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
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
        <>
          <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-5 h-4 rounded-sm object-cover" />
          <span className="text-xs">EN</span>
        </>
      ) : (
        <>
          <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-5 h-4 rounded-sm object-cover" />
          <span className="text-xs">ID</span>
        </>
      )}
    </button>
  );
};

const IccNavbar = () => {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-4 py-3">

        {/* ── LOGO ICC ── */}
        <a href="/" className="flex items-center gap-3 group">
          {/* Emblem */}
          <div className="relative shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(38 95% 50%), hsl(350 75% 50%))",
                boxShadow: "0 2px 12px hsl(38 95% 50% / 0.35)",
              }}
            >
              <span
                className="text-white font-black text-[11px] tracking-tight"
                style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}
              >
                ICC
              </span>
            </div>
            {/* Sparkle dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-background"
              style={{ background: "hsl(38 95% 58%)" }} />
          </div>

          {/* Text lockup */}
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className="text-[13px] font-bold text-foreground tracking-wide group-hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ICC
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-0.5">
              by ICGI
            </span>
          </div>
        </a>

        {/* ── MOBILE TOGGLE ── */}
        <button
          type="button"
          className="inline-flex rounded-xl border border-border/60 bg-surface/80 p-2 lg:hidden transition-colors hover:bg-muted"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          {open
            ? <X className="h-4 w-4 text-muted-foreground" />
            : <Menu className="h-4 w-4 text-muted-foreground" />
          }
        </button>

        {/* ── DESKTOP NAV ── */}
        <div className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              className="font-medium transition-colors hover:text-foreground"
              activeClassName="text-foreground"
            >
              {item.label[lang]}
            </NavLink>
          ))}
        </div>

        {/* ── RIGHT CONTROLS ── */}
        <div className="hidden items-center gap-1 lg:flex">
          <ThemeToggle />
          <LangToggle />

          {/* Register button */}
          <NavLink
            to="/events/yicc"
            className="ml-1 flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, hsl(38 95% 52%), hsl(350 75% 50%))",
              boxShadow: "0 2px 12px hsl(38 95% 50% / 0.3)",
            }}
          >
            🌸 Register
          </NavLink>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <div className={cn(
        "border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden overflow-hidden transition-all duration-300",
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="container grid gap-2 py-4 text-sm text-muted-foreground">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              className="rounded-xl border border-transparent px-3 py-2.5 font-medium transition-colors hover:border-border hover:bg-surface hover:text-foreground"
              activeClassName="border-border bg-surface text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label[lang]}
            </NavLink>
          ))}

          <div className="flex items-center gap-1 pt-1 border-t border-border/40 mt-1">
            <ThemeToggle />
            <LangToggle />
          </div>

          <NavLink
            to="/events/yicc"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white mt-1"
            style={{
              background: "linear-gradient(135deg, hsl(38 95% 52%), hsl(350 75% 50%))",
              boxShadow: "0 2px 12px hsl(38 95% 50% / 0.25)",
            }}
          >
            🌸 Register Now
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default IccNavbar;