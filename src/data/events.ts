import { Localized, MasjidId } from "../lib/types";

/**
 * Past events at the newer masjids — lectures, dated courses and alerts —
 * mined from the public Telegram channels on 2026-10-20 (see
 * ~/workspace/new-masjids-research.md). ONLY facts stated in the channels are
 * recorded here, each with its source post. Dates are the Hijri dates exactly
 * as the posts state them; dateIso/endIso are the Umalqura-converted
 * Gregorian bounds used solely to mark items ended and to sort them.
 *
 * This history is deliberately separate from the announcements feed: these
 * items never trigger the lecture pop-up.
 */

const L = (ar: string, en: string): Localized => ({ ar, en });

export type MasjidEventKind = "course" | "lecture" | "alert";

export interface MasjidEvent {
  id: string;
  masjid: MasjidId;
  kind: MasjidEventKind;
  title: Localized;
  shaykh?: Localized;
  /** Hijri date/range exactly as stated in the source post. */
  hijriDate: Localized;
  prayer?: Localized;
  /** Gregorian bounds (Umalqura conversion) for ended-marking + ordering. */
  dateIso: string;
  endIso: string;
  source: string; // source post URL
}

export const EVENTS: MasjidEvent[] = [
  // ==================== مسجد سيد الشهداء ====================
  {
    id: "shuhada-hajiri-arbaeen",
    masjid: "sayyid-shuhada",
    kind: "lecture",
    title: L("وقفات مع حديث العرباض بن سارية رضي الله عنه", "Reflections on the hadith of al-'Irbad ibn Sariyah (may Allah be pleased with him)"),
    shaykh: L("الشيخ محمد بن رمزان الهاجري", "Shaykh Muhammad ibn Ramzan al-Hajiri"),
    hijriDate: L("الخميس ٢٠/٤/١٤٤٨هـ", "Thursday 20/4/1448 AH"),
    prayer: L("بعد صلاة المغرب", "After Maghrib"),
    dateIso: "2026-10-01",
    endIso: "2026-10-01",
    source: "https://t.me/khizana_62/10587",
  },
  {
    id: "shuhada-nadwa-saudia",
    masjid: "sayyid-shuhada",
    kind: "lecture",
    title: L("ندوة «السعودية دعوةٌ ودولة»", "Seminar: «Saudi Arabia — a Da'wah and a State»"),
    shaykh: L(
      "أ. د. إبراهيم بن عامر الرحيلي، وأسامة بن زيد المدخلي، وأ. د. ماهر خوجة، ود. عبد اللطيف الشاماني",
      "Prof. Ibrahim ibn Amir al-Ruhayli, Usama ibn Zayd al-Madkhali, Prof. Maher Khujah and Dr. Abdullatif al-Shamani"
    ),
    hijriDate: L("الاثنين ١٠/٤/١٤٤٨هـ", "Monday 10/4/1448 AH"),
    prayer: L("بعد صلاة العصر", "After Asr"),
    dateIso: "2026-09-21",
    endIso: "2026-09-21",
    source: "https://t.me/drosalmadina/12423",
  },
  {
    id: "shuhada-aisha-women",
    masjid: "sayyid-shuhada",
    kind: "lecture",
    title: L("محاضرة للنساء: شرح حديث «لا تزول قدما عبدٍ يوم القيامة حتى يُسأل…»", "Women's lecture: explanation of the hadith «The feet of a servant will not move on the Day of Resurrection until he is asked…»"),
    shaykh: L("الأستاذة عائشة إلياس", "Ust. Aisha Ilyas"),
    hijriDate: L("الثلاثاء ٢١/٢/١٤٤٨هـ", "Tuesday 21/2/1448 AH"),
    prayer: L("بعد صلاة المغرب", "After Maghrib"),
    dateIso: "2026-08-04",
    endIso: "2026-08-04",
    source: "https://t.me/drosalmadina/12252",
  },

  // ==================== جامع حماد البلوي ====================
  {
    id: "balawi-course-13",
    masjid: "balawi",
    kind: "course",
    title: L("الدورة العلمية المدنية الثالثة عشرة", "The 13th Madinah Scholarly Course"),
    hijriDate: L("الجمعة ١/٣/١٤٤٨هـ – السبت ١٦/٣/١٤٤٨هـ", "Friday 1/3/1448 – Saturday 16/3/1448 AH"),
    prayer: L("أيام علمية يومية بعد العصر والمغرب والعشاء", "Daily scholarly days after Asr, Maghrib and Isha"),
    dateIso: "2026-08-14",
    endIso: "2026-08-29",
    source: "https://t.me/drosalmadina/12251",
  },
  {
    id: "balawi-rukabi-postponed",
    masjid: "balawi",
    kind: "alert",
    title: L(
      "تأجيل درس الشيخ أ. د. عارف الركابي — لا يوجد يوم علمي مساء هذا اليوم في الجامع",
      "Shaykh Prof. Arif al-Rukabi's lesson postponed — no scholarly evening at the masjid that night"
    ),
    shaykh: L("أ. د. عارف الركابي", "Prof. Dr. Arif al-Rukabi"),
    hijriDate: L("الأربعاء ١٣/٣/١٤٤٨هـ", "Wednesday 13/3/1448 AH"),
    dateIso: "2026-08-26",
    endIso: "2026-08-26",
    source: "https://t.me/khizana_62/10104",
  },
  {
    id: "balawi-ruhayli-talib",
    masjid: "balawi",
    kind: "lecture",
    title: L("محاضرة «طالب العلم» (افتتاح الدورة العلمية المدنية الثالثة عشرة)", "Lecture: «The Student of Knowledge» (opening of the 13th Madinah Scholarly Course)"),
    shaykh: L("أ. د. سليمان بن سليم الله الرحيلي", "Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli"),
    hijriDate: L("الجمعة ١/٣/١٤٤٨هـ", "Friday 1/3/1448 AH"),
    prayer: L("بعد صلاة العصر", "After Asr"),
    dateIso: "2026-08-14",
    endIso: "2026-08-14",
    source: "https://t.me/Sulalruhaily/808",
  },
  {
    id: "balawi-suwayh-tawhid",
    masjid: "balawi",
    kind: "course",
    title: L("شرح كتاب التوحيد", "Explanation of Kitab al-Tawhid"),
    shaykh: L("الشيخ صالح بن محمد الصويح", "Shaykh Salih ibn Muhammad al-Suwayh"),
    hijriDate: L("الأربعاء ١٢/٤/١٤٤٨هـ – السبت ١٥/٤/١٤٤٨هـ", "Wednesday 12/4/1448 – Saturday 15/4/1448 AH"),
    prayer: L("بعد العصر والمغرب والعشاء", "After Asr, Maghrib and Isha"),
    dateIso: "2026-09-23",
    endIso: "2026-09-26",
    source: "https://t.me/khizana_62/10476",
  },
  {
    id: "balawi-hamad-zad",
    masjid: "balawi",
    kind: "course",
    title: L("شرح كتاب زاد المستقنع للحجاوي", "Explanation of Zad al-Mustaqni' of al-Hajjawi"),
    shaykh: L("الشيخ حمد بن عبد الله الحمد", "Shaykh Hamad ibn Abdullah al-Hamad"),
    hijriDate: L("الخميس–الجمعة ٢٨–٢٩/٣/١٤٤٨هـ، والأربعاء–الخميس ٣–٤/٥/١٤٤٨هـ", "Thu–Fri 28–29/3/1448 and Wed–Thu 3–4/5/1448 AH"),
    prayer: L("بعد العصر والمغرب والعشاء", "After Asr, Maghrib and Isha"),
    dateIso: "2026-09-10",
    endIso: "2026-10-15",
    source: "https://t.me/khizana_62/10314",
  },
  {
    id: "balawi-suwayh-qawaid",
    masjid: "balawi",
    kind: "lecture",
    title: L("شرح القواعد الأربع والأصول الستة", "Explanation of Al-Qawa'id al-Arba' and Al-Usul as-Sittah"),
    shaykh: L("الشيخ صالح بن محمد الصويح", "Shaykh Salih ibn Muhammad al-Suwayh"),
    hijriDate: L("السبت ٢٦/١/١٤٤٨هـ", "Saturday 26/1/1448 AH"),
    dateIso: "2026-07-11",
    endIso: "2026-07-11",
    source: "https://t.me/drosalmadina/12194",
  },
  {
    id: "balawi-suwayh-fadl",
    masjid: "balawi",
    kind: "lecture",
    title: L("شرح كتاب فضل الإسلام", "Explanation of Fadl al-Islam"),
    shaykh: L("الشيخ صالح بن محمد الصويح", "Shaykh Salih ibn Muhammad al-Suwayh"),
    hijriDate: L("السبت ١٨/٢/١٤٤٨هـ", "Saturday 18/2/1448 AH"),
    dateIso: "2026-08-01",
    endIso: "2026-08-01",
    source: "https://t.me/drosalmadina/12239",
  },
  {
    id: "balawi-suwayh-fard",
    masjid: "balawi",
    kind: "lecture",
    title: L("شرح كتاب فرض طلب العلم للآجري", "Explanation of Fard Talab al-'Ilm of al-Ajurri"),
    shaykh: L("الشيخ صالح بن محمد الصويح", "Shaykh Salih ibn Muhammad al-Suwayh"),
    hijriDate: L("السبت ٢٣/٣/١٤٤٨هـ", "Saturday 23/3/1448 AH"),
    dateIso: "2026-09-05",
    endIso: "2026-09-05",
    source: "https://t.me/drosalmadina/12361",
  },

  // ==================== مسجد القبلتين ====================
  {
    id: "qiblatain-humayd-huquq",
    masjid: "qiblatain",
    kind: "lecture",
    title: L("الحقوق العشرة في قوله تعالى: ﴿واعبدوا الله ولا تشركوا به شيئًا﴾", "The ten rights in His saying: «Worship Allah and associate nothing with Him»"),
    shaykh: L("أ. د. محمد بن ناصر الحميد", "Prof. Dr. Muhammad ibn Nasir al-Humayd"),
    hijriDate: L("الأحد ١٣/١/١٤٤٨هـ", "Sunday 13/1/1448 AH"),
    dateIso: "2026-06-28",
    endIso: "2026-06-28",
    source: "https://t.me/khizana_62/9435",
  },
  {
    id: "qiblatain-ruhayli-haqq",
    masjid: "qiblatain",
    kind: "lecture",
    title: L("حق الله تعالى", "The Right of Allah the Exalted"),
    shaykh: L("أ. د. إبراهيم بن عامر الرحيلي", "Prof. Dr. Ibrahim ibn Amir al-Ruhayli"),
    hijriDate: L("الأربعاء ٢٣/١/١٤٤٨هـ", "Wednesday 23/1/1448 AH"),
    prayer: L("بعد صلاة المغرب", "After Maghrib"),
    dateIso: "2026-07-08",
    endIso: "2026-07-08",
    source: "https://t.me/khizana_62/9520",
  },
  {
    id: "qiblatain-omari-juhud",
    masjid: "qiblatain",
    kind: "lecture",
    title: L("جهود المملكة العربية السعودية في حماية جناب التوحيد", "The efforts of the Kingdom of Saudi Arabia in protecting Tawhid"),
    shaykh: L("د. عبد الهادي بن عوض العمري", "Dr. Abdulhadi ibn Awad al-Omari"),
    hijriDate: L("السبت ٨/٤/١٤٤٨هـ", "Saturday 8/4/1448 AH"),
    dateIso: "2026-09-19",
    endIso: "2026-09-19",
    source: "https://t.me/khizana_62/10482",
  },
  {
    id: "qiblatain-hajiri-wahda",
    masjid: "qiblatain",
    kind: "lecture",
    title: L("وحدة الصف واجتماع الكلمة", "Unity of the ranks and agreement upon one word"),
    shaykh: L("الشيخ محمد بن رمزان الهاجري", "Shaykh Muhammad ibn Ramzan al-Hajiri"),
    hijriDate: L("الأحد ٢٣/٤/١٤٤٨هـ", "Sunday 23/4/1448 AH"),
    prayer: L("بعد صلاة المغرب", "After Maghrib"),
    dateIso: "2026-10-04",
    endIso: "2026-10-04",
    source: "https://t.me/khizana_62/10626",
  },
];

export function eventsForMasjid(masjid: MasjidId): MasjidEvent[] {
  return EVENTS.filter((e) => e.masjid === masjid).sort((a, b) =>
    b.endIso.localeCompare(a.endIso)
  );
}
