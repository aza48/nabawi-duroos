import { getDb } from "@/server/db/client";
import { getHelpContact, whatsappLink } from "@/server/settings";

/** WhatsApp link to the owner, prefilled for sending a missing book or a summary. */
export async function addBookHref(where?: string): Promise<string> {
  const help = await getHelpContact(await getDb());
  return whatsappLink(help, `Assalamu alaykum. For the MESH library${where ? ` (${where})` : ""}: here is my class timetable and the book we were set, or a summary to share.`);
}
