// ================================================================
// IccRegistrationForm.tsx — YICC Registration Form
// ================================================================
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/components/LanguageProvider";

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

const IccRegistrationForm = ({ participant, competition, sheetUrl, sheetTarget, onBack, onSuccess }: Props) => {
  const [form, setForm]           = useState<FormData>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const { lang } = useLang();

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
      <div className="w-14 h-14 border-4 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: "hsl(38 95% 55% / 0.3)", borderTopColor: "hsl(38 95% 55%)" }} />
    </div>
  );

  const LABELS = {
    step:    { en: "Step 4 of 4", id: "Langkah 4 dari 4" },
    intl:    { en: "International", id: "Internasional" },
    indo:    { en: "Indonesian",    id: "Indonesia" },
    online:  { en: "Online",        id: "Online" },
    offline: { en: "Offline",       id: "Offline" },
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.3em] mb-2 font-semibold" style={{ color: "hsl(38 95% 55%)" }}>
          {LABELS.step[lang]}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-display">Registration Form</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang]} ·{" "}
          {competition === "online" ? LABELS.online[lang] : LABELS.offline[lang]}
        </p>
      </div>

      <div className="cultural-shell rounded-2xl p-6 md:p-8 space-y-8">

        {/* Info banner */}
        <div className="rounded-xl p-4 text-sm text-muted-foreground leading-6"
          style={{ background: "hsl(38 95% 55% / 0.06)", border: "1px solid hsl(38 95% 55% / 0.2)" }}>
          <p className="font-semibold text-foreground mb-1">YICC 2026 —  {participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang]} Participant</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>{lang === "en" ? "Fill in data correctly. Submitted data is final." : "Isi data dengan benar. Data yang dikirim bersifat final."}</li>
            <li>{lang === "en" ? "All technical files (music, etc.) must be submitted H-14 before event." : "Semua file teknis (musik, dll.) harus dikirim H-14 sebelum acara."}</li>
            <li>{lang === "en" ? "LoA will be sent to the leader's email within 3 working days." : "LoA akan dikirim ke email ketua dalam 3 hari kerja."}</li>
          </ol>
        </div>

        {/* ── BIODATA ── */}
        <div>
          <SectionTitle title={lang === "en" ? "Performer / Team Data" : "Data Penampil / Tim"} />
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={lang === "en" ? "Participant Category" : "Kategori Peserta"}>
                <Input value={participant === "international" ? LABELS.intl[lang] : LABELS.indo[lang]} disabled />
              </Field>
              <Field label={lang === "en" ? "Competition Format" : "Format Kompetisi"}>
                <Input value={competition === "online" ? LABELS.online[lang] : LABELS.offline[lang]} disabled />
              </Field>
            </div>

            <Field label={lang === "en" ? "Team Leader / Performer Name" : "Nama Ketua Tim / Penampil"} required
              note={lang === "en" ? "For group: Leader Name / Member1 / Member2 etc." : "Untuk grup: Nama Ketua / Anggota1 / Anggota2 dst."}>
              <TextArea placeholder={lang === "en" ? "Input performer name(s)" : "Masukkan nama penampil"}
                value={f("NAMA_LENGKAP")} onChange={set("NAMA_LENGKAP")} maxLength={200} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={lang === "en" ? "Leader WhatsApp Number" : "No. WhatsApp Ketua"} required
                note={lang === "en" ? "With country code. Ex: +62 817 7091 xxxx" : "Sertakan kode negara. Cth: +62 817 7091 xxxx"}>
                <TextInput placeholder="+62 ..."
                  value={f("LEADER_WHATSAPP")} onChange={set("LEADER_WHATSAPP")} type="tel" />
              </Field>
              <Field label={lang === "en" ? "Leader Email Address" : "Email Ketua"} required
                note={lang === "en" ? "LoA will be sent to this email." : "LoA akan dikirim ke email ini."}>
                <TextInput placeholder="email@example.com"
                  value={f("LEADER_EMAIL")} onChange={set("LEADER_EMAIL")} type="email" />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={lang === "en" ? "Participant Division" : "Divisi Peserta"} required>
                <SelectInput placeholder={lang === "en" ? "-- Choose Division --" : "-- Pilih Divisi --"}
                  value={f("DIVISION")} onChange={set("DIVISION")} options={PARTICIPANT_DIVISIONS} />
              </Field>
              <Field label={lang === "en" ? "Number of Members" : "Jumlah Anggota"}
                note={lang === "en" ? "Solo: 1, Group: 5–10" : "Solo: 1, Grup: 5–10"}>
                <TextInput placeholder="e.g. 1 / 6"
                  value={f("MEMBER_COUNT")} onChange={set("MEMBER_COUNT")} />
              </Field>
            </div>
          </div>
        </div>

        {/* ── SCHOOL / INSTITUTION DATA ── */}
        <div>
          <SectionTitle title={lang === "en" ? "School / Institution Data" : "Data Sekolah / Institusi"} />
          <div className="grid gap-4">
            <Field label={lang === "en" ? "Name of School / Institution / Studio" : "Nama Sekolah / Institusi / Sanggar"} required>
              <TextArea placeholder={lang === "en" ? "e.g. SMA N 1 Yogyakarta / Sanggar Tari Nusantara" : "Cth. SMA N 1 Yogyakarta / Sanggar Tari Nusantara"}
                value={f("NAMA_SEKOLAH")} onChange={set("NAMA_SEKOLAH")} maxLength={300} />
            </Field>
            <Field label={lang === "en" ? "Province / State / Country" : "Provinsi / Negara"}>
              <TextInput placeholder={lang === "en" ? "e.g. Jawa Tengah / Kuala Lumpur, Malaysia" : "Cth. Jawa Tengah / Kuala Lumpur, Malaysia"}
                value={f("PROVINCE")} onChange={set("PROVINCE")} />
            </Field>
          </div>
        </div>

        {/* ── SUPERVISOR DATA ── */}
        <div>
          <SectionTitle title={lang === "en" ? "Supervisor / Coach Data" : "Data Pembimbing / Pelatih"} />
          <div className="grid gap-4">
            <Field label={lang === "en" ? "Name of Supervisor / Coach" : "Nama Pembimbing / Pelatih"} required>
              <TextArea placeholder={lang === "en" ? "Input supervisor name" : "Masukkan nama pembimbing"}
                value={f("NAME_SUPERVISOR")} onChange={set("NAME_SUPERVISOR")} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={lang === "en" ? "Supervisor WhatsApp" : "WhatsApp Pembimbing"} required
                note={lang === "en" ? "With country code." : "Sertakan kode negara."}>
                <TextInput placeholder="+62 ..."
                  value={f("WHATSAPP_NUMBER_SUPERVISOR")} onChange={set("WHATSAPP_NUMBER_SUPERVISOR")} type="tel" />
              </Field>
              <Field label={lang === "en" ? "Supervisor Email" : "Email Pembimbing"} required>
                <TextInput placeholder="supervisor@example.com"
                  value={f("EMAIL_TEACHER_SUPERVISOR")} onChange={set("EMAIL_TEACHER_SUPERVISOR")} type="email" />
              </Field>
            </div>
          </div>
        </div>

        {/* ── PERFORMANCE DATA ── */}
        <div>
          <SectionTitle title={lang === "en" ? "Performance Data" : "Data Penampilan"} />
          <div className="grid gap-4">
            <Field label={lang === "en" ? "Competition Category" : "Kategori Kompetisi"} required>
              <SelectInput placeholder={lang === "en" ? "-- Choose Category --" : "-- Pilih Kategori --"}
                value={f("COMPETITION_CATEGORY")} onChange={set("COMPETITION_CATEGORY")}
                options={COMPETITION_CATEGORIES} />
            </Field>

            <Field label={lang === "en" ? "Performance Title" : "Judul Penampilan"} required
              note={lang === "en" ? "Title of your dance / performance / song. Cannot be changed after submission." : "Judul tari / penampilan / lagu Anda. Tidak dapat diubah setelah pengiriman."}>
              <TextArea placeholder={lang === "en" ? "Input performance title" : "Masukkan judul penampilan"}
                value={f("PERFORMANCE_TITLE")} onChange={set("PERFORMANCE_TITLE")} maxLength={160} />
            </Field>

            <Field label={lang === "en" ? "Cultural Origin / Region / Country" : "Asal Budaya / Daerah / Negara"} required
              note={lang === "en" ? "e.g. Betawi, DKI Jakarta / Javanese, Central Java / Traditional Korean" : "Cth. Betawi, DKI Jakarta / Jawa, Jawa Tengah / Korea Tradisional"}>
              <TextInput placeholder={lang === "en" ? "e.g. Betawi, DKI Jakarta" : "Cth. Betawi, DKI Jakarta"}
                value={f("CULTURAL_ORIGIN")} onChange={set("CULTURAL_ORIGIN")} />
            </Field>

            <Field label={lang === "en" ? "Short Performance Description" : "Deskripsi Singkat Penampilan"}>
              <TextArea placeholder={lang === "en" ? "Briefly describe your performance..." : "Deskripsikan penampilan Anda secara singkat..."}
                value={f("PERFORMANCE_DESC")} onChange={set("PERFORMANCE_DESC")} maxLength={300} />
            </Field>

            <Field label={lang === "en" ? "Music File Link" : "Link File Musik"}
              note={lang === "en" ? "Google Drive / WeTransfer link. Format: MP3 / WAV." : "Link Google Drive / WeTransfer. Format: MP3 / WAV."}>
              <TextInput placeholder="https://drive.google.com/..."
                value={f("MUSIC_FILE_LINK")} onChange={set("MUSIC_FILE_LINK")} />
            </Field>

            <Field label={lang === "en" ? "Property Declaration" : "Deklarasi Properti"}
              note={lang === "en" ? "List all stage properties you will use (if any). Fire, smoke, sharp objects, liquids are PROHIBITED." : "Daftarkan semua properti panggung (jika ada). Api, asap, benda tajam, cairan DILARANG."}>
              <TextArea placeholder={lang === "en" ? "e.g. Fans, silk scarves, bamboo sticks (No fire/smoke/liquids)" : "Cth. Kipas, selendang sutra, tongkat bambu (Tanpa api/asap/cairan)"}
                value={f("PROPERTY_DECLARATION")} onChange={set("PROPERTY_DECLARATION")} />
            </Field>
          </div>
        </div>

        {/* ── GENERAL INFO ── */}
        <div>
          <SectionTitle title={lang === "en" ? "General Information" : "Informasi Umum"} />
          <div className="grid gap-4">
            <Field label={lang === "en" ? "Full Address" : "Alamat Lengkap"} required
              note={lang === "en" ? "Street, City, Province, Country" : "Jalan, Kota, Provinsi, Negara"}>
              <TextArea placeholder={lang === "en" ? "Input your full address..." : "Masukkan alamat lengkap..."}
                value={f("COMPLETE_ADDRESS")} onChange={set("COMPLETE_ADDRESS")} />
            </Field>
            <Field label={lang === "en" ? "How did you find out about YICC?" : "Dari mana Anda mengetahui YICC?"}>
              <SelectInput placeholder={lang === "en" ? "-- Select Source --" : "-- Pilih Sumber --"}
                value={f("INFORMATION_RESOURCES")} onChange={set("INFORMATION_RESOURCES")}
                options={["Instagram", "WhatsApp", "Friend/Teacher", "Website", "YouTube", "Other"]} />
            </Field>
          </div>
        </div>

        {/* ── PAYMENT / EVIDENCE ── */}
        <div>
          <SectionTitle title={lang === "en" ? "Payment Proof" : "Bukti Pembayaran"} />
          <Field label={lang === "en" ? "If you received free registration, please attach evidence." : "Jika mendapat registrasi gratis, harap lampirkan buktinya."}>
            <TextInput placeholder="https://drive.google.com/..."
              value={f("FILE")} onChange={set("FILE")} />
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
            {loading ? (lang === "en" ? "Submitting..." : "Mengirim...") : ` ${lang === "en" ? "Submit Form" : "Kirim Formulir"}`}
          </Button>
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <Button variant="outline" size="sm" onClick={onBack}>
          {lang === "en" ? "← Back to Terms" : "← Kembali ke Syarat"}
        </Button>
      </div>

      {loading && <SpinnerOverlay />}
      {submitted && <SuccessOverlay />}
    </div>
  );
};

export default IccRegistrationForm;