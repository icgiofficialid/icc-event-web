// ================================================================
// iccEventsData.ts
// Path: src/components/icc/iccEventsData.ts  (project: icc-event-web)
//
// ⚠️  FILE INI HANYA BERISI DATA FALLBACK LOKAL.
//     Data live diambil dari GAS Public API via gasClient.ts.
//     Tambahkan event baru melalui Dashboard (dashboard.icgi.or.id),
//     bukan di sini — kecuali untuk keperluan development offline.
// ================================================================

import type { ICCEvent } from "@/lib/gasClient";

export type { ICCEvent, EventType, EventStatus } from "@/lib/gasClient";

// ── LOCAL FALLBACK DATA ───────────────────────────────────────────
export const localIccEvents: ICCEvent[] = [
  {
    id:                   "yicc-2026",
    slug:                 "yicc",
    type:                 "Competition",
    status:               "upcoming",
    title:                "Yogyakarta International Cultural Competition",
    subtitle:             "YICC 2026",
    location:             "Yogyakarta, Indonesia",
    country:              "Indonesia",
    dateRange:            "TBA, 2026",
    year:                 2026,
    registrationDeadline: "TBA",
    coverGradient:        "from-rose-900 via-fuchsia-900 to-amber-900",
    accentColor:          "#f43f5e",
    description:
      "An international cultural competition celebrating traditional arts, ethnic identity, and global cultural exchange through performance-based categories including dance, costume, and vocal.",
    tags:                 ["Culture", "Dance", "Costume", "Vocal", "International"],
    platform:             "icc",
    posterUrl:            "",
    guidebookUrl:         "",
    registrationUrl:      "",
    spreadsheetId:        "",
  },
];

// Alias untuk backward-compatibility dengan import lama:
//   import { iccEvents } from "@/components/icc/iccEventsData"
export const iccEvents = localIccEvents;