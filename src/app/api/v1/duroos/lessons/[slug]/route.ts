import { getDb } from "@/server/db/client";
import { getLesson } from "@/server/duroos/queries";
import { notFound, ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const lesson = await getLesson(await getDb(), (await params).slug);
  return lesson ? ok(lesson) : notFound();
}
