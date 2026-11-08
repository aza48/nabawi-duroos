import { and, eq, inArray, sql } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { lessons, masjids, shaykhs } from "@/server/db/schema";
import { cleanRow } from "@/lib/text";

/**
 * Duroos imported from the Al-Midad Google Calendar (read 8 November 2026, weeks of 8 to 14 November and
 * 13 to 19 December). Only recurring series with a clear shaykh, book, day and prayer are here; everything
 * ambiguous is listed in docs/research/al-midad-import.md instead. Days: 0 = Sunday ... 6 = Saturday.
 * New rows are inserted once and never overwrite what an admin has changed since.
 */

type Audience = "all" | "men" | "women";
type Bi = { en: string; ar: string };

export const AL_MIDAD_MASJIDS: { id: string; name: Bi; short: Bi }[] = [
  { id: "jabir-ibn-umayr", name: { en: "Jami' Jabir ibn Umayr, al-Barakah", ar: "جامع جابر بن عمير، حي البركة" }, short: { en: "Jabir ibn Umayr", ar: "جابر بن عمير" } },
  { id: "musad-mubayrik", name: { en: "Jami' Mus'ad Mubayrik al-Radadi", ar: "جامع مسعد مبيريك الردادي" }, short: { en: "Mus'ad al-Radadi", ar: "مسعد الردادي" } },
  { id: "ahmad-ibn-hanbal", name: { en: "Jami' Ahmad ibn Hanbal (al-Hizam)", ar: "جامع أحمد بن حنبل (الحزام)" }, short: { en: "Ahmad ibn Hanbal", ar: "أحمد بن حنبل" } },
];

export const AL_MIDAD_SHAYKHS: { slug: string; name: Bi }[] = [
  { slug: "eid-ibn-marzuq-al-yahyawi", name: { en: "Shaykh Eid ibn Marzuq al-Yahyawi", ar: "الشيخ عيد بن مرزوق اليحيوي" } },
  { slug: "abdulilah-ibn-abdulaziz-al-rifai", name: { en: "Shaykh Abdulilah ibn Abdulaziz al-Rifa'i", ar: "الشيخ عبدالإله بن عبدالعزيز الرفاعي" } },
  { slug: "barakah-bint-mudayf-al-talhi", name: { en: "Shaykhah Barakah bint Mudayf al-Talhi", ar: "الشيخة بركة بنت مضيف الطلحي" } },
  { slug: "badriyyah-bint-muhammad-al-radadi", name: { en: "Shaykhah Badriyyah bint Muhammad al-Radadi", ar: "الشيخة بدرية بنت محمد الردادي" } },
  { slug: "munirah-bint-sayyaf-al-umari", name: { en: "Dr. Munirah bint Sayyaf al-Umari", ar: "د. منيرة بنت صياف العمري" } },
  { slug: "jamilah-bint-nashi-al-muzayni", name: { en: "Shaykhah Jamilah bint Nashi al-Muzayni", ar: "الشيخة جميلة بنت ناشي المزيني" } },
];

const QUBA_UPPER: Bi = { en: "Masjid Quba, upper floor (women's section)", ar: "مسجد قباء، الدور العلوي (مصلى النساء)" };

export type AlMidadLesson = {
  slug: string;
  shaykh: string;
  masjid: string;
  book: Bi;
  author?: Bi;
  topic: string;
  prayer: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
  days: number[];
  location: Bi;
  audience: Audience;
};

export const AL_MIDAD_LESSONS: AlMidadLesson[] = [
  {
    slug: "yahyawi-waqafat",
    shaykh: "eid-ibn-marzuq-al-yahyawi",
    masjid: "jabir-ibn-umayr",
    book: { en: "Reflections on verses from Tafsir as-Sa'di", ar: "وقفات مع آيات من تفسير السعدي" },
    topic: "tafsir",
    prayer: "isha",
    days: [2],
    location: { en: "Jami' Jabir ibn Umayr, al-Barakah district", ar: "جامع جابر بن عمير، حي البركة" },
    audience: "all",
  },
  {
    slug: "rifai-manhaj",
    shaykh: "abdulilah-ibn-abdulaziz-al-rifai",
    masjid: "musad-mubayrik",
    book: { en: "Manhaj as-Salikin", ar: "منهج السالكين" },
    author: { en: "Abdurrahman ibn Nasir as-Sa'di", ar: "عبدالرحمن بن ناصر السعدي" },
    topic: "fiqh",
    prayer: "maghrib",
    days: [3],
    location: { en: "Jami' Mus'ad Mubayrik al-Radadi", ar: "جامع مسعد مبيريك الردادي" },
    audience: "all",
  },
  {
    slug: "sisters-talhi-ighathah",
    shaykh: "barakah-bint-mudayf-al-talhi",
    masjid: "quba",
    book: { en: "Ighathat al-Lahfan min Masayid ash-Shaytan", ar: "إغاثة اللهفان من مصايد الشيطان" },
    author: { en: "Ibn Qayyim al-Jawziyyah", ar: "ابن قيم الجوزية" },
    topic: "manhaj",
    prayer: "maghrib",
    days: [0],
    location: QUBA_UPPER,
    audience: "women",
  },
  {
    slug: "sisters-umari-arbain",
    shaykh: "munirah-bint-sayyaf-al-umari",
    masjid: "ahmad-ibn-hanbal",
    book: { en: "Explanation of the Forty Hadith of an-Nawawi (Ibn Uthaymin's sharh)", ar: "شرح الأربعين النووية (شرح ابن عثيمين)" },
    author: { en: "Imam an-Nawawi", ar: "الإمام النووي" },
    topic: "hadith",
    prayer: "maghrib",
    days: [1],
    location: { en: "Jami' Ahmad ibn Hanbal (al-Hizam), women's section", ar: "جامع أحمد بن حنبل (الحزام)، مصلى النساء" },
    audience: "women",
  },
  {
    slug: "sisters-radadi-tawhid",
    shaykh: "badriyyah-bint-muhammad-al-radadi",
    masjid: "quba",
    book: { en: "Kitab at-Tawhid", ar: "كتاب التوحيد" },
    author: { en: "Muhammad ibn Abd al-Wahhab", ar: "محمد بن عبدالوهاب" },
    topic: "aqidah",
    prayer: "maghrib",
    days: [2],
    location: QUBA_UPPER,
    audience: "women",
  },
  {
    slug: "sisters-umari-kabair",
    shaykh: "munirah-bint-sayyaf-al-umari",
    masjid: "quba",
    book: { en: "Kitab al-Kaba'ir", ar: "كتاب الكبائر" },
    author: { en: "Adh-Dhahabi", ar: "الذهبي" },
    topic: "manhaj",
    prayer: "maghrib",
    days: [4],
    location: QUBA_UPPER,
    audience: "women",
  },
  {
    slug: "sisters-muzayni-mujadilah",
    shaykh: "jamilah-bint-nashi-al-muzayni",
    masjid: "quba",
    book: { en: "Tafsir of Juz' al-Mujadilah", ar: "تفسير جزء المجادلة" },
    author: { en: "Abdurrahman ibn Nasir as-Sa'di", ar: "عبدالرحمن بن ناصر السعدي" },
    topic: "tafsir",
    prayer: "maghrib",
    days: [5],
    location: QUBA_UPPER,
    audience: "women",
  },
];

