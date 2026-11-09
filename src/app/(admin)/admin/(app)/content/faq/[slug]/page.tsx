import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { adminFaq } from "@/server/admin/queries";
import { FaqForm } from "@/features/admin/content/FaqForm";

export const metadata: Metadata = { title: "Edit answer" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin("content.write");
  const f = await adminFaq(await getDb(), (await params).slug);
  if (!f) notFound();
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/content" className="text-sm text-muted">← Content</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">Edit answer</h1>
      <FaqForm value={{ slug: f.slug, question: f.question, answerHtml: f.answerHtml, category: f.category as never, tags: f.tags, status: f.status, questionAr: f.questionAr, answerHtmlAr: f.answerHtmlAr }} />
    </div>
  );
}
