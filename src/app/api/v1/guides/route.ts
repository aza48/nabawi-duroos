import { getDb } from "@/server/db/client";
import { listGuides } from "@/server/content/queries";
import { ok } from "@/server/api";
import type { GuideStage } from "@/server/db/schema";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const stage = (new URL(req.url).searchParams.get("stage") ?? undefined) as GuideStage | undefined;
  return ok(await listGuides(await getDb(), { stage }));
}
