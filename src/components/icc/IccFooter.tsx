// ================================================================
// IccFooter.tsx
// ================================================================
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";
import { footerColumns, footerLinkMap, socialItems } from "./iccData";

const IccFooter = () => {
  const { lang } = useLang();
  return (
    <footer className="bg-panel border-t border-border py-10 md:py-14 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(38 95% 55% / 0.5), hsl(350 75% 55% / 0.4), transparent)" }} />

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] grid-cols-1">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(38 95% 55%), hsl(350 75% 55%))" }}>
                <span className="font-cinzel font-bold text-white text-sm">ICC</span>
              </div>
              <div>
                <p className="font-cinzel font-bold text-foreground text-base leading-tight">International Cultural Competition</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">by ICGI · Yogyakarta, Indonesia</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-7 max-w-sm">
              Celebrating traditional arts, cultural identity, and global cultural exchange on an international stage.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialItems.map((Icon, i) => (
                <NavLink
                  key={i}
                  to="/contact"
                  className="rounded-full border border-border bg-panel p-2.5 text-primary transition-transform hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4" />
                </NavLink>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map(column => {
              const colTitle = typeof column.title === "string" ? column.title : column.title[lang];
              return (
                <div key={colTitle}>
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{colTitle}</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {column.links.map(link => {
                      const linkText = typeof link === "string" ? link : link[lang];
                      const href = footerLinkMap[linkText] ?? "/";
                      const isExternal = href.startsWith("http") || href.startsWith("mailto");
                      return (
                        <li key={linkText}>
                          {isExternal ? (
                            <a href={href} target="_blank" rel="noopener noreferrer"
                              className="transition-colors hover:text-primary">
                              {linkText}
                            </a>
                          ) : (
                            <NavLink to={href} className="transition-colors hover:text-primary">
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

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} International Cultural Competition (ICC) · ICGI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default IccFooter;