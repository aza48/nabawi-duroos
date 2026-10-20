"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Localized } from "./types";

export type Lang = "ar" | "en";

const UI = {
  appName: { ar: "مجمّع دروس الحرمين", en: "Duroos Aggregator" },
  tagline: {
    ar: "جدول دروس المسجد النبوي المحدّث مباشرة، وإعلانات المشايخ أولًا بأول",
    en: "The live-updated duroos schedule of the Prophet's Mosque, with shuyukh announcements as they happen",
  },
  heroTitle: { ar: "دروس المسجد النبوي", en: "Duroos of the Prophet's Mosque" },
  home: { ar: "الرئيسية", en: "Home" },
  schedule: { ar: "الجدول", en: "Schedule" },
  daily: { ar: "اليوم", en: "Daily" },
  search: { ar: "بحث", en: "Search" },
  feed: { ar: "التحديثات", en: "Updates" },
  seasonal: { ar: "الموسمي", en: "Seasonal" },
  admin: { ar: "الإدارة", en: "Admin" },
  todaysSchedule: { ar: "جدول اليوم", en: "Today's Schedule" },
  liveUpdates: { ar: "التحديثات المباشرة", en: "Live Updates" },
  todayLabel: { ar: "اليوم: الثلاثاء ٩ / ٥ / ١٤٤٨هـ — ٢٠ أكتوبر ٢٠٢٦", en: "Today: Tuesday 9/5/1448 AH — 20 Oct 2026" },
  latestUpdate: { ar: "أحدث تحديث", en: "Latest update" },
  afterPrayer: { ar: "بعد صلاة", en: "After" },
  prayer: { ar: "الصلاة", en: "Prayer" },
  status: {
    active: { ar: "قائم", en: "Active" },
    cancelled: { ar: "ملغي", en: "Cancelled" },
    paused: { ar: "متوقف مؤقتًا", en: "Paused" },
    guest: { ar: "درس ضيف", en: "Guest lesson" },
  },
  expired: { ar: "انتهى أثره", en: "Expired" },
  postedOn: { ar: "نُشر", en: "Posted" },
  source: { ar: "المصدر", en: "Source" },
  allDays: { ar: "كل الأيام", en: "All days" },
  all: { ar: "الكل", en: "All" },
  searchPlaceholder: { ar: "ابحث باسم الشيخ أو الكتاب…", en: "Search by shaykh or book…" },
  noResults: { ar: "لا توجد نتائج مطابقة", en: "No matching results" },
  noResultsHint: { ar: "جرّب تغيير عوامل التصفية أو البحث بكلمة أبسط", en: "Try changing the filters or a simpler search term" },
  noLessonsToday: { ar: "لا توجد دروس مجدولة لهذا اليوم", en: "No lessons scheduled for this day" },
  weeklySchedule: { ar: "الجدول الأسبوعي الحالي", en: "Current weekly schedule" },
  booksTaught: { ar: "الكتب المدرّسة", en: "Books taught" },
  previousBooks: { ar: "كتب سابقة (منتهية)", en: "Previous books (finished)" },
  recentAnnouncements: { ar: "أحدث الإعلانات", en: "Recent announcements" },
  locationDetails: { ar: "تفاصيل المكان", en: "Location details" },
  channelPage: { ar: "قناة الشيخ على تيليجرام", en: "The shaykh's Telegram channel" },
  openPreview: { ar: "فتح المعاينة العامة", en: "Open public preview" },
  day: { ar: "اليوم", en: "Day" },
  topic: { ar: "التصنيف", en: "Topic" },
  book: { ar: "الكتاب", en: "Book" },
  shaykh: { ar: "الشيخ", en: "Shaykh" },
  seasonalTitle: { ar: "الجدول الموسمي — رمضان والحج", en: "Seasonal Schedule — Ramadan & Hajj" },
  seasonalNote: {
    ar: "يتم استبدال الجدول الأسبوعي بجداول موسمية خاصة خلال رمضان وموسم الحج، وتُنشر هنا فور اعتمادها",
    en: "The weekly schedule is replaced by special seasonal schedules during Ramadan and Hajj; they are published here as soon as they are approved",
  },
  ramadan: { ar: "جدول رمضان", en: "Ramadan Schedule" },
  hajj: { ar: "موسم الحج", en: "Hajj Season" },
  toBeAnnounced: { ar: "يُعلن قريبًا", en: "To be announced" },
  adminTitle: { ar: "لوحة الإدارة", en: "Admin Dashboard" },
  adminNote: {
    ar: "تنبيه: في هذه النسخة المحمولة تُحفظ قرارات الإدارة والإضافات اليدوية في متصفحك فقط (localStorage)، ولا تُنشر حتى تُرحَّل إلى خادم فعلي",
    en: "Note: in this portable build, admin decisions and manual additions are stored in your browser only (localStorage) and are not published until a real backend is connected",
  },
  reviewQueue: { ar: "قائمة المراجعة — منشورات تيليجرام", en: "Review queue — Telegram posts" },
  approve: { ar: "اعتماد", en: "Approve" },
  reject: { ar: "رفض", en: "Reject" },
  verify: { ar: "تحقق", en: "Verify" },
  verified: { ar: "موثّق", en: "Verified" },
  sourcesTitle: { ar: "مصادر تيليجرام (قنوات عامة — بدون تسجيل دخول)", en: "Telegram sources (public channels — no login)" },
  addAnnouncement: { ar: "إضافة إعلان يدويًا", en: "Add announcement manually" },
  addLesson: { ar: "إضافة درس يدويًا", en: "Add lesson manually" },
  save: { ar: "حفظ", en: "Save" },
  textField: { ar: "نص الإعلان", en: "Announcement text" },
  announcementSaved: { ar: "تم حفظ الإعلان في متصفحك", en: "Announcement saved in your browser" },
  lessonSaved: { ar: "تم حفظ الدرس في متصفحك", en: "Lesson saved in your browser" },
  pendingEmpty: { ar: "لا توجد عناصر بانتظار المراجعة", en: "No items waiting for review" },
  live: { ar: "مباشر", en: "Live" },
  lessonsCount: { ar: "درسًا", en: "lessons" },
  type: {
    cancellation: { ar: "إلغاء", en: "Cancellation" },
    postponement: { ar: "تأجيل", en: "Postponement" },
    resumption: { ar: "استئناف", en: "Resumption" },
    "new-book": { ar: "كتاب جديد", en: "New book" },
    "book-finished": { ar: "ختم كتاب", en: "Book completed" },
    reminder: { ar: "تذكير", en: "Reminder" },
    info: { ar: "خبر", en: "Info" },
    guest: { ar: "درس ضيف", en: "Guest" },
  },
  advancedFilters: { ar: "عوامل تصفية متقدمة", en: "Advanced filters" },
  clearFilters: { ar: "مسح التصفية", en: "Clear filters" },
} as const;

