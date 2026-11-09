import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { faqs, guides, user } from "@/server/db/schema";
import { syncContent2026 } from "@/server/seed/content/sync";
import type { SeedFaq, SeedGuide } from "@/server/seed/content/guides-2026";
import { getFaq, getGuide, listFaqs, listGuides } from "@/server/content/queries";
import { faqText, guideText } from "@/lib/arabic-content";
import { saveFaq, saveGuide } from "@/server/admin/content";
import { enhanceGuideHtml } from "@/lib/guide-html";
import type { Actor } from "@/server/auth/permissions";

const EM = String.fromCharCode(0x2014);

const guideEn: SeedGuide = {
  slug: "ar1-bank-account", title: "Opening a bank account", summary: "Which bank and which papers.", stage: "getting-settled",
  bodyHtml: "<h2>Papers</h2><p>Bring your iqama.</p>",
};
const guideAr: SeedGuide = {
  ...guideEn,
  titleAr: "فتح حساب بنكي",
  summaryAr: `أي بنك ${EM} وأي أوراق.`,
  bodyHtmlAr: "<h2>الأوراق</h2><p>أحضر إقامتك.</p>",
};
const faqEn: SeedFaq = { slug: "ar1-can-i-open-an-account", question: "Can I open an account?", category: "getting-settled", answerHtml: "<p>Yes, with an iqama.</p>" };
const faqAr: SeedFaq = { ...faqEn, questionAr: "هل أستطيع فتح حساب؟", answerHtmlAr: "<p>نعم، بالإقامة.</p>" };

const sync = (db: Db, at: string, g: SeedGuide, f: SeedFaq) => syncContent2026(db, new Date(at), { guides: [g], faqs: [f] });
const guideRow = async (db: Db) => (await db.select().from(guides).where(eq(guides.slug, guideEn.slug)))[0];
const faqRow = async (db: Db) => (await db.select().from(faqs).where(eq(faqs.slug, faqEn.slug)))[0];

describe("AR1 migration", () => {
  const dir = path.join(process.cwd(), "drizzle");
  const journal = JSON.parse(readFileSync(path.join(dir, "meta/_journal.json"), "utf8")) as { entries: { idx: number; tag: string; when: number }[] };
  const entry = journal.entries.find((e) => e.tag.endsWith("_arabic-content"));

  it("is the newest migration in the journal", () => {
    expect(entry).toBeDefined();
    expect(entry!.idx).toBe(journal.entries.length - 1);
    expect(entry!.when).toBeGreaterThan(journal.entries[entry!.idx - 1].when);
  });

  it("only adds the five nullable Arabic text columns", () => {
    const sql = readFileSync(path.join(dir, `${entry!.tag}.sql`), "utf8");
    const statements = sql.split("--> statement-breakpoint").map((s) => s.trim()).filter(Boolean);
    expect(statements).toEqual([
      'ALTER TABLE "faqs" ADD COLUMN "question_ar" text;',
      'ALTER TABLE "faqs" ADD COLUMN "answer_html_ar" text;',
      'ALTER TABLE "guides" ADD COLUMN "title_ar" text;',
      'ALTER TABLE "guides" ADD COLUMN "summary_ar" text;',
      'ALTER TABLE "guides" ADD COLUMN "body_html_ar" text;',
    ]);
    expect(sql).not.toMatch(/not null|default|drop|rename|update|delete/i);
  });

  it("runs on the local database, where existing rows get null Arabic", async () => {
    const db = await resetTestDb();
    await db.insert(guides).values({ slug: "x", title: "X guide", summary: "S", bodyHtml: "<p>b</p>", stage: "study" });
    const [g] = await db.select().from(guides);
    expect(g).toMatchObject({ titleAr: null, summaryAr: null, bodyHtmlAr: null });
  });
});

