export type MasjidId = "nabawi" | "quba" | "ibrahim";
export type Prayer = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export type LessonStatus = "active" | "cancelled" | "paused" | "guest";

/** 0 = Sunday … 6 = Saturday */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Localized {
  ar: string;
  en: string;
}

export interface Lesson {
  id: string;
  shaykh: Localized;
  book: Localized;
  bookAuthor?: Localized;
  masjid: MasjidId;
  /** recurring weekdays; empty for one-off/monthly markers */
  days: Weekday[];
  daysLabel?: Localized;
  frequency?: Localized; // e.g. monthly markers
  prayer: Prayer;
  prayerNote?: Localized; // e.g. "واستمرار بعد العشاء"
  location: Localized;
  topic: string; // topic key
  status: LessonStatus;
  note?: Localized;
  sequence?: Localized; // for rotating-book lessons
}

export type AnnouncementType =
  | "cancellation"
  | "postponement"
  | "resumption"
  | "new-book"
  | "book-finished"
  | "reminder"
  | "info"
  | "guest";

export interface Announcement {
  id: string;
  shaykh: Localized;
  /** normalized body: relative words already replaced with bracketed absolute dates */
  text: Localized;
  postedHijri: Localized; // "الأحد ٧/٥/١٤٤٨"
  postedGregorian: Localized; // "19 October 2026"
  source: string; // "@drosalmadina"
  sourceName: Localized;
  type: AnnouncementType;
  expired: boolean;
  channelNote?: Localized;
}

export interface PendingPost {
  id: string;
  source: string;
  sourceName: Localized;
  preview: Localized;
  receivedAt: Localized;
}

export interface TelegramSource {
  handle: string;
  name: Localized;
  previewUrl: string;
  note: Localized;
}

export const TOPICS: Record<string, Localized> = {
  aqidah: { ar: "عقيدة", en: "Aqeedah" },
  tafsir: { ar: "تفسير", en: "Tafsir" },
  hadith: { ar: "حديث", en: "Hadith" },
  fiqh: { ar: "فقه", en: "Fiqh" },
  sirah: { ar: "سيرة", en: "Seerah" },
  manhaj: { ar: "منهج وآداب", en: "Manhaj & Adab" },
  usul: { ar: "أصول", en: "Usul" },
};

export const PRAYERS: Record<Prayer, Localized & { order: number }> = {
  fajr: { ar: "الفجر", en: "Fajr", order: 0 },
  dhuhr: { ar: "الظهر", en: "Dhuhr", order: 1 },
  asr: { ar: "العصر", en: "Asr", order: 2 },
  maghrib: { ar: "المغرب", en: "Maghrib", order: 3 },
  isha: { ar: "العشاء", en: "Isha", order: 4 },
};

export const WEEKDAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
export const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const MASJIDS: Record<MasjidId, Localized & { short: Localized }> = {
  nabawi: {
    ar: "المسجد النبوي",
    en: "Al-Masjid an-Nabawi",
    short: { ar: "النبوي", en: "Nabawi" },
  },
  quba: {
    ar: "مسجد قباء",
    en: "Masjid Quba",
    short: { ar: "قباء", en: "Quba" },
  },
  ibrahim: {
    ar: "مسجد محمد بن إبراهيم — الجامعة الإسلامية",
    en: "Masjid Muhammad ibn Ibrahim — Islamic University",
    short: { ar: "ابن إبراهيم", en: "Ibn Ibrahim" },
  },
};
