// ================================================================
// gasClient.ts
// Path: src/lib/gasClient.ts  (project: icc-event-web)
//
// Client untuk fetch data event ICC dari GAS Public API.
// URL API dikonfigurasi via environment variable VITE_GAS_PUBLIC_API_URL.
// Jika API tidak tersedia / gagal, fallback ke data lokal (localFallback).
// ================================================================

// ── TYPES ─────────────────────────────────────────────────────────
export type EventType   = "Competition" | "Workshop" | "Exhibition";
export type EventStatus = "upcoming" | "past";

export interface ICCEvent {
  id:                   string;
  slug:                 string;
  type:                 EventType;
  status:               EventStatus;
  title:                string;
  subtitle:             string;
  location:             string;
  country:              string;
  dateRange:            string;
  year:                 number;
  registrationDeadline: string;
  coverGradient:        string;
  accentColor:          string;
  description:          string;
  tags:                 string[];
  platform:             string;   // selalu "icc"
  posterUrl:            string;
  guidebookUrl:         string;
  registrationUrl:      string;
  spreadsheetId:        string;
}

// ── ENV ───────────────────────────────────────────────────────────
const GAS_API_URL = import.meta.env.VITE_GAS_PUBLIC_API_URL as string | undefined;

// ── FETCH SEMUA EVENTS ────────────────────────────────────────────
/**
 * Fetch semua published ICC events dari GAS Public API.
 *
 * @param platform  Optional filter: "icc" (kosong = semua)
 * @param fallback  Data lokal sebagai cadangan jika API gagal
 *
 * @example
 * const events = await fetchEvents("icc", localIccEvents);
 */
export async function fetchEvents(
  platform?: string,
  fallback: ICCEvent[] = []
): Promise<ICCEvent[]> {
  if (!GAS_API_URL) {
    console.warn("[gasClient-icc] VITE_GAS_PUBLIC_API_URL tidak di-set. Menggunakan data lokal.");
    return fallback;
  }

  try {
    const params = new URLSearchParams({ action: "getEvents" });
    if (platform) params.set("platform", platform);

    const res = await fetch(`${GAS_API_URL}?${params}`, {
      method: "GET",
      cache:  "no-store",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.error) throw new Error(json.error);
    if (!Array.isArray(json.events)) throw new Error("Format response tidak valid.");

    const data = json.events as ICCEvent[];

    // Jika API return kosong, gunakan fallback lokal
    return data.length > 0 ? data : fallback;

  } catch (err) {
    console.error("[gasClient-icc] Gagal fetch events, menggunakan fallback:", err);
    return fallback;
  }
}

// ── FETCH SATU EVENT BY SLUG ──────────────────────────────────────
/**
 * Fetch detail satu event berdasarkan slug.
 *
 * @param slug      Slug event, misal: "yicc"
 * @param fallback  Event lokal sebagai cadangan jika API gagal
 *
 * @example
 * const event = await fetchEventBySlug("yicc", localFallback);
 */
export async function fetchEventBySlug(
  slug: string,
  fallback: ICCEvent | null = null
): Promise<ICCEvent | null> {
  if (!GAS_API_URL) {
    console.warn("[gasClient-icc] VITE_GAS_PUBLIC_API_URL tidak di-set. Menggunakan data lokal.");
    return fallback;
  }

  try {
    const params = new URLSearchParams({ action: "getEvent", slug });
    const res = await fetch(`${GAS_API_URL}?${params}`, {
      method: "GET",
      cache:  "no-store",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.error) throw new Error(json.error);

    return (json.event as ICCEvent) ?? fallback;

  } catch (err) {
    console.error(`[gasClient-icc] Gagal fetch event "${slug}", menggunakan fallback:`, err);
    return fallback;
  }
}