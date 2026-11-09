import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse } from "node-html-parser";
import { GLOSSARY, GLOSSARY_GROUPS, termsIn } from "@/content/glossary";
import { enhanceGuideHtml, markGlossaryTerms } from "@/lib/guide-html";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";
import { PROGRAMS } from "@/content/programs";
import { GLOSSARY_COPY, GlossaryPage, glossaryIndex, glossaryMetadata } from "@/features/glossary/GlossaryPage";

/** Runs the marker over a fragment and returns the ids it marked plus the resulting HTML. */
function mark(html: string, base?: string) {
  const root = parse(html);
  const ids = markGlossaryTerms(root, { base });
  return { ids, html: root.toString(), root: parse(root.toString()) };
}

const popIds = (html: string) => [...html.matchAll(/<span id="(gl-[^"]+)" popover/g)].map((m) => m[1]);
const DASHES = /[–—]/;

describe("glossary content", () => {
  it("has unique ids, lower case match spellings and a known group for every term", () => {
    const ids = GLOSSARY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of GLOSSARY) {
      expect(t.id).toMatch(/^[a-z0-9-]+$/);
      expect(t.match.length).toBeGreaterThan(0);
      for (const m of t.match) expect(m).toBe(m.toLowerCase());
      expect(GLOSSARY_GROUPS.map((g) => g.id)).toContain(t.group);
    }
    for (const g of GLOSSARY_GROUPS) expect(termsIn(g.id).length).toBeGreaterThan(0);
  });

  it("never claims the same spelling for two terms", () => {
    const all = GLOSSARY.flatMap((t) => t.match);
    expect(new Set(all).size).toBe(all.length);
  });

  it("uses no em or en dashes, and every Arabic spelling is Arabic", () => {
    for (const t of GLOSSARY) {
      for (const s of [t.term, t.ar, t.meaning, t.use, ...t.match]) expect(s, `${t.id}: ${s}`).not.toMatch(DASHES);
      expect(t.ar).toMatch(/^[؀-ۿ\s،]+$/);
    }
    for (const g of GLOSSARY_GROUPS) expect(`${g.en} ${g.ar}`).not.toMatch(DASHES);
    const copy = JSON.stringify(GLOSSARY_COPY) + GLOSSARY_COPY.en.subtitle(40) + GLOSSARY_COPY.ar.subtitle(40);
    expect(copy).not.toMatch(DASHES);
  });

  it("links every term to a seeded guide or answer, a programme, or the Ma'had hub", () => {
    const valid = new Set([
      "/mahad",
      ...SEED_GUIDES.map((g) => `/guides/${g.slug}`),
      ...SEED_FAQS.map((f) => `/ask/${f.slug}`),
      ...PROGRAMS.map((p) => `/programs/${p.slug}`),
    ]);
    const broken = GLOSSARY.filter((t) => !t.href || !valid.has(t.href)).map((t) => `${t.id} -> ${t.href}`);
    // Every term has a page, as the glossary's subtitle promises.
    expect(broken).toEqual([]);
  });

  it("only defines words the guides and answers actually use", () => {
    const docs = [...SEED_GUIDES.map((g) => `<p>${g.title}</p>${g.bodyHtml}`), ...SEED_FAQS.map((f) => `<p>${f.question}</p>${f.answerHtml}`)];
    const found = new Set<string>();
    for (const html of docs) for (const id of markGlossaryTerms(parse(sanitizeArticleHtml(html)))) found.add(id);
    expect(GLOSSARY.filter((t) => !found.has(t.id)).map((t) => t.id)).toEqual([]);
  });
});

