import { getDb } from "@/server/db/client";
import { getToday } from "@/server/duroos/queries";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok(await getToday(await getDb()));
}
