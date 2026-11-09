"use client";

import { Fragment, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import { undoAction } from "@/app/(admin)/admin/actions";

export type ActivityItem = { id: number; text: string; when: string; undoable: boolean; undone: boolean; day?: string };

export function ActivityList({ items, canUndo }: { items: ActivityItem[]; canUndo: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function doUndo(id: number) {
    setBusyId(id);
    setError(null);
    start(async () => {
      const r = await undoAction(id);
      if (!r.ok) setError(r.error);
      setBusyId(null);
      router.refresh();
    });
  }

  if (!items.length) return <p className="card p-4 text-sm text-muted">No changes yet.</p>;
  return (
    <>
      {error && <p role="alert" className="mb-2 rounded-xl bg-cancel-bg px-3 py-2 text-sm text-cancel">{error}</p>}
      <ul className="card divide-y divide-line">
        {items.map((i, n) => (
          <Fragment key={i.id}>
          {/* The day heading is its own row, so a search that hides the day's first change keeps the heading. */}
          {i.day && i.day !== items[n - 1]?.day && <li data-heading className="bg-bg-2 px-3 py-1.5 text-xs font-bold text-muted">{i.day}</li>}
          <li data-item className="p-3">
            <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className={`text-sm ${i.undone ? "text-muted line-through" : ""}`}>{i.text}</p>
              <p className="text-xs text-muted">{i.when}</p>
            </div>
            {canUndo && i.undoable && (
              <button type="button" onClick={() => doUndo(i.id)} disabled={pending}
                className="flex shrink-0 items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-semibold">
                <Undo2 size={13} /> {busyId === i.id ? "…" : "Undo"}
              </button>
            )}
            </div>
          </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
}
