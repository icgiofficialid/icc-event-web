// ================================================================
// useChatbot.ts — AI Chatbot hook
// Provider: Google Gemini 2.0 Flash (GRATIS, 1500 req/hari)
// Ganti config sesuai website: ICC_CONFIG / ICGI_CONFIG / IESF_CONFIG
// ================================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatbotConfig {
  /** Nama bot yang tampil di header */
  botName: string;
  /** Pesan sambutan pertama kali chat dibuka */
  welcomeMessage: string;
  /** System prompt — instruksi kepribadian & konteks website */
  systemPrompt: string;
  /** Warna aksen utama (hex) */
  accentColor: string;
  /** Warna teks di atas accentColor */
  accentForeground: string;
  /**
   * URL endpoint — selalu /api/chat untuk Vercel
   * (nama field: apiUrl, sesuai AiChatbot.tsx)
   */
  apiUrl: string;
}

// ── KONFIGURASI PER WEBSITE ───────────────────────────────────────

// ── ICC ──────────────────────────────────────────────────────────
export const ICC_CONFIG: ChatbotConfig = {
  botName: "ICC Assistant",
  welcomeMessage:
    "Halo! Saya asisten resmi ICC (International Cultural Competition). Saya siap membantu Anda tentang pendaftaran, kategori kompetisi, jadwal acara, dan informasi lainnya.",
  systemPrompt: `Kamu adalah asisten resmi ICC (International Cultural Competition) yang diselenggarakan oleh ICGI di Yogyakarta, Indonesia.

Tugasmu adalah membantu peserta, penonton, dan pengunjung website dengan informasi tentang:
- Kategori kompetisi (Tari Tradisional, Kostum Tradisional, Vokal Solo, Vokal Group)
- Cara pendaftaran dan persyaratan peserta
- Jadwal dan lokasi acara
- Informasi teknis pertandingan dan penilaian
- Kontak dan komunikasi dengan panitia

Gunakan bahasa yang ramah, profesional, dan antusias. Jawab dalam bahasa yang sama dengan pengguna (Indonesia atau Inggris). Jika tidak tahu jawaban pasti, sarankan untuk menghubungi panitia resmi.`,
  accentColor: "#ffffff",
  accentForeground: "#0a0a0a",
  apiUrl: "/api/chat",
};

// ── ICGI ─────────────────────────────────────────────────────────
export const ICGI_CONFIG: ChatbotConfig = {
  botName: "ICGI Assistant",
  welcomeMessage:
    "Selamat datang di ICGI! Saya siap membantu Anda dengan informasi tentang program, event, dan layanan ICGI. Silakan tanyakan apa saja!",
  systemPrompt: `Kamu adalah asisten resmi ICGI (organisasi penyelenggara event budaya dan kompetisi internasional berbasis di Yogyakarta, Indonesia).

Bantu pengunjung dengan:
- Informasi tentang ICGI dan visi misinya
- Event yang diselenggarakan (ICC, IESF, dan event lainnya)
- Cara berpartisipasi, bermitra, atau menjadi sponsor
- Informasi kontak dan media sosial resmi
- Program beasiswa atau kolaborasi budaya

Bersikaplah profesional, ramah, dan informatif. Jawab dalam bahasa yang sama dengan pengguna.`,
  accentColor: "#1d4ed8",
  accentForeground: "#ffffff",
  apiUrl: "/api/chat",
};

// ── IESF ─────────────────────────────────────────────────────────
export const IESF_CONFIG: ChatbotConfig = {
  botName: "IESF Assistant",
  welcomeMessage:
    "Hi! I'm the IESF Assistant. I can help you with information about our programs, events, and activities. What would you like to know?",
  systemPrompt: `Kamu adalah asisten resmi IESF, sebuah organisasi event dan federasi olahraga internasional.

Bantu pengunjung dengan:
- Program dan kegiatan IESF
- Jadwal event dan cara pendaftaran
- Persyaratan partisipasi
- Kontak dan informasi resmi organisasi

Bersikaplah profesional, energetik, dan membantu. Jawab dalam bahasa yang sama dengan pengguna (Indonesia atau Inggris).`,
  accentColor: "#16a34a",
  accentForeground: "#ffffff",
  apiUrl: "/api/chat",
};

// ── HOOK ─────────────────────────────────────────────────────────
import { useState, useCallback, useRef } from "react";

export function useChatbot(config: ChatbotConfig) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: userText.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      // Placeholder untuk pesan assistant
      const assistantId = crypto.randomUUID();
      setMessages(prev => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      try {
        abortRef.current = new AbortController();

        // Kirim history percakapan ke backend
        const history = [...messages, userMsg].map(m => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch(config.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: abortRef.current.signal,
          body: JSON.stringify({
            systemPrompt: config.systemPrompt, // ← sesuai chat.ts backend
            messages: history,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error ?? `Server error: ${res.status}`);
        }

        // Baca streaming SSE
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error("No response body");

        let accumulated = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (typeof parsed.text === "string") {
                accumulated += parsed.text;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantId ? { ...m, content: accumulated } : m
                  )
                );
              }
            } catch {
              // bukan JSON valid, skip
            }
          }
        }

        // Fallback jika accumulated kosong
        if (!accumulated) {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId
                ? { ...m, content: "Maaf, tidak ada respons. Silakan coba lagi." }
                : m
            )
          );
        }

      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(msg);
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: "Maaf, terjadi kesalahan. Silakan coba lagi." }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading, config]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages, stopGeneration };
}