describe("markGlossaryTerms", () => {
  it("marks only the first mention of a term in a document", () => {
    const { ids, html } = mark("<p>Your iqama number.</p><p>Renew the iqama. IQAMA again.</p>");
    expect(ids).toEqual(["iqama"]);
    expect(html.match(/popovertarget="gl-iqama-1"/g)).toHaveLength(2); // the term and the close button
    expect(popIds(html)).toEqual(["gl-iqama-1"]);
    expect(html).toContain("Renew the iqama. IQAMA again.");
  });

  it("treats every match spelling of a term as the same term", () => {
    const { ids, html } = mark("<p>Your stipend arrives monthly. The mukafa'ah stops during ta'jeel.</p>");
    expect(ids).toEqual(["mukafaa", "tajeel"]);
    expect(html).toContain(">stipend</button>");
    expect(html).toContain("The mukafa'ah stops");
  });

  it("never marks inside headings, links, buttons, code, quotes or table headers", () => {
    const src =
      "<h2>Iqama</h2><h3>Absher</h3><h4>Nafath</h4><p><a href='/x'>Ejar</a> <code>mada</code></p>" +
      "<blockquote><p>Tip: open Nusuk</p></blockquote><p><q>Rawdah</q></p><table><tr><th>IBAN</th><td>Etimad</td></tr></table><pre>Minhati</pre>";
    const { ids, root } = mark(src);
    expect(ids).toEqual(["etimad"]);
    expect(root.querySelector("td button")?.text).toBe("Etimad");
    for (const sel of ["h2", "h3", "h4", "a", "blockquote", "q", "th", "code", "pre"]) expect(root.querySelector(`${sel} [popover]`)).toBeNull();
  });

  it("marks a term later in the document when its first mention was in a heading", () => {
    const { ids, root } = mark("<h2>Getting an iqama</h2><p>The iqama is issued by the University.</p>");
    expect(ids).toEqual(["iqama"]);
    expect(root.querySelector("h2")!.toString()).toBe("<h2>Getting an iqama</h2>");
    expect(root.querySelector("p button")?.text).toBe("iqama");
  });

  it("matches whole words only", () => {
    const { ids } = mark("<p>In Ramadan and Muharram the Haramain train is full. Haraam things are avoided. Nusukiyya is not a word. Daraj.</p>");
    expect(ids).toEqual([]);
  });

  it("matches a plural, a possessive, any case and either apostrophe", () => {
    expect(mark("<p>Two iqamas.</p>").ids).toEqual(["iqama"]);
    expect(mark("<p>Absher's kiosk.</p>").ids).toEqual(["absher"]);
    expect(mark("<p>THE HARAM.</p>").ids).toEqual(["haram"]);
    expect(mark("<p>The Ma’had and the Mat’am.</p>").ids).toEqual(["mahad", "matam"]);
    expect(mark("<p>Your Visitor\n ID.</p>").ids).toEqual(["visitor-id"]);
  });

  it("keeps the reader's spelling and the text around it", () => {
    const { html } = mark("<p>Fees &amp; the IQAMA &lt;card&gt;.</p>");
    expect(html).toContain("Fees &amp; the <button");
    expect(html).toContain(">IQAMA</button>");
    expect(html).toContain("&lt;card&gt;.</p>");
  });

  it("prefers the longer spelling when two terms start at the same word", () => {
    const { ids } = mark("<p>Use the Absher kiosk, then Absher itself.</p>");
    expect(ids).toEqual(["kiosk", "absher"]);
  });

  it("gives every popover a unique id that its buttons point to", () => {
    const { html, root } = mark("<p>Iqama, Absher, Nafath, Ejar and mada.</p><p>The Rawdah and Nusuk.</p>");
    const ids = popIds(html);
    expect(ids).toHaveLength(7);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(root.querySelectorAll(`[popovertarget="${id}"]`)).toHaveLength(2);
      expect(root.querySelector(`#${id}`)?.getAttribute("popover")).toBe("");
    }
  });

  it("puts the meaning, the Arabic spelling and a glossary link in the popover", () => {
    const { root } = mark("<p>Activate Nafath first.</p>");
    const pop = root.querySelector("#gl-nafath-1")!;
    expect(pop.text).toContain(GLOSSARY.find((t) => t.id === "nafath")!.meaning);
    expect(pop.querySelector('[lang="ar"]')?.getAttribute("dir")).toBe("rtl");
    expect(pop.querySelector("a")?.getAttribute("href")).toBe("/glossary#nafath");
    expect(pop.querySelector("a")?.text).toBe("More in the glossary");
    expect(pop.querySelector('button[popovertargetaction="hide"]')).not.toBeNull();
  });

  it("centres the popover and styles its links inline, past the reset and the article link rule", () => {
    const { root } = mark("<p>Activate Nafath first.</p>");
    const cls = root.querySelector("#gl-nafath-1")!.getAttribute("class")!.split(/\s+/);
    expect(cls).toEqual(expect.arrayContaining(["fixed", "inset-0", "m-auto"]));
    expect(root.querySelector("#gl-nafath-1 a")?.getAttribute("style")).toContain("color:var(--primary)");
    const step = parse(enhanceGuideHtml("<ol><li>Open Absher.</li></ol>").html).querySelector("li[data-step] a")!;
    expect(step.getAttribute("style")).toContain("color:inherit");
    expect(step.getAttribute("style")).toContain("underline dotted");
  });

  it("links to the glossary instead of opening a popover inside a numbered step", () => {
    const { html } = enhanceGuideHtml("<ol><li>Open Absher.<ul><li>Then Nafath.</li></ul></li></ol><p>Absher and Nafath again, and Ejar.</p>");
    const doc = parse(html);
    const step = doc.querySelector("li[data-step]")!;
    expect(step.querySelector("button")).toBeNull();
    expect(step.querySelectorAll("a").map((a) => a.getAttribute("href"))).toEqual(["/glossary#absher", "/glossary#nafath"]);
    expect(step.querySelector("a")?.getAttribute("title")).toContain("Absher:");
    expect(doc.querySelectorAll("p button[popovertarget]").filter((b) => !b.hasAttribute("popovertargetaction")).map((b) => b.text)).toEqual(["Ejar"]);
  });

  it("can link to the Arabic glossary", () => {
    const { root } = mark("<p>Pay by mada.</p>", "/ar/glossary");
    expect(root.querySelector("[popover] a")?.getAttribute("href")).toBe("/ar/glossary#mada");
  });

  it("leaves a document with no terms exactly as it was", () => {
    const src = "<h2>Hello</h2><p>Nothing to see &amp; nothing to mark.</p>";
    expect(mark(src).html).toBe(src);
  });
});

