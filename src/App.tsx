// ================================================================
// App.tsx
// ================================================================

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

// Pages
import Index          from "./pages/IccIndex.tsx";
import IccAbout       from "./pages/IccAbout.tsx";
import IccFaq         from "./pages/IccFaq.tsx";
import IccContact     from "./pages/IccContact.tsx";
import IccUpcomingEvents from "./pages/IccUpcomingEvents.tsx";
import PastEvents     from "./pages/PastEvents";
import IccRegister    from "@/pages/IccRegister.tsx";
import Curation       from "./pages/Curation.tsx";
import Terms          from "@/pages/data/Terms.tsx";
import Guide          from "@/pages/guide";
import NotFound       from "./pages/NotFound.tsx";

// Event detail — dynamic by slug
import IccEventDetailPage from "./pages/events/IccEventDetailPage";

// Misc
import ScrollToTop    from "./components/icc/ScrollToTop.tsx";

// ── Dynamic event detail wrapper ──────────────────────────────────
const DynamicEventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  return <IccEventDetailPage slug={slug ?? ""} />;
};

// ── App ───────────────────────────────────────────────────────────
const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/"            element={<Index />} />
              <Route path="/events"      element={<IccUpcomingEvents />} />
              <Route path="/past-events" element={<PastEvents />} />
              <Route path="/events/:slug" element={<DynamicEventDetail />} />
              <Route path="/about"       element={<IccAbout />} />
              <Route path="/faq"         element={<IccFaq />} />
              <Route path="/contact"     element={<IccContact />} />
              <Route path="/curation"    element={<Curation />} />
              <Route path="/terms"       element={<Terms />} />
              <Route path="/guide"       element={<Guide />} />
              <Route path="/register"    element={<IccRegister />} />
              <Route path="*"            element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;