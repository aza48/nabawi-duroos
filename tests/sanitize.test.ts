import { describe, expect, it } from "vitest";
import { sanitizeArticleHtml } from "@/lib/sanitize";

describe("sanitizeArticleHtml", () => {
  it("removes scripts and event handlers", () => {
    const out = sanitizeArticleHtml(`<p onclick="x()">Hi</p><script>alert(1)</script><img src="/a.jpg" onerror="x()">`);
    expect(out).not.toMatch(/script|onclick|onerror/);
    expect(out).toContain("<p>Hi</p>");
    expect(out).toContain('<img src="/a.jpg"');
  });
  it("drops javascript: links but keeps normal ones, opening external links safely", () => {
    const out = sanitizeArticleHtml(`<a href="javascript:alert(1)">bad</a><a href="https://absher.sa">ok</a>`);
    expect(out).not.toContain("javascript:");
    expect(out).toContain('href="https://absher.sa"');
    expect(out).toContain('rel="noopener noreferrer"');
  });
  it("keeps headings, lists and blockquotes", () => {
    const out = sanitizeArticleHtml("<h2>Steps</h2><ol><li>One</li></ol><blockquote>Note</blockquote>");
    expect(out).toBe("<h2>Steps</h2><ol><li>One</li></ol><blockquote>Note</blockquote>");
  });
  it("strips iframes and inline styles", () => {
    const out = sanitizeArticleHtml(`<iframe src="https://evil"></iframe><p style="color:red">x</p>`);
    expect(out).toBe("<p>x</p>");
  });
});

describe("tables saved by the admin editor", () => {
  it("keep their cells and drop the editor's inline sizing", async () => {
    const { sanitizeArticleHtml } = await import("@/lib/sanitize");
    const fromEditor = '<table style="min-width: 50px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th><p>Item</p></th><th><p>SAR</p></th></tr><tr><td><p>Rent</p></td><td><p>1,500</p></td></tr></tbody></table>';
    expect(sanitizeArticleHtml(fromEditor)).toBe("<table><tbody><tr><th><p>Item</p></th><th><p>SAR</p></th></tr><tr><td><p>Rent</p></td><td><p>1,500</p></td></tr></tbody></table>");
  });
});
