import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { getWhatsAppUrl } from "@/server/settings";
import { WhatsAppForm } from "@/features/admin/more/SettingsForms";

export const metadata: Metadata = { title: "Site settings" };

export default async function Page() {
  await requireAdmin("settings.write");
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/more" className="text-sm text-muted">← More</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">Site settings</h1>
      <WhatsAppForm current={await getWhatsAppUrl(await getDb())} />
    </div>
  );
}
