import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { getHelpContact, getWhatsAppUrl } from "@/server/settings";
import { HelpContactForm, WhatsAppForm } from "@/features/admin/more/SettingsForms";

export const metadata: Metadata = { title: "Site settings" };

export default async function Page() {
  await requireAdmin("settings.write");
  const db = await getDb();
  const [whatsapp, help] = await Promise.all([getWhatsAppUrl(db), getHelpContact(db)]);
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/more" className="text-sm text-muted">← More</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">Site settings</h1>
      <div className="grid gap-8">
        <WhatsAppForm current={whatsapp} />
        <HelpContactForm current={help} />
      </div>
    </div>
  );
}
