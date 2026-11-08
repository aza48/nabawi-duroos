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
    expect(html).toContain('<ul class="list-disc');
    expect(html).not.toContain("[1]");
  });
  it("escapes HTML and drops markers that point nowhere", () => {
    const html = renderAnswer("<script>alert(1)</script> [7]", []);
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("[7]");
  });
  it("links only to pages on this site", () => {
    expect(renderAnswer("[bad](https://evil.example) [good](/guides)")).toBe('<p>[bad](https://evil.example) <a href="/guides" class="font-semibold text-primary underline-offset-2 hover:underline">good</a></p>');
  });
});
