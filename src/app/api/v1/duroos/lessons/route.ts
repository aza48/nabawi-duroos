import { getDb } from "@/server/db/client";
import { scheduleRows } from "@/server/duroos/queries";
import { publicLesson } from "@/server/duroos/public";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

/** Every dars, filterable with `?shaykh=<slug>`, `?masjid=<id>`, `?prayer=<fajr|dhuhr|asr|maghrib|isha>` and `?status=active` (default: all). */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const shaykh = q.get("shaykh");
  const masjid = q.get("masjid");
  const prayer = q.get("prayer");
  const status = q.get("status");
  const rows = (await scheduleRows(await getDb())).filter(
    (l) => (!shaykh || l.shaykh.slug === shaykh) && (!masjid || l.masjid.id === masjid) && (!prayer || l.prayer === prayer) && (!status || l.status === status)
  );
  return ok(rows.map(publicLesson));
}
