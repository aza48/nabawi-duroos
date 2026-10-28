"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Megaphone, X } from "lucide-react";
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
 * Presentation:
 *  - One active item: a single card showing the item, with its flyer poster
 *    above the text when the announcement carries one (`image`).
 *  - Several active items at once: a carousel — one slide per announcement,
 *    each slide showing that announcement's own flyer (when it has one) with
 *    its text, plus prev/next arrows and dots. Dismissing (✕ or backdrop)
 *    dismisses every currently shown item, as before.
 * Dismissing stores the shown item ids (DB numeric ids and static string
 * ids share the same localStorage key); a new id re-triggers the card on a
 * later visit.
 *
 * The modal itself is a centered modal — a full-viewport backdrop blurs the
 * page behind it (clicking the backdrop dismisses, same as the ✕ button),
 * and the card itself is frosted "liquid glass" tinted from the active
 * masjid theme variables. The glass treatment lives only in this component.
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
  image?: string;
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
  const reduceMotion = useReducedMotion();
  const [dismissed, setDismissed] = useState<DismissId[] | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DISMISS_KEY);
      setDismissed(raw ? (JSON.parse(raw) as DismissId[]) : []);
    } catch {
      setDismissed([]);
    }
  }, []);

  // Until the stored dismissals load, treat everything as not-yet-dismissed
  // but keep the card hidden (visible requires dismissed !== null below).
  const dismissedList: DismissId[] = dismissed ?? [];
  const todayIso = riyadhToday().iso;

  const dbBullets: Bullet[] = rows
    .filter((r) => isDbActive(r, todayIso) && !dismissedList.includes(r.id))
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
        image: row.image ?? undefined,
      };
    });

  const seenStatic = new Set<string>();
  const staticBullets: Bullet[] = ANNOUNCEMENTS.filter((a) => {
    if (seenStatic.has(a.id)) return false;
    seenStatic.add(a.id);
    return isStaticActive(a, todayIso) && !dismissedList.includes(a.id);
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
      image: a.image,
    };
  });

  const active = [...dbBullets, ...staticBullets];
  const visible = dismissed !== null && active.length > 0;

  // Carousel position when several lectures are active at once. Clamped so
  // a shrinking list can never point past the last slide.
  const [slide, setSlide] = useState(0);
  const slideIndex = active.length > 0 ? Math.min(slide, active.length - 1) : 0;
  const current = active[slideIndex];

  // Lock background scroll while the modal is open; restore on close/unmount.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const dismiss = () => {
    const next = Array.from(new Set([...dismissedList, ...active.map((b) => b.id)]));
    setDismissed(next);
    try {
      window.localStorage.setItem(DISMISS_KEY, JSON.stringify(next));
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="lecture-alert-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          onClick={dismiss}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{
            // Light themed tint + a real blur of the page behind the modal.
            background: "color-mix(in srgb, var(--brand-deep) 18%, transparent)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <motion.aside
            key="lecture-alert"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[22px] p-6 sm:p-7"
            style={{
              // Liquid glass: translucent theme surface, deep frost + saturation,
              // a theme-aware hairline edge and a specular top highlight.
              background: "color-mix(in srgb, var(--card) 62%, transparent)",
              backdropFilter: "blur(20px) saturate(1.5)",
              WebkitBackdropFilter: "blur(20px) saturate(1.5)",
              border: "1px solid color-mix(in srgb, var(--ink) 14%, transparent)",
              boxShadow:
                "inset 0 1px 0 0 rgba(255, 255, 255, 0.35), inset 0 -0.5px 0 0 color-mix(in srgb, var(--ink) 6%, transparent), 0 24px 60px -12px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.12)",
            }}
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
            {active.length === 1 ? (
              <>
                {active[0].image ? (
                  <img
                    src={active[0].image}
                    alt=""
                    className="mx-auto mt-4 max-h-[52vh] w-auto rounded-[16px] border border-[var(--ceramic)] object-contain"
                  />
                ) : null}
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
              </>
            ) : current ? (
              <div className="mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.key}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {current.image ? (
                      <img
                        src={current.image}
                        alt=""
                        className="mx-auto max-h-[52vh] w-auto rounded-[16px] border border-[var(--ceramic)] object-contain"
                      />
                    ) : null}
                    <p className="mt-4 text-[15px] font-semibold leading-relaxed text-[var(--ink)]">
                      {current.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {current.meta.join(" · ")}
                    </p>
                    {current.body ? (
                      <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {current.body}
                      </p>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      setSlide((s) => (s - 1 + active.length) % active.length)
                    }
                    aria-label={ui("previous")}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ceramic)] text-[var(--ink-soft)] transition-transform active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-1.5" role="tablist">
                    {active.map((b, i) => (
                      <button
                        key={b.key}
                        onClick={() => setSlide(i)}
                        aria-label={`${i + 1} / ${active.length}`}
                        className={`h-2 rounded-full transition-all ${
                          i === slideIndex
                            ? "w-5 bg-[var(--brand-accent)]"
                            : "w-2 bg-[var(--ceramic)]"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setSlide((s) => (s + 1) % active.length)}
                    aria-label={ui("next")}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--ceramic)] text-[var(--ink-soft)] transition-transform active:scale-95"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
