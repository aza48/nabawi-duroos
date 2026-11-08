import Link from "next/link";
import { ChevronRight, CircleCheck } from "lucide-react";
import type { AttentionItem } from "@/server/admin/attention";

/** The top of the admin home: everything that needs a person, with a count and a link to fix it. */
export function NeedsYou({ items }: { items: AttentionItem[] }) {
  if (!items.length) {
    return (
      <p className="card mt-4 flex items-center gap-2.5 p-3.5 text-sm font-semibold text-on">
        <CircleCheck size={18} /> Nothing needs you right now.
      </p>
    );
  }
  return (
    <section aria-labelledby="needs-you" className="mt-4">
      <h2 id="needs-you" className="mb-2 text-lg font-semibold">Needs you</h2>
      <ul className="card divide-y divide-line">
        {items.map((i) => (
          <li key={i.key}>
            <Link href={i.href} className="flex min-h-14 items-center gap-3 p-3 transition hover:bg-bg-2">
              <span className="grid min-w-9 place-items-center rounded-full bg-gold-bg px-2 py-1 text-sm font-bold tabular text-gold">{i.count}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{i.label}</span>
                {i.detail && <span className="block truncate text-xs text-muted">{i.detail}</span>}
              </span>
              <ChevronRight size={17} className="shrink-0 text-muted rtl:rotate-180" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
