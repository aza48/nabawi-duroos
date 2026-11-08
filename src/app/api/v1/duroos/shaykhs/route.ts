import { getDb } from "@/server/db/client";
import { listShaykhs } from "@/server/duroos/queries";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

/** Every shaykh, alphabetically. Each one's duroos are at /api/v1/duroos/shaykhs/<slug>. */
export async function GET() {
  const rows = await listShaykhs(await getDb());
  return ok(rows.map((s) => ({ slug: s.slug, nameEn: s.nameEn, nameAr: s.nameAr, photo: s.photo, roleEn: s.roleEn, roleAr: s.roleAr })));
}
