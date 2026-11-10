import type { Db } from "@/server/db/client";
import { getToday, scheduleRows } from "@/server/duroos/queries";
import { keyDatesState, KEY_DATES } from "@/content/key-dates";
import { formatGregorian, formatHijri, formatHijriLong, hijriTextAr } from "@/lib/time/hijri";
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

const DUROOS = /\b(dars|darss|duroos|durus|doroos|lesson|lessons|halaqa|halaqah|halaqat|class|classes|lecture|lectures|majlis|shaykh|sheikh|shaikh|teaching|teach|teaches)\b|درس|دروس|حلق|محاضر|الشيخ/;
const WHEN = /\b(today|tonight|now|right now|currently|tomorrow|this (morning|evening|afternoon)|live|on now|happening)\b|اليوم|الليله|الان|غدا|بكره|الغد|مباشر/;
const TOMORROW = /\btomorrow\b|غدا|بكره|الغد|(?:^|\s)غد(?:\s|$)/;
// "Iqama" alone is the residence permit, so only "iqamah time" counts as a prayer question.
const SALAH = "(fajr|dhuhr|zuhr|duhr|asr|maghrib|magrib|isha|esha)";
const TIMES = new RegExp(
  `\\b(prayer times?|salah times?|salat times?|adhan|azan|athan|iqamah times?|when is (the )?${SALAH}|what time is (the )?${SALAH}|${SALAH} (time|times|prayer time))\\b|مواقيت|موعد (الصلاه|الاذان)|اذان|(متي|وقت|موعد) (صلاه )?(ال)?(فجر|ظهر|عصر|مغرب|عشاء)`
);
/** "What is the Hijri date today", "what day is it", "ما التاريخ الهجري اليوم". */
const DATE_EN = /\b(date|day|hijri)\b/;
const DATE_NOW = /\b(today|todays|now|current|currently|it)\b/;
const DATE_AR = /(التاريخ|تاريخ|اي يوم|ما اليوم|كم اليوم)/;
const DATE_AR_NOW = /(اليوم|الان|الحالي|الهجري)/;

export type LiveIntent = {
  duroos: { date: string; prayers: Prayer[] } | null;
  /** The day whose adhan times are asked for ("when is Fajr tomorrow"), or null. */
  prayerTimes: string | null;
  date: boolean;
};

/** Reads what live data a question needs, if any. `today` is the Riyadh date. */
export function detectLive(question: string, today: string): LiveIntent {
  const q = normalize(question);
  const named = PRAYERS.filter((p) => PRAYER_WORDS[p].test(q));
  // "Tonight" is the evening duroos; "this morning" is after Fajr; "this afternoon" after Dhuhr and Asr.
  const prayers: Prayer[] = named.length
    ? named
    : /\b(tonight|this evening)\b|الليله|المساء/.test(q) ? ["maghrib", "isha"]
    : /\bthis morning\b|الصباح/.test(q) ? ["fajr"]
    : /\bthis afternoon\b|الظهيره/.test(q) ? ["dhuhr", "asr"]
    : [];
  const wantsTimes = TIMES.test(q);
  let date: string | null = null;
  if (TOMORROW.test(q)) date = addDays(today, 1);
  else if (WHEN.test(q)) date = today;
  else {
    const i = DAYS_EN.findIndex((d) => new RegExp(`\\b${d}\\b`).test(q));
    const j = DAYS_AR.findIndex((d) => q.includes(d));
    const wd = i >= 0 ? i : j;
    if (wd >= 0) date = addDays(today, (wd - weekdayOf(today) + 7) % 7);
  }
  const duroos = DUROOS.test(q) && (date !== null || prayers.length > 0) ? { date: date ?? today, prayers } : null;
  // "What date is the final exam" names a topic; only a question about today itself is a date question.
  const asksDate =
    !duroos &&
    !wantsTimes &&
    ((DATE_EN.test(q) && DATE_NOW.test(q) && !/\b(of|for|does|do|will|is the (stipend|exam|semester))\b/.test(q)) ||
      /^(whats|what is|what s) (the )?(hijri |islamic )?(date|day)$/.test(q.trim()) ||
      (DATE_AR.test(q) && DATE_AR_NOW.test(q) && q.split(" ").length <= 5));
  return { duroos, prayerTimes: wantsTimes ? (date ?? today) : null, date: asksDate };
}

