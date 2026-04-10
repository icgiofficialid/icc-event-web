import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import SiteFooter from "@/components/iesf/SiteFooter";
import SiteNavbar from "@/components/iesf/SiteNavbar";
import ScrollToTop from "@/components/iesf/ScrollToTop";

type SiteShellProps = {
  children: ReactNode;
  showFooter?: boolean;
};

const SiteShell = ({ children, showFooter = true }: SiteShellProps) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
       <ScrollToTop />
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-30" aria-hidden="true" />
      <SiteNavbar />
      <main className="relative">{children}</main>
      {showFooter ? <SiteFooter /> : null}

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-border bg-surface p-3 text-primary shadow-glow backdrop-blur-xl"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default SiteShell;