import { beforeAll, describe, expect, it } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { listFaqs, listGuides } from "@/server/content/queries";
import { scheduleRows } from "@/server/duroos/queries";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";
import { PROGRAMS } from "@/content/programs";
import { COLLECTIONS } from "@/content/library-books";
import { LEGACY_REDIRECTS } from "@/lib/redirects";
import * as COMPANY from "@/features/guides/company/content";

/** Pages that are not built from content rows. */
const STATIC = [
  "/", "/guides", "/ask", "/assistant", "/search", "/more", "/mahad", "/programs", "/library", "/library/search", "/discounts",
  "/duroos", "/duroos/schedule", "/duroos/live", "/duroos/updates", "/duroos/sisters",
];

let valid: Set<string>;

beforeAll(async () => {
  const db: Db = await resetTestDb();
  await importLegacy(db);
  const [guides, faqs, lessons] = await Promise.all([listGuides(db), listFaqs(db), scheduleRows(db)]);
  valid = new Set([
    ...STATIC,
    `/guides/${COMPANY.SLUG}`,
    // The published content after the next sync: the database rows plus every seed.
    ...[...guides, ...SEED_GUIDES].map((g) => `/guides/${g.slug}`),
    ...[...faqs, ...SEED_FAQS].map((f) => `/ask/${f.slug}`),
    ...PROGRAMS.map((p) => `/programs/${p.slug}`),
    ...COLLECTIONS.map((c) => `/library/${c.slug}`),
    ...lessons.map((l) => `/duroos/lesson/${l.slug}`),
    ...lessons.map((l) => `/duroos/shaykh/${l.shaykh.slug}`),
    // Old links that redirect to a live page still work.
    ...LEGACY_REDIRECTS.filter((r) => !r.source.includes(":")).map((r) => r.source),
  ]);
});

/** Internal links in a piece of HTML: the path only, without the #section or ?query. */
function internalLinks(html: string): string[] {
  return [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1].replace(/\/$/, "") || "/");
}

describe("content links", () => {
  it("every link inside a guide or an answer opens a page that exists", () => {
    const broken: string[] = [];
    let checked = 0;
    for (const g of SEED_GUIDES) for (const href of internalLinks(g.bodyHtml)) if ((checked++, !valid.has(href))) broken.push(`guide ${g.slug} -> ${href}`);
    for (const f of SEED_FAQS) for (const href of internalLinks(f.answerHtml)) if ((checked++, !valid.has(href))) broken.push(`faq ${f.slug} -> ${href}`);
    expect(broken).toEqual([]);
    // The content links to itself a lot; a count near zero means the link pattern stopped matching.
    expect(checked).toBeGreaterThan(50);
    console.log(`content links checked: ${checked}`);
  });

  it("finds links in HTML the way pages write them", () => {
    expect(internalLinks('<a href="/guides/x#part">x</a> <a href="https://a.b/c">y</a> <a href="/ask/y?q=1">z</a>')).toEqual(["/guides/x", "/ask/y"]);
  });
});
