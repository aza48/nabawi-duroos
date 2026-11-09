import { beforeAll, describe, expect, it } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { buildKnowledge, type Chunk } from "@/server/assistant/knowledge";
import { askMesh, resetAnswerCache } from "@/server/assistant/answer";
import { greetingReply, isGreeting, isRulingQuestion, looksLikeFiqh, rulingReply } from "@/server/assistant/guard";

/**
 * The assistant never gives a religious ruling. Questions that ask whether something is halal, haram,
 * permitted, valid or obligatory get the fixed reply with the help line, in English and Arabic; practical
 * questions about prayer, the Haram, Umrah and the Rawdah are still answered. Both directions are tested.
 */

const HELP = "+1 234 567 9076";

const RULINGS = [
  // English: verdict words
  "is music haram", "is it halal to eat at mcdonalds", "is it permissible to take a bank loan", "what is the ruling on celebrating the mawlid",
  "is it bidah to visit the graves at baqi every day", "is taking photos of people haram", "is it sunnah to pray two rakah in masjid quba",
  "is smoking haram", "is it makruh to sleep after fajr", "what does islam say about music", "halal or haram: crypto", "is insurance haram",
  "is it halal to take a student loan with interest", "is it obligatory to pray in the masjid", "is it haram to work part time on a student visa",
  // English: may I, can I, is it ok, allowed
  "can I combine prayers while travelling to makkah", "is it ok to pray in my shoes", "can I shorten my prayers in madinah",
  "is a credit card with interest allowed", "can a woman travel without a mahram to umrah", "can I break my fast if I am travelling",
  "is it ok to listen to nasheeds with music", "can I miss jumuah for an exam", "is it wrong to celebrate birthdays", "is shisha allowed",
  "is visiting the prophet's grave allowed for women", "can women visit the graves at baqi", "can I pray in the rawdah during my period",
  "can I do tawaf without wudu", "can I fast on friday alone", "can I eat food with gelatin", "can i listen to music",
  "is it ok to shake hands with a woman", "can I pray maghrib and isha together", "am I allowed to pray in the hotel instead of the haram",
  "can I touch the quran without wudu", "can I marry a christian woman", "is it allowed to celebrate birthdays",
  // English: obligation, validity, how to worship, zakat due
  "do I have to pay zakat on my stipend", "should I pray witr before sleeping", "should I pray the sunnah before jumuah", "do I have to wear ihram from madinah",
  "do I need wudu to touch the mushaf", "do women have to cover their face", "is my nikah valid without a wali", "does bleeding break my wudu",
  "is the umrah valid if I didn't shave", "is my hajj valid", "how many rakat is the sunnah of dhuhr", "how do I pray istikhara", "is zakat due on my savings",
  "do I need to pay zakat on my savings",
  // Arabic
  "ما حكم الموسيقى", "هل يجوز الجمع بين الصلاتين في المدينة", "هل يجب علي الصيام وانا مسافر", "هل صلاتي صحيحة بدون وضوء", "هل يجوز للمرأة السفر بدون محرم",
  "هل الموسيقى حرام", "هل يبطل الصوم بالدواء", "هل يجوز ان اصلي في الحذاء", "ما الحكم في الاحتفال بالمولد", "هل يصح الطواف بدون وضوء",
  "هل علي زكاة في المكافأة", "ما حكم التصوير", "هل يجوز أخذ قرض بفائدة", "هل عقد نكاحي صحيح بدون ولي", "ما حكم الجمع بين الصلاتين", "هل يجب الصيام يوم عرفة",
  // A second round of traps (November 2026 review), found by structure, not by phrase: "can I" or "is it fine"
  // with an act of worship, sin words, food, dress and money, misspellings, and Arabic obligation words.
  "is it permissible to listen to nasheeds with drums", "is listening to music wrong", "do I have to fast if I'm travelling", "what is the ruling on praying in the hotel",
  "can a woman travel to umrah without a mahram", "is it sinful to miss jumuah for an exam", "is it fine to pray isha at 1am", "can i pray fajr after sunrise",
  "should I pray tahajjud in the haram or at home", "is it bad to take a loan from the bank", "is bitcoin halal", "is crypto trading allowed",
  "can I take out a loan with interest", "is it ok to sell on amazon fba", "is it ok to celebrate my birthday", "does bleeding break wudu",
  "does vomiting break my fast", "is it okay to wear perfume as a woman", "can women go to the masjid during their period", "is car insurance allowed in islam",
  "can I give my zakat to my brother", "can i pray in my car", "can i shorten my prayers in madinah", "how do I pray the eclipse prayer",
  "do I need to redo my prayer if I prayed without wudu", "can I eat crab", "can I eat shrimp", "is eating meat from the supermarket ok",
  "can i wear gold as a man", "can men wear silk", "can i listen to quran without wudu", "is dropshipping halal", "should women pray at home or in the haram",
  "do I pray qasr when visiting makkah", "is it obligatory to visit the prophet's grave", "can I make dua in english in salah", "can I read quran on my phone during my period",
  "is it allowed to pray two rakah after asr", "هل يصح صيامي إذا نسيت النية", "هل التأمين جائز", "هل يجوز ان اصلي في الفندق", "هل علي زكاة في راتبي",
  "هل أقضي الصلاة الفائتة", "هل تجب الجمعة على المسافر", "ما رأي الشرع في التصوير", "هل البيتكوين حلال", "هل يجوز لبس الذهب للرجال", "هل يلزمني الحج وأنا طالب",
  "can I pray jumuah at home", "is mortgage ok", "is it permissable to vape", "is smoking a sin", "am i sinning if I miss fajr", "will allah forgive me for missing prayers",
  "is my umrah accepted if i cut my hair short",
];