export function dayLabel(date: string, today: string, ar: boolean): string {
  if (date === today) return ar ? "اليوم" : "today";
  if (date === addDays(today, 1)) return ar ? "غدًا" : "tomorrow";
  return ar ? `يوم ${["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][weekdayOf(date)]}` : `on ${DAY_NAME[weekdayOf(date)]}`;
}

/** Titles, "ibn" and "bint", and given names too common to identify a shaykh on their own. */
const NAME_NOISE = new Set(["shaykh", "sheikh", "shaikh", "shaykhah", "sheikha", "prof", "dr", "doctor", "ibn", "bin", "bint", "abu", "abd", "abdul", "abdullah", "muhammad", "mohammed", "mohamed", "ahmad", "ahmed", "ali", "الشيخ", "الشيخه", "شيخ", "الدكتور", "الاستاذ", "د", "ا", "بن", "بنت", "ابو", "ابا", "عبدالله", "محمد", "احمد", "علي"]);
/** The Arabic article in transliteration, on its own ("al Badr") or joined ("alBadr" is left to the length check). */
const ARTICLE = /^(al|el|as|ash|at|ad|adh|an|ar|az|ath)$/;

/** One spelling for an English name part: "Abdurrazzaq", "abdur razzaq" and "abd al-Razzaq" meet, as do "Suhaymi" and "Suhaimi". */
const canonEn = (w: string) =>
  w
    .replace(/^al(?=[a-z]{4})/, "")
    .replace(/^abd[aeiu]?[lrs]?/, (m) => (m.length > 3 ? "abd" : m))
    .replace(/y/g, "i")
    .replace(/ee/g, "i")
    .replace(/oo/g, "u")
    .replace(/(.)\1/g, "$1");

/**
 * A name cut into its parts, in order, with "abd" joined to the name after it ("Abd al-Muhsin" is one
 * part) and the article dropped. Titles stay out; the last part is the family name or nisba.
 */
function nameTokens(s: string): string[] {
  const words = normalize(s).replace(/-/g, " ").replace(/عبد\s+(?=ال)/g, "عبد").split(/\s+/).filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    if (/^[a-z]+$/.test(w)) {
      if (ARTICLE.test(w)) continue;
      // "abdul muhsin", "abd al razzaq": the part after "abd" belongs to it.
      if (/^abd[aeiu]?[lrs]?$/.test(w) && words[i + 1] && /^[a-z]+$/.test(words[i + 1])) {
        let j = i + 1;
        if (ARTICLE.test(words[j]) && words[j + 1]) j++;
        out.push(`abd${canonEn(words[j])}`);
        i = j;
        continue;
      }
      out.push(canonEn(w));
    } else {
      out.push(w.length > 4 && w.startsWith("ال") && !w.startsWith("الله") ? w.slice(2) : w);
    }
  }
  return out;
}

type NamePart = { all: string[]; ism?: string; family?: string };
function partsOf(name: string): NamePart {
  const t = nameTokens(name).filter((w) => !NAME_NOISE.has(w) && w.length >= 3);
  const raw = nameTokens(name).filter((w) => !/^(shaykh|sheikh|shaikh|shaykhah|prof|dr|الشيخ|الشيخه|الدكتور|د|ا)$/.test(w));
  const ism = raw[0] && !NAME_NOISE.has(raw[0]) ? raw[0] : undefined;
  return { all: [...new Set(t)], ism, family: t.length > 1 ? t[t.length - 1] : undefined };
}

const sameName = (a: string, b: string) => a === b || (a.length >= 6 && b.length >= 6 && oneEdit(a, b));
function oneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1);
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

/** Where a name starts in a question: after a title ("Shaykh", "Dr.", "الشيخ") or after "who is" and "tell me about". */
const NAME_LEAD = /^(shaykh|sheikh|shaikh|shaykhah|sheikha|dr|prof|doctor|الشيخ|الشيخه|الدكتور|شيخ)$/;
/** Words that end a name in a question ("Shaykh Salih teaching tonight", "الشيخ عبدالرزاق في التوحيد"). */
const NAME_END = new Set(
  (
    "of on about in at after before is does do did will was the for and to with from sharh kitab book books explanation tafsir teach teaches teaching taught today tonight tomorrow now dars duroos lesson lessons class classes halaqa halaqah lecture lectures this that his her who what when where which why how cancelled canceled " +
    "في بعد قبل عن يوم اليوم الليله الان غدا بكره متي هل درس دروس الدرس الدروس كتاب شرح يدرس يشرح و او مع من الي علي ما ماذا اين هو هي له"
  ).split(" ")
);

