import { getDb } from "@/server/db/client";
import { buildIcs, lessonFeed, type FeedFilter } from "@/server/calendar";
import { riyadhDateIso } from "@/lib/time/riyadh";

export const dynamic = "force-dynamic";

/** /api/v1/calendar/all.ics, shaykh-<slug>.ics, masjid-<id>.ics, lesson-<slug>.ics */
export async function GET(_req: Request, { params }: { params: Promise<{ feed: string }> }) {
  const m = /^(all|shaykh|masjid|lesson)(?:-([a-z0-9-]+))?\.ics$/.exec((await params).feed);
  if (!m || (m[1] !== "all" && !m[2])) return new Response("Not found", { status: 404 });
  const filter: FeedFilter =
    m[1] === "shaykh" ? { shaykhSlug: m[2] } : m[1] === "masjid" ? { masjidId: m[2] } : m[1] === "lesson" ? { lessonSlug: m[2] } : {};
  const { title, events } = await lessonFeed(await getDb(), filter, riyadhDateIso(), 56);
  if (m[1] !== "all" && !events.length && filter.lessonSlug) return new Response("Not found", { status: 404 });
  return new Response(buildIcs(title, events), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${m[0]}"`,
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
