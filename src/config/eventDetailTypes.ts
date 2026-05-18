// ================================================================
// eventDetailTypes.ts
// Path: src/config/eventDetailTypes.ts
//
// Tipe bersama untuk semua data detail event.
// Import tipe ini di file data event (src/config/events/<slug>.ts)
// dan di EventDetailPage.tsx.
// ================================================================

export interface BilingualText {
  en: string;
  id: string;
}

export interface EventDetailData {
  slug:         string;
  email:        string;
  website:      string;
  venue:        string;
  /** URL ke file guidebook (PDF/Drive). Jika kosong, tombol tidak ditampilkan. */
  guidebookUrl?: string;
  organizers?: { name: string; logo: string }[];

  labels: {
    eventBadge:     BilingualText;
    heroBadge:      BilingualText;
    categoriesDesc: BilingualText;
    scheduleDesc:   BilingualText;
  };

  stats: Array<{
    value: string;
    label: BilingualText;
  }>;

  regSteps: {
    en: string[];
    id: string[];
  };

  about: {
    welcome:    BilingualText;
    background: BilingualText;
    objectives: { en: string[]; id: string[] };
  };

  divisions: Array<{
    level: BilingualText;
    age:   BilingualText;
  }>;

  categories: Array<{
    letter:      string;
    title:       BilingualText;
    description: BilingualText;
    /** Nama ikon dari lucide-react */
    icon:        string;
  }>;

  judgingCriteria: Array<{
    aspect: BilingualText;
    weight: string;
  }>;

  awards: Array<{
    place: BilingualText;
    medal: BilingualText;
    extra: BilingualText;
  }>;

  schedule: Array<{
    day:   number;
    title: BilingualText;
    items: { en: string[]; id: string[] };
  }>;

  scheduleOffline?: {
  day: number;
  date: { en: string; id: string };
  title: { en: string; id: string };
  items: {
    time: string;
    description: { en: string; id: string };
    location: { en: string; id: string };
  }[];
}[];

scheduleOnline?: {
  day: number;
  date: { en: string; id: string };
  title: { en: string; id: string };
  items: {
    time: string;
    description: { en: string; id: string };
    location: { en: string; id: string };
  }[];
}[];
}