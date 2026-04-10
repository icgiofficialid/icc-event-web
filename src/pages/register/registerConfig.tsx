// ================================================================
// registerConfig.ts
// ================================================================

import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export const WHATSAPP_ADMIN = "628139905880";

export type ParticipantType = "international" | "indonesian";
export type CompetitionType = "online" | "offline";
export type FormData = Record<string, string>;

export const REQUIRED_FIELDS = [
  "NAMA_LENGKAP",
  "LEADER_WHATSAPP",
  "LEADER_EMAIL",
  "NAMA_SEKOLAH",
  "GRADE",
  "NAME_SUPERVISOR",
  "WHATSAPP_NUMBER_SUPERVISOR",
  "EMAIL_TEACHER_SUPERVISOR",
  "PROJECT_TITLE",
  "CATEGORIES",
  "COMPLETE_ADDRESS",
  "FILE",
];

export const submitToSheet = async (
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
    NAMA_SEKOLAH:               f("NAMA_SEKOLAH"),
    NPSN:                       f("NPSN"),
    NAMA_LENGKAP:               f("NAMA_LENGKAP"),
    NISN_NIM:                   f("NISN_NIM"),
    PROVINCE:                   f("PROVINCE"),
    GRADE:                      f("GRADE"),
    LEADER_EMAIL:               f("LEADER_EMAIL"),
    LEADER_WHATSAPP:            f("LEADER_WHATSAPP"),
    NAME_SUPERVISOR:            f("NAME_SUPERVISOR"),
    WHATSAPP_NUMBER_SUPERVISOR: f("WHATSAPP_NUMBER_SUPERVISOR"),
    EMAIL_TEACHER_SUPERVISOR:   f("EMAIL_TEACHER_SUPERVISOR"),
    COMPLETE_ADDRESS:           f("COMPLETE_ADDRESS"),
    INFORMATION_RESOURCES:      f("INFORMATION_RESOURCES"),
    FILE:                       f("FILE"),
    YES_NO:                     f("YES_NO"),
    JUDUL_PERNAH_BERPATISIPASI: f("JUDUL_PERNAH_BERPATISIPASI"),
    CATEGORY_PRICE:             "",
    CATEGORIES:                 f("CATEGORIES"),
    PROJECT_TITLE:              f("PROJECT_TITLE"),
  };

  const queryString = new URLSearchParams(payload).toString();
  const fullUrl = `${sheetUrl}?${queryString}`;

  // DEBUG — lihat URL lengkap di console
  console.log("=== SUBMIT DEBUG ===");
  console.log("sheetTarget:", sheetTarget);
  console.log("sheetUrl:", sheetUrl);
  console.log("Full URL:", fullUrl);

  // Coba semua metode sekaligus
  // Metode 1: fetch
  try {
    await fetch(fullUrl, { method: "GET", mode: "no-cors" });
    console.log("fetch: terkirim");
  } catch (e) {
    console.error("fetch gagal:", e);
  }

  // Metode 2: Image
  // try {
  //   await new Promise<void>((resolve) => {
  //     const img = new Image();
  //     img.onload = () => { console.log("img: onload"); resolve(); };
  //     img.onerror = () => { console.log("img: onerror (request tetap terkirim)"); resolve(); };
  //     img.src = fullUrl;
  //     setTimeout(resolve, 5000);
  //   });
  // } catch (e) {
  //   console.error("img gagal:", e);
  // }

  // Metode 3: Script tag
  // try {
  //   await new Promise<void>((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = fullUrl;
  //     script.onload = () => { console.log("script tag: onload"); resolve(); };
  //     script.onerror = () => { console.log("script tag: onerror"); resolve(); };
  //     document.head.appendChild(script);
  //     setTimeout(resolve, 5000);
  //   });
  // } catch (e) {
  //   console.error("script tag gagal:", e);
  // }

  console.log("=== SELESAI — cek sheet sekarang ===");

  // WA REDIRECT DINONAKTIFKAN SEMENTARA
  // setTimeout(() => {
  //   window.location.href = `https://wa.me/${WHATSAPP_ADMIN}?text=${msg}`;
  // }, 1500);
};
// ================================================================
// Komponen UI Reusable
// ================================================================

export const Field = ({
  label, note, required, children,
}: {
  label: string; note?: string; required?: boolean; children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-foreground">
      {label} {required && <span className="text-red-400">*</span>}
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
    className="rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary"
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
      className="w-full rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none min-h-[100px]"
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
      className="w-full appearance-none rounded-lg border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none text-foreground"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
  </div>
);

export const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-primary pb-2 mb-5">
    <h3 className="text-lg font-bold text-primary uppercase tracking-wide">{title}</h3>
  </div>
);

export const SuccessOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center gap-4 text-center shadow-xl">
      
      {/* Icon centang */}
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-foreground">Registration Submitted!</h2>
    </div>
  </div>
);