import { parse } from "node-html-parser";
import { describe, expect, it } from "vitest";
import { enhanceGuideHtml, linkScriptureRefs, linkScriptureTree } from "@/lib/guide-html";
import {
  AYAH_COUNTS,
  SURAH_BY_KEY,
  SURAH_NAMES,
  SURAH_NAMES_AR,
  findScriptureRefs,
  hadithHref,
  quranHref,
  surahNameKey,
  toAsciiDigits,
} from "@/lib/scripture-refs";
import { SEED_GUIDES } from "@/server/seed/content/sync";
import { sanitizeArticleHtml } from "@/lib/sanitize";

/** [link text, address] for every reference found in a line of text. */
const refs = (text: string) => findScriptureRefs(text).map((r) => [text.slice(r.start, r.end), r.href]);
/** The addresses linked in a piece of guide HTML. */
const links = (html: string) =>
  parse(linkScriptureRefs(html))
    .querySelectorAll("a.scripture-ref")
    .map((a) => [a.text, a.getAttribute("href")]);

const EN_DASH = "\u2013";

describe("the surah tables", () => {
  it("has 114 surahs with 6236 ayat between them", () => {
    expect(AYAH_COUNTS).toHaveLength(114);
    expect(SURAH_NAMES).toHaveLength(114);
    expect(SURAH_NAMES_AR).toHaveLength(114);
    expect(AYAH_COUNTS.reduce((a, b) => a + b, 0)).toBe(6236);
    expect([AYAH_COUNTS[0], AYAH_COUNTS[1], AYAH_COUNTS[25], AYAH_COUNTS[112], AYAH_COUNTS[113]]).toEqual([7, 286, 227, 5, 6]);
  });

  it("knows every surah by its English and Arabic name, and no two surahs share a spelling", () => {
    SURAH_NAMES.forEach((n, i) => expect(SURAH_BY_KEY.get(surahNameKey(n).key), n).toBe(i + 1));
    SURAH_NAMES_AR.forEach((n, i) => expect(SURAH_BY_KEY.get(surahNameKey(n).key), n).toBe(i + 1));
    expect(new Set(SURAH_BY_KEY.values()).size).toBe(114);
  });

  it("reads common spellings of the same name as one", () => {
    const same = [
      ["al-Baqarah", "Baqara", "Al Baqarah", "Surah al-Baqarah", "al-Baqara"],
      ["Al Imran", "Aal-e-Imran", "Ali 'Imran", "Al-Imran"],
      ["Ya-Sin", "Yaseen", "Yasin", "Surah Yasin"],
      ["an-Nisa", "An-Nisaa", "Nisa'", "al-Nisa"],
      ["at-Tawbah", "Taubah", "At-Tauba"],
      ["الإسراء", "الاسراء", "سورة الإسراء"],
      ["المائدة", "المائده"],
    ];
    for (const names of same) {
      const nums = names.map((n) => SURAH_BY_KEY.get(surahNameKey(n).key));
      expect(new Set(nums).size, names.join(", ")).toBe(1);
      expect(nums[0], names[0]).toBeDefined();
    }
  });

  it("turns Arabic-Indic and Persian digits into ASCII without moving anything", () => {
    expect(toAsciiDigits("البقرة: ٢٨٦ و ۱۲")).toBe("البقرة: 286 و 12");
  });

  it("checks surah and ayah numbers against the counts", () => {
    expect(quranHref(2, 286)).toBe("https://quran.com/2/286");
    expect(quranHref(2, 255, 257)).toBe("https://quran.com/2/255-257");
    expect(quranHref(2, 287)).toBeNull();
    expect(quranHref(115, 1)).toBeNull();
    expect(quranHref(0, 1)).toBeNull();
    expect(quranHref(1, 0)).toBeNull();
    expect(quranHref(2, 257, 255)).toBeNull();
    expect(quranHref(112, 1, 5)).toBeNull();
    expect(hadithHref("bukhari", 7563)).toBe("https://sunnah.com/bukhari:7563");
    expect(hadithHref("bukhari", 7564)).toBeNull();
    expect(hadithHref("muslim", 0)).toBeNull();
  });
});

