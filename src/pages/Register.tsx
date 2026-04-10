import { useState } from "react";
import SiteShell from "@/components/iesf/SiteShell";
import { type ParticipantType, type CompetitionType } from "./register/registerConfig";
import HomeRegist       from "./register/homeregist";
import HomeIndo         from "./register/homeIndo";
import HomeInter        from "./register/homeInter";
import IndoOnline       from "./register/IndoOnline";
import IndoOffline      from "./register/IndoOffline";
import InterOnline      from "./register/InterOnline";
import InterOffline     from "./register/InterOffline";
import RegistrationForm from "./register/RegistrationForm";
import { useNavigate } from "react-router-dom";

type Step = 1 | 2 | 3 | 4;
const STEP_LABELS = ["Participant", "Competition", "Terms", "Form"];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep]               = useState<Step>(1);
  const [participant, setParticipant] = useState<ParticipantType | null>(null);
  const [competition, setCompetition] = useState<CompetitionType | null>(null);
  const [sheetUrl, setSheetUrl]       = useState<string>("");
  const [sheetTarget, setSheetTarget] = useState<string>(""); // ← TAMBAH

  const handleTermsNext = (url: string, target: string) => { // ← TAMBAH target
    setSheetUrl(url);
    setSheetTarget(target); // ← TAMBAH
    setStep(4);
  };

  const handleSuccess = () => {
  setStep(1);
  setParticipant(null);
  setCompetition(null);
  setSheetUrl("");
  setSheetTarget("");
  navigate("/");
};


  const renderStep3 = () => {
    const props = { onBack: () => setStep(2), onNext: handleTermsNext };
    if (participant === "indonesian"    && competition === "online")  return <IndoOnline   {...props} />;
    if (participant === "indonesian"    && competition === "offline") return <IndoOffline  {...props} />;
    if (participant === "international" && competition === "online")  return <InterOnline  {...props} />;
    if (participant === "international" && competition === "offline") return <InterOffline {...props} />;
    return null;
  };

  return (
    <SiteShell>
      <section className="container min-h-screen py-24 md:py-32 flex flex-col items-center">

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
          <HomeRegist participant={participant} setParticipant={setParticipant} onNext={() => setStep(2)} />
        )}
        {step === 2 && participant === "indonesian" && (
          <HomeIndo competition={competition} setCompetition={setCompetition}
            onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}
        {step === 2 && participant === "international" && (
          <HomeInter competition={competition} setCompetition={setCompetition}
            onBack={() => setStep(1)} onNext={() => setStep(3)} />
        )}

        {step === 3 && renderStep3()}

        {step === 4 && participant && competition && sheetUrl && (
          <RegistrationForm
            participant={participant}
            competition={competition}
            sheetUrl={sheetUrl}
            sheetTarget={sheetTarget} // ← TAMBAH
            onBack={() => setStep(3)}
            onSuccess={handleSuccess}
          />
        )}

      </section>
    </SiteShell>
  );
};

export default Register;