import { getDb } from "@/server/db/client";
import { getWhatsAppUrl } from "@/server/settings";
import { ok } from "@/server/api";

export const dynamic = "force-dynamic";

/** Public settings only — never expose secrets here. */
export async function GET() {
  return ok({ whatsappInviteUrl: await getWhatsAppUrl(await getDb()) });
}
