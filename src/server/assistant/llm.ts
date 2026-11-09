import { GEMINI_MODELS } from "@/server/watcher/ai";

/**
 * The writers behind the assistant: free tiers of several AI providers, tried in order. Each
 * provider is used only when its key is set, and a provider that is out of quota is rested for
 * a while so the next one answers at once. When none can answer, the assistant still replies
 * from the site's own passages (see compose.ts), so it never goes silent.
 *
 * Keys (Vercel environment variables, all optional):
 *   GROQ_API_KEY, CEREBRAS_API_KEY, ASSISTANT_GEMINI_API_KEY (or ASSISTANT_GEMINI_KEY), MISTRAL_API_KEY,
 *   OPENROUTER_API_KEY.
 *   GEMINI_API_KEY (the watcher's key) is used last, only on its "lite" models, so the
 *   watcher keeps its main models' daily quota. ASSISTANT_SHARE_WATCHER_KEY=0 (or the older ASSISTANT_SHARE_GEMINI=0) turns that off.
 * Each provider's model list can be replaced with <PROVIDER>_MODELS="model-a,model-b".
 */

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };
type FetchLike = (url: string, init: RequestInit) => Promise<Response>;

type Provider = {
  id: string;
  key: () => string | undefined;
  models: string[];
  kind: "openai" | "gemini";
  url?: string;
};

const list = (env: string | undefined, fallback: string[]) => (env ? env.split(",").map((s) => s.trim()).filter(Boolean) : fallback);

export function providers(env: NodeJS.ProcessEnv = process.env): Provider[] {
  const lite = GEMINI_MODELS.filter((m) => m.includes("lite"));
  const all: Provider[] = [
    { id: "groq", kind: "openai", url: "https://api.groq.com/openai/v1/chat/completions", key: () => env.GROQ_API_KEY, models: list(env.GROQ_MODELS, ["openai/gpt-oss-120b", "llama-3.3-70b-versatile", "openai/gpt-oss-20b", "llama-3.1-8b-instant"]) },
    { id: "cerebras", kind: "openai", url: "https://api.cerebras.ai/v1/chat/completions", key: () => env.CEREBRAS_API_KEY, models: list(env.CEREBRAS_MODELS, ["gpt-oss-120b", "llama-3.3-70b", "qwen-3-235b-a22b-instruct-2507", "llama3.1-8b"]) },
    { id: "gemini", kind: "gemini", key: () => env.ASSISTANT_GEMINI_API_KEY || env.ASSISTANT_GEMINI_KEY, models: list(env.ASSISTANT_GEMINI_MODELS, GEMINI_MODELS) },
    { id: "mistral", kind: "openai", url: "https://api.mistral.ai/v1/chat/completions", key: () => env.MISTRAL_API_KEY, models: list(env.MISTRAL_MODELS, ["mistral-small-latest", "open-mistral-nemo"]) },
    { id: "openrouter", kind: "openai", url: "https://openrouter.ai/api/v1/chat/completions", key: () => env.OPENROUTER_API_KEY, models: list(env.OPENROUTER_MODELS, ["openai/gpt-oss-120b:free", "meta-llama/llama-3.3-70b-instruct:free", "deepseek/deepseek-chat-v3.1:free", "openrouter/free"]) },
    { id: "gemini-shared", kind: "gemini", key: () => (env.ASSISTANT_SHARE_WATCHER_KEY === "0" || env.ASSISTANT_SHARE_GEMINI === "0" ? undefined : env.GEMINI_API_KEY), models: lite.length ? lite : GEMINI_MODELS.slice(-1) },
  ];
  return all.filter((p) => !!p.key());
}

/** Providers resting after a quota or key error, until the given time (per server instance). */
const resting = new Map<string, number>();

export function aiAvailable(env: NodeJS.ProcessEnv = process.env, now = Date.now()): boolean {
  return providers(env).some((p) => (resting.get(p.id) ?? 0) <= now);
}