/** The words of the question that stand for a name: the few words after a title or after "who is". */
function nameWindow(question: string): string[] {
  const words = normalize(question).replace(/-/g, " ").replace(/عبد\s+(?=ال)/g, "عبد").split(/\s+/).filter(Boolean);
  let at = words.findIndex((w) => NAME_LEAD.test(w));
  if (at < 0) {
    const n = words.join(" ");
    const m = /^(who is|who was|tell me about|من هو|من هي)\s/.exec(n);
    if (!m) return [];
    at = m[1].split(" ").length - 1;
    // With no title, the words are a name only when they read like one: "ibn", "abd", the article
    // ("Abdulmuhsin al-Abbad", "عبد المحسن العباد"); in Arabic the article alone is any noun. "Tell me about renting a flat" names no one.
    const next = words.slice(at + 1, at + 5);
    if (!next.some((w) => /^(ibn|bin|bint|abu|abd\w*|al|el|ash|ad|ar|az|بن|بنت|ابو|عبد\S*)$/.test(w))) return [];
  }
  const out: string[] = [];
  for (const w of words.slice(at + 1)) {
    if (NAME_LEAD.test(w) || w === "ibn" || w === "bin" || w === "بن") continue;
    if (NAME_END.has(w) || out.length >= 6) break;
    out.push(w);
  }
  return nameTokens(out.join(" "));
}

export type NamedShaykhs = Set<string> & { unknown?: boolean };

/**
 * The shaykhs named in a question ("is Shaykh Abdurrazzaq al-Badr teaching tonight"), by slug.
 * A shaykh counts when the question holds his family name, his own first name, or two parts of his
 * name; a father's name alone ("Muhsin") is not enough. Of several, the one whose name the question
 * holds most of wins, so "Abdurrazzaq al-Badr" is not also "Badr ibn Muqbil al-Badr".
 * `unknown` is set, and the set is empty, when the question names someone with a family name no
 * shaykh on MESH has ("Shaykh Abdulmuhsin al-Abbad"): no other shaykh is put in his place.
 */
export function shaykhsNamed(question: string, shaykhs: { slug: string; nameEn: string; nameAr: string }[]): NamedShaykhs {
  const q = new Set(nameTokens(question).filter((w) => !NAME_NOISE.has(w)));
  const has = (w: string) => [...q].some((x) => sameName(x, w));
  const scored = shaykhs.map((s) => {
    const parts = [partsOf(s.nameEn), partsOf(s.nameAr)];
    const n = Math.max(...parts.map((p) => p.all.filter(has).length));
    const fam = parts.some((p) => p.family && has(p.family));
    const ism = parts.some((p) => p.ism && has(p.ism));
    return { slug: s.slug, fam, ok: fam || ism || n >= 2, n: n + (fam ? 1 : 0) };
  });
  // A family name in the question that no shaykh has: the question is about someone MESH does not list.
  const known = new Set(shaykhs.flatMap((s) => [...partsOf(s.nameEn).all, ...partsOf(s.nameAr).all]));
  const win = nameWindow(question).filter((w) => !NAME_NOISE.has(w) && w.length >= 3);
  const last = win[win.length - 1];
  const unknown = !!last && win.length >= 1 && ![...known].some((k) => sameName(k, last)) && !scored.some((x) => x.fam);
  const out: NamedShaykhs = new Set<string>();
  if (unknown && win.length >= 2) {
    out.unknown = true;
    return out;
  }
  const best = Math.max(0, ...scored.filter((x) => x.ok).map((x) => x.n));
  for (const x of scored) if (x.ok && x.n === best && best > 0) out.add(x.slug);
  if (!out.size && unknown) out.unknown = true;
  return out;
}

