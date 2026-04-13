// ================================================================
// IccFooter.tsx — Monochrome premium · black & white
// ================================================================
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LanguageProvider";
import { footerColumns, footerLinkMap, socialItems } from "./iccData";
import { motion } from "framer-motion";

// Snowflake mark
const SnowflakeMark = ({ size = 32 }: { size?: number }) => {
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

const IccFooter = () => {
  const { lang } = useLang();

  return (
    <footer className="relative overflow-hidden border-t border-border/60">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Top accent line animated */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.5) 40%, hsl(var(--foreground) / 0.5) 60%, transparent 100%)",
        }}
      />

      {/* Large watermark snowflake */}
      <div
        className="absolute -bottom-16 -right-16 text-foreground pointer-events-none select-none"
        style={{
          opacity: 0.025,
          animation: "rotateCW 80s linear infinite",
        }}
      >
        <SnowflakeMark size={320} />
      </div>

      <div className="container py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] grid-cols-1">

          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-foreground text-background"
                style={{ boxShadow: "0 4px 24px hsl(var(--foreground) / 0.2)" }}
              >
                <SnowflakeMark size={26} />
              </div>
              <div>
                <p
                  className="font-bold text-foreground text-sm leading-tight tracking-[0.08em]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  International Cultural Competition
                </p>
                <p className="text-[10px] uppercase tracking-[0.22em] mt-0.5 text-muted-foreground">
                  by ICGI · Indonesia
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 max-w-sm text-muted-foreground">
              Celebrating traditional arts, cultural identity, and global cultural exchange on an international stage.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socialItems.map((Icon, i) => (
                <NavLink
                  key={i}
                  to="/contact"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-foreground hover:text-background border border-border bg-surface text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </NavLink>
              ))}
            </div>
          </motion.div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4">
            {footerColumns.map((column, colIdx) => {
              const colTitle = typeof column.title === "string" ? column.title : column.title[lang];
              return (
                <motion.div
                  key={colTitle}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: colIdx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3
                    className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4 text-foreground"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {colTitle}
                  </h3>
                  <ul className="space-y-2.5 text-sm">
                    {column.links.map(link => {
                      const linkText = typeof link === "string" ? link : link[lang];
                      const href = footerLinkMap[linkText] ?? "/";
                      const isExternal = href.startsWith("http") || href.startsWith("mailto");
                      return (
                        <li key={linkText}>
                          {isExternal ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-foreground text-muted-foreground relative group"
                            >
                              {linkText}
                              <span className="absolute -bottom-px left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                            </a>
                          ) : (
                            <NavLink
                              to={href}
                              className="transition-colors hover:text-foreground text-muted-foreground relative group"
                            >
                              {linkText}
                              <span className="absolute -bottom-px left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                            </NavLink>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/50"
        >
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} International Cultural Competition (ICC) · ICGI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-foreground"
              style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Powered by ICGI
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default IccFooter;