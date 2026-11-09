"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { updateShaykhAction } from "@/app/(admin)/admin/actions";
import { btnGhost, btnPrimary, ErrorNote, Field, inputCls } from "../ui";
import { useFeedback } from "../Feedback";

type S = { slug: string; nameEn: string; nameAr: string; roleEn: string | null; roleAr: string | null; photo?: string | null; facts: { en: string; ar: string }[] };

export function ShaykhForm({ shaykh }: { shaykh: S }) {
  const router = useRouter();
  const [v, setV] = useState(shaykh);
  const [msg, setMsg] = useState<string | null>(null);
  const { notify } = useFeedback();
  // Messages show in the toast above the tab bar, never under the button where a phone hides them.
  useEffect(() => { if (msg) notify(msg); }, [msg, notify]);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const setFact = (i: number, k: "en" | "ar", val: string) => setV((p) => ({ ...p, facts: p.facts.map((f, j) => (j === i ? { ...f, [k]: val } : f)) }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    start(async () => {
      const r = await updateShaykhAction({ slug: v.slug, nameEn: v.nameEn, nameAr: v.nameAr, roleEn: v.roleEn || null, roleAr: v.roleAr || null, photo: v.photo?.trim() || null, facts: v.facts });
      if (!r.ok) return setError(r.error);
      setMsg("Saved.");
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Field label="Name (English)"><input className={inputCls} value={v.nameEn} onChange={(e) => setV({ ...v, nameEn: e.target.value })} required /></Field>
      <Field label="Name (Arabic)"><input dir="rtl" className={inputCls} value={v.nameAr} onChange={(e) => setV({ ...v, nameAr: e.target.value })} required /></Field>
      <Field label="Role line (English)"><input className={inputCls} value={v.roleEn ?? ""} onChange={(e) => setV({ ...v, roleEn: e.target.value })} /></Field>
      <Field label="Role line (Arabic)"><input dir="rtl" className={inputCls} value={v.roleAr ?? ""} onChange={(e) => setV({ ...v, roleAr: e.target.value })} /></Field>
      <Field label="Photo link (optional)" hint="Only a photo the shaykh's own official channel publishes. Leave empty to show the calligraphic name badge.">
        <input className={inputCls} inputMode="url" value={v.photo ?? ""} onChange={(e) => setV({ ...v, photo: e.target.value })} placeholder="https://… or /shaykhs/…" />
      </Field>
      {v.photo?.trim() && /^(https:\/\/|\/)/.test(v.photo.trim()) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={v.photo.trim()} alt="" className="h-20 w-20 rounded-full object-cover ring-1 ring-line" />
      )}
      <div>
        <p className="mb-1.5 text-sm font-semibold">Verified facts</p>
        <p className="mb-2 text-xs text-muted">Only facts from a reliable source.</p>
        <div className="grid gap-3">
          {v.facts.map((f, i) => (
            <div key={i} className="card grid gap-2 p-3">
              <textarea className={inputCls} rows={2} placeholder="English" value={f.en} onChange={(e) => setFact(i, "en", e.target.value)} />
              <textarea dir="rtl" className={inputCls} rows={2} placeholder="العربية" value={f.ar} onChange={(e) => setFact(i, "ar", e.target.value)} />
              <button type="button" className={`${btnGhost} justify-self-end`} onClick={() => setV({ ...v, facts: v.facts.filter((_, j) => j !== i) })}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" className={`${btnGhost} mt-2`} onClick={() => setV({ ...v, facts: [...v.facts, { en: "", ar: "" }] })}>
          <Plus size={14} /> Add a fact
        </button>
      </div>
      <button className={btnPrimary} disabled={pending}>{pending ? "Saving…" : "Save profile"}</button>
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
