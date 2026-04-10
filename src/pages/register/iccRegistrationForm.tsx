// ================================================================
// RegistrationForm.tsx — Step 4: Form pendaftaran
// ================================================================
// Menerima sheetUrl dari Register.tsx (yang didapat dari file
// IndoOnline / IndoOffline / InterOnline / InterOffline).

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/components/LanguageProvider";

import {
  Field, TextInput, TextArea, SelectInput, SectionTitle, SuccessOverlay,
  type FormData, type ParticipantType, type CompetitionType,
  REQUIRED_FIELDS, submitToSheet,
} from "./registerConfig";

interface Props {
  participant: ParticipantType;
  competition: CompetitionType;
  sheetUrl: string;  
  sheetTarget: string; 
  onBack: () => void;
  onSuccess: () => void
}

const LABELS = {
  step:    { en: "Step 4 of 4",          id: "Langkah 4 dari 4" },
  title:   { en: "Registration Form",    id: "Formulir Pendaftaran" },
  hello:   { en: "HELLO IESF",           id: "HALO IESF" },
  info1:   { en: "Please fill in the required data correctly. Data submitted is final and cannot be changed.", id: "Isi data yang diperlukan dengan benar. Data yang dikirim bersifat final." },
  info2:   { en: "After verifying your data, click the SUBMIT FORM button.", id: "Setelah memverifikasi data, klik tombol KIRIM FORMULIR." },
  info3:   { en: "The Letter of Acceptance (LoA) will be sent to the team leader's email within 3 working days.", id: "Surat Penerimaan (LoA) akan dikirim ke email ketua tim dalam 3 hari kerja." },
  back:    { en: "← Back to Terms",      id: "← Kembali ke Syarat" },
  submit:  { en: "Submit Form",          id: "Kirim Formulir" },
  submitting: { en: "Submitting...",     id: "Mengirim..." },
  error:   { en: "Failed to submit. Please try again.", id: "Gagal mengirim. Silakan coba lagi." },
  intl:    { en: "International",        id: "Internasional" },
  indo:    { en: "Indonesian",           id: "Indonesia" },
  online:  { en: "Online",               id: "Online" },
  offline: { en: "Offline",              id: "Offline" },
};

