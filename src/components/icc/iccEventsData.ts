// ================================================================
// iccEventsData.ts — ICC Events
// ================================================================

export type EventType = "Competition" | "Workshop" | "Exhibition";
export type EventStatus = "upcoming" | "past";

export interface ICCEvent {
  id: string;
  slug: string;
  type: EventType;
  status: EventStatus;
  title: string;
  subtitle: string;
  location: string;
  country: string;
  dateRange: string;
  year: number;
  registrationDeadline: string;
  coverGradient: string;
  accentColor: string;
  description: string;
  tags: string[];
}

export const iccEvents: ICCEvent[] = [
  {
    id: "yicc-2026",
    slug: "yicc",
    type: "Competition",
    status: "upcoming",
    title: "Yogyakarta International Cultural Competition",
    subtitle: "YICC 2026",
    location: "Yogyakarta, Indonesia",
    country: "Indonesia",
    dateRange: "TBA, 2026",
    year: 2026,
    registrationDeadline: "TBA",
    coverGradient: "from-rose-900 via-fuchsia-900 to-amber-900",
    accentColor: "#f43f5e",
    description:
      "An international cultural competition celebrating traditional arts, ethnic identity, and global cultural exchange through performance-based categories including dance, costume, and vocal.",
    tags: ["Culture", "Dance", "Costume", "Vocal", "International"],
  },
];