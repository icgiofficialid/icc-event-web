import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ── Rate limiting sederhana (in-memory) ──────────────────────────
const ipMap = new Map<string, { count: number; reset: number }>();

function checkRate(ip: string, max = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now > entry.reset) {
    ipMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

// ── Allowed origins ──────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://icc.icgi.or.id",
  "https://iesf.icgi.or.id",
  "https://icgi.or.id",
  "https://iccofficial.or.id",       // ← tambahan
  "https://www.iccofficial.or.id",   // ← tambahan (dengan www)
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://localhost:8080",
];

// ── Handler ───────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── Validasi API Key ──────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[chat] GEMINI_API_KEY is not set!");
    return res.status(500).json({ error: "Server configuration error: API key missing." });
  }

  // Rate limit per IP
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ??
    req.socket.remoteAddress ??
    "unknown";

  if (!checkRate(ip)) {
    return res.status(429).json({
      error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit.",
    });
  }

  const { systemPrompt, messages } = req.body ?? {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages tidak valid" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey); // ← init di dalam handler

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: typeof systemPrompt === "string"
        ? systemPrompt
        : "You are a helpful assistant.",
    });

    const geminiHistory = messages
      .slice(0, -1)
      .slice(-18)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return res.status(400).json({ error: "Pesan terakhir harus dari user" });
    }

    const chat = model.startChat({ history: geminiHistory });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("X-Accel-Buffering", "no");

    const streamResult = await chat.sendMessageStream(lastMessage.content);

    for await (const chunk of streamResult.stream) {
      const text = chunk.text();
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();

  } catch (err: unknown) {
    console.error("[gemini] error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";

    if (message.includes("429") || message.includes("quota")) {
      if (!res.headersSent) {
        return res.status(429).json({ error: "Batas harian Gemini tercapai. Coba lagi besok." });
      }
    }

    if (!res.headersSent) {
      res.status(500).json({ error: message });
    } else {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      res.end();
    }
  }
}