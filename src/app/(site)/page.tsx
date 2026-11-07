import { getDb } from "@/server/db/client";
import { getToday, listAnnouncements } from "@/server/duroos/queries";
import { listGuides } from "@/server/content/queries";
import { getWhatsAppUrl } from "@/server/settings";
import { HomePage } from "@/features/home/HomePage";

export const revalidate = 60;

export default async function Home() {
  const db = await getDb();
  const [today, guides, updates, whatsappUrl] = await Promise.all([
    getToday(db),
    listGuides(db),
    listAnnouncements(db, { limit: 3 }),
    getWhatsAppUrl(db),
  ]);
  return <HomePage today={today} guides={guides} updates={updates} whatsappUrl={whatsappUrl} />;
}