const PRACTICAL = [
  // Prayer and the Haram
  "what time is maghrib", "where do sisters pray in masjid nabawi", "how do I book the rawdah", "what time do we break the fast in ramadan",
  "what time do I break my fast today", "when is iftar today", "when is suhoor", "is the haram open 24 hours", "is the haram open all night?",
  "is the haram library open on friday", "can I bring my laptop into the haram", "can I visit the rawdah twice", "can women visit the rawdah",
  "when can women visit the rawdah", "what time is jumuah at masjid nabawi", "what time is fajr tomorrow", "is fajr adhan at 5",
  "Which gate of the Haram is closest to the Rawdah?", "can I visit baqi", "what time does baqi open", "are children allowed in the rawdah",
  "are laptops allowed in the haram", "is photography allowed inside masjid nabawi", "is the bus allowed to stop at the haram",
  // Duroos about fiqh topics are classes, not rulings
  "is there a dars on the sunnah", "is there a class on tawheed and shirk", "is there a dars on the book of fasting", "is there a dars on zakat",
  "which duroos are about fiqh", "where can I learn the fiqh of prayer",
  // Food, money, papers, family
  "is there a halal restaurant near the university", "where can I buy halal meat", "can I work part time on a student visa",
  "can I open a bank account without an iqama", "can I bring my wife to madinah", "where do i pay zakat al fitr", "where do I pay my zakat",
  "is there interest on the student bank account", "can I marry in madinah while studying", "can I get married during my studies",
  "is umrah possible from madinah by train", "how do I get to makkah for umrah", "can I do umrah from madinah", "can I pay rent monthly",
  "do I need to bring my passport to the exam", "how long is the break between semesters", "when does the winter break start",
  "what is the break time between lectures", "is the bus free for students", "what does the stipend cover",
  // Arabic
  "متى اذان المغرب", "اين مصلى النساء في المسجد النبوي", "كيف احجز الروضة", "هل يجب ان احضر جوازي للاختبار", "هل المكتبة مفتوحة اليوم",
  "متى الافطار في رمضان", "كيف أعتمر من المدينة", "كم تكلفة المعيشة في المدينة",
  // The second round: practical questions next to the new traps ("where can I pay", a class on a fiqh topic,
  // combining two courses, whether the mat'am is halal).
  "what time is maghrib today", "where do sisters pray in the haram", "can I bring my kids to the haram", "can I take a taxi from the airport to the haram",
  "is the haram open at night", "can I open a bank account without iqama", "can I bring food into the haram", "is parking allowed near the haram",
  "can i pray in the rawdah with my wife", "can sisters attend the duroos", "can women attend the classes at the masjid", "what time does fajr start",
  "is the prayer time for isha different in ramadan", "how many prayers are there in the haram on friday", "is the eid prayer at the haram",
  "when is eid al adha this year", "can I study at the university if I'm married", "is it valid to use my visitor id to open a bank account",
  "is my iqama valid for travel", "is my visa valid after graduation", "can my wife work in madinah", "is wifi allowed in the dorms", "is the mataam halal",
  "where can I pay zakat al fitr in madinah", "how do I get to quba mosque", "is it sunny in madinah in winter", "can I volunteer at the haram",
  "can I pray in the haram as a visitor", "what are the times for taraweeh", "where is the nearest masjid to the university", "do I need my passport for the rawdah",
  "do I need a permit to visit the rawdah", "do I need to bring my iqama to the exam", "is there a sin tax on soft drinks in saudi", "what are the hours of the haram library",
  "is ramadan in march", "is it cold in madinah", "where is the halal food court", "how do I fast-track my iqama", "is it ok to call the university office",
  "can I call admin on whatsapp", "can I combine the two courses in one semester", "is there a class on fiqh of fasting", "who teaches the book of fasting in the haram",
  "هل الحرم مفتوح طوال الليل", "متى صلاة المغرب", "اين مصلى النساء في الحرم", "هل يجب ان احضر جوازي للجامعة", "هل يوجد درس في احكام الصيام",
  "من يدرس كتاب الصيام في المسجد النبوي", "هل يمكنني فتح حساب بنكي بدون اقامة", "هل الواي فاي متوفر في السكن", "متى يصرف حساب المواطن",
  "هل المطعم حلال", "هل تصح الاقامة للسفر",
];

