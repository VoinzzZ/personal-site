import { portfolioSystemPrompt } from "@/lib/portfolio-context";

const API_BASE_URL = "https://apinex.bond/v1";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;
const DEFAULT_MODELS = [
  "free/qwen-3.8-max",
  "free/gpt-5.6-luna",
  "free/glm-5.3-flash",
];
const REQUEST_TIMEOUT_MS = 30_000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

function getConfiguredModels(): string[] {
  const raw = process.env.APINEX_MODELS ?? process.env.APINEX_MODEL;
  if (!raw) return DEFAULT_MODELS;
  const models = raw
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);
  return models.length > 0 ? models : DEFAULT_MODELS;
}

function getTimeoutSignal(): {
  signal: AbortSignal;
  clearTimeout: () => void;
} {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );
  return { signal: controller.signal, clearTimeout: () => clearTimeout(timeout) };
}

export async function POST(request: Request) {
  let messages: ChatMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    messages = body.messages.slice(-MAX_MESSAGES);
    if (!messages.every(isChatMessage)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const apiKey = process.env.APINEX_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Chat service is not configured" },
      { status: 503 },
    );
  }

  const models = getConfiguredModels();
  let lastError: { status: number; body: string } | null = null;

  for (const model of models) {
    const { signal, clearTimeout: clearRequestTimeout } = getTimeoutSignal();

    try {
      const upstream = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: portfolioSystemPrompt },
            ...messages,
          ],
          temperature: 0.4,
          max_tokens: 700,
          stream: true,
        }),
        signal,
      });

      clearRequestTimeout();

      if (upstream.ok && upstream.body) {
        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      }

      const detail = await upstream.text().catch(() => "");
      lastError = { status: upstream.status, body: detail };
      console.error(
        `APInex chat request failed for model ${model}:`,
        upstream.status,
        detail,
      );
    } catch (error) {
      clearRequestTimeout();
      lastError = { status: 502, body: String(error) };
      console.error(`Chat API error for model ${model}:`, error);
    }
  }

  const timedOut = lastError?.body
    ? lastError.body.includes("AbortError")
    : false;

  return Response.json(
    {
      error: timedOut
        ? "Chat service timed out"
        : "Chat service is temporarily unavailable",
    },
    { status: timedOut ? 504 : 502 },
  );
}
