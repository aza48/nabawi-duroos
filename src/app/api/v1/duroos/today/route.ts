import { getDb } from "@/server/db/client";
import { getToday } from "@/server/duroos/queries";
import { badRequest, dateParam, ok } from "@/server/api";
import { riyadhDateIso } from "@/lib/time/riyadh";

export const dynamic = "force-dynamic";

/** Today's duroos, or another day's with `?date=YYYY-MM-DD` (within 60 days). `timeKnown` false means no adhan time applies. */
export async function GET(req: Request) {
  const now = new Date();
  let date: string | null;
  try {
    date = dateParam(new URL(req.url), riyadhDateIso(now));
  } catch (e) {
    return badRequest(e instanceof Error ? e.message : "bad date");
  }
  return ok(await getToday(await getDb(), now, date ?? undefined));
}
