import { eq } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { settings } from "@/server/db/schema";

export const WHATSAPP_INVITE_DEFAULT = "https://chat.whatsapp.com/KKNn4fLv51eIVq8OMLErL0";

export async function getSetting<T>(db: Db, key: string): Promise<T | null> {
  const [row] = await db.select().from(settings).where(eq(settings.key, key));
  return row ? (row.value as T) : null;
}

export async function setSetting(db: Db, key: string, value: unknown): Promise<void> {
  await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({ target: settings.key, set: { value } });
}

export async function getWhatsAppUrl(db: Db): Promise<string> {
  return (await getSetting<string>(db, "whatsapp_invite_url")) ?? WHATSAPP_INVITE_DEFAULT;
}
