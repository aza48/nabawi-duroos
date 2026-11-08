import { getDb } from "@/server/db/client";
import { getLesson } from "@/server/duroos/queries";
import { publicLesson, publicOverride, publicStream } from "@/server/duroos/public";
import { notFound, ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const l = await getLesson(await getDb(), (await params).slug);
  if (!l) return notFound();
  return ok({
    ...publicLesson(l),
    current: l.current,
    notYetStarted: l.notYetStarted,
    history: l.history.map(publicOverride),
    stream: publicStream(l.stream),
    channels: l.channels.map((c) => ({ url: c.url, kind: c.kind, labelEn: c.labelEn, labelAr: c.labelAr })),
  });
}
