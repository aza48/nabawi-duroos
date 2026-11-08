"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { answerQuestionAction, closeQuestionAction } from "@/app/(admin)/admin/actions";
import { btnGhost, btnPrimary, ErrorNote, inputCls } from "../ui";

export type QuestionItem = { id: number; topic: string; question: string; context: string; answer: string | null; answeredBy: string | null; answeredAt: string | null };

function OpenQuestion({ q }: { q: QuestionItem }) {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <li className="card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{q.topic}</p>
      <p className="mt-1 font-semibold">{q.question}</p>
      {q.context && <p className="mt-1 text-sm text-muted">{q.context}</p>}
      <form
        className="mt-3 grid gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          start(async () => {
            const r = await answerQuestionAction(q.id, answer);
            if (r.ok) router.refresh();
            else setError(r.error);
          });
        }}
      >
        <textarea className={inputCls} rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Your answer. If you are not sure either, say so." required />
        <div className="flex flex-wrap gap-2">
          <button className={btnPrimary + " sm:w-auto"} disabled={pending || !answer.trim()}>{pending ? "Saving…" : "Save answer"}</button>
          <button
            type="button"
            className={btnGhost}
            disabled={pending}
            onClick={() => start(async () => { const r = await closeQuestionAction(q.id); if (r.ok) router.refresh(); else setError(r.error); })}
          >
            Not needed any more
          </button>
        </div>
        {error && <ErrorNote>{error}</ErrorNote>}
      </form>
    </li>
  );
}

export function QuestionList({ open, answered }: { open: QuestionItem[]; answered: QuestionItem[] }) {
  return (
    <div className="grid gap-8">
      <section>
        <h2 className="mb-2 text-lg font-semibold">Waiting for an answer ({open.length})</h2>
        {open.length === 0 ? (
          <p className="card p-4 text-sm text-muted">Nothing is waiting. Thank you.</p>
        ) : (
          <ul className="grid gap-3">{open.map((q) => <OpenQuestion key={q.id} q={q} />)}</ul>
        )}
      </section>
      {answered.length > 0 && (
        <section>
          <h2 className="mb-2 text-lg font-semibold">Answered</h2>
          <p className="mb-2 text-sm text-muted">Saved. The site changes only after the answer has been read and written up.</p>
          <ul className="grid gap-3">
            {answered.map((q) => (
              <li key={q.id} className="card p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{q.topic}</p>
                <p className="mt-1 text-sm font-semibold">{q.question}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{q.answer}</p>
                <p className="mt-2 text-xs text-muted">{q.answeredBy}{q.answeredAt ? `, ${new Date(q.answeredAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : ""}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
