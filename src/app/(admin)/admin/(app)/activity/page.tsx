import type { Metadata } from "next";
import { requireAdmin } from "@/server/auth/session";
import { can } from "@/server/auth/permissions";
import { getDb } from "@/server/db/client";
import { listActivity } from "@/server/admin/audit";
import { describeActivity, isUndoable } from "@/server/admin/describe";
import { ActivityList } from "@/features/admin/ActivityList";
import { timeAgo, dayLabel } from "@/features/admin/time";
import { Filterable } from "@/features/admin/Filterable";

export const metadata: Metadata = { title: "Activity" };

export default async function Page() {
  const actor = await requireAdmin();
  const rows = await listActivity(await getDb(), { limit: 200 });
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-semibold">Activity</h1>
      <p className="mb-4 text-sm text-muted">Every change by every admin. Undo puts things back exactly as they were.</p>
      <Filterable placeholder="Search changes, for example a shaykh, guide or admin">
      <ActivityList
        canUndo={can(actor.role, "activity.undo")}
        items={rows.map((r) => ({ id: r.id, text: describeActivity(r), when: timeAgo(r.createdAt), undoable: isUndoable(r), undone: !!r.undoneAt, day: dayLabel(r.createdAt) }))}
      />
      </Filterable>
    </div>
  );
}
