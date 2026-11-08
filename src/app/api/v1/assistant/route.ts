import { z } from "zod";
import { getDb } from "@/server/db/client";
import { fail, ok } from "@/server/api";
import { allow, clientIp } from "@/server/rate-limit";
import { answer } from "@/server/assistant/answer";
import { aiAvailable } from "@/server/assistant/llm";
import { BOT_NAME } from "@/server/assistant/prompt";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Enough for a real conversation; more than this from one address is a script. */
export const ASK_LIMITS = [
  { max: 12, windowMs: 60_000 },
  { max: 80, windowMs: 3_600_000 },
];

const body = z.object({
  question: z.string().trim().min(1).max(600),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .max(12)
    .optional()
    .default([]),
});

/** Ask the Meshaykh: one question (with the conversation so far) in, one grounded answer out. */
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
    const reply = await answer(await getDb(), input.question, input.history);
    const res = ok(reply);
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch {
    return fail("assistant_error", 500, "Something went wrong. Please try again.");
  }
}

/** What the assistant is and whether a writer is available right now (for the app and the status badge). */
export async function GET() {
  const res = ok({ name: BOT_NAME, ai: aiAvailable(), limits: ASK_LIMITS });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
