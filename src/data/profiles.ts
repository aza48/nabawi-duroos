import { Localized } from "../lib/types";

const L = (ar: string, en: string): Localized => ({ ar, en });

export interface ShaykhProfile {
  /** Portrait shown on the profile card (path under /public). */
  photo: string;
  /** One-line role shown under the name. */
  role: Localized;
  /** Short verified facts, shown as a list beside the photo. */
  facts: Localized[];
}

/** Keyed by the shaykh's Arabic name, exactly as used in lessons/announcements. */
export const SHAYKH_PROFILES: Record<string, ShaykhProfile> = {
  "أ. د. سليمان بن سليم الله الرحيلي": {
    photo: "/images/ruhaily.png",
    role: L(
      "أستاذ كرسي الفتوى وضوابطها بالجامعة الإسلامية بالمدينة المنورة",
      "Professor of the Chair of Fatwa and its Principles at the Islamic University of Madinah"
    ),
    facts: [
      L("مدرّس في المسجد النبوي الشريف", "A teacher at the Prophet's Mosque"),
      L(
        "من دروسه في المسجد النبوي: شرح «دليل الطالب» وشرح «صحيح الترغيب والترهيب» بعد صلاة العصر، وشرح «كتاب التوحيد» بعد فجر يوم السبت",
        "His lessons at the Prophet's Mosque include explanations of «Dalil al-Talib» and «Sahih al-Targhib wat-Tarhib» after Asr, and «Kitab al-Tawhid» after Fajr on Saturdays"
      ),
      L("موقعه الرسمي: sualruhaily.com", "His official website: sualruhaily.com"),
      L("قناته على تيليجرام: @Sulalruhaily", "His Telegram channel: @Sulalruhaily"),
    ],
  },
};
