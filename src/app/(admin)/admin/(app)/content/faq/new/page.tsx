import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { FaqForm } from "@/features/admin/content/FaqForm";

export const metadata: Metadata = { title: "New answer" };

export default async function Page() {
  await requireAdmin("content.write");
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/content" className="text-sm text-muted">← Content</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">New answer</h1>
      <FaqForm value={{ question: "", answerHtml: "", category: "getting-started", tags: [], status: "draft" }} />
    </div>
  );
}
