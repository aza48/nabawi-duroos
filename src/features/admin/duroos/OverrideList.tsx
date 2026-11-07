"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { revokeOverrideAction } from "@/app/(admin)/admin/actions";

type O = { id: number; kind: string; startsOn: string; endsOn: string; noteEn: string | null };

export function OverrideList({ items }: { items: O[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  if (!items.length) return <p className="text-sm text-muted">No upcoming changes.</p>;
  return (
    <ul className="card divide-y divide-line">
      {items.map((o) => (
        <li key={o.id} className="flex items-center justify-between gap-3 p-3">
          <div className="text-sm">
            <b className="capitalize">{o.kind.replace("_", " ")}</b> · {o.startsOn === o.endsOn ? o.startsOn : `${o.startsOn} to ${o.endsOn}`}
            {o.noteEn && <p className="text-xs text-muted">{o.noteEn}</p>}
          </div>
          <button type="button" disabled={pending}
            onClick={() => start(async () => { await revokeOverrideAction(o.id); router.refresh(); })}
            className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-semibold">Withdraw</button>
        </li>
      ))}
    </ul>
  );
}
