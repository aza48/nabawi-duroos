"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Megaphone, Send, Trash2 } from "lucide-react";
import { useLang } from "../lib/i18n";
import { ANNOUNCEMENT_TYPES, AnnouncementRow } from "../lib/types";
import { BookScope, listBookScopes, listShaykhScopes } from "../lib/scopes";
import { compressImageFile } from "./mesh/imageCompress";
import { PillButton } from "./ui";

/**
 * DB-backed announcement manager for the admin area.
 * Degrades gracefully: 401 → login prompt, 503 → "not configured" notice.
 */
export function AdminAnnouncements() {
  const { t, ui, annTypeLabel } = useLang();
  const [state, setState] = useState<"loading" | "unauthorized" | "notconfigured" | "ready">("loading");
  const [rows, setRows] = useState<AnnouncementRow[]>([]);
  const [msg, setMsg] = useState("");

  // form
  const shaykhs = listShaykhScopes();
  const books = listBookScopes();
  const [shaykhId, setShaykhId] = useState(shaykhs[0]?.id ?? "");
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState<string>("cancelled");
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [bodyAr, setBodyAr] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [lessonDate, setLessonDate] = useState("");
  const [image, setImage] = useState("");

  const onFlyerFile = async (file: File | undefined) => {
    if (!file) return;
    setMsg("");
    try {
      const dataUrl = await compressImageFile(file, 1000);
      if (dataUrl.length > 1000000) {
        setMsg(ui("flyerTooLarge"));
        return;
      }
      setImage(dataUrl);
    } catch {
      setMsg("✗");
    }
  };

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.status === 401) return setState("unauthorized");
      if (res.status === 503) return setState("notconfigured");
      if (!res.ok) return setState("notconfigured");
      const data = (await res.json()) as { announcements: AnnouncementRow[] };
      setRows(data.announcements);
      setState("ready");
    } catch {
      setState("notconfigured");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async (publishNow: boolean) => {
    setMsg("");
    const res = await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        shaykh_id: shaykhId,
        book_id: bookId || null,
        type,
        title_ar: titleAr,
        title_en: titleEn,
        body_ar: bodyAr,
        body_en: bodyEn,
        lesson_date: lessonDate || null,
        image: image || null,
      }),
    });
    if (!res.ok) {
      setMsg("✗");
      return;
    }
    const data = (await res.json()) as { announcement: AnnouncementRow };
    let row = data.announcement;
    if (publishNow) {
      const pub = await fetch(`/api/admin/announcements/${row.id}/publish`, { method: "POST" });
      if (!pub.ok) {
        setMsg("✗");
        return;
      }
      const pubData = (await pub.json()) as { announcement: AnnouncementRow; sent: number };
      row = pubData.announcement;
      setMsg(`${ui("sentTo")} ${pubData.sent} ${ui("subscribersWord")}`);
    }
    setRows((r) => [row, ...r]);
    setTitleAr(""); setTitleEn(""); setBodyAr(""); setBodyEn(""); setLessonDate(""); setImage("");
  };

  const publish = async (id: number) => {
    setMsg("");
    const res = await fetch(`/api/admin/announcements/${id}/publish`, { method: "POST" });
    if (!res.ok) return;
    const data = (await res.json()) as {
      announcement: AnnouncementRow;
      sent: number;
    };
    setRows((r) => r.map((x) => (x.id === id ? data.announcement : x)));
    setMsg(`${ui("sentTo")} ${data.sent} ${ui("subscribersWord")}`);
  };

  const remove = async (id: number) => {
    const res = await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
    if (res.ok) setRows((r) => r.filter((x) => x.id !== id));
  };

  const inputCls =
    "h-11 w-full rounded-card bg-[var(--ceramic)] px-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]";
  const areaCls =
    "w-full rounded-card bg-[var(--ceramic)] px-3 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]";

  if (state === "loading") {
    return <div className="animate-pulse rounded-card bg-[var(--card)] p-6 shadow-soft"><div className="h-4 w-1/3 rounded bg-[var(--ceramic)]" /></div>;
  }
  if (state === "unauthorized") {
    return (
      <div className="rounded-card bg-[var(--card)] p-6 shadow-soft">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
          <Megaphone className="h-5 w-5 text-[var(--brand-accent)]" />
          {ui("dbAnnouncements")}
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">{ui("loginRequired")}</p>
        <a
          href="/admin/login"
          className="mt-4 inline-flex h-[50px] items-center justify-center rounded-pill bg-[var(--brand-accent)] px-6 text-[15px] font-semibold text-white shadow-soft active:scale-95"
        >
          {ui("goToLogin")}
        </a>
      </div>
    );
  }
  if (state === "notconfigured") {
    return (
      <div className="rounded-card bg-[var(--card)] p-6 shadow-soft">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
          <Megaphone className="h-5 w-5 text-[var(--brand-accent)]" />
          {ui("dbAnnouncements")}
        </h2>
        <p className="mt-2 rounded-card bg-[var(--status-pause-bg)] px-4 py-3 text-sm text-[var(--status-pause-tx)]">
          {ui("backendNotConfigured")}
        </p>
      </div>
    );
  }

  const booksForShaykh: BookScope[] = books.filter((b) => b.shaykhId === shaykhId);

  return (
    <div className="space-y-6">
      {/* Create form */}
      <div className="rounded-card bg-[var(--card)] p-6 shadow-soft">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
          <Megaphone className="h-5 w-5 text-[var(--brand-accent)]" />
          {ui("createAnnouncement")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm text-[var(--ink-soft)]">
            {ui("annShaykh")}
            <select value={shaykhId} onChange={(e) => { setShaykhId(e.target.value); setBookId(""); }} className={inputCls}>
              {shaykhs.map((s) => (
                <option key={s.id} value={s.id}>{t(s.name)}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-[var(--ink-soft)]">
            {ui("annBook")}
            <select value={bookId} onChange={(e) => setBookId(e.target.value)} className={inputCls}>
              <option value="">{ui("noneOption")}</option>
              {booksForShaykh.map((b) => (
                <option key={b.id} value={b.id}>{t(b.book)}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-[var(--ink-soft)]">
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls} aria-label="Type">
              {ANNOUNCEMENT_TYPES.map((ty) => (
                <option key={ty} value={ty}>{annTypeLabel(ty)}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-[var(--ink-soft)]">
            {ui("lessonDate")}
            <input type="date" value={lessonDate} onChange={(e) => setLessonDate(e.target.value)} className={inputCls} />
          </label>
          <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder={ui("titleAr")} dir="rtl" className={inputCls} />
          <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder={ui("titleEn")} dir="ltr" className={inputCls} />
          <textarea value={bodyAr} onChange={(e) => setBodyAr(e.target.value)} placeholder={ui("bodyAr")} dir="rtl" rows={3} className={areaCls} />
          <textarea value={bodyEn} onChange={(e) => setBodyEn(e.target.value)} placeholder={ui("bodyEn")} dir="ltr" rows={3} className={areaCls} />
        </div>
        <div className="mt-4">
          <label className="block text-sm text-[var(--ink-soft)]">
            {ui("uploadFlyer")}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => void onFlyerFile(e.target.files?.[0])}
              className="mt-1 block w-full text-sm text-[var(--ink-soft)]"
            />
          </label>
          {image ? (
            <div className="mt-3 flex items-start gap-3">
              <img src={image} alt="" className="max-h-48 rounded-card object-contain" />
              <button onClick={() => setImage("")} className="text-sm font-medium text-[var(--status-cancel-tx)]">
                {ui("removeFlyer")}
              </button>
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <PillButton onClick={() => void create(true)}>{ui("postNow")}</PillButton>
          <PillButton onClick={() => void create(false)}>{ui("createDraft")}</PillButton>
        </div>
        {msg ? <p className="mt-3 text-sm text-[var(--brand-accent)]">{msg}</p> : null}
      </div>

      {/* List */}
      <div className="space-y-3">
        {rows.length === 0 ? (
          <p className="rounded-card bg-[var(--card)] px-4 py-6 text-center text-sm text-[var(--ink-soft)] shadow-soft">
            {ui("noAnnouncementsYet")}
          </p>
        ) : (
          rows.map((a) => {
            const sh = shaykhs.find((s) => s.id === a.shaykh_id);
            const bk = a.book_id ? books.find((b) => b.id === a.book_id) : undefined;
            return (
              <div key={a.id} className="rounded-card bg-[var(--card)] p-5 shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-pill bg-[var(--brand-deep)] px-3 py-1 text-xs font-semibold text-white">
                    {annTypeLabel(a.type)}
                  </span>
                  <span className={`rounded-pill px-3 py-1 text-xs font-semibold ${a.status === "published" ? "bg-[var(--status-active-bg)] text-[var(--status-active-tx)]" : "bg-[var(--ceramic)] text-[var(--ink-soft)]"}`}>
                    {a.status === "published" ? ui("publishedLabel") : ui("draft")}
                  </span>
                  {a.lesson_date ? <span className="text-xs text-[var(--ink-soft)]">{a.lesson_date}</span> : null}
                </div>
                <p className="mt-2 font-semibold text-[var(--ink)]">
                  {sh ? t(sh.name) : a.shaykh_id}
                  {bk ? <span className="text-[var(--ink-soft)]"> — {t(bk.book)}</span> : null}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--ink)]">{a.title_ar}</p>
                <p className="text-sm leading-loose text-[var(--ink-soft)]">{a.body_ar}</p>
                <p className="mt-1 text-sm font-medium text-[var(--ink)]" dir="ltr">{a.title_en}</p>
                <p className="text-sm leading-loose text-[var(--ink-soft)]" dir="ltr">{a.body_en}</p>
                {a.image ? (
                  <img src={a.image} alt="" className="mt-3 max-h-48 rounded-card object-contain" />
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {a.status !== "published" ? (
                    <button onClick={() => publish(a.id)} className="inline-flex h-10 items-center gap-1.5 rounded-pill bg-[var(--brand-accent)] px-4 text-sm font-semibold text-white active:scale-95">
                      <Send className="h-4 w-4" /> {ui("publishSend")}
                    </button>
                  ) : (
                    <span className="inline-flex h-10 items-center gap-1.5 rounded-pill bg-[var(--ceramic)] px-4 text-sm font-medium text-[var(--ink-soft)]">
                      <Check className="h-4 w-4" /> {ui("publishedLabel")}
                    </span>
                  )}
                  <button onClick={() => remove(a.id)} className="inline-flex h-10 items-center gap-1.5 rounded-pill bg-[var(--status-cancel-bg)] px-4 text-sm font-semibold text-[var(--status-cancel-tx)] active:scale-95">
                    <Trash2 className="h-4 w-4" /> {ui("deleteAnn")}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
