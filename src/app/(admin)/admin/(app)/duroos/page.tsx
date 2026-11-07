import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminLessons } from "@/server/admin/queries";
import { LessonList } from "@/features/admin/duroos/LessonList";
import { DUROOS_NAV, SubNav, btnGhost } from "@/features/admin/ui";

export const metadata: Metadata = { title: "Duroos" };

export default async function Page() {
  await requireAdmin("duroos.write");
  const rows = await adminLessons(await getDb());
  return (
    <div className="mx-auto max-w-2xl">
      <SubNav items={DUROOS_NAV} active="/admin/duroos" />
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lessons <span className="text-base font-normal text-muted">({rows.length})</span></h1>
        <Link href="/admin/duroos/lesson/new" className={btnGhost}><Plus size={15} /> New lesson</Link>
      </div>
      <p className="mb-3 text-sm text-muted">Tap a lesson to edit it or to cancel, postpone or add a note for a date.</p>
      <LessonList rows={rows} />
    </div>
  );
}
