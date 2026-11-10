export type MasjidId =
  | "nabawi"
  | "quba"
  | "ibrahim"
  | "sayyid-shuhada"
  | "balawi"
  | "dar-hijrah"
  | "qiblatain";
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
  /** Overrides the prayer-time label when the sources do not state a prayer time
      (the `prayer` value is then only a grouping/sort bucket). */
  timeLabel?: Localized;
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
  | "guest"
  | "lecture";

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
  /** ISO "YYYY-MM-DD" (Asia/Riyadh semantics) of a one-off event, e.g. a lecture. */
  eventDate?: string;
  masjidId?: MasjidId;
  /** Site-relative path to the announcement flyer poster, e.g. "/images/flyer-....jpg". */
  image?: string;
  channelNote?: Localized;
}

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
  "sayyid-shuhada": {
    ar: "مسجد سيد الشهداء",
    en: "Sayyid al-Shuhada Mosque",
    short: { ar: "سيد الشهداء", en: "Sayyid al-Shuhada" },
  },
  balawi: {
    ar: "جامع حماد البلوي — حي الفيصلية",
    en: "Jami' Hammad al-Balawi — al-Faisaliyah District",
    short: { ar: "البلوي", en: "Al-Balawi" },
  },
  "dar-hijrah": {
    ar: "مسجد دار الهجرة — الفيصلية",
    en: "Masjid Dar al-Hijrah — al-Faisaliyah",
    short: { ar: "دار الهجرة", en: "Dar al-Hijrah" },
  },
  qiblatain: {
    ar: "مسجد القبلتين",
    en: "Masjid al-Qiblatain",
    short: { ar: "القبلتين", en: "Qiblatain" },
  },
};
