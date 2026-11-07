import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminShaykhs } from "@/server/admin/queries";
import { DUROOS_NAV, SubNav } from "@/features/admin/ui";

export const metadata: Metadata = { title: "Shuyukh" };

export default async function Page() {
  await requireAdmin("duroos.write");
  const rows = await adminShaykhs(await getDb());
  return (
    <div className="mx-auto max-w-2xl">
      <SubNav items={DUROOS_NAV} active="/admin/duroos/shaykhs" />
      <h1 className="mb-3 text-2xl font-semibold">Shuyukh</h1>
      <ul className="card divide-y divide-line">
        {rows.map((s) => (
          <li key={s.slug}>
            <Link href={`/admin/duroos/shaykh/${s.slug}`} className="block p-3">
              <p className="text-sm font-semibold">{s.nameEn}</p>
              <p className="ar-text text-sm text-muted">{s.nameAr}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
