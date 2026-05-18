// ================================================================
// useEvents.ts
// Path: src/hooks/useEvents.ts
//
// Custom hook untuk fetch & cache events dari GAS Public API.
// Jika GAS API tidak tersedia, fallback otomatis dari EVENTS_REGISTRY.
// ================================================================

import { useState, useEffect } from "react";
import { fetchEvents, fetchEventBySlug, type ICCEvent } from "@/lib/gasClient";
import { EVENTS_REGISTRY, type EventMeta } from "@/config/eventRegistry";

// ── Build ICCEvent dari EventMeta (static fallback) ──────────────
// Mapping ini memastikan setiap event di EVENTS_REGISTRY otomatis
// muncul di card tanpa perlu GAS API atau eventsData hardcode.
const GRADIENT_POOL = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-blue-600 via-cyan-600 to-teal-700",
  "from-rose-600 via-pink-600 to-fuchsia-700",
  "from-amber-500 via-orange-600 to-red-700",
  "from-emerald-500 via-green-600 to-teal-700",
];

function registryToICCEvent(meta: EventMeta, index: number): ICCEvent {
  return {
    id:                   meta.slug,
    slug:                 meta.slug,
    type:                 "Competition",
    status:               meta.status === "ongoing" ? "upcoming" : meta.status,
    title:                meta.title,
    subtitle:             meta.subtitle,
    location:             meta.location,
    country:              meta.location.split(",").pop()?.trim() ?? "Indonesia",
    dateRange:            meta.dateRange,
    year:                 new Date().getFullYear(),
    registrationDeadline: meta.registrationDeadline,
    coverGradient:        GRADIENT_POOL[index % GRADIENT_POOL.length],
    accentColor:          "#6366f1",
    description:          meta.title,
    tags:                 ["Engineering", "Science", "Innovation", "International"],
    platform:             "iesf",
    posterUrl:            "",
    guidebookUrl:         "",
    registrationUrl:      meta.route,
    spreadsheetId:        "",
  };
}

// Fallback statis dari registry — selalu sinkron dengan EVENTS_REGISTRY
const registryFallback: ICCEvent[] = EVENTS_REGISTRY.map(registryToICCEvent);

// ── useEvents ─────────────────────────────────────────────────────
/**
 * Hook untuk mengambil semua events.
 * @param platform  Optional: "iesf" | "icc"
 */
export function useEvents(platform?: string) {
  const [events,  setEvents]  = useState<ICCEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEvents(platform, registryFallback);
        if (!cancelled) {
          setEvents(data.length > 0 ? data : registryFallback);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Gagal memuat data events.");
          setEvents(registryFallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [platform]);

  return { events, loading, error };
}

// ── useEvent ──────────────────────────────────────────────────────
/**
 * Hook untuk mengambil satu event berdasarkan slug.
 * @param slug  Slug event, misal: "yiesf-2026"
 */
export function useEvent(slug: string) {
  const [event,   setEvent]   = useState<ICCEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const localFallback =
          registryFallback.find(e => e.slug === slug) ?? null;
        const data = await fetchEventBySlug(slug, localFallback);
        if (!cancelled) setEvent(data);
      } catch (e) {
        if (!cancelled) {
          setError("Gagal memuat detail event.");
          setEvent(registryFallback.find(e => e.slug === slug) ?? null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  return { event, loading, error };
}