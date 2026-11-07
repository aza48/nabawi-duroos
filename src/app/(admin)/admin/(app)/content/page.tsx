import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminFaqs, adminGuides } from "@/server/admin/queries";
import { btnGhost } from "@/features/admin/ui";

export const metadata: Metadata = { title: "Content" };

const Badge = ({ status }: { status: string }) => (
  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold capitalize ${status === "published" ? "bg-on-bg text-on" : "bg-amber-bg text-amber"}`}>{status}</span>
);

export default async function Page() {
  await requireAdmin("content.write");
  const db = await getDb();
  const [faqs, guides] = await Promise.all([adminFaqs(db), adminGuides(db)]);
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Content</h1>

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Answers <span className="text-sm font-normal text-muted">({faqs.length})</span></h2>
          <Link href="/admin/content/faq/new" className={btnGhost}><Plus size={15} /> New answer</Link>
        </div>
        <p className="mb-2 text-sm text-muted">Turn questions that keep coming up in the WhatsApp group into a clear, checked answer.</p>
        <ul className="card divide-y divide-line">
          {faqs.map((f) => (
            <li key={f.slug}><Link href={`/admin/content/faq/${f.slug}`} className="flex items-center gap-3 p-3">
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{f.question}</span><Badge status={f.status} />
            </Link></li>
          ))}
          {!faqs.length && <li className="p-3 text-sm text-muted">No answers yet.</li>}
        </ul>
      </section>

      <section className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Guides <span className="text-sm font-normal text-muted">({guides.length})</span></h2>
          <Link href="/admin/content/guide/new" className={btnGhost}><Plus size={15} /> New guide</Link>
        </div>
        <ul className="card divide-y divide-line">
          {guides.map((g) => (
            <li key={g.slug}><Link href={`/admin/content/guide/${g.slug}`} className="flex items-center gap-3 p-3">
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{g.title}</span><Badge status={g.status} />
            </Link></li>
          ))}
          {!guides.length && <li className="p-3 text-sm text-muted">No guides yet.</li>}
        </ul>
      </section>
    </div>
  );
}
