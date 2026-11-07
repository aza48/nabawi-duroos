import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminGuide } from "@/server/admin/queries";
import { GuideForm } from "@/features/admin/content/GuideForm";

export const metadata: Metadata = { title: "Edit guide" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin("content.write");
  const g = await adminGuide(await getDb(), (await params).slug);
  if (!g) notFound();
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/content" className="text-sm text-muted">← Content</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">Edit guide</h1>
      <GuideForm value={{ slug: g.slug, title: g.title, summary: g.summary, bodyHtml: g.bodyHtml, stage: g.stage, status: g.status }} />
    </div>
  );
}