describe("content sync with Arabic", () => {
  it("writes the Arabic, cleaned, and the public pages read it", async () => {
    const db = await resetTestDb();
    expect(await sync(db, "2026-11-01T00:00:00Z", guideAr, faqAr)).toEqual({ guides: 1, faqs: 1 });

    const g = await getGuide(db, guideEn.slug);
    expect(g).toMatchObject({ titleAr: "فتح حساب بنكي", summaryAr: "أي بنك، وأي أوراق.", bodyHtmlAr: guideAr.bodyHtmlAr });
    expect(guideText(g!, "ar")).toMatchObject({ title: "فتح حساب بنكي", bodyHtml: guideAr.bodyHtmlAr, bodyInArabic: true, titleInArabic: true, summaryInArabic: true });
    expect(guideText(g!, "en")).toMatchObject({ title: guideEn.title, bodyHtml: guideEn.bodyHtml, bodyInArabic: false });
    expect((await listGuides(db)).find((x) => x.slug === guideEn.slug)?.titleAr).toBe("فتح حساب بنكي");

    const f = await getFaq(db, faqEn.slug);
    expect(f).toMatchObject({ questionAr: faqAr.questionAr, answerHtmlAr: faqAr.answerHtmlAr });
    expect(faqText(f!, "ar")).toMatchObject({ question: faqAr.questionAr, answerHtml: faqAr.answerHtmlAr, answerInArabic: true, questionInArabic: true });
    expect((await listFaqs(db)).find((x) => x.slug === faqEn.slug)?.answerHtmlAr).toBe(faqAr.answerHtmlAr);
  });

  it("without Arabic stores null, and the Arabic pages keep the English", async () => {
    const db = await resetTestDb();
    await sync(db, "2026-11-01T00:00:00Z", { ...guideEn, titleAr: "  ", bodyHtmlAr: "" }, faqEn);
    const g = await getGuide(db, guideEn.slug);
    expect(g).toMatchObject({ titleAr: null, summaryAr: null, bodyHtmlAr: null });
    expect(guideText(g!, "ar")).toMatchObject({ title: guideEn.title, bodyInArabic: false });
    const f = await getFaq(db, faqEn.slug);
    expect(f).toMatchObject({ questionAr: null, answerHtmlAr: null });
    expect(faqText(f!, "ar").answerInArabic).toBe(false);
  });

  it("a seed without Arabic keeps the Arabic an editor added in Admin", async () => {
    const db = await resetTestDb();
    await sync(db, "2026-11-01T00:00:00Z", guideEn, faqEn);
    await db.update(guides).set({ titleAr: "عنوان المحرر", bodyHtmlAr: "<p>نص المحرر</p>" }).where(eq(guides.slug, guideEn.slug));
    await db.update(faqs).set({ questionAr: "سؤال المحرر", answerHtmlAr: "<p>جواب المحرر</p>" }).where(eq(faqs.slug, faqEn.slug));

    await sync(db, "2026-11-02T00:00:00Z", { ...guideEn, bodyHtml: "<p>New English.</p>" }, faqEn);
    expect(await guideRow(db)).toMatchObject({ bodyHtml: "<p>New English.</p>", titleAr: "عنوان المحرر", bodyHtmlAr: "<p>نص المحرر</p>" });
    expect(await faqRow(db)).toMatchObject({ questionAr: "سؤال المحرر", answerHtmlAr: "<p>جواب المحرر</p>" });

    // A seed with Arabic replaces it.
    await sync(db, "2026-11-03T00:00:00Z", guideAr, faqAr);
    expect(await guideRow(db)).toMatchObject({ titleAr: guideAr.titleAr, bodyHtmlAr: guideAr.bodyHtmlAr });
    expect(await faqRow(db)).toMatchObject({ questionAr: faqAr.questionAr, answerHtmlAr: faqAr.answerHtmlAr });
  });

  it("counts a changed Arabic body, title, question or answer as a new check, and nothing else", async () => {
    const db = await resetTestDb();
    const at = (s: string) => new Date(s).getTime();
    await sync(db, "2026-11-01T00:00:00Z", guideAr, faqAr);

    // Same text again: the date stays.
    await sync(db, "2026-11-02T00:00:00Z", guideAr, faqAr);
    expect((await guideRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-01T00:00:00Z"));
    expect((await faqRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-01T00:00:00Z"));

    // No Arabic in the seed keeps the stored Arabic, so it is not a change either.
    await sync(db, "2026-11-03T00:00:00Z", guideEn, faqEn);
    expect((await guideRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-01T00:00:00Z"));
    expect((await faqRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-01T00:00:00Z"));

    // A new Arabic body and a new Arabic answer are.
    await sync(db, "2026-11-04T00:00:00Z", { ...guideAr, bodyHtmlAr: "<p>نص جديد</p>" }, { ...faqAr, answerHtmlAr: "<p>جواب جديد</p>" });
    expect((await guideRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-04T00:00:00Z"));
    expect((await faqRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-04T00:00:00Z"));

    // So are a new Arabic title and a new Arabic question.
    await sync(db, "2026-11-05T00:00:00Z", { ...guideAr, bodyHtmlAr: "<p>نص جديد</p>", titleAr: "عنوان جديد" }, { ...faqAr, answerHtmlAr: "<p>جواب جديد</p>", questionAr: "سؤال جديد؟" });
    expect((await guideRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-05T00:00:00Z"));
    expect((await faqRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-05T00:00:00Z"));

    // A new Arabic summary alone is not, like the English summary.
    await sync(db, "2026-11-06T00:00:00Z", { ...guideAr, bodyHtmlAr: "<p>نص جديد</p>", titleAr: "عنوان جديد", summaryAr: "ملخص آخر." }, { ...faqAr, answerHtmlAr: "<p>جواب جديد</p>", questionAr: "سؤال جديد؟" });
    expect(await guideRow(db)).toMatchObject({ summaryAr: "ملخص آخر." });
    expect((await guideRow(db)).lastVerifiedAt?.getTime()).toBe(at("2026-11-05T00:00:00Z"));
  });
});

describe("Admin saves Arabic", () => {
  let db: Db;
  const editor: Actor = { id: "ar1-editor", name: "Hana", role: "content_editor" };

  beforeAll(async () => {
    db = await resetTestDb();
    const now = new Date();
    await db.insert(user).values({ id: editor.id, name: editor.name, email: "ar1@example.com", emailVerified: true, role: editor.role, createdAt: now, updatedAt: now });
  });

  it("stores a guide's Arabic sanitised like the English, keeps it when left out, and clears it when emptied", async () => {
    const g = await saveGuide(db, editor, {
      title: "Getting a SIM card", summary: "Which network and what to bring.", bodyHtml: "<p>Bring your passport.</p>", stage: "getting-settled", status: "published",
      titleAr: "  شريحة الجوال ", summaryAr: `أي شبكة ${EM} وماذا تحضر.`, bodyHtmlAr: '<p>أحضر جوازك.</p><script>alert(1)</script><p onclick="x()">مرحبا</p>',
    });
    expect(g).toMatchObject({ titleAr: "شريحة الجوال", summaryAr: "أي شبكة، وماذا تحضر.", bodyHtmlAr: "<p>أحضر جوازك.</p><p>مرحبا</p>" });
    expect(guideText((await getGuide(db, g.slug))!, "ar").bodyInArabic).toBe(true);

    // An older client that sends no Arabic leaves it alone.
    const kept = await saveGuide(db, editor, { slug: g.slug, title: g.title, summary: g.summary, bodyHtml: g.bodyHtml, stage: g.stage, status: "published" });
    expect(kept).toMatchObject({ titleAr: "شريحة الجوال", bodyHtmlAr: "<p>أحضر جوازك.</p><p>مرحبا</p>" });

    // The form sends empty fields (an emptied editor is "<p></p>"): stored as null, so /ar shows the English.
    const cleared = await saveGuide(db, editor, { slug: g.slug, title: g.title, summary: g.summary, bodyHtml: g.bodyHtml, stage: g.stage, status: "published", titleAr: "", summaryAr: "  ", bodyHtmlAr: "<p></p>" });
    expect(cleared).toMatchObject({ titleAr: null, summaryAr: null, bodyHtmlAr: null });
    expect(guideText(cleared, "ar")).toMatchObject({ title: g.title, bodyInArabic: false });
  });

  it("stores and clears an answer's Arabic", async () => {
    const f = await saveFaq(db, editor, {
      question: "Can I renew my iqama early?", answerHtml: "<p>Yes.</p>", category: "getting-started", tags: [], status: "published",
      questionAr: "هل أجدد إقامتي مبكرًا؟", answerHtmlAr: "<p>نعم.</p><img src=\"javascript:alert(1)\">",
    });
    expect(f).toMatchObject({ questionAr: "هل أجدد إقامتي مبكرًا؟", answerHtmlAr: "<p>نعم.</p><img />" });
    expect(faqText((await getFaq(db, f.slug))!, "ar")).toMatchObject({ question: "هل أجدد إقامتي مبكرًا؟", answerInArabic: true });

    const cleared = await saveFaq(db, editor, { slug: f.slug, question: f.question, answerHtml: f.answerHtml, category: "getting-started", tags: [], status: "published", questionAr: null, answerHtmlAr: "" });
    expect(cleared).toMatchObject({ questionAr: null, answerHtmlAr: null });
  });

  it("rejects Arabic that is too long, like the English", async () => {
    await expect(saveFaq(db, editor, { question: "A long Arabic question?", answerHtml: "<p>a</p>", category: "university", tags: [], status: "draft", questionAr: "س".repeat(301) })).rejects.toThrow();
  });
});

describe("Arabic callouts", () => {
  const callouts = (html: string) => enhanceGuideHtml(html).html.match(/class="callout"/g)?.length ?? 0;

  it("recognises نصيحة، ملاحظة، مهم and تنبيه with or without a colon", () => {
    for (const label of ["نصيحة:", "نصيحة", "ملاحظة:", "ملاحظة", "مهم:", "مهم", "تنبيه:", "تنبيه", "مهم،"]) {
      expect(callouts(`<blockquote><p>${label} احجز موعدك قبل الظهر.</p></blockquote>`), label).toBe(1);
    }
    expect(callouts("<blockquote><p><strong>تنبيه:</strong> لا تنس الجواز.</p></blockquote>")).toBe(1);
  });

  it("leaves other Arabic quotes alone", () => {
    expect(callouts("<blockquote><p>مهمة الطالب أن يحضر.</p></blockquote>")).toBe(0);
    expect(callouts("<blockquote><p>قال الشيخ: نصيحة لكل طالب.</p></blockquote>")).toBe(0);
  });

  it("keeps the English labels", () => {
    expect(callouts("<blockquote><p>Tip: go early.</p></blockquote><blockquote><p>Warning</p></blockquote><blockquote><p>Tipping is rare.</p></blockquote>")).toBe(2);
  });
});
