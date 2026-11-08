import type { Db } from "@/server/db/client";
import { getToday } from "@/server/duroos/queries";
import { keyDatesState, KEY_DATES } from "@/content/key-dates";
import { formatGregorian, formatHijri } from "@/lib/time/hijri";
import { PRAYERS, prayerTimes, type Prayer } from "@/lib/time/prayer";
import { addDays, formatClock, riyadhDateIso, weekdayOf } from "@/lib/time/riyadh";
import { normalize } from "@/lib/search/normalize";
import type { Chunk } from "./knowledge";

/**
 * Live answers that no written guide can hold: which duroos are on for a given day (with
 * today's cancellations), today's prayer times, and where we are in the University calendar.
 * Everything here is computed, never guessed.
 */

const PRAYER_WORDS: Record<Prayer, RegExp> = {
  fajr: /\b(fajr|fajer|subh|dawn)\b|فجر|صبح/,
  dhuhr: /\b(dhuhr|zuhr|duhr|zohr|dhuhur|zuhur|noon)\b|ظهر/,
  asr: /\b(asr|asar)\b|عصر/,
  maghrib: /\b(maghrib|magrib|maghreb|sunset)\b|مغرب/,
  isha: /\b(isha|esha|ishaa)\b|عشاء|عشا/,
};
const PRAYER_EN: Record<Prayer, string> = { fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" };
const PRAYER_AR: Record<Prayer, string> = { fajr: "الفجر", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء" };

const DAYS_EN = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const DAYS_AR = ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعه", "السبت"];
const DAY_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DUROOS = /\b(dars|darss|duroos|durus|doroos|lesson|lessons|halaqa|halaqah|halaqat|class|classes|lecture|lectures|majlis)\b|درس|دروس|حلق|محاضر/;
const WHEN = /\b(today|tonight|now|right now|currently|tomorrow|this (morning|evening|afternoon)|live|on now|happening)\b|اليوم|الليله|الان|غدا|بكره|مباشر/;
// "Iqama" alone is the residence permit, so only "iqamah time" counts as a prayer question.
const TIMES = /\b(prayer times?|salah times?|salat times?|adhan|azan|athan|iqamah times?|when is (fajr|dhuhr|zuhr|asr|maghrib|isha))\b|مواقيت|موعد (الصلاه|الاذان)|اذان/;

export type LiveIntent = { duroos: { date: string; prayers: Prayer[] } | null; prayerTimes: boolean };

/** Reads what live data a question needs, if any. `today` is the Riyadh date. */
export function detectLive(question: string, today: string): LiveIntent {
  const q = normalize(question);
  const prayers = PRAYERS.filter((p) => PRAYER_WORDS[p].test(q));
  const wantsTimes = TIMES.test(q);
  let date: string | null = null;
  if (/\b(tomorrow)\b|غدا|بكره/.test(q)) date = addDays(today, 1);
  else if (WHEN.test(q)) date = today;
  else {
    const i = DAYS_EN.findIndex((d) => new RegExp(`\\b${d}\\b`).test(q));
    const j = DAYS_AR.findIndex((d) => q.includes(d));
    const wd = i >= 0 ? i : j;
    if (wd >= 0) date = addDays(today, (wd - weekdayOf(today) + 7) % 7);
  }
  const duroos = DUROOS.test(q) && (date !== null || prayers.length > 0) ? { date: date ?? today, prayers } : null;
  return { duroos, prayerTimes: wantsTimes };
}

export function dayLabel(date: string, today: string, ar: boolean): string {
  if (date === today) return ar ? "اليوم" : "today";
  if (date === addDays(today, 1)) return ar ? "غدًا" : "tomorrow";
  return ar ? `يوم ${["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][weekdayOf(date)]}` : `on ${DAY_NAME[weekdayOf(date)]}`;
}

/** The duroos of one day as a passage, grouped by prayer, with each one's state today. */
export async function duroosPassage(db: Db, intent: { date: string; prayers: Prayer[] }, now: Date, ar: boolean): Promise<Chunk> {
  const today = riyadhDateIso(now);
  const day = await getToday(db, now, intent.date);
  const wanted = intent.prayers.length ? intent.prayers : PRAYERS;
  const lines: string[] = [];
  for (const p of wanted) {
    const list = day.lessons.filter((l) => l.prayer === p);
    if (!list.length) continue;
    lines.push(ar ? `بعد ${PRAYER_AR[p]} (الأذان ${formatClock(new Date(day.prayers[p]), "ar")}):` : `After ${PRAYER_EN[p]} (adhan ${formatClock(new Date(day.prayers[p]))}):`);
    for (const l of list) {
      const state =
        l.status === "cancelled" ? (ar ? " [ملغى]" : " [cancelled]")
        : l.status === "postponed" ? (ar ? " [مؤجل]" : " [postponed]")
        : l.status === "moved" ? (ar ? " [تغير المكان أو الوقت]" : " [moved]")
        : intent.date === today && l.phase === "live" ? (ar ? " [مباشر الآن]" : " [live now]")
        : intent.date === today && l.phase === "done" ? (ar ? " [انتهى]" : " [finished]")
        : "";
      const note = ar ? l.overrideNoteAr : l.overrideNoteEn;
      lines.push(
        ar
          ? `• ${l.shaykh.nameAr}: ${l.bookAr}، ${l.masjid.shortAr}${l.audience === "women" ? " (للأخوات)" : ""}${state}${note ? `. ${note}` : ""}`
          : `• ${l.shaykh.nameEn}: ${l.bookEn}, ${l.masjid.shortEn}${l.audience === "women" ? " (sisters)" : ""}${state}${note ? `. ${note}` : ""}`
      );
    }
  }
  const when = dayLabel(intent.date, today, ar);
  const head = ar
    ? `الدروس ${when} (${day.hijri.ar}، ${day.gregorian.ar})${intent.prayers.length ? ` بعد ${intent.prayers.map((p) => PRAYER_AR[p]).join(" و")}` : ""}:`
    : `Duroos ${when} (${day.hijri.en}, ${day.gregorian.en})${intent.prayers.length ? ` after ${intent.prayers.map((p) => PRAYER_EN[p]).join(" and ")}` : ""}:`;
  const none = ar ? "لا توجد دروس مسجلة في هذا الوقت." : "There are no regular duroos listed for that time.";
  return {
    id: `live-duroos-${intent.date}`,
    kind: "page",
    title: ar ? "جدول الدروس" : "Duroos schedule",
    text: `${head}\n${lines.length ? lines.join("\n") : none}`,
    url: ar ? "/ar/duroos" : intent.date === today ? "/duroos" : "/duroos/schedule",
  };
}

export function prayerTimesPassage(now: Date, ar: boolean): Chunk {
  const today = riyadhDateIso(now);
  const t = prayerTimes(today);
  const list = PRAYERS.map((p) => `${ar ? PRAYER_AR[p] : PRAYER_EN[p]} ${formatClock(t[p], ar ? "ar" : "en")}`).join(ar ? "، " : ", ");
  return {
    id: "live-prayer-times",
    kind: "page",
    title: ar ? "مواقيت الصلاة في المدينة" : "Prayer times in Madinah",
    text: ar
      ? `مواقيت الأذان اليوم في المدينة المنورة (تقويم أم القرى): ${list}. تقام الصلاة في المسجد النبوي بعد الأذان بنحو 10 إلى 25 دقيقة.`
      : `Adhan times in Madinah today (Umm al-Qura): ${list}. The iqamah at Masjid an-Nabawi follows the adhan by about 10 to 25 minutes.`,
    url: ar ? "/ar" : "/",
  };
}

/** Today's date and where the University year stands. Always given to the writer so "when" questions resolve. */
export function todayPassage(now: Date, ar: boolean): Chunk {
  const today = riyadhDateIso(now);
  const st = keyDatesState(now, KEY_DATES);
  const d = (x: (typeof KEY_DATES)[number]) => `${ar ? x.titleAr : x.title}: ${x.start}${x.end ? ` ${ar ? "إلى" : "to"} ${x.end}` : ""}`;
  const parts = [
    ar ? `اليوم ${formatHijri(today, "ar", { weekday: true })}، ${formatGregorian(today, "ar")} (${today}).` : `Today is ${formatHijri(today, "en", { weekday: true })}, ${formatGregorian(today, "en")} (${today}).`,
    st.current ? (ar ? `الجاري الآن: ${d(st.current)}.` : `Happening now: ${d(st.current)}.`) : "",
    st.next ? (ar ? `القادم في الجامعة: ${[st.next, ...st.following].map(d).join("؛ ")}.` : `Coming up at the University: ${[st.next, ...st.following].map(d).join("; ")}.`) : "",
    st.islamic.length ? (ar ? `مواسم قادمة: ${st.islamic.map(d).join("؛ ")}.` : `Coming Islamic dates: ${st.islamic.map(d).join("; ")}.`) : "",
  ];
  return { id: "live-today", kind: "date", title: ar ? "تاريخ اليوم" : "Today's date", text: parts.filter(Boolean).join(" "), url: "/guides/university-calendar-1448" };
}
