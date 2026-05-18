// ================================================================
// IccRegister.tsx — Main flow pendaftaran ICC (4 steps)
// ================================================================

import { useState } from "react";
import SiteShell from "@/components/icc/IccShell";
import { type ParticipantType, type CompetitionType } from "./register/iccRegisterConfig";
import HomeRegist        from "./register/homeregist";
import HomeIndo          from "./register/homeIndo";
import HomeInter         from "./register/homeInter";
import IccRegistrationForm from "./register/iccRegistrationForm";
import { useNavigate }   from "react-router-dom";
import { getSheetConfig } from "@/config/eventRegistry";
import { Button }        from "@/components/ui/button";

// ── Terms Box (inline, English only) ─────────────────────────────
const ICC_TERMS = [
  "All data submitted by participants cannot be modified after the payment deadline. Please review your registration carefully.",
  "Participants who do not submit required documents (music file, costume details) after two reminders will be considered to have resigned automatically.",
  "Participants must use a performance title and materials that match the category they are participating in.",
  "All performances must use original or properly licensed cultural material. Plagiarism will result in disqualification without refund.",
  "Participants are required to follow the entire series of activities according to the set schedule.",
  "Fire, smoke, sharp objects, and liquids are strictly prohibited as stage properties.",
  "All jury decisions are final and cannot be contested.",
  "Registration fees that have been paid are non-refundable under any circumstances.",
];

const IccTermsBox = ({
  participant, competition, sheetUrl, sheetTarget, onBack, onNext,
}: {
  participant: ParticipantType;
  competition: CompetitionType;
  sheetUrl: string;
  sheetTarget: string;
  onBack: () => void;
  onNext: (sheetUrl: string, sheetTarget: string) => void;
}) => {
  const [agreed, setAgreed] = useState(false);
  const pLabel = participant === "international" ? "International" : "Indonesian";
  const cLabel = competition === "online" ? "Online" : "Offline";

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] mb-2 font-semibold" style={{ color: "hsl(38 95% 55%)" }}>
          Step 3 of 4
        </p>
        <h2 className="text-2xl md:text-3xl font-bold">Terms & Conditions</h2>
        <p className="text-muted-foreground mt-2 text-sm">{pLabel} · {cLabel} Participants</p>
      </div>

      <div className="cultural-shell rounded-[1.5rem] overflow-hidden">
        <div className="h-80 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 border-b border-border">
          <p className="font-semibold text-foreground mb-4">
            Before proceeding, please read and agree to the following terms and conditions for {cLabel} Participants:
          </p>
          <ul className="space-y-3">
            {ICC_TERMS.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 shrink-0" style={{ color: "hsl(38 95% 55%)" }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
          <input
            type="checkbox" id="agree" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
            I have read and agree to the{" "}
            <span
              className="font-semibold underline cursor-pointer"
              style={{ color: "hsl(38 95% 55%)" }}
              onClick={() => window.open("/terms", "_blank")}
            >
              Terms & Conditions
            </span>.
          </label>
        </div>

        <div className="px-4 py-5 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onBack}>
            ← Back
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto text-white"
            style={{ background: agreed ? "hsl(38 95% 55%)" : undefined }}
            disabled={!agreed}
            onClick={() => onNext(sheetUrl, sheetTarget)}
          >
            Accept & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── Main Register Flow ────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4;

const IccRegister = () => {
  const navigate = useNavigate();

  // Baca eventSlug dari sessionStorage — disimpan EventDetailPage sebelum navigate
  const eventSlug: string | null = sessionStorage.getItem("eventSlug");

  const [step, setStep]               = useState<Step>(1);
  const [participant, setParticipant] = useState<ParticipantType | null>(null);
  const [competition, setCompetition] = useState<CompetitionType | null>(null);
  const [sheetUrl, setSheetUrl]       = useState("");
  const [sheetTarget, setSheetTarget] = useState("");

  const handleTermsNext = (url: string, target: string) => {
    setSheetUrl(url); setSheetTarget(target); setStep(4);
  };

  const handleSuccess = () => {
    sessionStorage.removeItem("eventSlug");
    setStep(1); setParticipant(null); setCompetition(null);
    setSheetUrl(""); setSheetTarget("");
    navigate("/");
  };

  const renderStep3 = () => {
    if (!eventSlug || !participant || !competition) {
      return (
        <p className="text-muted-foreground text-sm text-center">
          No event selected. Please register through an event page.
        </p>
      );
    }
    const cfg = getSheetConfig(eventSlug, participant, competition);
    if (!cfg) {
      return (
        <p className="text-muted-foreground text-sm text-center">
          No event selected. Please register through an event page.
        </p>
      );
    }
    return (
      <IccTermsBox
        participant={participant}
        competition={competition}
        sheetUrl={cfg.sheetUrl}
        sheetTarget={cfg.sheetTarget}
        onBack={() => setStep(2)}
        onNext={handleTermsNext}
      />
    );
  };

  const STEP_LABELS = ["Participant", "Competition", "Terms", "Form"];

  return (
    <SiteShell>
      <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center">

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step > i + 1
                    ? "bg-primary text-primary-foreground"
                    : step === i + 1
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-border text-muted-foreground"
                }`}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:block">{label}</span>
              </div>
              {i < 3 && (
                <div className={`w-8 sm:w-12 h-0.5 mb-4 transition-all duration-300 ${
                  step > i + 1 ? "bg-primary" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <HomeRegist
            participant={participant} setParticipant={setParticipant}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && participant === "indonesian" && (
          <HomeIndo
            competition={competition} setCompetition={setCompetition}
            onBack={() => setStep(1)} onNext={() => setStep(3)}
          />
        )}
        {step === 2 && participant === "international" && (
          <HomeInter
            competition={competition} setCompetition={setCompetition}
            onBack={() => setStep(1)} onNext={() => setStep(3)}
          />
        )}
        {step === 3 && renderStep3()}
        {step === 4 && participant && competition && sheetUrl && (
          <IccRegistrationForm
            participant={participant} competition={competition}
            sheetUrl={sheetUrl} sheetTarget={sheetTarget}
            onBack={() => setStep(3)} onSuccess={handleSuccess}
          />
        )}

      </section>
    </SiteShell>
  );
};

export default IccRegister;