const BADR_PLACE: Bi = { en: "Western expansion, facing the Bab Quba entrance (gate 5)", ar: "التوسعة الغربية، أمام الداخل من باب قباء (٥)" };

/** Upserts the Al-Midad masjids, teachers and duroos, and fills the gaps Al-Midad answers in existing duroos. */
export async function syncAlMidad(db: Db): Promise<{ added: number; updated: number }> {
  let sort = 100;
  for (const m of AL_MIDAD_MASJIDS) {
    const v = cleanRow({ id: m.id, nameEn: m.name.en, nameAr: m.name.ar, shortEn: m.short.en, shortAr: m.short.ar, sort: sort++ });
    await db.insert(masjids).values(v).onConflictDoNothing();
  }
  const idBySlug = new Map<string, number>();
  for (const s of AL_MIDAD_SHAYKHS) {
    await db.insert(shaykhs).values(cleanRow({ slug: s.slug, nameEn: s.name.en, nameAr: s.name.ar })).onConflictDoNothing();
    const [row] = await db.select({ id: shaykhs.id }).from(shaykhs).where(eq(shaykhs.slug, s.slug));
    idBySlug.set(s.slug, row.id);
  }
  let added = 0;
  for (const [i, l] of AL_MIDAD_LESSONS.entries()) {
    const v = cleanRow({
      slug: l.slug,
      shaykhId: idBySlug.get(l.shaykh)!,
      masjidId: l.masjid,
      bookEn: l.book.en,
      bookAr: l.book.ar,
      bookAuthorEn: l.author?.en ?? null,
      bookAuthorAr: l.author?.ar ?? null,
      topic: l.topic,
      prayer: l.prayer,
      days: l.days,
      locationEn: l.location.en,
      locationAr: l.location.ar,
      status: "active" as const,
      audience: l.audience,
      sort: 500 + i,
    });
    const r = await db.insert(lessons).values(v).onConflictDoNothing().returning({ id: lessons.id });
    added += r.length;
  }

  // Tag the women's duroos (also rows inserted before the audience column existed). An admin's own choice stays.
  const women = AL_MIDAD_LESSONS.filter((l) => l.audience === "women").map((l) => l.slug);
  await db.update(lessons).set({ audience: "women" }).where(and(inArray(lessons.slug, women), eq(lessons.audience, "all")));

  // Shaykh Abdurrazzaq al-Badr's Tafsir as-Sa'di: the seed had no weekdays; Al-Midad gives Sunday to Friday.
  let updated = 0;
  const t = await db
    .update(lessons)
    .set(cleanRow({
      days: [0, 1, 2, 3, 4, 5],
      daysLabelEn: "Sunday to Friday",
      daysLabelAr: "من الأحد إلى الجمعة",
      noteEn: "Latest covered: Tafsir of Surah al-Anfal.",
      noteAr: "آخر المستقرأ: تفسير سورة الأنفال.",
      locationEn: BADR_PLACE.en,
      locationAr: BADR_PLACE.ar,
    }))
    .where(and(eq(lessons.slug, "abadr-tafsir"), sql`cardinality(${lessons.days}) = 0`))
    .returning({ id: lessons.id });
  updated += t.length;
  const w = await db
    .update(lessons)
    .set({ locationEn: BADR_PLACE.en, locationAr: BADR_PLACE.ar })
    .where(and(eq(lessons.slug, "abadr-tawhid"), sql`${lessons.locationAr} not like '%باب قباء%'`))
    .returning({ id: lessons.id });
  updated += w.length;
  return { added, updated };
}
