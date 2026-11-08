"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveAnnouncementAction } from "@/app/(admin)/admin/actions";
import { btnGhost, btnPrimary, ErrorNote, Field, inputCls } from "../ui";

type Type = "cancellation" | "postponement" | "resumption" | "new-book" | "book-finished" | "reminder" | "info" | "guest" | "lecture";
type A = {
  slug?: string; titleEn: string; titleAr: string; bodyEn: string; bodyAr: string; type: Type;
  eventDate: string | null; shaykhSlug: string | null; lessonSlug: string | null; masjidId: string | null; sourceUrl: string | null; status: "draft" | "published" | "archived";
};
export type LessonOption = { slug: string; label: string; shaykhSlug: string };

/** Update types that also change the schedule when a dars and a date are set. */
const SCHEDULE_TYPES = new Set<Type>(["cancellation", "postponement", "resumption"]);

const TYPES: { id: Type; label: string }[] = [
  { id: "lecture", label: "Lecture" }, { id: "cancellation", label: "Cancellation" }, { id: "postponement", label: "Postponement" },
  { id: "resumption", label: "Lessons resume" }, { id: "new-book", label: "New book" }, { id: "book-finished", label: "Book finished" },
  { id: "guest", label: "Guest lesson" }, { id: "reminder", label: "Reminder" }, { id: "info", label: "Notice" },
];

export const EMPTY_ANNOUNCEMENT: A = {
  titleEn: "", titleAr: "", bodyEn: "", bodyAr: "", type: "lecture", eventDate: null, shaykhSlug: null, lessonSlug: null, masjidId: null, sourceUrl: null, status: "draft",
};

export function AnnouncementForm({ value, shaykhs, masjids, lessons = [] }: { value: A; shaykhs: { slug: string; nameEn: string }[]; masjids: { id: string; name: string }[]; lessons?: LessonOption[] }) {
  const router = useRouter();
  const [v, setV] = useState<A>(value);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = <K extends keyof A>(k: K, val: A[K]) => setV((p) => ({ ...p, [k]: val }));

  function save(status: A["status"]) {
    setError(null);
    setMsg(null);
    start(async () => {
      const r = await saveAnnouncementAction({
        slug: value.slug, titleEn: v.titleEn, titleAr: v.titleAr, bodyEn: v.bodyEn, bodyAr: v.bodyAr, type: v.type,
        eventDate: v.eventDate || null, shaykhSlug: v.shaykhSlug || null, lessonSlug: v.lessonSlug || null, masjidId: v.masjidId || null, sourceUrl: v.sourceUrl || null, status,
      });
      if (!r.ok) return setError(r.error);
      setMsg(
        status === "published"
          ? r.data?.scheduleUpdated
            ? "Published. The dars card, calendar feed and Updates page all show the change."
            : SCHEDULE_TYPES.has(v.type)
              ? "Published on the Updates page only. Pick the dars and its date to change the schedule too."
              : "Published. It's live on the Updates page."
          : status === "archived"
            ? "Archived."
            : "Draft saved."
      );
      if (!value.slug && r.data) router.replace(`/admin/duroos/announcements/${r.data.slug}`);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); save("published"); }} className="grid gap-4">
      <Field label="Type">
        <select className={inputCls} value={v.type} onChange={(e) => set("type", e.target.value as Type)}>
          {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
      </Field>
      <Field label="Title (English)"><input className={inputCls} value={v.titleEn} onChange={(e) => set("titleEn", e.target.value)} required /></Field>
      <Field label="Title (Arabic)"><input dir="rtl" className={inputCls} value={v.titleAr} onChange={(e) => set("titleAr", e.target.value)} required /></Field>
      <Field label="Details (English)" hint="Write dates as dates, not 'tonight' or 'tomorrow'.">
        <textarea className={inputCls} rows={4} value={v.bodyEn} onChange={(e) => set("bodyEn", e.target.value)} required />
      </Field>
      <Field label="Details (Arabic)"><textarea dir="rtl" className={inputCls} rows={4} value={v.bodyAr} onChange={(e) => set("bodyAr", e.target.value)} required /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date of the event"><input type="date" className={inputCls} value={v.eventDate ?? ""} onChange={(e) => set("eventDate", e.target.value || null)} /></Field>
        <Field label="Masjid">
          <select className={inputCls} value={v.masjidId ?? ""} onChange={(e) => set("masjidId", e.target.value || null)}>
            <option value="">Not set</option>
            {masjids.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Shaykh">
        <select className={inputCls} value={v.shaykhSlug ?? ""} onChange={(e) => setV((p) => ({ ...p, shaykhSlug: e.target.value || null, lessonSlug: null }))}>
          <option value="">Guest or not listed</option>
          {shaykhs.map((s) => <option key={s.slug} value={s.slug}>{s.nameEn}</option>)}
        </select>
      </Field>
      {lessons.length > 0 && (
        <Field
          label="Dars"
          hint={SCHEDULE_TYPES.has(v.type) ? "With a dars and a date, publishing also marks the dars cancelled, postponed or resumed on that day everywhere on the site." : "Optional: the dars this update is about."}
        >
          <select className={inputCls} value={v.lessonSlug ?? ""} onChange={(e) => set("lessonSlug", e.target.value || null)}>
            <option value="">{v.shaykhSlug ? "His only dars that day, if there is one" : "Not set"}</option>
            {lessons.filter((l) => !v.shaykhSlug || l.shaykhSlug === v.shaykhSlug).map((l) => <option key={l.slug} value={l.slug}>{l.label}</option>)}
          </select>
        </Field>
      )}
      <Field label="Source link (optional)" hint="The Telegram post this came from.">
        <input type="url" className={inputCls} placeholder="https://t.me/…" value={v.sourceUrl ?? ""} onChange={(e) => set("sourceUrl", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={`${btnGhost} py-3`} disabled={pending} onClick={() => save("draft")}>Save draft</button>
        <button className={btnPrimary} disabled={pending}>{pending ? "Saving…" : "Publish"}</button>
      </div>
      {value.slug && value.status === "published" && (
        <button type="button" className="text-sm text-muted underline" onClick={() => save("archived")}>Take it down (archive)</button>
      )}
      {msg && <p className="text-center text-sm text-on">{msg}</p>}
      {error && <ErrorNote>{error}</ErrorNote>}
    </form>
  );
}