describe("Qur'an references in English", () => {
  it.each([
    ["Read al-Baqarah 2:286 tonight.", "al-Baqarah 2:286", "https://quran.com/2/286"],
    ["The ayah an-Nisa 4:59 is about obedience.", "an-Nisa 4:59", "https://quran.com/4/59"],
    ["As in Surah al-Baqarah 2:255.", "Surah al-Baqarah 2:255", "https://quran.com/2/255"],
    ["See Al Imran 3:7.", "Al Imran 3:7", "https://quran.com/3/7"],
    ["Ayat al-Kursi (Qur'an 2:255) is recited after each prayer.", "Qur'an 2:255", "https://quran.com/2/255"],
    ["All people are equal before Allah (Qur’an 49:13).", "Qur’an 49:13", "https://quran.com/49/13"],
    ["Quran 2:255-257 is read at night.", "Quran 2:255-257", "https://quran.com/2/255-257"],
    [`Read al-Baqarah 2:255${EN_DASH}257 slowly.`, `al-Baqarah 2:255${EN_DASH}257`, "https://quran.com/2/255-257"],
    ["Learn Surah 2:255 by heart.", "Surah 2:255", "https://quran.com/2/255"],
    ["See (Q. 112:1-4).", "Q. 112:1-4", "https://quran.com/112/1-4"],
    ["Patience is praised (Q 2:153).", "Q 2:153", "https://quran.com/2/153"],
    ["Obey those in authority (Qur'an 4:59).", "Qur'an 4:59", "https://quran.com/4/59"],
    ["Read Quran 4:30-35 with the tafsir.", "Quran 4:30-35", "https://quran.com/4/30-35"],
    ["Read Surah al-Mulk, verse 2, at night.", "Surah al-Mulk, verse 2", "https://quran.com/67/2"],
    ["Read al-Mulk, verse 2.", "al-Mulk, verse 2", "https://quran.com/67/2"],
    ["Read Maryam, ayah 30.", "Maryam, ayah 30", "https://quran.com/19/30"],
    ["The ayah of light, an-Nur, ayah 35, is well known.", "an-Nur, ayah 35", "https://quran.com/24/35"],
    ["Recite Surah Sad, ayah 3.", "Surah Sad, ayah 3", "https://quran.com/38/3"],
    ["See At-Talaq 65:3.", "At-Talaq 65:3", "https://quran.com/65/3"],
    ["Recite Surah al-Baqarah, ayah 286, before sleeping.", "Surah al-Baqarah, ayah 286", "https://quran.com/2/286"],
    ["Recite Surah al-Kahf, verses 1-10, on Friday.", "Surah al-Kahf, verses 1-10", "https://quran.com/18/1-10"],
    ["Recite Surah 18, ayat 1 to 10.", "Surah 18, ayat 1 to 10", "https://quran.com/18/1-10"],
    ["Recite Surah Yasin, ayah 12.", "Surah Yasin, ayah 12", "https://quran.com/36/12"],
    ["The last ayah (al-Baqarah: 286) is a du'a.", "al-Baqarah: 286", "https://quran.com/2/286"],
    ["The same ayah, al-Baqarah: 286, is a du'a.", "al-Baqarah: 286", "https://quran.com/2/286"],
    ["He recited al-Baqarah (2:286) in Witr.", "2:286", "https://quran.com/2/286"],
    ["“Allah does not burden a soul beyond what it can bear” (2:286).", "2:286", "https://quran.com/2/286"],
    ['"Allah does not burden a soul beyond what it can bear" [2:286]', "2:286", "https://quran.com/2/286"],
    ["“Indeed, with hardship comes ease” (94:5).", "94:5", "https://quran.com/94/5"],
  ])("%s", (text, linked, href) => {
    expect(refs(text)).toEqual([[linked, href]]);
  });

  it("links every reference in a sentence", () => {
    expect(refs("Compare al-Baqarah 2:286 with at-Talaq 65:7 and Qur'an 94:5-6.")).toEqual([
      ["al-Baqarah 2:286", "https://quran.com/2/286"],
      ["at-Talaq 65:7", "https://quran.com/65/7"],
      ["Qur'an 94:5-6", "https://quran.com/94/5-6"],
    ]);
  });
});

