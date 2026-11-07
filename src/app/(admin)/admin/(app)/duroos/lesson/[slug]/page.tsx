import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminLesson, adminMasjids } from "@/server/admin/queries";
import { LessonForm } from "@/features/admin/duroos/LessonForm";
import { OverrideList } from "@/features/admin/duroos/OverrideList";
import { ChangeDarsButton } from "@/features/admin/ChangeDarsSheet";

export const metadata: Metadata = { title: "Edit lesson" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin("duroos.write");
  const db = await getDb();
  const { slug } = await params;
  const [l, masjids] = await Promise.all([adminLesson(db, slug), adminMasjids(db)]);
  if (!l) notFound();
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/duroos" className="text-sm text-muted">← Lessons</Link>
      <h1 className="mt-1 text-2xl font-semibold leading-tight">{l.bookEn}</h1>
      <p className="text-sm text-muted">{l.shaykh.nameEn}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <ChangeDarsButton lessonSlug={l.slug} title={`${l.shaykh.nameEn}: ${l.bookEn}`} label="Cancel, postpone or add a note" />
        <a href={`/duroos/lesson/${l.slug}`} target="_blank" className="inline-flex items-center gap-1 rounded-full border border-line px-3.5 py-2 text-sm font-semibold">
          View on site <ExternalLink size={14} />
        </a>
      </div>
      <h2 className="mt-6 mb-2 text-lg font-semibold">Upcoming changes</h2>
      <OverrideList items={l.upcoming} />
      <h2 className="mt-7 mb-3 text-lg font-semibold">Lesson details</h2>
      <LessonForm masjids={masjids} lesson={{ ...l }} />
    </div>
  );
}
