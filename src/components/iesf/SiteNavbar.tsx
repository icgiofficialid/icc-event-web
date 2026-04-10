import { Menu } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: { en: "Upcoming Events", id: "Event Mendatang" }, href: "/events" },
  { label: { en: "Past Events",     id: "Event Lalu"      }, href: "/past-events" },
   { label: { en: "FAQ",             id: "FAQ"             }, href: "/faq" },
  { label: { en: "Contact Us",      id: "Kontak"          }, href: "/contact" },
];

const linkClass = "transition-colors hover:text-primary";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-muted transition-colors">
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
          <span>EN</span>
        </>
      ) : (
        <>
          <img src="https://flagcdn.com/w20/id.png" alt="ID" className="w-5 h-4 rounded-sm object-cover" />
          <span>ID</span>
        </>
      )}
    </button>
  );
};

const SiteNavbar = () => {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-4 py-4">

            {/* Logo */}
        <a  
        href="/"
          className="font-display text-2xl font-black tracking-tighter text-foreground transition-colors hover:text-primary"
        >
          IESF
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex rounded-full border border-border bg-surface p-2 text-primary lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass} activeClassName="text-primary">
              {item.label[lang]}
            </NavLink>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <LangToggle />
          <Button variant="hero" size="sm" asChild>
            <NavLink to="/events/yiesf"> Register</NavLink>
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={cn("border-t border-border/70 bg-background/95 lg:hidden", open ? "block" : "hidden")}>
        <div className="container grid gap-3 py-4 text-sm text-muted-foreground">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="rounded-xl border border-transparent px-3 py-2 transition-colors hover:border-border hover:bg-surface hover:text-primary"
              activeClassName="border-border bg-surface text-primary"
              onClick={() => setOpen(false)}
            >
              {item.label[lang]}
            </NavLink>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <ThemeToggle />
            <LangToggle />
          </div>
          <Button variant="hero" size="sm" asChild>
            <NavLink to="/events/yiesf" onClick={() => setOpen(false)}>
              Sign Up
            </NavLink>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SiteNavbar;