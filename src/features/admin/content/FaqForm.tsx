"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteFaqAction, saveFaqAction } from "@/app/(admin)/admin/actions";
import { btnGhost, btnPrimary, ErrorNote, Field, inputCls } from "../ui";
import { RichText } from "./RichText";
import { useFeedback } from "../Feedback";

type Category = "getting-started" | "getting-settled" | "family" | "university" | "duroos" | "leaving";
type F = { slug?: string; question: string; answerHtml: string; category: Category; tags: string[]; status: "draft" | "published" };

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "getting-started", label: "Getting started" }, { id: "getting-settled", label: "Getting settled" },
  { id: "family", label: "Family life" }, { id: "university", label: "University" },
  { id: "duroos", label: "Duroos" }, { id: "leaving", label: "Leaving Madinah" },
];

export function FaqForm({ value }: { value: F }) {
  const router = useRouter();
  const { confirm, notify } = useFeedback();
  const [v, setV] = useState<F>(value);
  const [tags, setTags] = useState(value.tags.join(", "));
  const [verified, setVerified] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function save(status: F["status"]) {
    setError(null);
    setMsg(null);
    start(async () => {
      const r = await saveFaqAction({
        slug: value.slug, question: v.question, answerHtml: v.answerHtml, category: v.category, status, markVerified: verified,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      if (!r.ok) return setError(r.error);
      setMsg(status === "published" ? "Published." : "Draft saved.");
      if (!value.slug && r.data) router.replace(`/admin/content/faq/${r.data}`);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); save("published"); }} className="grid gap-4">
      <Field label="Question"><input className={inputCls} value={v.question} onChange={(e) => setV({ ...v, question: e.target.value })} required /></Field>
      <Field label="Category">
        <select className={inputCls} value={v.category} onChange={(e) => setV({ ...v, category: e.target.value as Category })}>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </Field>
      <div>
        <p className="mb-1.5 text-sm font-semibold">Answer</p>
        <RichText value={v.answerHtml} onChange={(html) => setV((p) => ({ ...p, answerHtml: html }))} placeholder="Answer" />
      </div>
      <Field label="Tags (comma separated)"><input className={inputCls} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="nafath, iqama" /></Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-5 accent-[var(--primary)]" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
        I checked this is correct today (updates the &quot;last verified&quot; date)
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={`${btnGhost} py-3`} disabled={pending} onClick={() => save("draft")}>Save draft</button>
        <button className={btnPrimary} disabled={pending}>{pending ? "Saving…" : "Publish"}</button>
      </div>
      {value.slug && (
        <button type="button" className="text-sm text-cancel underline" disabled={pending}
          onClick={async () => {
            if (!(await confirm({ title: "Delete this answer?", body: "It disappears from the site straight away. You can bring it back with Undo.", confirmLabel: "Delete", danger: true }))) return;
            start(async () => {
              const r = await deleteFaqAction(value.slug!);
              if (!r.ok) return setError(r.error);
              notify("Answer deleted", { undoAuditId: r.data });
              router.push("/admin/content");
            });
          }}>
          Delete answer
        </button>
      )}
      {msg && <p className="text-center text-sm text-on">{msg}</p>}
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
