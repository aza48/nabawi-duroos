"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createLessonAction, updateLessonAction } from "@/app/(admin)/admin/actions";
import { btnPrimary, ErrorNote, Field, inputCls } from "../ui";
import { useFeedback } from "../Feedback";

type Lesson = {
  slug?: string; bookEn: string; bookAr: string; bookAuthorEn: string | null; bookAuthorAr: string | null; bookUrl?: string | null; topic: string;
  prayer: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha"; days: number[]; locationEn: string; locationAr: string;
  noteEn: string | null; noteAr: string | null; status: "active" | "paused" | "finished";
  validFrom: string | null; validTo: string | null; masjidId: string;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
const TOPICS = ["aqidah", "tafsir", "hadith", "fiqh", "sirah", "manhaj", "usul"];

export function LessonForm({
  lesson, masjids, shaykhs,
}: {
  lesson: Lesson;
  masjids: { id: string; name: string }[];
  shaykhs?: { slug: string; nameEn: string }[];
}) {
  const router = useRouter();
  const [v, setV] = useState<Lesson>(lesson);
  // No silent default: a new dars must be given its shaykh on purpose.
  const [shaykhSlug, setShaykhSlug] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const { notify } = useFeedback();
  // Messages show in the toast above the tab bar, never under the button where a phone hides them.
  useEffect(() => { if (msg) notify(msg); }, [msg, notify]);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = <K extends keyof Lesson>(k: K, val: Lesson[K]) => setV((p) => ({ ...p, [k]: val }));
  const toggleDay = (d: number) => set("days", v.days.includes(d) ? v.days.filter((x) => x !== d) : [...v.days, d].sort());

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    const fields = {
      bookEn: v.bookEn, bookAr: v.bookAr, bookAuthorEn: v.bookAuthorEn || null, bookAuthorAr: v.bookAuthorAr || null, bookUrl: v.bookUrl?.trim() || null,
      topic: v.topic, prayer: v.prayer, days: v.days, locationEn: v.locationEn, locationAr: v.locationAr,
      noteEn: v.noteEn || null, noteAr: v.noteAr || null, status: v.status,
      validFrom: v.validFrom || null, validTo: v.validTo || null, masjidId: v.masjidId,
    };
    start(async () => {
      if (lesson.slug) {
        const r = await updateLessonAction({ slug: lesson.slug, ...fields });
        if (!r.ok) return setError(r.error);
        setMsg("Saved. The public schedule is updated.");
        router.refresh();
      } else {
        const r = await createLessonAction({ ...fields, shaykhSlug });
        if (!r.ok) return setError(r.error);
        router.push(`/admin/duroos/lesson/${r.data}`);
      }
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      {shaykhs && (
        <Field label="Shaykh">
          <select className={inputCls} value={shaykhSlug} onChange={(e) => setShaykhSlug(e.target.value)} required>
            <option value="" disabled>Choose the shaykh</option>
            {shaykhs.map((s) => <option key={s.slug} value={s.slug}>{s.nameEn}</option>)}
          </select>
        </Field>
      )}
      <Field label="Book (English)"><input className={inputCls} value={v.bookEn} onChange={(e) => set("bookEn", e.target.value)} required /></Field>
      <Field label="Book (Arabic)"><input dir="rtl" className={inputCls} value={v.bookAr} onChange={(e) => set("bookAr", e.target.value)} required /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Author (English)"><input className={inputCls} value={v.bookAuthorEn ?? ""} onChange={(e) => set("bookAuthorEn", e.target.value)} /></Field>
        <Field label="Author (Arabic)"><input dir="rtl" className={inputCls} value={v.bookAuthorAr ?? ""} onChange={(e) => set("bookAuthorAr", e.target.value)} /></Field>
      </div>
      <Field label="Link to the book (optional)" hint="A PDF or the MESH Library page, shown on the dars page. https:// or /library/…"><input className={inputCls} inputMode="url" value={v.bookUrl ?? ""} onChange={(e) => set("bookUrl", e.target.value)} placeholder="https://…" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Masjid">
          <select className={inputCls} value={v.masjidId} onChange={(e) => set("masjidId", e.target.value)}>
            {masjids.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </Field>
        <Field label="After which prayer">
          <select className={`${inputCls} capitalize`} value={v.prayer} onChange={(e) => set("prayer", e.target.value as Lesson["prayer"])}>
            {PRAYERS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
      </div>
      <div>
        <p className="mb-1.5 text-sm font-semibold">Days</p>
        <div className="flex flex-wrap gap-1.5">
          {DAYS.map((d, i) => (
            <button key={d} type="button" onClick={() => toggleDay(i)} aria-pressed={v.days.includes(i)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${v.days.includes(i) ? "bg-primary text-primary-ink" : "border border-line"}`}>{d}</button>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted">Leave all off if the source doesn&apos;t say which days.</p>
      </div>
      <Field label="Place (English)"><input className={inputCls} value={v.locationEn} onChange={(e) => set("locationEn", e.target.value)} required /></Field>
      <Field label="Place (Arabic)"><input dir="rtl" className={inputCls} value={v.locationAr} onChange={(e) => set("locationAr", e.target.value)} required /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Topic">
          <select className={`${inputCls} capitalize`} value={v.topic} onChange={(e) => set("topic", e.target.value)}>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={inputCls} value={v.status} onChange={(e) => set("status", e.target.value as Lesson["status"])}>
            <option value="active">Running</option><option value="paused">Paused</option><option value="finished">Finished</option>
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Runs from (optional)"><input type="date" className={inputCls} value={v.validFrom ?? ""} onChange={(e) => set("validFrom", e.target.value || null)} /></Field>
        <Field label="Runs until (optional)"><input type="date" className={inputCls} value={v.validTo ?? ""} onChange={(e) => set("validTo", e.target.value || null)} /></Field>
      </div>
      <Field label="Note (English, optional)"><input className={inputCls} value={v.noteEn ?? ""} onChange={(e) => set("noteEn", e.target.value)} /></Field>
      <Field label="Note (Arabic, optional)"><input dir="rtl" className={inputCls} value={v.noteAr ?? ""} onChange={(e) => set("noteAr", e.target.value)} /></Field>
      <button className={btnPrimary} disabled={pending}>{pending ? "Saving…" : lesson.slug ? "Save lesson" : "Add lesson"}</button>
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
