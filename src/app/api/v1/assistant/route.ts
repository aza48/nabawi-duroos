import { z } from "zod";
import { getDb } from "@/server/db/client";
import { getToday } from "@/server/duroos/queries";
import { getRetriever, type Passage } from "@/server/assistant/knowledge";
import { askMesh } from "@/server/assistant/answer";
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

const STATUS: Record<string, string> = { cancelled: "cancelled today", postponed: "postponed today", moved: "moved today", guest: "a guest teaches today", resumed: "resumes today", on: "on" };

/** Today's duroos as one passage, for questions like "what is on tonight". */
async function todayPassage(db: Awaited<ReturnType<typeof getDb>>): Promise<{ passage: Passage | null; today: string }> {
  try {
    const t = await getToday(db);
    const lines = t.lessons.map((l) => `${l.bookEn} with ${l.shaykh.nameEn}, after ${l.prayer}, ${l.masjid.shortEn}: ${STATUS[l.status] ?? l.status}${l.overrideNoteEn ? `. ${l.overrideNoteEn}` : ""}`);
    return {
      today: `${t.gregorian.en} (${t.hijri.en})`,
      passage: { id: "today", kind: "today", title: `Today's duroos, ${t.gregorian.en}`, url: "/duroos", text: lines.length ? lines.join("\n") : "No regular duroos are listed for today." },
    };
  } catch {
    return { today: new Date().toISOString().slice(0, 10), passage: null };
  }
}

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
  const db = await getDb();
  const [{ retrieve }, { passage, today }] = await Promise.all([getRetriever(db), todayPassage(db)]);
  const result = await askMesh(input, { retrieve, extra: passage ? [passage] : [], today });
  return json(result);
}
