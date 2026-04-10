import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type ParticipantType, type CompetitionType } from "./registerConfig";
import { useLang } from "@/components/LanguageProvider";
import termsData from "./terms.json";

interface Props {
  participant: ParticipantType;
  competition: CompetitionType;
  sheetUrl: string;
  sheetTarget: string;
  onBack: () => void;
  onNext: (sheetUrl: string, sheetTarget: string) => void;
}

const LABELS = {
  step:    { en: "Step 3 of 4",              id: "Langkah 3 dari 4" },
  title:   { en: "Terms & Conditions",       id: "Syarat & Ketentuan" },
  intro:   { en: "Before proceeding, please read and agree to the following terms and conditions for", id: "Sebelum melanjutkan, baca dan setujui syarat & ketentuan berikut untuk" },
  offline: { en: "Offline",                  id: "Offline" },
  online:  { en: "Online",                   id: "Online" },
  participants: { en: "Participants",         id: "Peserta" },
  intl:    { en: "International",            id: "Internasional" },
  indo:    { en: "Indonesian",               id: "Indonesia" },
  check:   { en: "I have read and agree to the", id: "Saya telah membaca dan menyetujui" },
  terms:   { en: "Terms & Conditions",       id: "Syarat & Ketentuan" },
  back:    { en: "← Back",                  id: "← Kembali" },
  accept:  { en: "Accept & Continue",        id: "Setuju & Lanjutkan" },
};

const TermsBox = ({ participant, competition, sheetUrl, sheetTarget, onBack, onNext }: Props) => {
  const [agreed, setAgreed] = useState(false);
  const { lang } = useLang();

  const terms = competition === "offline" ? termsData.offline : termsData.online;

  const participantLabel = participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang];
  const competitionLabel = competition === "offline" ? LABELS.offline[lang] : LABELS.online[lang];

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">{LABELS.step[lang]}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{LABELS.title[lang]}</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {participantLabel} · {competitionLabel} {LABELS.participants[lang]}
        </p>
      </div>

      <div className="tech-shell rounded-[1.5rem] overflow-hidden">
        <div className="h-80 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 border-b border-border">
          <p className="font-semibold text-foreground mb-4">
            {LABELS.intro[lang]} {competitionLabel} {LABELS.participants[lang]}:
          </p>
          <ul className="space-y-3">
            {terms.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
            {LABELS.check[lang]}{" "}
            <span
              className="text-primary font-semibold underline cursor-pointer"
              onClick={() => window.open("/terms", "_blank")}
            >
              {LABELS.terms[lang]}
            </span>.
          </label>
        </div>

        <div className="px-4 py-5 flex flex-col sm:flex-row gap-3">
          <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" onClick={onBack}>
            {LABELS.back[lang]}
          </Button>
          <Button
            variant="hero" size="lg"
            className="w-full sm:w-auto"
            disabled={!agreed}
            onClick={() => onNext(sheetUrl, sheetTarget)}
          >
            {LABELS.accept[lang]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsBox;