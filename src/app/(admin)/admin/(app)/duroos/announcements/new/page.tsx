import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminMasjids, adminShaykhs } from "@/server/admin/queries";
import { AnnouncementForm, EMPTY_ANNOUNCEMENT } from "@/features/admin/duroos/AnnouncementForm";

export const metadata: Metadata = { title: "New update" };

export default async function Page() {
  await requireAdmin("announcements.write");
  const db = await getDb();
  const [shaykhs, masjids] = await Promise.all([adminShaykhs(db), adminMasjids(db)]);
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/duroos/announcements" className="text-sm text-muted">← Updates</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">New update</h1>
      <AnnouncementForm value={EMPTY_ANNOUNCEMENT} shaykhs={shaykhs.map((s) => ({ slug: s.slug, nameEn: s.nameEn }))} masjids={masjids} />
    </div>
  );
}
