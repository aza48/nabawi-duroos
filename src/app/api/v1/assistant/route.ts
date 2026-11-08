import { z } from "zod";
import { getDb } from "@/server/db/client";
import { askMesh } from "@/server/assistant/answer";
import { aiAvailable } from "@/server/assistant/llm";
import { BOT_NAME } from "@/server/assistant/prompt";
import { allow, clientIp } from "@/server/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const body = z.object({
  question: z.string().trim().min(2).max(600),
  locale: z.enum(["en", "ar"]).default("en"),
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(4000) })).max(8).optional(),
});

/** A few questions a minute and a few dozen a day per address keep the free quota for everyone. */
export const ASK_LIMITS = { perMinute: 6, perDay: 60 };

const json = (data: unknown, status = 200) =>
  Response.json({ data: status === 200 ? data : null, error: status === 200 ? null : data, generatedAt: new Date().toISOString(), version: 1 }, { status, headers: { "cache-control": "no-store" } });

/** Ask the Meshaykh: `{ question, locale, history? }` in, `{ answer, sources, related, mode, found, lang }` out. */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!allow(`ask:${ip}`, ASK_LIMITS.perMinute, 60_000) || !allow(`askday:${ip}`, ASK_LIMITS.perDay, 86_400_000)) {
    return json("Too many questions for now. Please try again in a little while.", 429);
  }
  let input: z.infer<typeof body>;
  try {
    input = body.parse(await req.json());
  } catch {
    return json("Please type a question of at least two letters.", 400);
  }
  try {
    return json(await askMesh(await getDb(), input));
  } catch {
    return json("Something went wrong. Please try again.", 500);
  }
}

/** The assistant's name and whether a model can write answers right now (for the app). */
export async function GET() {
  return json({ name: BOT_NAME, ai: aiAvailable(), limits: ASK_LIMITS });
}