describe("glossary marks in the seeded guides", () => {
  const pages = SEED_GUIDES.map((g) => ({ slug: g.slug, plain: enhanceGuideHtml(sanitizeArticleHtml(g.bodyHtml), { glossary: false }), marked: enhanceGuideHtml(sanitizeArticleHtml(g.bodyHtml)) }));

  it("adds definitions without changing the contents, steps or anything else", () => {
    let total = 0;
    for (const p of pages) {
      expect(p.marked.toc, p.slug).toEqual(p.plain.toc);
      expect(p.marked.steps, p.slug).toBe(p.plain.steps);
      const doc = parse(p.marked.html);
      const ids = popIds(p.marked.html);
      expect(new Set(ids).size, p.slug).toBe(ids.length);
      // Each term once at most: popovers plus step links.
      const terms = [...ids.map((id) => id.replace(/^gl-|-\d+$/g, "")), ...doc.querySelectorAll('a[href^="/glossary#"][title]').map((a) => a.getAttribute("href")!.slice(10))];
      expect(new Set(terms).size, p.slug).toBe(terms.length);
      for (const sel of ["h2", "h3", "h4", "a", "blockquote", "th"]) expect(doc.querySelector(`${sel} button[popovertarget], ${sel} a[title]`), `${p.slug} ${sel}`).toBeNull();
      expect(doc.querySelectorAll("li[data-step] button[popovertarget]"), p.slug).toHaveLength(0);
      expect(doc.querySelectorAll(".video-slot").length).toBe(parse(p.plain.html).querySelectorAll(".video-slot").length);
      expect(doc.querySelectorAll("blockquote.callout").length).toBe(parse(p.plain.html).querySelectorAll("blockquote.callout").length);
      total += terms.length;
    }
    expect(total).toBeGreaterThan(SEED_GUIDES.length);
  });

  it("removes nothing but the added marks: the visible text stays the same", () => {
    for (const p of pages) {
      const doc = parse(p.marked.html);
      for (const pop of doc.querySelectorAll("[popover]")) pop.remove();
      const text = (h: string) => h.replace(/\s+/g, " ").trim();
      expect(text(doc.text), p.slug).toBe(text(parse(p.plain.html).text));
    }
  });
});

describe("glossary page", () => {
  it("sets canonical and language alternates for both pages", () => {
    expect(glossaryMetadata("en").alternates).toMatchObject({ canonical: "/glossary", languages: { en: "/glossary", ar: "/ar/glossary" } });
    expect(glossaryMetadata("ar").alternates).toMatchObject({ canonical: "/ar/glossary", languages: { en: "/glossary", ar: "/ar/glossary" } });
    expect(String(glossaryMetadata("en").description).length).toBeLessThanOrEqual(160);
  });

  it("lists every term once in the A to Z index, in order", () => {
    const en = glossaryIndex("en");
    expect(en).toHaveLength(GLOSSARY.length);
    const names = en.map((t) => t.term.replace(/^the\s+/i, ""));
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "en")));
    expect(new Set(glossaryIndex("ar").map((t) => t.id)).size).toBe(GLOSSARY.length);
  });

  it("files Arabic words that start with the article under their first real letter", () => {
    const ar = glossaryIndex("ar").map((t) => t.ar.replace(/^ال/, ""));
    expect(ar).toEqual([...ar].sort((a, b) => a.localeCompare(b, "ar")));
    const pos = (id: string) => glossaryIndex("ar").findIndex((t) => t.id === id);
    // الجوازات sits with the jeem words, between جهاز and حلقة, not with the alifs.
    expect(pos("jawazat")).toBeGreaterThan(pos("kiosk"));
    expect(pos("jawazat")).toBeLessThan(pos("halaqah"));
  });

  it("renders an anchor for every term in both languages, with Arabic spellings marked as Arabic", () => {
    for (const locale of ["en", "ar"] as const) {
      const doc = parse(renderToStaticMarkup(createElement(GlossaryPage, { locale })));
      for (const t of GLOSSARY) {
        const card = doc.querySelector(`article#${t.id}`);
        expect(card, `${locale} ${t.id}`).not.toBeNull();
        expect(card!.querySelector('[lang="ar"]')?.text).toBe(t.ar);
        if (t.href) expect(card!.querySelector("a")?.getAttribute("href")).toBe(`${locale === "ar" ? "/ar" : ""}${t.href}`);
      }
      for (const g of GLOSSARY_GROUPS) expect(doc.querySelector(`a[href="#g-${g.id}"]`), g.id).not.toBeNull();
      expect(doc.text).toContain("+1 234 567 9076");
      expect(doc.text).not.toMatch(DASHES);
    }
  });
});
