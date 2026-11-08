import { getDb } from "@/server/db/client";
import { getShaykh } from "@/server/duroos/queries";
import { publicLesson } from "@/server/duroos/public";
import { notFound, ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const s = await getShaykh(await getDb(), (await params).slug);
  if (!s) return notFound();
  return ok({
    slug: s.slug,
    nameEn: s.nameEn,
    nameAr: s.nameAr,
    photo: s.photo,
    roleEn: s.roleEn,
    roleAr: s.roleAr,
    facts: s.facts,
    lessons: s.lessons.map(publicLesson),
    earlier: s.earlier.map(publicLesson),
    channels: s.channels.map((c) => ({ url: c.url, kind: c.kind, labelEn: c.labelEn, labelAr: c.labelAr })),
  });
}