describe("Qur'an references in Arabic", () => {
  it.each([
    ["قال تعالى ﴿لا يكلف الله نفسا إلا وسعها﴾ [البقرة: ٢٨٦]", "البقرة: ٢٨٦", "https://quran.com/2/286"],
    ["كما في (البقرة: ٢٥٥)", "البقرة: ٢٥٥", "https://quran.com/2/255"],
    ["البقرة: ٢٨٦", "البقرة: ٢٨٦", "https://quran.com/2/286"],
    ["اقرأ آية الكرسي، البقرة: ٢٥٥، بعد كل صلاة", "البقرة: ٢٥٥", "https://quran.com/2/255"],
    ["[آل عمران: ١٠٢]", "آل عمران: ١٠٢", "https://quran.com/3/102"],
    ["[الإسراء: ٢٣-٢٤]", "الإسراء: ٢٣-٢٤", "https://quran.com/17/23-24"],
    ["سورة البقرة، الآية ٢٨٦", "سورة البقرة، الآية ٢٨٦", "https://quran.com/2/286"],
    ["اقرأ سورة الكهف، الآيات ١-١٠ يوم الجمعة", "سورة الكهف، الآيات ١-١٠", "https://quran.com/18/1-10"],
    ["سورة الملك آية ١", "سورة الملك آية ١", "https://quran.com/67/1"],
    ["سورة الجمعة: ٩", "سورة الجمعة: ٩", "https://quran.com/62/9"],
    ["[الجمعة: ٩]", "الجمعة: ٩", "https://quran.com/62/9"],
    ["[الحجرات: 13]", "الحجرات: 13", "https://quran.com/49/13"],
    ["(البقرة ٢:٢٨٦)", "البقرة ٢:٢٨٦", "https://quran.com/2/286"],
  ])("%s", (text, linked, href) => {
    expect(refs(text)).toEqual([[linked, href]]);
  });
});

