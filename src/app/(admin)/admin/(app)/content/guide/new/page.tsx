import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { GuideForm } from "@/features/admin/content/GuideForm";

export const metadata: Metadata = { title: "New guide" };

export default async function Page() {
  await requireAdmin("content.write");
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/content" className="text-sm text-muted">← Content</Link>
      <h1 className="mt-1 mb-4 text-2xl font-semibold">New guide</h1>
      <GuideForm value={{ title: "", summary: "", bodyHtml: "", stage: "getting-started", status: "draft" }} />
    </div>
  );
}
