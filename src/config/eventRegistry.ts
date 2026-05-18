// ================================================================
// eventRegistry.ts
// Path: src/config/eventRegistry.ts
//
// ✅  SINGLE SOURCE OF TRUTH untuk semua event IESF.
//
// CARA MENAMBAH EVENT BARU:
//   1. Tambahkan entry di EVENTS_REGISTRY di bawah.
//   2. Buat file detail data di src/config/events/<slug>.ts
//   3. Route sudah otomatis via <EventDetailPage slug="..." />
//   4. Tidak perlu ubah file lain sama sekali.
// ================================================================

export type ParticipantType = "international" | "indonesian";
export type CompetitionType = "online" | "offline";

// ── Per-event sheet config ────────────────────────────────────────
// Setiap kombinasi participant × competition punya sheetTarget-nya sendiri.
// sheetUrl bisa sama (1 GAS deployment) atau berbeda per event.
export interface SheetConfig {
  sheetUrl: string;
  targets: {
    "indo-online":   string;
    "indo-offline":  string;
    "inter-online":  string;
    "inter-offline": string;
  };
}

// ── Tipe meta event (untuk listing, card, dsb.) ───────────────────
export interface EventMeta {
  /** Unik slug — dipakai di URL /events/<slug> */
  slug: string;
  /** Nama lengkap event */
  title: string;
  /** Edisi / tahun singkat */
  subtitle: string;
  /** Lokasi acara */
  location: string;
  /** Rentang tanggal */
  dateRange: string;
  /** Deadline pendaftaran */
  registrationDeadline: string;
  /** Konfigurasi Google Sheets per kombinasi peserta × format */
  sheet: SheetConfig;
  /** Path route di App.tsx — biasanya /events/<slug> */
  route: string;
  /** Status event */
  status: "upcoming" | "past" | "ongoing";
  /** Apakah pendaftaran dibuka? */
  registrationOpen: boolean;
    /** Set true untuk menyembunyikan event dari semua halaman web */
  shutdown: boolean;
  /** Opsional: pesan alasan shutdown (hanya untuk catatan internal) */
  shutdownNote?: string;
    /** URL gambar cover dari Cloudinary (opsional, jika tidak ada pakai gradient) */
  coverImage?: string;
  coverImageLandscape?: string;
}

// ================================================================
// ✏️  EDIT DI SINI — daftarkan semua event
// ================================================================
export const EVENTS_REGISTRY: EventMeta[] = [
    {
      slug:                 "bicc-2026",
      title:                "Bali International Cultural Competition",
      subtitle:             "BICC 2026",
      location:             "Bali, Indonesia",
      dateRange:            "November 16–27, 2026",
      registrationDeadline: "July 30, 2026",
      status:               "upcoming",
      registrationOpen:     true,
      route:                "/events/bicc-2026",
      shutdown:             false,
      coverImage:          "https://res.cloudinary.com/dwhobhexj/image/upload/v1778213775/WhatsApp_Image_2026-05-08_at_11.12.59_nf00ax.jpg",
      coverImageLandscape: "https://res.cloudinary.com/dwhobhexj/image/upload/v1778214438/WhatsApp_Image_2026-05-08_at_11.26.51_jnzlti.jpg",

      sheet: {
        sheetUrl: "https://script.google.com/macros/s/AKfycbxfoz-AoQdSet82o8FeJliRekcg1vPHYj1s-6F1jRCmLWcOmjJ9xtY5rrLDBHOOD9AamA/exec",
        targets: {
          "indo-online":   "indo-online",
          "indo-offline":  "indo-offline",
          "inter-online":  "inter-online",
          "inter-offline": "inter-offline",
        },
      },
    },

    //-----------------------------------------------

  
];

// ── Helper — cari event by slug ───────────────────────────────────
export const getEventMeta = (slug: string): EventMeta | undefined =>
  EVENTS_REGISTRY.find(e => e.slug === slug && !e.shutdown);

// Tambah helper baru untuk listing (filter shutdown + sort ongoing dulu)
export const getVisibleEvents = (): EventMeta[] =>
  EVENTS_REGISTRY
    .filter(e => !e.shutdown)
    .sort((a, b) => {
      const order = { ongoing: 0, upcoming: 1, past: 2 };
      return order[a.status] - order[b.status];
    });

// ── Helper — ambil sheet config ───────────────────────────────────
export const getSheetConfig = (
  slug: string,
  participant: ParticipantType,
  competition: CompetitionType
): { sheetUrl: string; sheetTarget: string } | null => {
  const meta = getEventMeta(slug);
  if (!meta) return null;
  const key = `${participant === "indonesian" ? "indo" : "inter"}-${competition}` as keyof SheetConfig["targets"];
  return {
    sheetUrl:    meta.sheet.sheetUrl,
    sheetTarget: meta.sheet.targets[key],
  };
};