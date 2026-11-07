import { getDb } from "@/server/db/client";
import { getWeek } from "@/server/duroos/queries";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

export async function GET() {
  return ok(await getWeek(await getDb()));
}
