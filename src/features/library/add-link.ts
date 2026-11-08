import { getDb } from "@/server/db/client";
import { getHelpContact, whatsappLink } from "@/server/settings";

/** WhatsApp link to the owner, prefilled (in the reader's language) for sending a missing book or a summary. */
export async function addBookHref(where?: string, locale: "en" | "ar" = "en"): Promise<string> {
  const help = await getHelpContact(await getDb());
  if (locale === "ar") return whatsappLink(help, `السلام عليكم. لمكتبة MESH${where ? ` (${where})` : ""}: هذا جدول شعبتي والكتاب المقرر علينا، أو ملخص أشاركه.`);
  return whatsappLink(help, `Assalamu alaykum. For the MESH library${where ? ` (${where})` : ""}: here is my class timetable and the book we were set, or a summary to share.`);
}
