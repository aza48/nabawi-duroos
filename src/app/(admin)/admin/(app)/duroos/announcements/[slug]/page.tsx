import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminAnnouncement, adminLessons, adminMasjids, adminShaykhs } from "@/server/admin/queries";
import { lessonOptions } from "@/features/admin/duroos/lesson-options";
import { AnnouncementForm } from "@/features/admin/duroos/AnnouncementForm";

export const metadata: Metadata = { title: "Edit update" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin("announcements.write");
  const db = await getDb();
  const { slug } = await params;
  const [a, shaykhs, masjids, lessons] = await Promise.all([adminAnnouncement(db, slug), adminShaykhs(db), adminMasjids(db), adminLessons(db)]);
  if (!a) notFound();
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/duroos/announcements" className="text-sm text-muted">← Updates</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">Edit update</h1>
      <AnnouncementForm
        shaykhs={shaykhs.map((s) => ({ slug: s.slug, nameEn: s.nameEn }))}
        masjids={masjids}
        lessons={lessonOptions(lessons)}
        value={{
          slug: a.slug, titleEn: a.titleEn, titleAr: a.titleAr, bodyEn: a.bodyEn, bodyAr: a.bodyAr, type: a.type as never,
          eventDate: a.eventDate, shaykhSlug: a.shaykhSlug, lessonSlug: a.lessonSlug, masjidId: a.masjidId, sourceUrl: a.sourceUrl, status: a.status,
        }}
      />
    </div>
  );
}
