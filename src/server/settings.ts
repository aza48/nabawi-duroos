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

/** The number shown for help, suggestions and takhlees submissions. Fixed on purpose: it is not editable in the admin. */
export const HELP_CONTACT_DEFAULT = "+1 234 567 9076";

/** The help email, shown beside the help number everywhere. Fixed, like the number. */
export const HELP_EMAIL_DEFAULT = "mesh@albaseerah.org";

/** Always the fixed help number. Any old `help_contact` row in settings is ignored. */
export async function getHelpContact(_db?: Db): Promise<string> {
  return HELP_CONTACT_DEFAULT;
}

/** wa.me link for a phone number written any way ("+1 234 567 9076"). */
export function whatsappLink(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
