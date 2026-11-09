"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteGuideAction, saveGuideAction } from "@/app/(admin)/admin/actions";
import { btnGhost, btnPrimary, ErrorNote, Field, inputCls } from "../ui";
import { RichText } from "./RichText";
import { useFeedback } from "../Feedback";

type Stage = "getting-started" | "getting-settled" | "study" | "family" | "leaving";
type G = { slug?: string; title: string; summary: string; bodyHtml: string; stage: Stage; status: "draft" | "published" };

const STAGES: { id: Stage; label: string }[] = [
  { id: "getting-started", label: "Getting started" }, { id: "getting-settled", label: "Getting settled" }, { id: "study", label: "Study & university" },
  { id: "family", label: "Family life" }, { id: "leaving", label: "Leaving Madinah" },
];

export function GuideForm({ value }: { value: G }) {
  const router = useRouter();
  const { confirm, notify } = useFeedback();
  const [v, setV] = useState<G>(value);
  // Unticked by default: fixing a typo must not stamp the page as checked today.
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  // Messages show in the toast above the tab bar, never under the button where a phone hides them.
  useEffect(() => { if (msg) notify(msg); }, [msg, notify]);
  const [pending, start] = useTransition();

  function save(status: G["status"]) {
    setError(null);
    setMsg(null);
    start(async () => {
      const r = await saveGuideAction({ slug: value.slug, title: v.title, summary: v.summary, bodyHtml: v.bodyHtml, stage: v.stage, status, markVerified: verified });
      if (!r.ok) return setError(r.error);
      setMsg(status === "published" ? "Published." : "Draft saved.");
      if (!value.slug && r.data) router.replace(`/admin/content/guide/${r.data}`);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); save("published"); }} className="grid gap-4">
      <Field label="Title"><input className={inputCls} value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} required /></Field>
      <Field label="One-line summary" hint="Shown on the guide card and in Google results.">
        <input className={inputCls} value={v.summary} onChange={(e) => setV({ ...v, summary: e.target.value })} required />
      </Field>
      <Field label="Section">
        <select className={inputCls} value={v.stage} onChange={(e) => setV({ ...v, stage: e.target.value as Stage })}>
          {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </Field>
      {/* min-w-0: the editor toolbar must not widen the form past the phone screen. */}
      <div className="min-w-0">
        <p className="mb-1.5 text-sm font-semibold">Guide</p>
        <RichText value={v.bodyHtml} onChange={(html) => setV((p) => ({ ...p, bodyHtml: html }))} placeholder="Guide body" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" className="size-5 accent-[var(--primary)]" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
        I checked this is correct today
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={`${btnGhost} py-3`} disabled={pending} onClick={() => save("draft")}>Save draft</button>
        <button className={btnPrimary} disabled={pending}>{pending ? "Saving…" : "Publish"}</button>
      </div>
      {value.slug && (
        <button type="button" className="mt-2 min-h-11 rounded-full border border-cancel/40 px-4 text-sm font-semibold text-cancel" disabled={pending}
          onClick={async () => {
            if (!(await confirm({ title: "Delete this guide?", body: "It disappears from the site straight away. You can bring it back with Undo.", confirmLabel: "Delete", danger: true }))) return;
            start(async () => {
              const r = await deleteGuideAction(value.slug!);
              if (!r.ok) return setError(r.error);
              notify("Guide deleted", { undoAuditId: r.data });
              router.push("/admin/content");
            });
          }}>
          Delete guide
        </button>
      )}
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
