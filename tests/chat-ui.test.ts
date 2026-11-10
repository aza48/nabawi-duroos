import { describe, expect, it } from "vitest";
import { renderAnswer } from "@/features/assistant/AssistantPanel";

describe("chat answer rendering", () => {
  it("renders bold, lists and citation markers as links to the cited page", () => {
    const html = renderAnswer("It is **840 SAR** a month [1].\n- Paid monthly [2]\n- Stops during ta'jeel", [
      { title: "Stipend", url: "/ask/stipend-amount" },
      { title: "Ta'jeel", url: "/guides/tajeel-and-itithaar" },
    ]);
    expect(html).toContain("<strong>840 SAR</strong>");
    expect(html).toContain('href="/ask/stipend-amount"');
    expect(html).toContain('<ul dir="ltr" class="list-disc');
    expect(html).not.toContain("[1]");
  });
  it("escapes HTML and drops markers that point nowhere", () => {
    const html = renderAnswer("<script>alert(1)</script> [7]", []);
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("[7]");
  });
  it("gives every block its own direction, so English under an Arabic line reads left to right", () => {
    const html = renderAnswer("إليك ما في MESH عن هذا، والنص بالإنجليزية:\n\nBook a slot in Nusuk. [1]\n1. Install the app.", [{ title: "الروضة", url: "/guides/umrah-rawdah-quba" }]);
    expect(html.startsWith('<p dir="rtl" class="text-start">')).toBe(true);
    expect(html).toContain('<p dir="ltr" class="text-start">Book a slot');
    expect(html).toContain('<ol dir="ltr"');
  });
  it("links only to pages on this site", () => {
    expect(renderAnswer("[bad](https://evil.example) [good](/guides)")).toBe('<p dir="ltr" class="text-start">[bad](https://evil.example) <a href="/guides" class="font-semibold text-primary underline-offset-2 hover:underline">good</a></p>');
  });
});
