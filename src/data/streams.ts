import { Lesson, Localized } from "../lib/types";

/**
 * Livestream sources — VERIFIED links only (researched 2026-10-20).
 *
 * The official live video for ALL Masjid Nabawi duroos is the Presidency's
 * YouTube channel "دروس المسجد النبوي" (@wmngovksa). Its channel ID below was
 * extracted from the channel page's canonical URL on 2026-10-20:
 *   <link rel="canonical" href="https://www.youtube.com/channel/UC0XNCc-DU8J5_ksR-eufPaw">
 *   og:title = "دروس المسجد النبوي"
 * Per-book live streams do NOT exist (only same-day recordings), so the honest
 * structure is: one embedded live player + per-shaykh link-outs.
 *
 * There is NO Mixlr stream for Madinah duroos (Mixlr is Makkah-only), so no
 * Mixlr links appear here. Telegram links are link-out only (not embeddable).
 */

const L = (ar: string, en: string): Localized => ({ ar, en });

export const NABAWI_YOUTUBE = {
  channelName: L("دروس المسجد النبوي", "Duroos al-Masjid an-Nabawi"),
  handle: "@wmngovksa",
  channelId: "UC0XNCc-DU8J5_ksR-eufPaw",
  channelUrl: "https://www.youtube.com/@wmngovksa",
  liveUrl: "https://www.youtube.com/@wmngovksa/live",
  liveEmbedUrl:
    "https://www.youtube.com/embed/live_stream?channel=UC0XNCc-DU8J5_ksR-eufPaw",
};

export const MANARA_ALHARAMAIN = {
  name: L("منارة الحرمين", "Manarat al-Haramain"),
  url: "https://manaratalharamain.gov.sa",
};

/** General Nabawi duroos Telegram channels (link-out only). */
export const GENERAL_TELEGRAM = [
  {
    handle: "@drosalmadina",
    name: L("دروس المدينة النبوية", "Duroos al-Madinah an-Nabawiyyah"),
    url: "https://t.me/drosalmadina",
  },
  {
    handle: "@khizana_62",
    name: L("خزانة العلم", "Khizanat al-'Ilm"),
    url: "https://t.me/khizana_62",
  },
];

/** Per-shaykh Telegram link-outs, keyed by the shaykh's Arabic name (as in lessons.ts). */
export const SHAYKH_TELEGRAM: Record<string, { handle: string; url: string }> = {
  "أ. د. سليمان بن سليم الله الرحيلي": {
    handle: "@Sulalruhaily",
    url: "https://t.me/Sulalruhaily",
  },
  "أ. د. علي بن غازي التويجري": { handle: "@twijri", url: "https://t.me/twijri" },
  "د. صالح بن سعد السحيمي": { handle: "@sohaymi", url: "https://t.me/sohaymi" },
  "أ. د. ماهر بن عبد الرحيم خوجة": {
    handle: "@dr_maherkhujah",
    url: "https://t.me/dr_maherkhujah",
  },
};

export interface ShaykhStreamInfo {
  shaykh: Localized;
  telegram?: { handle: string; url: string };
  /** Nabawi shuyukh are covered by the official Presidency live stream. */
  onOfficialLive: boolean;
}

/** Stream info for a shaykh, derived from his lessons (masjid membership). */
export function streamInfoForShaykh(shaykhNameAr: string, lessons: Lesson[]): ShaykhStreamInfo | null {
  const mine = lessons.filter((l) => l.shaykh.ar === shaykhNameAr);
  if (mine.length === 0) return null;
  return {
    shaykh: mine[0].shaykh,
    telegram: SHAYKH_TELEGRAM[shaykhNameAr],
    onOfficialLive: mine.some((l) => l.masjid === "nabawi"),
  };
}
