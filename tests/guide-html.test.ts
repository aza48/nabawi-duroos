import { describe, expect, it } from "vitest";
import { enhanceGuideHtml } from "@/lib/guide-html";

describe("enhanceGuideHtml", () => {
  it("gives every h2 an id and returns a table of contents", () => {
    const { html, toc } = enhanceGuideHtml("<h2>Before you go</h2><p>x</p><h2>At the office</h2>");
    expect(toc).toEqual([
      { id: "before-you-go", text: "Before you go" },
      { id: "at-the-office", text: "At the office" },
    ]);
    expect(html).toContain('<h2 id="before-you-go">');
  });
  it("marks numbered lists as checkable steps, numbering them across the guide", () => {
    const { html, steps } = enhanceGuideHtml("<ol><li>a</li><li>b</li></ol><ol><li>c</li></ol>");
    expect(steps).toBe(3);
    expect(html).toContain('data-step="0"');
    expect(html).toContain('data-step="2"');
  });
  it("turns a paragraph holding only a YouTube link into a video slot", () => {
    const { html } = enhanceGuideHtml('<p><a href="https://youtu.be/kG_1-EzwMk0">Furnishing a flat on a budget</a></p><p>See <a href="https://youtu.be/abcdefghijk">this</a> too.</p>');
    expect(html).toContain('data-youtube="kG_1-EzwMk0"');
    expect(html).toContain('data-title="Furnishing a flat on a budget"');
    expect(html).toContain('href="https://youtu.be/abcdefghijk"'); // inline links stay links
  });
  it("styles blockquotes that start with Tip or Note as callouts", () => {
    const { html } = enhanceGuideHtml("<blockquote><p>Tip: go before Dhuhr.</p></blockquote><blockquote><p>A quote</p></blockquote>");
    expect(html).toContain('class="callout"');
    expect(html.match(/class="callout"/g)).toHaveLength(1);
  });
});
