"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, X } from "lucide-react";
import { useLang } from "../lib/i18n";
import { AnnouncementRow, Localized, MASJIDS } from "../lib/types";
import { findBookScope, findShaykhScope } from "../lib/scopes";
import { lessonDateBracket, riyadhToday } from "../lib/dates";
import { useDbAnnouncements } from "../lib/useDbAnnouncements";

/**
 * "Upcoming lectures" pop-up card.
 *
 * Source: PUBLISHED DB announcements only (the same rows FeedView merges into
 * the feed) whose type is `lecture` or `guest`. Historical channel events in
 * data/events.ts are a separate dataset and never fire this card.
 *
 * An item is active when:
 *  - it has a lesson_date and that date is today or later (Asia/Riyadh), or
 *  - it has no lesson_date and it was published within the last 7 days.
 *
 * All active items are grouped into ONE card, one bullet each. Dismissing
 * stores the shown announcement ids in localStorage; a new id re-triggers
 * the card on a later visit.
 */

const DISMISS_KEY = "duroos_dismissed_lectures";
const POPUP_TYPES = new Set(["lecture", "guest"]);
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function isActive(row: AnnouncementRow, todayIso: string): boolean {
  if (!POPUP_TYPES.has(row.type)) return false;
  if (row.lesson_date) return row.lesson_date.slice(0, 10) >= todayIso;
  const posted = new Date(row.published_at ?? row.created_at).getTime();
  return Number.isFinite(posted) && Date.now() - posted <= SEVEN_DAYS_MS;
}

/** Masjid for a bullet: the book's masjid, else the shaykh's only masjid. */
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
  const [dismissed, setDismissed] = useState<number[] | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DISMISS_KEY);
      setDismissed(raw ? (JSON.parse(raw) as number[]) : []);
    } catch {
      setDismissed([]);
    }
  }, []);

  if (dismissed === null) return null;
  const todayIso = riyadhToday().iso;
  const active = rows.filter((r) => isActive(r, todayIso) && !dismissed.includes(r.id));
  const visible = active.length > 0;

  const dismiss = () => {
    const next = Array.from(new Set([...dismissed, ...active.map((r) => r.id)]));
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
            {active.map((row) => {
              const shaykh = findShaykhScope(row.shaykh_id)?.name;
              const masjid = masjidFor(row);
              const meta = [
                shaykh ? t(shaykh) : row.shaykh_id,
                masjid ? t(masjid) : null,
                row.lesson_date ? t(lessonDateBracket(row.lesson_date)) : null,
              ].filter(Boolean);
              return (
                <li key={row.id} className="flex gap-2.5">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]" />
                  <div>
                    <p className="text-[15px] font-semibold leading-relaxed text-[var(--ink)]">
                      {lang === "ar" ? row.title_ar : row.title_en}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {meta.join(" · ")}
                    </p>
                    {(lang === "ar" ? row.body_ar : row.body_en) ? (
                      <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {lang === "ar" ? row.body_ar : row.body_en}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
