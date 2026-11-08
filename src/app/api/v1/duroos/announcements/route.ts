import { getDb } from "@/server/db/client";
import { listAnnouncements } from "@/server/duroos/queries";
import { publicAnnouncement } from "@/server/duroos/public";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 20, 1), 100);
  const includeArchived = url.searchParams.get("archived") === "1";
  const rows = await listAnnouncements(await getDb(), { limit, includeArchived });
  return ok(rows.map(publicAnnouncement));
}
