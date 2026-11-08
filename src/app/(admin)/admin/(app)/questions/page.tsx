import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { listQuestions } from "@/server/admin/questions";
import { QuestionList } from "@/features/admin/questions/QuestionList";

export const metadata: Metadata = { title: "Questions for you" };

export default async function Page() {
  await requireAdmin("content.write");
  const { open, answered } = await listQuestions(await getDb());
  const rows = (rs: typeof open) => rs.map((r) => ({ id: r.id, topic: r.topic, question: r.question, context: r.context, answer: r.answer, answeredBy: r.answeredBy, answeredAt: r.answeredAt?.toISOString() ?? null }));
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/more" className="text-sm text-muted">← More</Link>
      <h1 className="mt-1 text-2xl font-semibold">Questions for you</h1>
      <p className="mb-5 text-sm text-muted">
        MESH only publishes what it can state for certain. When it cannot, it asks here. Answer in your own words, one at a time. Your answer is saved, and the site does not change until it has been read, understood and written up properly.
      </p>
      <QuestionList open={rows(open)} answered={rows(answered)} />
    </div>
  );
}
