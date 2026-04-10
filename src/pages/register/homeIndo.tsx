import { Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CompetitionType } from "./registerConfig";
import { useLang } from "@/components/LanguageProvider";

interface Props {
  competition: CompetitionType | null;
  setCompetition: (v: CompetitionType) => void;
  onBack: () => void;
  onNext: () => void;
}

const LABELS = {
  step:  { en: "Step 2 of 4",                          id: "Langkah 2 dari 4" },
  title: { en: "Choose Competition Category",           id: "Pilih Format Kompetisi" },
  sub:   { en: "Indonesian Citizen — select format",    id: "Warga Indonesia — pilih format kompetisi" },
  back:  { en: "← Back",                               id: "← Kembali" },
  next:  { en: "Continue →",                           id: "Lanjutkan →" },
};

const COMPETITION_OPTIONS = [
  {
    value: "online" as CompetitionType,
    label: { en: "Online Competition",              id: "Kompetisi Online" },
    desc:  { en: "Participate remotely from anywhere", id: "Ikuti kompetisi dari mana saja" },
    icon: Monitor,
  },
  {
    value: "offline" as CompetitionType,
    label: { en: "Offline Competition",             id: "Kompetisi Offline" },
    desc:  { en: "Join us in-person at the venue",  id: "Hadir langsung di lokasi acara" },
    icon: Users,
  },
];

const HomeIndo = ({ competition, setCompetition, onBack, onNext }: Props) => {
  const { lang } = useLang();
  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">{LABELS.step[lang]}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{LABELS.title[lang]}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{LABELS.sub[lang]}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMPETITION_OPTIONS.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setCompetition(value)}
            className={`tech-shell rounded-[1.5rem] p-6 text-left flex flex-col gap-4 border-2 transition-all ${
              competition === value ? "border-primary bg-primary/10" : "border-transparent hover:border-primary/40"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              competition === value ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">{label[lang]}</h3>
              <p className="text-muted-foreground text-sm mt-1">{desc[lang]}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="hero-outline" size="lg" onClick={onBack}>{LABELS.back[lang]}</Button>
        <Button variant="hero" size="lg" disabled={!competition} onClick={onNext}>{LABELS.next[lang]}</Button>
      </div>
    </div>
  );
};

export default HomeIndo;