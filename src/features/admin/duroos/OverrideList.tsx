"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { revokeOverrideAction } from "@/app/(admin)/admin/actions";
import { useFeedback } from "../Feedback";

type O = { id: number; kind: string; startsOn: string; endsOn: string; noteEn: string | null };

export function OverrideList({ items }: { items: O[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const { confirm, notify } = useFeedback();
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
            onClick={async () => {
              const when = o.startsOn === o.endsOn ? o.startsOn : `${o.startsOn} to ${o.endsOn}`;
              if (!(await confirm({ title: `Withdraw this ${o.kind.replace("_", " ")}?`, body: `The dars goes back to its normal schedule for ${when}, on the site, the calendar feed and the app.`, confirmLabel: "Withdraw", danger: true }))) return;
              start(async () => {
                const r = await revokeOverrideAction(o.id);
                notify(r.ok ? "Withdrawn. The schedule is back to normal." : r.error);
                router.refresh();
              });
            }}
            className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-semibold">Withdraw</button>
        </li>
      ))}
    </ul>
  );
}