describe("hadith references", () => {
  it.each([
    ["Bukhari 1", "Bukhari 1", "https://sunnah.com/bukhari:1"],
    ["Narrated in Sahih al-Bukhari 6018.", "Sahih al-Bukhari 6018", "https://sunnah.com/bukhari:6018"],
    ["(al-Bukhari, no. 6018)", "al-Bukhari, no. 6018", "https://sunnah.com/bukhari:6018"],
    ["Muslim 2699", "Muslim 2699", "https://sunnah.com/muslim:2699"],
    ["Sahih Muslim 2699 says", "Sahih Muslim 2699", "https://sunnah.com/muslim:2699"],
    ["(Muslim 2564a)", "Muslim 2564a", "https://sunnah.com/muslim:2564a"],
    ["Abu Dawud 4031", "Abu Dawud 4031", "https://sunnah.com/abudawud:4031"],
    ["Sunan Abi Dawud 4031", "Sunan Abi Dawud 4031", "https://sunnah.com/abudawud:4031"],
    ["Abu Dawood 4031", "Abu Dawood 4031", "https://sunnah.com/abudawud:4031"],
    ["Tirmidhi 2516", "Tirmidhi 2516", "https://sunnah.com/tirmidhi:2516"],
    ["Jami at-Tirmidhi 2516", "Jami at-Tirmidhi 2516", "https://sunnah.com/tirmidhi:2516"],
    ["Jami` at-Tirmidhi 2516", "Jami` at-Tirmidhi 2516", "https://sunnah.com/tirmidhi:2516"],
    ["an-Nasa'i 1234", "an-Nasa'i 1234", "https://sunnah.com/nasai:1234"],
    ["Sunan an-Nasa’i 1234", "Sunan an-Nasa’i 1234", "https://sunnah.com/nasai:1234"],
    ["Ibn Majah 224", "Ibn Majah 224", "https://sunnah.com/ibnmajah:224"],
    ["Sunan Ibn Majah #224", "Sunan Ibn Majah #224", "https://sunnah.com/ibnmajah:224"],
    ["Riyad as-Salihin 27", "Riyad as-Salihin 27", "https://sunnah.com/riyadussalihin:27"],
    ["Riyadh us-Saliheen 27", "Riyadh us-Saliheen 27", "https://sunnah.com/riyadussalihin:27"],
    ["رواه البخاري (١)", "البخاري (١)", "https://sunnah.com/bukhari:1"],
    ["البخاري ٦٠١٨", "البخاري ٦٠١٨", "https://sunnah.com/bukhari:6018"],
    ["صحيح البخاري ٦٠١٨", "صحيح البخاري ٦٠١٨", "https://sunnah.com/bukhari:6018"],
    ["مسلم ٢٦٩٩", "مسلم ٢٦٩٩", "https://sunnah.com/muslim:2699"],
    ["رواه مسلم برقم ٢٦٩٩", "مسلم برقم ٢٦٩٩", "https://sunnah.com/muslim:2699"],
    ["رواه أبو داود ٤٠٣١", "أبو داود ٤٠٣١", "https://sunnah.com/abudawud:4031"],
    ["رواه الترمذي (٢٥١٦)", "الترمذي (٢٥١٦)", "https://sunnah.com/tirmidhi:2516"],
    ["النسائي ١٢٣٤", "النسائي ١٢٣٤", "https://sunnah.com/nasai:1234"],
    ["ابن ماجه ٢٢٤", "ابن ماجه ٢٢٤", "https://sunnah.com/ibnmajah:224"],
    ["رياض الصالحين ٢٧", "رياض الصالحين ٢٧", "https://sunnah.com/riyadussalihin:27"],
    ["Narrated by Muslim 2699.", "Muslim 2699", "https://sunnah.com/muslim:2699"],
    ["Reported in Muslim 2699 and others.", "Muslim 2699", "https://sunnah.com/muslim:2699"],
    ["Muslim no. 2699 says", "Muslim no. 2699", "https://sunnah.com/muslim:2699"],
    ["The hadith of intention is in Muslim 1907.", "Muslim 1907", "https://sunnah.com/muslim:1907"],
    ["أخرجه مسلم ٢٦٩٩ في صحيحه", "مسلم ٢٦٩٩", "https://sunnah.com/muslim:2699"],
    ["صحيح مسلم ٢٦٩٩", "صحيح مسلم ٢٦٩٩", "https://sunnah.com/muslim:2699"],
  ])("%s", (text, linked, href) => {
    expect(refs(text)).toEqual([[linked, href]]);
  });

  it("links both books in a joint reference", () => {
    expect(refs("Bukhari 1 and Muslim 1907")).toEqual([
      ["Bukhari 1", "https://sunnah.com/bukhari:1"],
      ["Muslim 1907", "https://sunnah.com/muslim:1907"],
    ]);
    expect(refs("رواه البخاري ١ ومسلم ١٩٠٧")).toEqual([
      ["البخاري ١", "https://sunnah.com/bukhari:1"],
      ["مسلم ١٩٠٧", "https://sunnah.com/muslim:1907"],
    ]);
  });
});

