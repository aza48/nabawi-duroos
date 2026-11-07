import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminMasjids, adminShaykhs } from "@/server/admin/queries";
import { LessonForm } from "@/features/admin/duroos/LessonForm";

export const metadata: Metadata = { title: "New lesson" };

export default async function Page() {
  await requireAdmin("duroos.write");
  const db = await getDb();
  const [masjids, shaykhs] = await Promise.all([adminMasjids(db), adminShaykhs(db)]);
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/duroos" className="text-sm text-muted">← Lessons</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">New lesson</h1>
      <LessonForm
        masjids={masjids}
        shaykhs={shaykhs.map((s) => ({ slug: s.slug, nameEn: s.nameEn }))}
        lesson={{
          bookEn: "", bookAr: "", bookAuthorEn: null, bookAuthorAr: null, topic: "aqidah", prayer: "maghrib", days: [],
          locationEn: "", locationAr: "", noteEn: null, noteAr: null, status: "active", validFrom: null, validTo: null,
          masjidId: masjids[0]?.id ?? "nabawi",
        }}
      />
    </div>
  );
}
