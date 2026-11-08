import { getDb } from "@/server/db/client";
import { listMasjids } from "@/server/duroos/queries";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

/** The masjids duroos are held in, in display order. */
export async function GET() {
  const rows = await listMasjids(await getDb());
  return ok(rows.map((m) => ({ id: m.id, nameEn: m.nameEn, nameAr: m.nameAr, shortEn: m.shortEn, shortAr: m.shortAr })));
}
