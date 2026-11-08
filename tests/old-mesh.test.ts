import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseOldMesh } from "@/server/seed/import-old-mesh";

const text = readFileSync(path.join(process.cwd(), "src/server/seed/legacy/old-mesh.md"), "utf8");
const guides = parseOldMesh(text);
const bySlug = Object.fromEntries(guides.map((g) => [g.slug, g]));

describe("old MESH site import", () => {
  it("imports the real guides and skips index pages and tools", () => {
    expect(guides).toHaveLength(12);
    for (const skipped of ["admissions", "study", "mind-map-maker", "exam-maker", "ask", "about"]) expect(bySlug[skipped]).toBeUndefined();
  });

  it("files guides into the right sections", () => {
    expect(bySlug["new-student-steps"].stage).toBe("getting-started");
    expect(bySlug["childbirth-options"].stage).toBe("family");
    expect(bySlug["graduate-procedures"].stage).toBe("leaving");
    expect(bySlug["tajeel-and-itithaar"].stage).toBe("study");
    expect(bySlug["finding-an-apartment"].stage).toBe("getting-settled");
  });

  it("keeps the title and description", () => {
    const g = bySlug["new-student-steps"];
    expect(g.title).toBe("First steps for new students: visa, ID, student card and bank card");
    expect(g.summary).toMatch(/^What to do after you arrive, in order/);
  });

  it("keeps the real content as clean HTML", () => {
    const html = bySlug["new-student-steps"].bodyHtml;
    expect(html).toContain("<h2>1. University paperwork</h2>");
    expect(html).toContain("<strong>Zaair ID</strong>");
    expect(html).toContain("Raqm al-Hudood");
  });

  it("strips the old site's chrome: buttons, share links, step lists, footers and old links", () => {
    for (const g of guides) {
      expect(g.bodyHtml).not.toMatch(/obi2b|\[button:|Share on WhatsApp|More in |Still have a question|Tick each step|Something out of date/);
      expect(g.bodyHtml.includes(String.fromCharCode(0x2014))).toBe(false);
      expect(g.bodyHtml).not.toMatch(/\d+ (parts|steps|sections)(<\/strong>)? \d+ min read/);
      expect(g.bodyHtml).not.toMatch(/\w \.(\s|<)/);
    }
  });
});
