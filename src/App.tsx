import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

// Existing pages
import About from "./pages/IccAbout.tsx";
import Contact from "./pages/IccContact.tsx";
import Curation from "./pages/Curation.tsx";
import Faq from "./pages/IccFaq.tsx";
// import Galery from "./pages/Galery.tsx";
import Index from "./pages/IccIndex.tsx";
// import MediaCoverage from "./pages/MediaCoverage.tsx";
import NotFound from "./pages/NotFound.tsx";
// import Sertifikat from "./pages/Sertifikat.tsx";
import Terms from "@/pages/data/Terms.tsx";
import Guide from "@/pages/guide";
import register from "@/pages/IccRegister.tsx";

// New event portal pages
import UpcomingEvents from "./pages/IccUpcomingEvents.tsx";
import PastEvents from "./pages/PastEvents";
import YICCFDetail from "./pages/events/YICCDetail.tsx";
import { Scroll } from "lucide-react";
import ScrollToTop from "./components/icc/ScrollToTop.tsx";
import IccAbout from "./pages/IccAbout.tsx";
import IccFaq from "./pages/IccFaq.tsx";
import IccContact from "./pages/IccContact.tsx";
import IccUpcomingEvents from "./pages/IccUpcomingEvents.tsx";
import IccRegister from "@/pages/IccRegister.tsx";
import { ICC_CONFIG } from "./components/chatbot/useChatbot.ts";
import AiChatbot from "./components/chatbot/AiChatbot.tsx";



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
              {/* Main */}
              <Route path="/" element={<Index />} />

              {/* Event Portal */}
              <Route path="/events" element={<IccUpcomingEvents />} />
              <Route path="/past-events" element={<PastEvents />} />
              <Route path="/events/yicc" element={<YICCFDetail />} />
              {/* Existing pages */}
              <Route path="/about" element={<IccAbout />} />
              {/* <Route path="/sertifikat" element={<Sertifikat />} /> */}
              {/* <Route path="/media-coverage" element={<MediaCoverage />} /> */}
              {/* <Route path="/galery" element={<Galery />} /> */}
              <Route path="/curation" element={<Curation />} />
              <Route path="/faq" element={<IccFaq />} />
              <Route path="/contact" element={<IccContact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/register" element={<IccRegister />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
              <AiChatbot config={ICC_CONFIG} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;