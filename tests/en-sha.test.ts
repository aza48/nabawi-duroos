import { describe, expect, it } from "vitest";
import { faqEnSha, guideEnSha } from "@/server/seed/content/en-sha";

// AR5.2: a changed fee or date in the English must change the fingerprint, so the Arabic check fails.
describe("the English fingerprint", () => {
  const g = { title: "Fees", summary: "What it costs", bodyHtml: "<p>The fee is 100 SAR.</p>" };
  it("changes when one fact in the English changes", () => {
    expect(guideEnSha({ ...g, bodyHtml: "<p>The fee is 150 SAR.</p>" })).not.toBe(guideEnSha(g));
    expect(faqEnSha({ question: "Q?", answerHtml: "<p>21st</p>" })).not.toBe(faqEnSha({ question: "Q?", answerHtml: "<p>25th</p>" }));
  });
  it("ignores line-ending and outer whitespace differences", () => {
    expect(guideEnSha({ ...g, bodyHtml: `\n${g.bodyHtml}\r\n` })).toBe(guideEnSha(g));
  });
});
