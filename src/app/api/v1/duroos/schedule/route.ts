import { getDb } from "@/server/db/client";
import { getWeek } from "@/server/duroos/queries";
import { publicLesson } from "@/server/duroos/public";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET() {
  const week = await getWeek(await getDb());
  return ok({
    byDay: Object.fromEntries(Object.entries(week.byDay).map(([d, rows]) => [d, rows.map(publicLesson)])),
    daysNotStated: week.daysNotStated.map(publicLesson),
  });
}
