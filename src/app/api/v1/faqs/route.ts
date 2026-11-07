import { getDb } from "@/server/db/client";
import { listFaqs } from "@/server/content/queries";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const category = new URL(req.url).searchParams.get("category") ?? undefined;
  return ok(await listFaqs(await getDb(), { category }));
}