/** The duroos of one day as a passage, grouped by prayer, with each one's state today. A named shaykh narrows it to his duroos. */
export async function duroosPassage(db: Db, intent: { date: string; prayers: Prayer[] }, now: Date, ar: boolean, question = ""): Promise<Chunk> {
  const today = riyadhDateIso(now);
  const [day, rows] = await Promise.all([getToday(db, now, intent.date), question ? scheduleRows(db) : Promise.resolve([])]);
  const named = question ? shaykhsNamed(question, [...new Map(rows.map((r) => [r.shaykh.slug, r.shaykh])).values()]) : new Set<string>();
  const wanted = intent.prayers.length ? intent.prayers : PRAYERS;
  const lines: string[] = [];
  for (const p of wanted) {
    const list = day.lessons.filter((l) => l.prayer === p && (!named.size || named.has(l.shaykh.slug)));
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
  const who = [...new Map(rows.filter((r) => named.has(r.shaykh.slug)).map((r) => [r.shaykh.slug, ar ? r.shaykh.nameAr : r.shaykh.nameEn])).values()].join(ar ? " و" : " and ");
  const none = named.size
    ? ar ? `لا يوجد درس مسجل لـ${who} في هذا الوقت.` : `No dars by ${who} is listed for that time.`
    : ar ? "لا توجد دروس مسجلة في هذا الوقت." : "There are no regular duroos listed for that time.";
  return {
    id: `live-duroos-${intent.date}`,
    kind: "page",
    title: ar ? "جدول الدروس" : "Duroos schedule",
    text: `${head}\n${lines.length ? lines.join("\n") : none}`,
    url: ar ? "/ar/duroos" : intent.date === today ? "/duroos" : "/duroos/schedule",
  };
}

/** The adhan times of one day (today unless `date` says otherwise). */
export function prayerTimesPassage(now: Date, ar: boolean, date = riyadhDateIso(now)): Chunk {
  const today = riyadhDateIso(now);
  const t = prayerTimes(date);
  const list = PRAYERS.map((p) => `${ar ? PRAYER_AR[p] : PRAYER_EN[p]} ${formatClock(t[p], ar ? "ar" : "en")}`).join(ar ? "، " : ", ");
  const when = dayLabel(date, today, ar);
  return {
    id: `live-prayer-times-${date}`,
    kind: "page",
    title: ar ? "مواقيت الصلاة في المدينة" : "Prayer times in Madinah",
    text: ar
      ? `مواقيت الأذان ${when} في المدينة المنورة (تقويم أم القرى): ${list}. تقام الصلاة في المسجد النبوي بعد الأذان بنحو 10 إلى 25 دقيقة.`
      : `Adhan times in Madinah ${when} (Umm al-Qura): ${list}. The iqamah at Masjid an-Nabawi follows the adhan by about 10 to 25 minutes.`,
    url: ar ? "/ar" : "/",
  };
}

/** Today's date in both calendars, as a live answer of its own ("what is the Hijri date today"). */
export function datePassage(now: Date, ar: boolean): Chunk {
  const today = riyadhDateIso(now);
  const st = keyDatesState(now, KEY_DATES);
  const day = ar ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][weekdayOf(today)] : DAY_NAME[weekdayOf(today)];
  const next = st.current ?? st.next;
  const g = (iso: string) => formatGregorian(iso, ar ? "ar" : "en");
  const nextLine = next
    ? ar
      ? ` ${st.current ? "الجاري الآن" : "القادم في الجامعة"}: ${next.titleAr} (${g(next.start)}${next.end ? ` إلى ${g(next.end)}` : ""}).`
      : ` ${st.current ? "Happening now" : "Next at the University"}: ${next.title} (${g(next.start)}${next.end ? ` to ${g(next.end)}` : ""}).`
    : "";
  return {
    id: "live-date",
    kind: "date",
    title: ar ? "تقويم الجامعة 1448" : "University calendar 1448",
    text: ar
      ? `اليوم ${day} ${hijriTextAr(formatHijriLong(today))}، الموافق ${formatGregorian(today, "ar")}.${nextLine}`
      : `Today is ${day} ${formatHijriLong(today)} AH, ${formatGregorian(today, "en")}.${nextLine}`,
    url: "/guides/university-calendar-1448",
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
