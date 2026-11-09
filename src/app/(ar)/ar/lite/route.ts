import { getDb } from "@/server/db/client";
import { getToday } from "@/server/duroos/queries";
import { liteHtml } from "@/features/duroos/lite";

/** Today's duroos as a tiny text page for a weak signal (no scripts, fonts or images). */
export const revalidate = 60;

export async function GET() {
  const now = new Date();
  const html = liteHtml(await getToday(await getDb(), now), "ar", now);
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
