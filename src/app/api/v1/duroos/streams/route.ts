import { getDb } from "@/server/db/client";
import { listStreams } from "@/server/duroos/queries";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

/** Live broadcast channels (YouTube, Mixlr, Telegram), with whether each is live right now. */
export async function GET() {
  const rows = await listStreams(await getDb());
  return ok(rows.map((s) => ({ slug: s.slug, kind: s.kind, url: s.url, labelEn: s.labelEn, labelAr: s.labelAr, isLive: s.isLive, liveUrl: s.liveUrl, checkedAt: s.checkedAt })));
}
