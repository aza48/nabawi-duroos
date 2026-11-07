"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setSourceAction } from "@/app/(admin)/admin/actions";

type S = { handle: string; name: string; trusted: boolean; autoPublish: boolean; lastChecked: string; lastError: string | null };

export function SourceToggles({ items }: { items: S[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const set = (handle: string, patch: { trusted?: boolean; autoPublish?: boolean }) =>
    start(async () => { await setSourceAction({ handle, ...patch }); router.refresh(); });
  return (
    <ul className="card divide-y divide-line">
      {items.map((s) => (
        <li key={s.handle} className="grid gap-2 p-3.5">
          <div>
            <a href={`https://t.me/${s.handle}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline">@{s.handle}</a>
            <p className="text-xs text-muted">{s.name} · checked {s.lastChecked}</p>
            {s.lastError && <p className="text-xs text-cancel">Last problem: {s.lastError}</p>}
          </div>
          <label className="flex items-center justify-between gap-3 text-sm">
            Trusted channel
            <input type="checkbox" className="size-5 accent-[var(--primary)]" checked={s.trusted} disabled={pending} onChange={(e) => set(s.handle, { trusted: e.target.checked })} />
          </label>
          <label className="flex items-center justify-between gap-3 text-sm">
            Publish clear cancellations automatically
            <input type="checkbox" className="size-5 accent-[var(--primary)]" checked={s.autoPublish} disabled={pending || !s.trusted} onChange={(e) => set(s.handle, { autoPublish: e.target.checked })} />
          </label>
        </li>
      ))}
    </ul>
  );
}
