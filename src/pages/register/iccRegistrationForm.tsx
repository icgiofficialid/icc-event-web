// ================================================================
// IccRegistrationForm.tsx — YICC Registration Form (English only)
// ================================================================

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field, TextInput, TextArea, SelectInput, SectionTitle, SuccessOverlay,
  type FormData, type ParticipantType, type CompetitionType,
  REQUIRED_FIELDS, COMPETITION_CATEGORIES, PARTICIPANT_DIVISIONS,
  submitToIccSheet,
} from "./iccRegisterConfig";

interface Props {
  participant: ParticipantType;
  competition: CompetitionType;
  sheetUrl: string;
  sheetTarget: string;
  onBack: () => void;
  onSuccess: () => void;
}

const IccRegistrationForm = ({
  participant, competition, sheetUrl, sheetTarget, onBack, onSuccess,
}: Props) => {
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
      await submitToIccSheet(sheetUrl, participant, competition, form, sheetTarget);
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
      <div
        className="w-14 h-14 border-4 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: "hsl(38 95% 55% / 0.3)", borderTopColor: "hsl(38 95% 55%)" }}
      />
    </div>
  );

  const pLabel = participant === "international" ? "International" : "Indonesian";
  const cLabel = competition === "online" ? "Online" : "Offline";

  return (
    <div className="w-full max-w-3xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] mb-2 font-semibold" style={{ color: "hsl(38 95% 55%)" }}>
          Step 4 of 4
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">Registration Form</h2>
        <p className="text-muted-foreground mt-1 text-sm">{pLabel} · {cLabel}</p>
      </div>

      <div className="cultural-shell rounded-2xl p-6 md:p-8 space-y-8">

        {/* Info banner */}
        <div
          className="rounded-xl p-4 text-sm text-muted-foreground leading-6"
          style={{ background: "hsl(38 95% 55% / 0.06)", border: "1px solid hsl(38 95% 55% / 0.2)" }}
        >
          <p className="font-semibold text-foreground mb-1">YICC 2026 — {pLabel} Participant</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Fill in data correctly. Submitted data is final.</li>
            <li>All technical files (music, etc.) must be submitted H-14 before event.</li>
            <li>LoA will be sent to the leader's email within 3 working days.</li>
          </ol>
        </div>

        {/* ── 1. PERFORMER / TEAM DATA ── */}
        <div>
          <SectionTitle title="Performer / Team Data" />
          <div className="grid gap-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Participant Category">
                <Input value={pLabel} disabled className="rounded-lg bg-muted/20 text-sm" />
              </Field>
              <Field label="Competition Format">
                <Input value={cLabel} disabled className="rounded-lg bg-muted/20 text-sm" />
              </Field>
            </div>

            <Field
              label="Team Leader / Performer Name" required
              note="For group: Leader Name / Member1 / Member2 etc."
            >
              <TextArea
                placeholder="Input performer name(s)"
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={300}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Leader WhatsApp Number" required
                note="With country code. Ex: +62 817 xxxx"
              >
                <TextInput
                  placeholder="+62 ..."
                  value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel"
                />
              </Field>
              <Field
                label="Leader Email Address" required
                note="LoA will be sent to this email."
              >
                <TextInput
                  placeholder="email@example.com"
                  value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Participant Division" required>
                <SelectInput
                  placeholder="-- Choose Division --"
                  value={f("DIVISION")} onChange={set("DIVISION")}
                  options={PARTICIPANT_DIVISIONS}
                />
              </Field>
              <Field label="Number of Members" note="Solo: 1 | Group: 5–10">
                <TextInput
                  placeholder="e.g. 1 / 6"
                  value={f("MEMBER_COUNT")} onChange={set("MEMBER_COUNT")}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* ── 2. SCHOOL / INSTITUTION DATA ── */}
        <div>
          <SectionTitle title="School / Institution Data" />
          <div className="grid gap-4">
            <Field label="Name of School / Institution / Studio" required>
              <TextArea
                placeholder="e.g. SMA N 1 Yogyakarta / Sanggar Tari Nusantara"
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={300}
              />
            </Field>
            <Field label="Province / State / Country">
              <TextInput
                placeholder="e.g. Jawa Tengah / Kuala Lumpur, Malaysia"
                value={f("PROVINCE")} onChange={set("PROVINCE")}
              />
            </Field>
          </div>
        </div>

        {/* ── 3. SUPERVISOR / COACH DATA ── */}
        <div>
          <SectionTitle title="Supervisor / Coach Data" />
          <div className="grid gap-4">
            <Field label="Name of Supervisor / Coach" required>
              <TextArea
                placeholder="Input supervisor name"
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Supervisor WhatsApp" required note="With country code.">
                <TextInput
                  placeholder="+62 ..."
                  value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel"
                />
              </Field>
              <Field label="Supervisor Email" required>
                <TextInput
                  placeholder="supervisor@example.com"
                  value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email"
                />
              </Field>
            </div>
          </div>
        </div>

        {/* ── 4. PERFORMANCE DATA ── */}
        <div>
          <SectionTitle title="Performance Data" />
          <div className="grid gap-4">
            <Field label="Competition Category" required>
              <SelectInput
                placeholder="-- Choose Category --"
                value={f("COMPETITION_CATEGORY")} onChange={set("COMPETITION_CATEGORY")}
                options={COMPETITION_CATEGORIES}
              />
            </Field>

            <Field
              label="Performance Title" required
              note="Title of your dance / performance / song. Cannot be changed after submission."
            >
              <TextArea
                placeholder="Input performance title"
                value={f("PERFORMANCE_TITLE")} onChange={set("PERFORMANCE_TITLE")} maxLength={160}
              />
            </Field>

            <Field
              label="Cultural Origin / Region / Country" required
              note="e.g. Betawi, DKI Jakarta / Javanese, Central Java / Traditional Korean"
            >
              <TextInput
                placeholder="e.g. Betawi, DKI Jakarta"
                value={f("CULTURAL_ORIGIN")} onChange={set("CULTURAL_ORIGIN")}
              />
            </Field>

            <Field label="Short Performance Description">
              <TextArea
                placeholder="Briefly describe your performance..."
                value={f("PERFORMANCE_DESC")} onChange={set("PERFORMANCE_DESC")} maxLength={300}
              />
            </Field>

            <Field
              label="Music File Link"
              note="Google Drive / WeTransfer link. Format: MP3 / WAV."
            >
              <TextInput
                placeholder="https://drive.google.com/..."
                value={f("MUSIC_FILE_LINK")} onChange={set("MUSIC_FILE_LINK")}
              />
            </Field>

            <Field
              label="Property Declaration"
              note="List all stage properties (if any). Fire, smoke, sharp objects, liquids are PROHIBITED."
            >
              <TextArea
                placeholder="e.g. Fans, silk scarves (No fire/smoke/liquids) — or write 'None'"
                value={f("PROPERTY_DECLARATION")} onChange={set("PROPERTY_DECLARATION")}
              />
            </Field>
          </div>
        </div>

        {/* ── 5. GENERAL INFORMATION ── */}
        <div>
          <SectionTitle title="General Information" />
          <div className="grid gap-4">
            <Field label="Full Address" required note="Street, City, Province, Country">
              <TextArea
                placeholder="Input your full address..."
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")}
              />
            </Field>
            <Field label="How did you find out about YICC?">
              <SelectInput
                placeholder="-- Select Source --"
                value={f("INFORMATION_RESOURCES")} onChange={set("INFORMATION_RESOURCES")}
                options={["Instagram", "WhatsApp", "Friend / Teacher", "Website", "YouTube", "Other"]}
              />
            </Field>
          </div>
        </div>

        {/* ── 6. PAYMENT PROOF ── */}
        <div>
          <SectionTitle title="Payment Proof" />
          <Field
            label="Payment / Free Registration Evidence"
            note="Upload to Google Drive and paste the link here. If free registration, attach the evidence."
          >
            <TextInput
              placeholder="https://drive.google.com/..."
              value={f("FILE")} onChange={set("FILE")}
            />
          </Field>
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <div className="pt-2">
          <Button
            className="w-full text-base py-4 font-bold tracking-widest uppercase text-white"
            style={{ background: isFormValid && !loading ? "hsl(var(--foreground))" : undefined }}
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
          {!isFormValid && (
            <p className="text-xs text-center text-muted-foreground mt-2">
              Please fill in all required fields (*)
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={onBack}>← Back</Button>
      </div>

      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay />}
    </div>
  );
};

export default IccRegistrationForm;