describe("ruling guard", () => {
  it.each(RULINGS)("treats %j as a ruling question", (q) => {
    expect(isRulingQuestion(q)).toBe(true);
  });

  it.each(PRACTICAL)("answers %j as a practical question", (q) => {
    expect(isRulingQuestion(q)).toBe(false);
  });

  it("refuses kindly with the help line, in both languages, and gives no ruling", () => {
    for (const lang of ["en", "ar"] as const) {
      const r = rulingReply(lang);
      expect(r).toContain(HELP);
      expect(r).not.toMatch(/[\u2013\u2014]/);
    }
    expect(rulingReply("en")).toMatch(/doesn't give religious rulings/);
    expect(rulingReply("en")).toMatch(/not a shaykh/);
    expect(rulingReply("ar")).toMatch(/فتاوى/);
  });
});

describe("greetings", () => {
  it("knows a greeting or thanks with no question in it", () => {
    for (const q of ["assalamu alaikum", "salam", "jazakallahu khairan", "thank you so much!", "assalamu alaikum brother, jazakallah khair for the site", "السلام عليكم", "جزاك الله خيرا"]) {
      expect(isGreeting(q)).toBe(true);
    }
    for (const q of ["salam, how do I get a sim card?", "thanks, and where is the bus stop?", "السلام عليكم كيف أحجز الروضة"]) expect(isGreeting(q)).toBe(false);
  });

  it("returns the salam and the thanks when both are given", () => {
    expect(greetingReply("en", "assalamu alaikum, jazakallah khair")).toMatch(/alaikum assalam.*iyyakum/i);
    expect(greetingReply("ar", "جزاك الله خيرا")).toMatch(/وإياكم/);
  });
});

describe("the guard inside askMesh", () => {
  let db: Db;
  let knowledge: Chunk[];
  const now = new Date("2026-11-09T09:00:00Z");
  beforeAll(async () => {
    db = await resetTestDb();
    await importLegacy(db);
    knowledge = await buildKnowledge(db);
  });

  it("never asks a model for a ruling question", async () => {
    let asked = false;
    const writer = async () => {
      asked = true;
      return { text: '{"answer":"Yes, it is permissible.","sources":[1],"found":true}' };
    };
    for (const [q, lang] of [["is it permissible to combine maghrib and isha", "en"], ["هل يجوز الجمع بين الصلاتين", "ar"]] as const) {
      resetAnswerCache();
      const r = await askMesh(db, { question: q, locale: lang }, { writer, knowledge, now });
      expect(r.mode).toBe("guard");
      expect(r.lang).toBe(lang);
      expect(r.answer).toContain(HELP);
      expect(r.answer).not.toMatch(/permissible\./);
    }
    expect(asked).toBe(false);
  });

  const ask = (question: string, locale: "en" | "ar", history: { role: "user" | "assistant"; text: string }[] = [], writer: () => Promise<{ text: string } | null> = async () => null) => {
    resetAnswerCache();
    return askMesh(db, { question, locale, history }, { writer, knowledge, now });
  };

  it("treats a short follow-up to a ruling question as a ruling question, with or without a model", async () => {
    const cases: [string, string, "en" | "ar"][] = [
      ["can I combine maghrib and isha", "what about dhuhr and asr?", "en"],
      ["is music haram", "and nasheeds?", "en"],
      ["هل يجوز الجمع بين الصلاتين", "وفي السفر؟", "ar"],
    ];
    let asked = 0;
    const writer = async () => {
      asked++;
      return { text: '{"answer":"Yes, that is allowed [1].","sources":[1],"found":true}' };
    };
    for (const [first, next, lang] of cases) {
      expect(isRulingQuestion(next), next).toBe(false);
      const history = [
        { role: "user" as const, text: first },
        { role: "assistant" as const, text: rulingReply(lang) },
      ];
      for (const w of [async () => null, writer]) {
        const r = await ask(next, lang, history, w);
        expect(r.mode, next).toBe("guard");
        expect(r.answer).toContain(HELP);
      }
    }
    expect(asked).toBe(0);
  });

  it("still answers a when or where follow-up after a ruling question", async () => {
    const r = await ask("and what time is isha?", "en", [
      { role: "user", text: "can I combine maghrib and isha" },
      { role: "assistant", text: rulingReply("en") },
    ]);
    expect(r.mode).toBe("live");
  });

  it("sends a ruling question the guard let through to a scholar, never to 'the answer is added to the site'", async () => {
    for (const q of ["is stock trading ok", "are energy drinks ok", "is nail polish ok"]) {
      expect(isRulingQuestion(q), q).toBe(false);
      expect(looksLikeFiqh(q), q).toBe(true);
      for (const w of [async () => null, async () => ({ text: '{"answer":"This is not on MESH yet.","sources":[],"found":false}' })]) {
        const r = await ask(q, "en", [], w);
        expect(r.mode, q).toBe("guard");
        expect(r.answer).toMatch(/scholar/);
        expect(r.answer).not.toMatch(/added to the site/);
      }
    }
    for (const q of ["where can I buy a fridge", "what is the capital of france"]) expect(looksLikeFiqh(q), q).toBe(false);
  });

  it("answers the practical questions next to them", async () => {
    const cases: [string, RegExp][] = [
      ["what time is maghrib", /^\/$/],
      ["how do I book the rawdah", /rawdah/],
      ["where do sisters pray in masjid an-nabawi", /women-at-masjid-an-nabawi/],
      ["كيف أحجز الروضة", /rawdah/],
    ];
    for (const [q, url] of cases) {
      resetAnswerCache();
      const r = await askMesh(db, { question: q, locale: /[؀-ۿ]/.test(q) ? "ar" : "en" }, { writer: async () => null, knowledge, now });
      expect(r.mode, q).not.toBe("guard");
      expect(r.found, q).toBe(true);
      expect(r.sources.some((s) => url.test(s.url)), q).toBe(true);
    }
  });
});
