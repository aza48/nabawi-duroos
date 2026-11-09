import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MorePage } from "@/features/content/ContentPages";
import { enhanceGuideHtml } from "@/lib/guide-html";

describe("links to /start and /glossary", () => {
  it("the More page links both, in each language", () => {
    const en = renderToStaticMarkup(MorePage({ whatsappUrl: "https://chat.whatsapp.com/x", locale: "en" }));
    const ar = renderToStaticMarkup(MorePage({ whatsappUrl: "https://chat.whatsapp.com/x", locale: "ar" }));
    expect(en).toContain('href="/start"');
    expect(en).toContain('href="/glossary"');
    expect(ar).toContain('href="/ar/start"');
    expect(ar).toContain('href="/ar/glossary"');
  });

  it("glossary terms in a guide point at the glossary of the page's language", () => {
    const html = "<p>Get your iqama first.</p>";
    expect(enhanceGuideHtml(html, { glossaryBase: "/ar/glossary" }).html).toMatch(/href="\/ar\/glossary#/);
    expect(enhanceGuideHtml(html).html).toMatch(/href="\/glossary#/);
  });
});
