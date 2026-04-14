// ================================================================
// IccShell.tsx
// ================================================================
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import IccNavbar from "./IccNavbar";
import IccFooter from "./IccFooter";
import ScrollToTop from "@/components/icc/ScrollToTop";
import AiChatbot from "@/components/chatbot/AiChatbot";
import { ICC_CONFIG } from "@/components/chatbot/useChatbot";

type IccShellProps = {
  children: ReactNode;
  showFooter?: boolean;
};


const IccShell = ({ children, showFooter = true }: IccShellProps) => {
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
      <IccNavbar />
      <main className="relative">{children}</main>
      {showFooter && <IccFooter />}

      <>
      {children}
        <AiChatbot config={ICC_CONFIG} position="bottom-right" />
      </>
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 20, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-border bg-surface p-3 text-primary shadow-lg backdrop-blur-xl"
        style={{ boxShadow: "var(--shadow-glow)" }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default IccShell;