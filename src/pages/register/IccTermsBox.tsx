// ================================================================
// IccTermsBox.tsx — YICC Terms & Conditions
// ================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type ParticipantType, type CompetitionType } from "./iccRegisterConfig";
import { useLang } from "@/components/LanguageProvider";

interface Props {
  participant: ParticipantType;
  competition: CompetitionType;
  sheetUrl: string;
  sheetTarget: string;
  onBack: () => void;
  onNext: (sheetUrl: string, sheetTarget: string) => void;
}

const TERMS_OFFLINE = [
  "All submitted data cannot be modified after the submission deadline. Please review carefully before submitting.",
  "Participants must submit all required technical files (music, descriptions, property declarations) no later than H-14 before the event.",
  "Prohibited properties include fire, smoke, liquids, sharp weapons, glass, dangerous substances, live animals, confetti, or materials that dirty or make the stage slippery.",
  "Performances must not contain hate speech, offensive SARA-related content, explicit violence, or inappropriate material.",
  "Participants who miss their assigned performance slot or are late may lose their opportunity, subject to committee decision.",
  "Plagiarism or presenting work that does not represent authentic cultural heritage is strictly prohibited.",
  "All jury decisions are final and cannot be contested.",
  "Registration fees that have been paid are non-refundable under any circumstances.",
  "Participants must bring backup music files on the event day.",
  "On-stage setup time is limited: Dance Solo/Group 1 min, Costume Show 1 min, Vocal cue music only.",
];

const TERMS_ONLINE = [
  "All submitted data cannot be modified after the submission deadline.",
  "Participants must ensure a stable internet connection during the online performance/presentation session.",
  "All required technical files must be submitted no later than H-14 before the event.",
  "Performances must represent authentic cultural heritage and must not contain offensive content.",
  "International participants must present cultural works representing their country, region, or community of origin.",
  "All jury decisions are final and cannot be contested.",
  "Registration fees that have been paid are non-refundable under any circumstances.",
];

const IccTermsBox = ({ participant, competition, sheetUrl, sheetTarget, onBack, onNext }: Props) => {
  const [agreed, setAgreed] = useState(false);
  const { lang } = useLang();

  const terms = competition === "offline" ? TERMS_OFFLINE : TERMS_ONLINE;

  const LABELS = {
    step:    { en: "Step 3 of 4",          id: "Langkah 3 dari 4" },
    title:   { en: "Terms & Conditions",   id: "Syarat & Ketentuan" },
    intl:    { en: "International",        id: "Internasional" },
    indo:    { en: "Indonesian",           id: "Indonesia" },
    offline: { en: "Offline",              id: "Offline" },
    online:  { en: "Online",               id: "Online" },
    participants: { en: "Participants",    id: "Peserta" },
    intro:   { en: "Before proceeding, please read and agree to the following terms and conditions for", id: "Sebelum melanjutkan, baca dan setujui syarat & ketentuan berikut untuk" },
    check:   { en: "I have read and agree to the", id: "Saya telah membaca dan menyetujui" },
    terms:   { en: "Terms & Conditions",   id: "Syarat & Ketentuan" },
    back:    { en: "← Back",              id: "← Kembali" },
    accept:  { en: "Accept & Continue",   id: "Setuju & Lanjutkan" },
  };

  const participantLabel = participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang];
  const competitionLabel = competition === "offline" ? LABELS.offline[lang] : LABELS.online[lang];

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] mb-2 font-semibold" style={{ color: "hsl(38 95% 55%)" }}>
          {LABELS.step[lang]}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">{LABELS.title[lang]}</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {participantLabel} · {competitionLabel} {LABELS.participants[lang]}
        </p>
      </div>

      <div className="cultural-shell rounded-[1.5rem] overflow-hidden">
        <div className="h-80 overflow-y-auto p-6 text-sm text-muted-foreground leading-7 border-b border-border">
          <p className="font-semibold text-foreground mb-4">
            {LABELS.intro[lang]} {competitionLabel} {LABELS.participants[lang]}:
          </p>
          <ul className="space-y-3">
            {terms.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 shrink-0" style={{ color: "hsl(38 95% 55%)" }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-border">
          <input type="checkbox" id="icc-agree" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 cursor-pointer" style={{ accentColor: "hsl(38 95% 55%)" }} />
          <label htmlFor="icc-agree" className="text-sm text-muted-foreground cursor-pointer">
            {LABELS.check[lang]}{" "}
            <span className="font-semibold underline cursor-pointer" style={{ color: "hsl(38 95% 55%)" }}
              onClick={() => window.open("/terms", "_blank")}>
              {LABELS.terms[lang]}
            </span>.
          </label>
        </div>

        <div className="px-4 py-5 flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onBack}>
            {LABELS.back[lang]}
          </Button>
          <Button
            size="lg" className="w-full sm:w-auto font-bold text-white"
            style={{ background: agreed ? "linear-gradient(135deg, hsl(38 95% 55%), hsl(350 75% 55%))" : undefined }}
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

export default IccTermsBox;