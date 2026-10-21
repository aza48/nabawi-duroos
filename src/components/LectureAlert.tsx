"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, X } from "lucide-react";
import { useLang } from "../lib/i18n";
import { Announcement, AnnouncementRow, Localized, MASJIDS } from "../lib/types";
import { findBookScope, findShaykhScope } from "../lib/scopes";
import { lessonDateBracket, riyadhToday } from "../lib/dates";
import { useDbAnnouncements } from "../lib/useDbAnnouncements";
import { ANNOUNCEMENTS } from "../data/announcements";

/**
 * "Upcoming lectures" pop-up card.
 *
 * Sources, merged into one grouped card:
 *  1. PUBLISHED DB announcements (the same rows FeedView merges into the
 *     feed) whose type is `lecture` or `guest`.
 *  2. Static ANNOUNCEMENTS of type `lecture` or `guest` — used until the DB
 *     is configured, so approved one-off lectures can ship as static data.
 * Historical channel events in data/events.ts are a separate dataset and
 * never fire this card.
 *
 * A DB item is active when:
 *  - it has a lesson_date and that date is today or later (Asia/Riyadh), or
 *  - it has no lesson_date and it was published within the last 7 days.
 * A static item is active when:
 *  - it has an eventDate and that date is today or later (Asia/Riyadh), or
 *  - it has no eventDate and it is not marked expired.
 *
 * All active items are grouped into ONE card, one bullet each. Dismissing
 * stores the shown item ids (DB numeric ids and static string ids share the
 * same localStorage key); a new id re-triggers the card on a later visit.
 */

const DISMISS_KEY = "duroos_dismissed_lectures";
const POPUP_TYPES = new Set(["lecture", "guest"]);
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type DismissId = number | string;

interface Bullet {
  key: string;
  id: DismissId;
  title: string;
  meta: string[];
  body?: string;
}

function isDbActive(row: AnnouncementRow, todayIso: string): boolean {
  if (!POPUP_TYPES.has(row.type)) return false;
  if (row.lesson_date) return row.lesson_date.slice(0, 10) >= todayIso;
  const posted = new Date(row.published_at ?? row.created_at).getTime();
  return Number.isFinite(posted) && Date.now() - posted <= SEVEN_DAYS_MS;
}

function isStaticActive(a: Announcement, todayIso: string): boolean {
  if (!POPUP_TYPES.has(a.type)) return false;
  if (a.eventDate) return a.eventDate.slice(0, 10) >= todayIso;
  return !a.expired;
}

/** Masjid for a DB bullet: the book's masjid, else the shaykh's only masjid. */
function masjidFor(row: AnnouncementRow): Localized | null {
  if (row.book_id) {
    const book = findBookScope(row.book_id);
    if (book) return MASJIDS[book.masjid];
  }
  const shaykh = findShaykhScope(row.shaykh_id);
  if (shaykh && shaykh.masjids.length === 1) return MASJIDS[shaykh.masjids[0]];
  return null;
}

export function LectureAlert() {
  const { t, ui, lang } = useLang();
  const rows = useDbAnnouncements();
  const [dismissed, setDismissed] = useState<DismissId[] | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DISMISS_KEY);
      setDismissed(raw ? (JSON.parse(raw) as DismissId[]) : []);
    } catch {
      setDismissed([]);
    }
  }, []);

  if (dismissed === null) return null;
  const todayIso = riyadhToday().iso;

  const dbBullets: Bullet[] = rows
    .filter((r) => isDbActive(r, todayIso) && !dismissed.includes(r.id))
    .map((row) => {
      const shaykh = findShaykhScope(row.shaykh_id)?.name;
      const masjid = masjidFor(row);
      const meta = [
        shaykh ? t(shaykh) : row.shaykh_id,
        masjid ? t(masjid) : null,
        row.lesson_date ? t(lessonDateBracket(row.lesson_date)) : null,
      ].filter((x): x is string => !!x);
      const body = lang === "ar" ? row.body_ar : row.body_en;
      return {
        key: `db-${row.id}`,
        id: row.id,
        title: lang === "ar" ? row.title_ar : row.title_en,
        meta,
        body: body ? body : undefined,
      };
    });

  const seenStatic = new Set<string>();
  const staticBullets: Bullet[] = ANNOUNCEMENTS.filter((a) => {
    if (seenStatic.has(a.id)) return false;
    seenStatic.add(a.id);
    return isStaticActive(a, todayIso) && !dismissed.includes(a.id);
  }).map((a) => {
    const meta = [
      t(a.shaykh),
      a.masjidId ? t(MASJIDS[a.masjidId]) : null,
      a.eventDate ? t(lessonDateBracket(a.eventDate)) : null,
    ].filter((x): x is string => !!x);
    return {
      key: `static-${a.id}`,
      id: a.id,
      title: t(a.text),
      meta,
    };
  });

  const active = [...dbBullets, ...staticBullets];
  const visible = active.length > 0;

  const dismiss = () => {
    const next = Array.from(new Set([...dismissed, ...active.map((b) => b.id)]));
    setDismissed(next);
    try {
      window.localStorage.setItem(DISMISS_KEY, JSON.stringify(next));
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          key="lecture-alert"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-4 top-20 z-50 mx-auto max-w-xl rounded-card bg-[var(--card)] p-5 shadow-lift ring-1 ring-black/5 sm:p-6"
          role="alert"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-deep)] text-white">
                <Megaphone className="h-4.5 w-4.5" />
              </span>
              {ui("upcomingLectures")}
            </h2>
            <button
              onClick={dismiss}
              aria-label={ui("dismiss")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ceramic)] text-[var(--ink-soft)] transition-transform active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {active.map((b) => (
              <li key={b.key} className="flex gap-2.5">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]" />
                <div>
                  <p className="text-[15px] font-semibold leading-relaxed text-[var(--ink)]">
                    {b.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {b.meta.join(" · ")}
                  </p>
                  {b.body ? (
                    <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {b.body}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
