import { z } from "zod";
import { getDb } from "@/server/db/client";
import { fail, ok } from "@/server/api";
import { allow, clientIp } from "@/server/rate-limit";
import { askMesh } from "@/server/assistant/answer";
import { aiAvailable } from "@/server/assistant/llm";
import { BOT_NAME } from "@/server/assistant/prompt";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Enough for a real conversation; more than this from one address is a script. */
export const ASK_LIMITS = [
  { max: 12, windowMs: 60_000 },
  { max: 80, windowMs: 3_600_000 },
];

/** A turn of the conversation so far; `content` (the panel) and `text` (older clients) are both accepted. */
const turn = z
  .object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000).optional(), text: z.string().max(4000).optional() })
  .transform((t) => ({ role: t.role, text: t.content ?? t.text ?? "" }));

const body = z.object({
  question: z.string().trim().min(1).max(600),
  locale: z.enum(["en", "ar"]).optional().default("en"),
  history: z.array(turn).max(12).optional().default([]),
});

/**
 * Ask the MESHaykh: `{ question, history?, locale? }` in; out, the standard envelope with
 * `data: { answer, sources[{title, section?, url}], related[{title, url}], mode, found, lang }`.
 * `answer` uses **bold**, "- " and "1. " lines, and [n] markers that point to sources[n-1].
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!ASK_LIMITS.every((l, i) => allow(`ask${i}:${ip}`, l.max, l.windowMs))) {
    return fail("too_many_requests", 429, "Please wait a minute before asking again.");
  }
  let input: z.infer<typeof body>;
  try {
    input = body.parse(await req.json());
  } catch {
    return fail("bad_request", 400, "Send { question, history? } as JSON; the question must be 1 to 600 characters.");
  }
  try {
    const reply = await askMesh(await getDb(), { question: input.question, history: input.history, locale: input.locale });
    const res = ok(reply);
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch {
    return fail("assistant_error", 500, "Something went wrong. Please try again.");
  }
}

/** What the assistant is and whether a model can write answers right now (for the app). */
export async function GET() {
  const res = ok({ name: BOT_NAME, ai: aiAvailable(), limits: ASK_LIMITS });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