export function resetProviders() {
  resting.clear();
  calls = 0;
}

async function callOpenAi(p: Provider, model: string, messages: ChatMessage[], f: FetchLike, signal: AbortSignal): Promise<Response> {
  const body: Record<string, unknown> = { model, messages, temperature: 0.2, max_tokens: 900, response_format: { type: "json_object" } };
  if (/gpt-oss/.test(model)) body.reasoning_effort = "low";
  const headers: Record<string, string> = { "content-type": "application/json", authorization: `Bearer ${p.key()}` };
  if (p.id === "openrouter") {
    headers["HTTP-Referer"] = "https://medinahub.org";
    headers["X-Title"] = "MESH assistant";
  }
  return f(p.url!, { method: "POST", headers, body: JSON.stringify(body), signal });
}

async function callGemini(p: Provider, model: string, messages: ChatMessage[], f: FetchLike, signal: AbortSignal): Promise<Response> {
  const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
  return f(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": p.key()! },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, generationConfig: { temperature: 0.2, maxOutputTokens: 900, responseMimeType: "application/json" } }),
    signal,
  });
}

async function readText(p: Provider, res: Response): Promise<string | null> {
  const j = (await res.json()) as {
    choices?: { message?: { content?: string | null } }[];
    candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[];
  };
  const t = p.kind === "gemini"
    ? j.candidates?.[0]?.content?.parts?.filter((x) => !x.thought).map((x) => x.text ?? "").join("")
    : j.choices?.[0]?.message?.content;
  return t?.trim() ? t.trim() : null;
}

export type WriteResult = { text: string; provider: string; model: string } | null;

/** Model calls made today by this instance; ASSISTANT_DAILY_LIMIT (default 400) caps them. */
let day = "";
let calls = 0;
function spend(env: NodeJS.ProcessEnv, now: number): boolean {
  const d = new Date(now).toISOString().slice(0, 10);
  if (d !== day) {
    day = d;
    calls = 0;
  }
  if (calls >= (Number(env.ASSISTANT_DAILY_LIMIT) || 400)) return false;
  calls++;
  return true;
}

/**
 * Asks the providers in turn until one writes an answer. Returns null when none could, within
 * `budgetMs` overall. Quota errors rest a provider for 10 minutes, key errors for 6 hours.
 */
export async function write(
  messages: ChatMessage[],
  opts: { fetch?: FetchLike; env?: NodeJS.ProcessEnv; budgetMs?: number; now?: () => number } = {}
): Promise<WriteResult> {
  const f = opts.fetch ?? (fetch as FetchLike);
  const now = opts.now ?? Date.now;
  const env = opts.env ?? process.env;
  const deadline = now() + (opts.budgetMs ?? 25_000);
  if (!spend(env, now())) return null;
  for (const p of providers(env)) {
    if ((resting.get(p.id) ?? 0) > now()) continue;
    for (const model of p.models) {
      const left = deadline - now();
      if (left < 1_500) return null;
      let res: Response;
      try {
        const signal = AbortSignal.timeout(Math.min(left, 15_000));
        res = await (p.kind === "gemini" ? callGemini(p, model, messages, f, signal) : callOpenAi(p, model, messages, f, signal));
      } catch {
        continue; // timeout or network: try the next model
      }
      if (res.ok) {
        const text = await readText(p, res).catch(() => null);
        if (text) return { text, provider: p.id, model };
        continue;
      }
      if (res.status === 401 || res.status === 403) {
        resting.set(p.id, now() + 6 * 3_600_000);
        break;
      }
      if (res.status === 429) {
        // A per-model quota on Gemini; a per-account quota elsewhere.
        if (p.kind !== "gemini") {
          resting.set(p.id, now() + 10 * 60_000);
          break;
        }
        continue;
      }
      // 400 (a model that does not take a parameter), 404 (retired model), 5xx: next model.
    }
  }
  return null;
}
