// ================================================================
// IccFooter.tsx — warm orange accent
// ================================================================
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";
import { footerColumns, footerLinkMap, socialItems } from "./iccData";

const IccFooter = () => {
  const { lang } = useLang();

  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      {/* Warm dark background */}
      <div className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, hsl(22 40% 10%) 0%, hsl(18 45% 8%) 100%)",
        }} />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(38 95% 55%) 30%, hsl(350 75% 55%) 70%, transparent 100%)" }} />

      <div className="container py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] grid-cols-1">

          {/* Brand block */}
          <div className="space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, hsl(38 95% 52%), hsl(350 75% 50%))",
                  boxShadow: "0 4px 20px hsl(38 90% 50% / 0.4)",
                }}>
                <span className="font-black text-white text-sm tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>ICC</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight" style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>
                  International Cultural Competition
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] mt-0.5" style={{ color: "hsl(38 60% 50%)" }}>
                  by ICGI · Yogyakarta, Indonesia
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 max-w-sm" style={{ color: "hsl(35 20% 55%)" }}>
              Celebrating traditional arts, cultural identity, and global cultural exchange on an international stage.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socialItems.map((Icon, i) => (
                <NavLink
                  key={i}
                  to="/contact"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                  style={{
                    border: "1px solid hsl(38 50% 30%)",
                    background: "hsl(38 30% 14%)",
                    color: "hsl(38 80% 60%)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </NavLink>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4">
            {footerColumns.map(column => {
              const colTitle = typeof column.title === "string" ? column.title : column.title[lang];
              return (
                <div key={colTitle}>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
                    style={{ color: "hsl(38 85% 58%)" }}>
                    {colTitle}
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {column.links.map(link => {
                      const linkText = typeof link === "string" ? link : link[lang];
                      const href = footerLinkMap[linkText] ?? "/";
                      const isExternal = href.startsWith("http") || href.startsWith("mailto");
                      const linkStyle = { color: "hsl(35 18% 52%)" };
                      const hoverClass = "transition-colors hover:text-amber-400";
                      return (
                        <li key={linkText}>
                          {isExternal ? (
                            <a href={href} target="_blank" rel="noopener noreferrer"
                              className={hoverClass} style={linkStyle}>
                              {linkText}
                            </a>
                          ) : (
                            <NavLink to={href} className={hoverClass} style={linkStyle}>
                              {linkText}
                            </NavLink>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid hsl(35 20% 18%)" }}>
          <p className="text-xs text-center" style={{ color: "hsl(35 15% 40%)" }}>
            © {new Date().getFullYear()} International Cultural Competition (ICC) · ICGI. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(38 95% 55%)" }} />
            <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "hsl(35 20% 40%)" }}>
              Powered by ICGI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IccFooter;