describe("text that is not a reference", () => {
  it.each([
    "Meet after Isha at 8:30.",
    "Clinics open 8:00 am to 3:15 pm.",
    "Classes start at 4:30 pm.",
    "The class runs 4:30 to 5:30.",
    "Enter by Gate 5 and turn left.",
    "Mix rice and water in a 2:1 ratio.",
    "The score was 2:1.",
    "Drop-off around 7:00, classes from 7:30, pick-up at 12:00.",
    "Tahfidh al-Qur'an circles meet after Asr.",
    "Qur'an classes at 4:30 pm.",
    "Qur'an: 4:30 to 5:30.",
    "Qur'an 8:30-10:00 on Saturdays.",
    "al-Baqarah 115:1",
    "Qur'an 115:1",
    "Surah 115, ayah 1",
    "Qur'an 2:287",
    "Qur'an 0:1",
    "Qur'an 2:257-255",
    "Yusuf 4:30",
    "al-Baqarah 3:7",
    "Second-hand shops at the end of Imam Bukhari Street, 2 minutes away.",
    "Every Muslim 18 and over must register.",
    "A Muslim 2 years in Madinah.",
    "a muslim 2699",
    "Bukhari 9999",
    "Bukhari 1-3",
    "Muslim 2699 students",
    "Brother Yusuf: 4 nights.",
    "Fajr: 5:10, Asr: 3:30.",
    "(Fajr: 5)",
    "الفجر: ٥",
    "صلاة الجمعة: ١٢:٣٠",
    "[ص: ٥]",
    "كل مسلم ١٨ سنة",
    "He wrote 'q 2:255' by mistake.",
    "Qur'an 1:05",
    "Qur'an 10:00 to 11:00",
    "Bukhari 0123",
    "Halaqat for non-Muslim 3 days a week.",
    "الدرس من ٨:٣٠ إلى ١٠:٠٠",
    "الفجر ٥:١٠",
    "بوابة ٥",
    // Class times after the word Qur'an.
    "Hifz times: Quran 5:15, Tajweed 6:00.",
    "Quran 4:30, Arabic 5:30",
    "Sisters' Quran 4:15 and brothers' Quran 5:45.",
    "Quran 9:30 every day",
    "Quran 4:15 daily",
    "Quran 5:00 Saturdays",
    "(Quran 9:30 every day)",
    "Quran class (Quran 4:30) and Arabic at 5:30.",
    "Q 4:15",
    "Section Q 4:15",
    "See Q. 112:1-4.",
    "Quran 4:30",
    // Everyday words that are also surah names.
    "It was a sad verse 3 times over.",
    "Pick the room, verse 3 is next.",
    "Feel verse 2",
    "Each teen ayah 5 lesson",
    "the noon verse 2",
    "Text him at noon, verse 3",
    "Hood, verse 3",
    "Saba, ayah 2",
    "(Room: 3)",
    // Muslim as a word, not the book.
    "Muslim 18 and over can apply.",
    "Muslim 18+ only",
    "Muslim 5 days a week",
    "Students: Muslim 2, non-Muslim 0.",
    "Muslim 18 or older",
    "Muslim 3 nights a month",
    "طالب مسلم ١٢",
    "أنا مسلم ١٢",
    "مسلم ٥ أيام",
    // A bracketed time after a short quotation.
    "Take the bus marked “Haram” (8:30) daily.",
    "Halaqah “Quran for kids” (4:30)",
    'He said "come at" (8:30)',
    "“Meet us after the Asr prayer” (4:30)",
  ])("%s", (text) => {
    expect(refs(text)).toEqual([]);
  });

  it("skips references inside straight, curly and Arabic quotation marks, and inside the ayah brackets", () => {
    expect(refs('He wrote "see al-Baqarah 2:286" on the board.')).toEqual([]);
    expect(refs("He wrote “see Bukhari 1” on the board.")).toEqual([]);
    expect(refs("كتب «البخاري ١» على اللوح")).toEqual([]);
    expect(refs("﴿البقرة: ٢٨٦﴾")).toEqual([]);
    expect(refs('He said "go" and then al-Baqarah 2:286.')).toEqual([["al-Baqarah 2:286", "https://quran.com/2/286"]]);
  });
});

