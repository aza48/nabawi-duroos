import { and, eq, isNull } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { lessons } from "@/server/db/schema";

/**
 * The text each dars teaches, matched by title AND author to its turath.io edition (all have PDFs).
 * A commentary links to the base text (matn) it explains. Duroos that are a shaykh's own series,
 * or texts turath.io doesn't carry, are left out rather than guessed.
 */
export const BOOK_LINKS: Record<string, number> = {
  "abadr-tafsir": 42, // Tafsir as-Sa'di
  "shamani-tafsir": 42,
  "quba-husaini-tafsir": 42,
  "quba-shamani-ayat": 42,
  "abadr-tawhid": 11318, // Kitab at-Tawhid
  "hijrah-qahtani-tawhid": 11318,
  "ruh-tawhid": 11318,
  "balawi-ghalib-ubudiyyah": 22647, // al-'Ubudiyyah
  "balawi-saidi-tahrir": 12019, // Sharh al-Kawkab al-Munir (Mukhtasar at-Tahrir)
  "battin-fath": 1673, // Fath al-Bari
  "battin-muslim": 1727, // Sahih Muslim, ed. Abdul-Baqi
  "battin-tirmidhi": 1435, // Jami' at-Tirmidhi, ed. Shakir
  "hudhayfi-nayl": 1218, // Nayl al-Awtar
  "khalaf-tadmuriyyah": 22666, // at-Tadmuriyyah
  "qasim-sequence": 11230, // Zad al-Mustaqni'
  "quba-battin-bulugh": 9111, // Bulugh al-Maram
  "tuwaijri-bulugh": 9111,
  "quba-hujayli-lulu": 10619, // al-Lu'lu' wal-Marjan
  "quba-hujayli-sullam": 20854, // Ma'arij al-Qabul, with the text of Sullam al-Wusul
  "quba-khuja-arbaun": 12836, // al-Arba'in an-Nawawiyyah
  "quba-luhaydan-zad": 197, // Zad al-Ma'ad
  "quba-omar-adab": 7495, // Adab al-Mashy ila as-Salah
  "uni-maher-sequence": 11221, // Fadl al-Islam
  "quba-ruh-jawami": 9945, // Bahjat Qulub al-Abrar (as-Sa'di's own commentary on Jawami' al-Akhbar)
  "quba-ruh-kabair": 6848, // al-Kaba'ir
  "quba-sufi-hamawiyyah": 18381, // al-Fatwa al-Hamawiyyah
  "quba-tuwaijri-ilm": 735, // Sahih al-Bukhari
  "ruh-dalil": 11196, // Dalil at-Talib
  "ruh-targhib": 171, // Sahih at-Targhib wat-Tarhib
  "shuwayir-rawd": 1679, // ar-Rawd al-Murbi'
  "shuwayir-wasitiyyah": 18098, // al-Aqidah al-Wasitiyyah
  "tahir-adab": 12991, // al-Adab al-Mufrad
  "tahir-fadail": 13136, // Fada'il as-Sahabah
  "tuwaijri-kathir": 1503, // Tafsir Ibn Kathir
  "uni-saadi-kafi": 21731, // al-Kafi of Ibn Qudamah
};

export const turathUrl = (id: number) => `https://app.turath.io/book/${id}`;

/** Fills in book links where none is set yet; an admin's own link is never replaced. Returns how many duroos have a known book. */
export async function syncBookLinks(db: Db): Promise<number> {
  let known = 0;
  for (const [slug, id] of Object.entries(BOOK_LINKS)) {
    const [row] = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.slug, slug));
    if (!row) continue;
    known++;
    await db.update(lessons).set({ bookUrl: turathUrl(id) }).where(and(eq(lessons.slug, slug), isNull(lessons.bookUrl)));
  }
  return known;
}
