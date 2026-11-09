"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteFaqAction, saveFaqAction } from "@/app/(admin)/admin/actions";
import { btnGhost, btnPrimary, ErrorNote, Field, inputCls } from "../ui";
import { RichText } from "./RichText";
import { useUnsavedWarning } from "../useUnsavedWarning";
import { useFeedback } from "../Feedback";
import { hasText, langOf, LangTabs, type Lang } from "./LangTabs";

type Category = "getting-started" | "getting-settled" | "family" | "university" | "duroos" | "leaving";
type F = {
  slug?: string; question: string; answerHtml: string; category: Category; tags: string[]; status: "draft" | "published";
  /** Arabic for /ar/ask; empty means not translated yet. */
  questionAr?: string | null; answerHtmlAr?: string | null;
};

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "getting-started", label: "Getting started" }, { id: "getting-settled", label: "Getting settled" },
  { id: "family", label: "Family life" }, { id: "university", label: "University" },
  { id: "duroos", label: "Duroos" }, { id: "leaving", label: "Leaving Madinah" },
];

export function FaqForm({ value }: { value: F }) {
  const router = useRouter();
  const { confirm, notify } = useFeedback();
  const [v, setV] = useState<F>({ ...value, questionAr: value.questionAr ?? "", answerHtmlAr: value.answerHtmlAr ?? "" });
  const [lang, setLang] = useState<Lang>("en");
  const [tags, setTags] = useState(value.tags.join(", "));
  const markSaved = useUnsavedWarning([v, tags]);
  // Unticked by default: fixing a typo must not stamp the page as checked today.
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  // Messages show in the toast above the tab bar, never under the button where a phone hides them.
  useEffect(() => { if (msg) { notify(msg); markSaved(); } }, [msg, notify, markSaved]);
  const [pending, start] = useTransition();

  function save(status: F["status"]) {
    setError(null);
    setMsg(null);
    start(async () => {
      const r = await saveFaqAction({
        slug: value.slug, question: v.question, answerHtml: v.answerHtml, category: v.category, status, markVerified: verified,
        // Empty clears the Arabic, so the Arabic page shows the English again.
        questionAr: v.questionAr ?? "", answerHtmlAr: v.answerHtmlAr ?? "",
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      if (!r.ok) return setError(r.error);
      setMsg(status === "published" ? "Published." : "Draft saved.");
      if (!value.slug && r.data) router.replace(`/admin/content/faq/${r.data}`);
      else router.refresh();
    });
  }

  return (
    // A required English field left empty while the Arabic tab is open: show it before the browser points at it.
    <form onSubmit={(e) => { e.preventDefault(); save("published"); }} onInvalidCapture={(e) => { const l = langOf(e.target); if (l) setLang(l); }} className="grid gap-4">
      <LangTabs
        lang={lang}
        onChange={setLang}
        hasArabic={hasText(v.questionAr) || hasText(v.answerHtmlAr)}
        en={
          <>
            <Field label="Question"><input className={inputCls} value={v.question} onChange={(e) => setV({ ...v, question: e.target.value })} required /></Field>
            {/* min-w-0: the editor toolbar must not widen the form past the phone screen. */}
            <div className="min-w-0">
              <p className="mb-1.5 text-sm font-semibold">Answer</p>
              <RichText value={v.answerHtml} onChange={(html) => setV((p) => ({ ...p, answerHtml: html }))} placeholder="Answer" />
            </div>
          </>
        }
        ar={
          <>
            <p className="text-sm text-muted">Optional. Each Arabic field that is filled in replaces the English on the Arabic page; empty fields keep the English there.</p>
            <Field label="Question (Arabic)">
              <input dir="rtl" lang="ar" className={inputCls} value={v.questionAr ?? ""} onChange={(e) => setV({ ...v, questionAr: e.target.value })} />
            </Field>
            <div className="min-w-0" dir="rtl" lang="ar">
              <p className="mb-1.5 text-sm font-semibold" dir="ltr" lang="en">Answer (Arabic)</p>
              <RichText value={v.answerHtmlAr ?? ""} onChange={(html) => setV((p) => ({ ...p, answerHtmlAr: html }))} placeholder="Answer in Arabic" />
            </div>
          </>
        }
      />
      <Field label="Category">
        <select className={inputCls} value={v.category} onChange={(e) => setV({ ...v, category: e.target.value as Category })}>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </Field>
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
        <button type="button" className="mt-2 min-h-11 rounded-full border border-cancel/40 px-4 text-sm font-semibold text-cancel" disabled={pending}
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
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