describe("linkScriptureRefs on HTML", () => {
  it("opens quran.com and sunnah.com in a new tab, with a quiet class", () => {
    const a = parse(linkScriptureRefs("<p>See al-Baqarah 2:286 and Bukhari 1.</p>")).querySelectorAll("a");
    expect(a.map((x) => x.getAttribute("href"))).toEqual(["https://quran.com/2/286", "https://sunnah.com/bukhari:1"]);
    for (const x of a) {
      expect(x.getAttribute("target")).toBe("_blank");
      expect(x.getAttribute("rel")).toBe("noopener noreferrer");
      expect(x.classList.contains("scripture-ref")).toBe(true);
      expect(x.getAttribute("style")).toContain("text-decoration-thickness:1px");
    }
    expect(a.map((x) => x.getAttribute("data-ref"))).toEqual(["quran", "hadith"]);
  });

  it("keeps the rest of the text, escaped as before", () => {
    const out = linkScriptureRefs("<p>Fish &amp; chips, then <strong>Qur'an 49:13</strong> &lt;3</p>");
    expect(out).toContain("Fish &amp; chips, then <strong>");
    expect(out).toContain("&lt;3</p>");
    expect(parse(out).querySelector("strong a")?.text).toBe("Qur'an 49:13");
  });

  it("never links inside headings, links, quotations, code or buttons", () => {
    const html = [
      "<h2>Al-Baqarah 2:286</h2>",
      "<h3>Bukhari 1</h3>",
      "<h4>Qur'an 49:13</h4>",
      '<p><a href="/x">al-Baqarah 2:286</a></p>',
      "<blockquote><p>Qur'an 49:13</p></blockquote>",
      "<p><q>Bukhari 1</q></p>",
      "<pre><code>Qur'an 2:255</code></pre>",
      "<p><code>Muslim 2699</code></p>",
      '<p><button type="button">Bukhari 1</button></p>',
    ].join("");
    expect(linkScriptureRefs(html)).toBe(html);
  });

  it("reads a surah name in a neighbouring element, and links only the number", () => {
    expect(links("<p><strong>al-Baqarah</strong> 2:286</p>")).toEqual([["2:286", "https://quran.com/2/286"]]);
    expect(links("<p><em>Surah al-Kahf</em>, ayah 10</p>")).toEqual([["ayah 10", "https://quran.com/18/10"]]);
  });

  it("does not carry a name or an open quotation into the next paragraph or cell", () => {
    expect(links("<p>al-Baqarah</p><p>2:286</p>")).toEqual([]);
    expect(links("<h2>al-Baqarah</h2>2:286")).toEqual([]);
    expect(links("<blockquote>Qur'an</blockquote>2:286")).toEqual([]);
    expect(links("<table><tr><td>Qur'an</td><td>4:30</td></tr></table>")).toEqual([]);
    expect(links('<p>He said "wait</p><p>Bukhari 1</p>')).toEqual([["Bukhari 1", "https://sunnah.com/bukhari:1"]]);
  });

  it("reads past a glossary popover as if it were not there", () => {
    const html = enhanceGuideHtml("<p>Open Absher and read Qur'an 2:286.</p>").html;
    expect(parse(html).querySelector("[popover]")).not.toBeNull();
    expect(parse(html).querySelectorAll("a.scripture-ref").map((a) => a.text)).toEqual(["Qur'an 2:286"]);
    const quoted = '<p>Read <button type="button">Absher</button><span popover>Say "this</span> then Qur\'an 2:286.</p>';
    expect(links(quoted)).toEqual([["Qur'an 2:286", "https://quran.com/2/286"]]);
  });

  it("reads quotation marks across inline elements", () => {
    expect(links('<p>"Read <em>al-Baqarah 2:286</em> today"</p>')).toEqual([]);
    expect(links('<p>"Read <em>this</em> before you sleep" (2:286)</p>')).toEqual([["2:286", "https://quran.com/2/286"]]);
  });

  it("never reads a number split by markup as a shorter or longer one", () => {
    expect(links("<p>Bukhari 1<sup>2</sup></p>")).toEqual([]);
    expect(links("<p>Bukhari <span>12</span>34</p>")).toEqual([]);
    expect(links("<p>Qur'an 2:28<b>6</b></p>")).toEqual([]);
    expect(links("<p>Qur'an 2:<b>286</b></p>")).toEqual([["286", "https://quran.com/2/286"]]);
    expect(links("<p><strong>Bukhari 12</strong> and more</p>")).toEqual([["Bukhari 12", "https://sunnah.com/bukhari:12"]]);
  });

  it("keeps an English word before the name out of the link", () => {
    expect(refs("Read it at noon 68:3.")).toEqual([["noon 68:3", "https://quran.com/68/3"]]);
    expect(refs("Read as Saffat 37:1.")).toEqual([["Saffat 37:1", "https://quran.com/37/1"]]);
    expect(refs("Read As-Saffat 37:1.")).toEqual([["As-Saffat 37:1", "https://quran.com/37/1"]]);
  });

  it("links references in Arabic guides", () => {
    expect(links("<p>قال تعالى ﴿وقل رب زدني علما﴾ [طه: ١١٤]، ورواه البخاري (١).</p>")).toEqual([
      ["طه: ١١٤", "https://quran.com/20/114"],
      ["البخاري (١)", "https://sunnah.com/bukhari:1"],
    ]);
  });

  it("leaves HTML with no references exactly as it was", () => {
    const src = "<h2>Hello</h2><p>Open at 8:30 &amp; close at 4:30 pm. Gate 5.</p>";
    expect(linkScriptureRefs(src)).toBe(src);
  });

  it("returns the addresses it linked, in order", () => {
    const root = parse("<p>Sahih Muslim 2699 and Qur'an 2:255</p>");
    expect(linkScriptureTree(root)).toEqual(["https://sunnah.com/muslim:2699", "https://quran.com/2/255"]);
  });
});

