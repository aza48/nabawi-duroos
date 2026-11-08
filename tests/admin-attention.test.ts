import { describe, expect, it } from "vitest";
import { buildAttention, type AttentionInput } from "@/server/admin/attention";
import { plainReading } from "@/features/admin/watcher/reading";

const NOW = new Date("2026-11-08T09:00:00Z");
const base: AttentionInput = { suggested: 0, failedPosts: 0, failingSources: [], watcherLastRun: new Date("2026-11-08T08:57:00Z"), drafts: 0, staleGuides: [], staleFaqs: [], programmes: [] };

describe("buildAttention", () => {
  it("is empty when nothing needs a person", () => {
    expect(buildAttention(base, NOW)).toEqual([]);
  });
  it("counts each problem and links to the fix, urgent first", () => {
    const items = buildAttention({
      ...base,
      watcherLastRun: new Date("2026-11-08T07:00:00Z"),
      suggested: 3,
      failedPosts: 1,
      failingSources: ["@twijri"],
      drafts: 2,
      staleGuides: [{ slug: "a", title: "A", verified: new Date("2025-01-01") }, { slug: "b", title: "B", verified: new Date("2026-10-01") }],
      staleFaqs: [{ slug: "c", question: "C", verified: null }],
      programmes: [{ slug: "x", name: "Old markaz", checked: "2025-10-01" }, { slug: "y", name: "New markaz", checked: "2026-11-01" }],
    }, NOW);
    expect(items.map((i) => i.key)).toEqual(["watcher", "sources", "suggested", "failed", "drafts", "programmes", "content"]);
    expect(items.find((i) => i.key === "sources")).toMatchObject({ count: 1, href: "/admin/sources", detail: "@twijri" });
    expect(items.find((i) => i.key === "content")?.count).toBe(2);
    expect(items.find((i) => i.key === "programmes")).toMatchObject({ count: 1, detail: "Old markaz" });
  });
});

describe("plainReading", () => {
  it("reads like a person wrote it, without slugs or percentages", () => {
    const t = plainReading({ about_lesson: true, lesson_slug: "ruh-dalil", kind: "cancelled", dates: ["2026-11-12"], note_en: "The shaykh will not give this dars today", note_ar: "", confidence: 0.93 }, "Dalil al-Talib");
    expect(t).toBe('Looks like: lesson cancelled. Dalil al-Talib. Thu 12 Nov. Very likely. Note for the site: "The shaykh will not give this dars today"');
    expect(t).not.toMatch(/ruh-dalil|%/);
  });
});