export type UiKey = keyof typeof UI;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (loc: Localized) => string;
  ui: (key: UiKey) => string;
  statusLabel: (s: string) => string;
  typeLabel: (s: string) => string;
}

const Ctx = createContext<LangCtx>({
  lang: "ar",
  setLang: () => {},
  t: (l) => l.ar,
  ui: () => "",
  statusLabel: () => "",
  typeLabel: () => "",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("duroos-lang");
    if (saved === "en" || saved === "ar") {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("duroos-lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback((loc: Localized) => (lang === "ar" ? loc.ar : loc.en), [lang]);
  const ui = useCallback((key: UiKey) => {
    const v = UI[key] as Localized;
    return lang === "ar" ? v.ar : v.en;
  }, [lang]);
  const statusLabel = useCallback(
    (s: string) => {
      const v = (UI.status as Record<string, Localized>)[s];
      return v ? (lang === "ar" ? v.ar : v.en) : s;
    },
    [lang]
  );
  const typeLabel = useCallback(
    (s: string) => {
      const v = (UI.type as Record<string, Localized>)[s];
      return v ? (lang === "ar" ? v.ar : v.en) : s;
    },
    [lang]
  );

  return (
    <Ctx.Provider value={{ lang, setLang, t, ui, statusLabel, typeLabel }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  return useContext(Ctx);
}
