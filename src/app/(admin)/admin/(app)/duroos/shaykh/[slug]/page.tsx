import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { shaykhs } from "@/server/db/schema";
import { ShaykhForm } from "@/features/admin/duroos/ShaykhForm";

export const metadata: Metadata = { title: "Edit shaykh" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin("duroos.write");
  const { slug } = await params;
  const [s] = await (await getDb()).select().from(shaykhs).where(eq(shaykhs.slug, slug));
  if (!s) notFound();
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/duroos/shaykhs" className="text-sm text-muted">← Shuyukh</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">{s.nameEn}</h1>
      <ShaykhForm shaykh={{ slug: s.slug, nameEn: s.nameEn, nameAr: s.nameAr, roleEn: s.roleEn, roleAr: s.roleAr, facts: s.facts }} />
    </div>
  );
}