const RegistrationForm = ({ participant, competition, sheetUrl, sheetTarget, onBack, onSuccess }: Props) => {
  const [form, setForm]           = useState<FormData>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  const set = (key: string) => (v: string) => setForm(prev => ({ ...prev, [key]: v }));
  const f   = (key: string) => form[key] || "";

  const isFormValid = REQUIRED_FIELDS.every(k => !!f(k));

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setError("");
    try {
      await submitToSheet(sheetUrl, participant, competition, form, sheetTarget);
      setSubmitted(true);
      setTimeout(() => onSuccess(), 3000);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const SpinnerOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
  );
  const { lang } = useLang();

  return (
    <div className="w-full max-w-3xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary mb-2">{LABELS.step[lang]}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Registration Form</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang]} ·{" "}
          {competition === "online" ? LABELS.online[lang] : LABELS.offline[lang]}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8">

        {/* Info banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground leading-6">
          <p className="font-semibold text-foreground mb-1">
            {participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang]} PARTICIPANT
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>{LABELS.info1[lang]}</li>
            <li>{LABELS.info2[lang]}</li>
            <li>{LABELS.info3[lang]}</li>
          </ol>
        </div>

        {/* ── BIODATA ─────────────────────────────────────────── */}
        <div>
          <SectionTitle title="Biodata" />
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Categories Participants">
                <Input
                  value={participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang]}
                  disabled
                  
                />
              </Field>
              <Field label="Competition Category">
                <Input
                  value={competition === "online" ? LABELS.online[lang] : LABELS.offline[lang]}
                  disabled
                 
                />
              </Field>
            </div>

            <Field label="Name of Leader & Member Team" required
              note="Format: Leader Name / Member1 / Member2 (max 5 members + 1 team leader)">
              <TextArea placeholder="Input Name of Leader & Member team"
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={150} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Leader WhatsApp Number" required note="With country code. Ex: +62 817 7091 xxxx">
                <TextInput placeholder="Input Leader WhatsApp Number"
                  value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
              </Field>
              <Field label="Leader Email Address" required note="LoA will be sent to this email.">
                <TextInput placeholder="Input Your Leader Email Address"
                  value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
              </Field>
            </div>

            <Field label="NIM / NISN of Leader & Team Member"
              note="Format: 201700 (Leader) / 187500 (Member1) / 207500 (Member2)">
              <TextArea placeholder="Input NIM / NISN of Leader & Team Member"
                value={f("NISN_NIM")} onChange={set("NISN_NIM")} />
            </Field>
          </div>
        </div>

        {/* ── SCHOOL DATA ──────────────────────────────────────── */}
        <div>
          <SectionTitle title="School Data" />
          <div className="grid gap-4">
            <Field label="Name of School/University" required
              note="Format: SMA/SMK (Leader School) / SMA/SMK (Member1 School)">
              <TextArea placeholder="Input School Name of Leader & Member Team"
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={500} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Grade / Year" required>
                <SelectInput placeholder="-- Choose Grade --" value={f("GRADE")} onChange={set("GRADE")}
                  options={["Elementary", "Secondary", "University"]} />
              </Field>
              <Field label="NPSN / Institution Code" note="Format: 20503101 (Leader) / 20503102 (Member1)">
                <TextInput placeholder="Input NPSN / Institution Code"
                  value={f("NPSN")} onChange={set("NPSN")} />
              </Field>
            </div>

            <Field label="Province / State">
              <TextInput placeholder="e.g. Jawa Timur, Kuala Lumpur"
                value={f("PROVINCE")} onChange={set("PROVINCE")} />
            </Field>
          </div>
        </div>

        {/* ── SUPERVISOR DATA ───────────────────────────────────── */}
        <div>
          <SectionTitle title="Supervisor Data" />
          <div className="grid gap-4">
            <Field label="Name of Teacher/Supervisor" required>
              <TextArea placeholder="Input Name of Teacher/Supervisor"
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Supervisor WhatsApp Number" required note="With country code. Ex: +62 817 7091 xxxx">
                <TextInput placeholder="Input Supervisor WhatsApp Number"
                  value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel" />
              </Field>
              <Field label="Supervisor Email Address" required>
                <TextInput placeholder="Input Supervisor Email Address"
                  value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email" />
              </Field>
            </div>
          </div>
        </div>

        {/* ── DETAIL PROJECT ────────────────────────────────────── */}
        <div>
          <SectionTitle title="Detail Project" />
          <div className="grid gap-4">
            <Field label="Project Title" required
              note="Please fill in the title CORRECTLY. The data entered cannot be changed!">
              <TextArea placeholder="Input Your Project Title"
                value={f("PROJECT_TITLE")} onChange={set("PROJECT_TITLE")} maxLength={160} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Categories" required>
                <SelectInput placeholder="-- Choose Categories --" value={f("CATEGORIES")} onChange={set("CATEGORIES")}
                  options={["Science Project", "Scientific Paper", "Invention", "Innovation"]} />
              </Field>
              <Field label="Has this project participated in other competitions before?">
                <SelectInput placeholder="-- Choose --" value={f("YES_NO")} onChange={set("YES_NO")}
                  options={["Yes", "No"]} />
              </Field>
            </div>

            {f("YES_NO") === "Yes" && (
              <Field label="Name of Previous Competition">
                <TextArea placeholder="Input Competition Name"
                  value={f("JUDUL_PERNAH_BERPATISIPASI")} onChange={set("JUDUL_PERNAH_BERPATISIPASI")} />
              </Field>
            )}
          </div>
        </div>

        {/* ── GENERAL INFORMATION ───────────────────────────────── */}
        <div>
          <SectionTitle title="General Information" />
          <div className="grid gap-4">
            <Field label="Full Address" required
              note="Street Name, House Number, RT/RW, District, Regency, City, Province, Postal Code">
              <TextArea placeholder="Input your Full Address"
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")} />
            </Field>
            <Field label="How did you find out about IESF?">
              <SelectInput placeholder="-- Select Source --" value={f("INFORMATION_RESOURCES")} onChange={set("INFORMATION_RESOURCES")}
                options={["Instagram", "WhatsApp", "Friend/Teacher", "Website", "YouTube", "Other"]} />
            </Field>
          </div>
        </div>

        {/* ── PAYMENT PROOF ─────────────────────────────────────── */}
        <div>

          <Field label="If you received free registration, please attach evidence.">
            <TextInput placeholder="https://drive.google.com/..."
              value={f("FILE")} onChange={set("FILE")} />
          </Field>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="pt-2">
          <Button
            variant="hero" size="lg"
            className="w-full text-base py-4 font-bold tracking-widest uppercase"
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit Form"}
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <Button variant="hero-outline" size="sm" onClick={onBack}>← Back to Terms</Button>
      </div>
      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay />}
    </div>
  );
};

export default RegistrationForm;