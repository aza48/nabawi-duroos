import { getDb } from "@/server/db/client";
import { fail, ok } from "@/server/api";
import { allow, clientIp } from "@/server/rate-limit";
import { deepSearch } from "@/server/search/deep";

export const dynamic = "force-dynamic";

/**
 * The search box's second pass: `?q=...&locale=en|ar` in; out, `data: { instant, hits[] }`. `hits` are sections of
 * guides and answers that hold the words, each with its best sentence and a link to the section; `instant` is a
 * reply to the search itself (adhan times, the Hijri date, tonight's duroos, or an answer MESH has written).
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const locale = url.searchParams.get("locale") === "ar" ? "ar" : "en";
  if (q.length > 200) return fail("bad_request", 400, "The search must be 200 characters or fewer.");
  if (!allow(`deep:${clientIp(req)}`, 120, 60_000)) return fail("too_many_requests", 429, "Please wait a minute before searching again.");
  try {
    const data = await deepSearch(await getDb(), q, locale);
    const res = ok(data);
    // A live answer (today's date, adhan times, tonight's duroos and their cancellations) is shared for 30 seconds
    // at most, never served stale; written sections change only when a guide does.
    res.headers.set("Cache-Control", data.instant?.kind === "live" ? "public, s-maxage=30" : "public, s-maxage=120, stale-while-revalidate=600");
    return res;
  } catch {
    return fail("search_error", 500, "Search couldn't load. Please try again.");
  }
}
