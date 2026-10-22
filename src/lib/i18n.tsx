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
  appName: { ar: "دروس النبوي", en: "Nabawi Duroos" },
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
    ar: "إعلانات قاعدة البيانات محمية بكلمة مرور وتُنشر للموقع والمشتركين بالبريد. قرارات قائمة المراجعة وإضافة الدروس اليدوية ما زالت تُحفظ في متصفحك فقط (localStorage)",
    en: "Database announcements are password-protected and publish to the site and to email subscribers. Review-queue decisions and manual lesson additions are still stored in your browser only (localStorage)",
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
    lecture: { ar: "محاضرة", en: "Lecture" },
  },
  advancedFilters: { ar: "عوامل تصفية متقدمة", en: "Advanced filters" },
  clearFilters: { ar: "مسح التصفية", en: "Clear filters" },
  streams: { ar: "البث المباشر", en: "Livestreams" },
  liveNow: { ar: "البث المباشر الآن", en: "Live now" },
  officialLive: { ar: "البث الرسمي لدروس المسجد النبوي", en: "Official live stream of Nabawi duroos" },
  watchOnYoutube: { ar: "المشاهدة على يوتيوب", en: "Watch on YouTube" },
  manaraTitle: { ar: "منارة الحرمين", en: "Manarat al-Haramain" },
  manaraNote: { ar: "بوابة البث التابعة للرئاسة العامة لشؤون الحرمين", en: "The Presidency's streaming portal for the Two Holy Mosques" },
  noStreamQuba: { ar: "لا يوجد بث مباشر موثّق لدروس مسجد قباء — تابع التحديثات عبر قنوات تيليجرام العامة", en: "No verified livestream for Masjid Quba duroos — follow updates via the public Telegram channels" },
  noStreamIu: { ar: "لا يوجد بث مباشر موثّق لدروس الجامعة الإسلامية — دروس الشيخ ماهر خوجة تُنشر عبر قناته", en: "No verified livestream for Islamic University duroos — Shaykh Maher Khujah's lessons are posted on his channel" },
  telegramListen: { ar: "المتابعة على تيليجرام", en: "Follow on Telegram" },
  coveredByLive: { ar: "دروسه مشمولة بالبث الرسمي أعلاه", en: "His lessons are covered by the official live stream above" },
  subscribeTitle: { ar: "تنبيهات الدروس بالبريد", en: "Lesson alerts by email" },
  subscribeHint: { ar: "أدخل بريدك ليصلك تأكيد، ثم اختر المشايخ والكتب التي تريد تنبيهاتها (إلغاءات، تأجيلات، بدء وختم الكتب)", en: "Enter your email to receive a confirmation, then choose the shuyukh and books you want alerts for (cancellations, delays, new and finished books)" },
  emailPlaceholder: { ar: "بريدك الإلكتروني", en: "Your email address" },
  subscribeBtn: { ar: "اشترك", en: "Subscribe" },
  checkEmail: { ar: "تم! افحص بريدك واضغط رابط التأكيد لتفعيل التنبيهات", en: "Done! Check your inbox and click the confirmation link to activate alerts" },
  alreadyConfirmed: { ar: "بريدك مؤكّد ومفعّل للتنبيهات", en: "Your email is confirmed and alerts are active" },
  alertsSoon: { ar: "التنبيهات بالبريد قريبًا", en: "Email alerts coming soon" },
  invalidEmail: { ar: "أدخل بريدًا إلكترونيًا صحيحًا", en: "Enter a valid email address" },
  alertsForShaykh: { ar: "تنبيهات هذا الشيخ", en: "Alerts for this shaykh" },
  alertsForBook: { ar: "تنبيهات هذا الكتاب", en: "Alerts for this book" },
  alertSet: { ar: "تم ضبط التنبيه — أكّد بريدك إن لم تفعل", en: "Alert set — confirm your email if you haven't yet" },
  needEmailFirst: { ar: "أدخل بريدك أولًا", en: "Enter your email first" },
  manageAlerts: { ar: "إدارة التنبيهات", en: "Manage alerts" },
  manageTitle: { ar: "إدارة تنبيهات الدروس", en: "Manage lesson alerts" },
  manageHint: { ar: "اختر المشايخ والكتب التي تصلك تنبيهاتها، ثم احفظ", en: "Choose the shuyukh and books you receive alerts for, then save" },
  saveChanges: { ar: "حفظ التغييرات", en: "Save changes" },
  changesSaved: { ar: "تم حفظ تنبيهاتك", en: "Your alerts have been saved" },
  invalidLink: { ar: "هذا الرابط غير صالح أو منتهٍ", en: "This link is invalid or expired" },
  notConfirmedYet: { ar: "بريدك لم يُؤكَّد بعد — افحص بريدك واضغط رابط التأكيد أولًا", en: "Your email is not confirmed yet — check your inbox and click the confirmation link first" },
  yourEmail: { ar: "بريدك", en: "Your email" },
  adminLoginTitle: { ar: "دخول الإدارة", en: "Admin sign-in" },
  password: { ar: "كلمة المرور", en: "Password" },
  login: { ar: "دخول", en: "Sign in" },
  wrongPassword: { ar: "كلمة المرور غير صحيحة", en: "Incorrect password" },
  adminNotConfigured: { ar: "الإدارة غير مفعّلة: لم يتم تعيين كلمة مرور المسؤول (ADMIN_PASSWORD) على الخادم", en: "Admin is not enabled: no admin password (ADMIN_PASSWORD) is set on the server" },
  backendNotConfigured: { ar: "قاعدة البيانات غير متصلة بعد — أضف DATABASE_URL لتفعيل هذه الميزة", en: "The database is not connected yet — add DATABASE_URL to enable this feature" },
  loginRequired: { ar: "يلزم تسجيل الدخول لإدارة الإعلانات", en: "Sign-in is required to manage announcements" },
  goToLogin: { ar: "الذهاب لصفحة الدخول", en: "Go to sign-in" },
  dbAnnouncements: { ar: "إعلانات قاعدة البيانات (تُنشر وتصل المشتركين بالبريد)", en: "Database announcements (published ones email subscribers)" },
  createAnnouncement: { ar: "إعلان جديد", en: "New announcement" },
  annType: {
    cancelled: { ar: "إلغاء", en: "Cancelled" },
    delayed: { ar: "تأجيل", en: "Delayed / postponed" },
    paused: { ar: "توقف مؤقت", en: "Paused" },
    resumed: { ar: "استئناف", en: "Resumed" },
    book_started: { ar: "بدء كتاب جديد", en: "New book started" },
    book_finished: { ar: "ختم كتاب", en: "Book completed" },
    guest: { ar: "درس ضيف", en: "Guest lesson" },
    lecture: { ar: "محاضرة", en: "Lecture" },
    schedule_change: { ar: "تغيير في الجدول", en: "Schedule change" },
    other: { ar: "أخرى", en: "Other" },
  },
  titleAr: { ar: "العنوان (عربي)", en: "Title (Arabic)" },
  titleEn: { ar: "العنوان (إنجليزي)", en: "Title (English)" },
  bodyAr: { ar: "النص (عربي)", en: "Body (Arabic)" },
  bodyEn: { ar: "النص (إنجليزي)", en: "Body (English)" },
  lessonDate: { ar: "تاريخ الدرس (اختياري)", en: "Lesson date (optional)" },
  annShaykh: { ar: "الشيخ", en: "Shaykh" },
  annBook: { ar: "الكتاب (اختياري)", en: "Book (optional)" },
  noneOption: { ar: "— بدون —", en: "— None —" },
  createDraft: { ar: "حفظ كمسودة", en: "Save as draft" },
  draft: { ar: "مسودة", en: "Draft" },
  publishedLabel: { ar: "منشور", en: "Published" },
  publishSend: { ar: "نشر وإرسال بالبريد", en: "Publish & email" },
  deleteAnn: { ar: "حذف", en: "Delete" },
  sentTo: { ar: "أُرسل إلى", en: "Sent to" },
  subscribersWord: { ar: "مشتركًا", en: "subscribers" },
  noAnnouncementsYet: { ar: "لا توجد إعلانات بعد", en: "No announcements yet" },
  backHome: { ar: "العودة للرئيسية", en: "Back to home" },
  eventsTitle: { ar: "أحداث ومحاضرات", en: "Events & lectures" },
  ended: { ar: "انتهى", en: "Ended" },
  eventCourse: { ar: "دورة علمية", en: "Course" },
  eventLecture: { ar: "محاضرة", en: "Lecture" },
  eventAlert: { ar: "تنبيه", en: "Alert" },
  noStandingSchedule: {
    ar: "لا توجد دروس أسبوعية ثابتة رُصدت لهذا المسجد — تُنشر هنا المحاضرات والدورات عند الإعلان عنها",
    en: "No standing weekly duroos were observed for this masjid — lectures and courses are posted here when announced",
  },
  upcomingLectures: { ar: "محاضرات قادمة", en: "Upcoming lectures" },
  dismiss: { ar: "إغلاق", en: "Dismiss" },
  hijrahStreamNote: {
    ar: "يبثّ أ. د. طارق القحطاني دروسه من هذا المسجد مباشرة عبر قناته على تيليجرام",
    en: "Prof. Tariq al-Qahtani livestreams his lessons from this masjid via his Telegram channel",
  },
} as const;

export type UiKey = keyof typeof UI;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (loc: Localized) => string;
  ui: (key: UiKey) => string;
  statusLabel: (s: string) => string;
  typeLabel: (s: string) => string;
  annTypeLabel: (s: string) => string;
}

const Ctx = createContext<LangCtx>({
  lang: "ar",
  setLang: () => {},
  t: (l) => l.ar,
  ui: () => "",
  statusLabel: () => "",
  typeLabel: () => "",
  annTypeLabel: () => "",
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
  const annTypeLabel = useCallback(
    (s: string) => {
      const v = (UI.annType as Record<string, Localized>)[s];
      return v ? (lang === "ar" ? v.ar : v.en) : s;
    },
    [lang]
  );

  return (
    <Ctx.Provider value={{ lang, setLang, t, ui, statusLabel, typeLabel, annTypeLabel }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  return useContext(Ctx);
}
