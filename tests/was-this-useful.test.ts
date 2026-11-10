import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { lowestFirst, readVotes, votePath, withVote } from "@/components/useful";
import { WasThisUseful } from "@/components/WasThisUseful";

describe("Was this useful? (S1)", () => {
  it("counts English and Arabic readers of a page together", () => {
    expect(votePath("/ar/guides/x")).toBe("/guides/x");
    expect(votePath("/guides/x/")).toBe("/guides/x");
    expect(votePath("/ask/y?c=2#top")).toBe("/ask/y");
    expect(votePath("/ar")).toBe("/");
  });

  it("reads saved votes safely and keeps storage small", () => {
    expect(readVotes("not json")).toEqual({});
    expect(readVotes('{"/guides/a":1,"/guides/b":0,"bad":1,"/guides/c":5}')).toEqual({ "/guides/a": 1, "/guides/b": 0 });
    let v: Record<string, 0 | 1> = {};
    for (let i = 0; i < 250; i++) v = withVote(v, `/guides/g${i}`, i % 2 === 0);
    expect(Object.keys(v)).toHaveLength(200);
    expect(v["/guides/g249"]).toBe(0);
    expect(withVote({ "/guides/a": 1 }, "/guides/a", false)).toEqual({ "/guides/a": 0 });
  });

  it("puts the pages readers found least useful first", () => {
    const rows = lowestFirst([
      { path: "/guides/good", kind: "guide", yes: 10, no: 0 },
      { path: "/guides/one-no", kind: "guide", yes: 0, no: 1 },
      { path: "/guides/bad", kind: "guide", yes: 1, no: 9 },
      { path: "/ask/mixed", kind: "faq", yes: 5, no: 5 },
    ]);
    expect(rows.map((r) => r.path)).toEqual(["/guides/bad", "/guides/one-no", "/ask/mixed", "/guides/good"]);
  });

  it("asks in each language, and is hidden in print", () => {
    const en = renderToStaticMarkup(createElement(WasThisUseful, { kind: "guide" }));
    const ar = renderToStaticMarkup(createElement(WasThisUseful, { kind: "faq", locale: "ar" }));
    expect(en).toContain("Was this useful?");
    expect(ar).toContain("هل كانت هذه الصفحة مفيدة؟");
    expect(en).toContain("data-noprint");
    expect(en + ar).not.toMatch(/[—–]/);
  });
});
