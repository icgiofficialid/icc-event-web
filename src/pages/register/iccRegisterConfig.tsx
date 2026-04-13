// ================================================================
// iccRegisterConfig.tsx — ICC Registration Config
// ================================================================

import { type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export const ICC_WHATSAPP_ADMIN = "628139905880";

export type ParticipantType = "international" | "indonesian";
export type CompetitionType = "online" | "offline";
export type FormData = Record<string, string>;

// Competition categories from YICC guidebook
export const COMPETITION_CATEGORIES = [
  "Traditional / Cultural-Based Dance Solo",
  "Traditional / Cultural-Based Dance Group",
  "Ethnic / Cultural Creative Costume Show",
  "Traditional Song Solo",
];

export const PARTICIPANT_DIVISIONS = ["Elementary", "Junior High", "Senior High", "Open Division (University/Community/Studio)"];

export const REQUIRED_FIELDS = [
  "NAMA_LENGKAP",
  "LEADER_WHATSAPP",
  "LEADER_EMAIL",
  "NAMA_SEKOLAH",
  "DIVISION",
  "NAME_SUPERVISOR",
  "WHATSAPP_NUMBER_SUPERVISOR",
  "EMAIL_TEACHER_SUPERVISOR",
  "COMPETITION_CATEGORY",
  "CULTURAL_ORIGIN",
  "PERFORMANCE_TITLE",
  "COMPLETE_ADDRESS",
];

export const submitToIccSheet = async (
  sheetUrl: string,
  participant: ParticipantType,
  competition: CompetitionType,
  form: FormData,
  sheetTarget: string
) => {
  const f = (key: string) => form[key] || "";

  const payload: Record<string, string> = {
    sheetTarget,
    timestamp:                  new Date().toISOString(),
    CATEGORY_PARTICIPANT:       participant,
    CATEGORY_COMPETITION:       competition,
    NAMA_LENGKAP:               f("NAMA_LENGKAP"),
    LEADER_WHATSAPP:            f("LEADER_WHATSAPP"),
    LEADER_EMAIL:               f("LEADER_EMAIL"),
    NAMA_SEKOLAH:               f("NAMA_SEKOLAH"),
    DIVISION:                   f("DIVISION"),
    PROVINCE:                   f("PROVINCE"),
    NAME_SUPERVISOR:            f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR: f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_TEACHER_SUPERVISOR:   f("EMAIL_TEACHER_SUPERVISOR"),
    COMPETITION_CATEGORY:       f("COMPETITION_CATEGORY"),
    CULTURAL_ORIGIN:            f("CULTURAL_ORIGIN"),
    PERFORMANCE_TITLE:          f("PERFORMANCE_TITLE"),
    MEMBER_COUNT:               f("MEMBER_COUNT"),
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    MUSIC_FILE_LINK:            f("MUSIC_FILE_LINK"),
    PROPERTY_DECLARATION:       f("PROPERTY_DECLARATION"),
    FILE:                       f("FILE"),
  };

  const queryString = new URLSearchParams(payload).toString();
  const fullUrl = `${sheetUrl}?${queryString}`;

  console.log("=== ICC SUBMIT DEBUG ===");
  console.log("sheetTarget:", sheetTarget);
  console.log("Full URL:", fullUrl);

  try {
    await fetch(fullUrl, { method: "GET", mode: "no-cors" });
    console.log("fetch: terkirim");
  } catch (e) {
    console.error("fetch gagal:", e);
  }

  console.log("=== SELESAI ===");
};

// ── Reusable UI Components ──────────────────────────────────────

export const Field = ({
  label, note, required, children,
}: {
  label: string; note?: string; required?: boolean; children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label} {required && <span className="text-rose-400">*</span>}
    </label>
    {note && <p className="text-xs text-muted-foreground leading-5">{note}</p>}
    {children}
  </div>
);

export const TextInput = ({
  placeholder, value, onChange, type = "text",
}: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <Input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm"
  />
);

export const TextArea = ({
  placeholder, value, onChange, maxLength,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; maxLength?: number;
}) => (
  <div className="relative">
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={maxLength}
      className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:outline-none resize-none min-h-[100px]"
    />
    {maxLength && (
      <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
        {value.length}/{maxLength}
      </span>
    )}
  </div>
);

export const SelectInput = ({
  placeholder, value, onChange, options,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:outline-none text-foreground"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

export const SectionTitle = ({ title }: { title: string }) => (
  <div className="pb-2 mb-5" style={{ borderBottom: "1px solid hsl(38 95% 55% / 0.3)" }}>
    <h3 className="text-base font-bold uppercase tracking-wide" style={{ color: "hsl(38 95% 55%)" }}>{title}</h3>
  </div>
);

export const SuccessOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4 text-center shadow-xl">
      <Check className="text-green-500" />
      <h2 className="text-xl font-bold text-foreground font-display">Registration Submitted!</h2>
      <p className="text-sm text-muted-foreground">LoA will be sent to your email within 3 working days.</p>
    </div>
  </div>
);