describe("enhanceGuideHtml with references", () => {
  const src =
    "<h2>Before you go</h2><p>Open Absher and read Qur'an 2:286.</p><ol><li>Book with Nafath, as in Bukhari 1.</li><li>Pay</li></ol>" +
    "<h2>At the office</h2><blockquote><p>Tip: Qur'an 49:13 is short.</p></blockquote>";

  it("adds the links without changing the contents, steps, callouts or glossary marks", () => {
    const plain = enhanceGuideHtml(src, { scripture: false });
    const full = enhanceGuideHtml(src);
    expect(full.toc).toEqual(plain.toc);
    expect(full.steps).toBe(plain.steps);
    const a = parse(plain.html);
    const b = parse(full.html);
    expect(b.querySelectorAll("[popover]").map((p) => p.id)).toEqual(a.querySelectorAll("[popover]").map((p) => p.id));
    expect(b.querySelectorAll("button[popovertarget]:not([popovertargetaction])").map((x) => x.text)).toEqual(["Absher"]);
    expect(b.querySelectorAll('li[data-step] a[href^="/glossary#"]').map((x) => x.text)).toEqual(["Nafath"]);
    expect(b.querySelectorAll("blockquote.callout")).toHaveLength(1);
    expect(b.querySelectorAll("a.scripture-ref").map((x) => x.getAttribute("href"))).toEqual(["https://quran.com/2/286", "https://sunnah.com/bukhari:1"]);
    expect(b.querySelector("blockquote a")).toBeNull();
    // Taking the links back out gives the same page.
    for (const x of b.querySelectorAll("a.scripture-ref")) x.replaceWith(x.innerHTML);
    expect(b.toString()).toBe(plain.html);
  });

  it("changes nothing in the seeded guides beyond adding reference links", () => {
    for (const g of SEED_GUIDES) {
      const html = sanitizeArticleHtml(g.bodyHtml);
      const plain = enhanceGuideHtml(html, { scripture: false });
      const full = enhanceGuideHtml(html);
      expect(full.toc, g.slug).toEqual(plain.toc);
      expect(full.steps, g.slug).toBe(plain.steps);
      const doc = parse(full.html);
      for (const sel of ["h2", "h3", "h4", "blockquote", "a", "button", "[popover]"]) expect(doc.querySelector(`${sel} a.scripture-ref`), `${g.slug} ${sel}`).toBeNull();
      for (const x of doc.querySelectorAll("a.scripture-ref")) x.replaceWith(x.innerHTML);
      expect(doc.toString(), g.slug).toBe(plain.html);
    }
  });
});
