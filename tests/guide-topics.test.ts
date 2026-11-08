import { describe, expect, it } from "vitest";
import { GUIDE_TOPICS, OLD_ANCHORS, groupGuides, topicOf } from "@/lib/guide-topics";
import { SEED_GUIDES } from "@/server/seed/content/sync";

describe("guide topics", () => {
  it("lists every slug once", () => {
    const all = GUIDE_TOPICS.flatMap((t) => t.slugs);
    expect(new Set(all).size).toBe(all.length);
  });

  it("places every seeded guide in a topic on purpose, not by fallback", () => {
    const listed = new Set(GUIDE_TOPICS.flatMap((t) => t.slugs));
    const missing = SEED_GUIDES.map((g) => g.slug).filter((s) => !listed.has(s));
    expect(missing).toEqual([]);
  });

  it("falls back to the stored stage for a guide added later", () => {
    expect(topicOf({ slug: "something-new", stage: "family" })).toBe("family");
    expect(topicOf({ slug: "something-new", stage: "getting-settled" })).toBe("home");
    expect(topicOf({ slug: "something-new", stage: "leaving" })).toBe("study");
  });

  it("keeps old section links working", () => {
    const ids = new Set(GUIDE_TOPICS.map((t) => t.id));
    for (const [from, to] of Object.entries(OLD_ANCHORS)) {
      expect(ids.has(to)).toBe(true);
      expect(ids.has(from as never)).toBe(false);
    }
    // The other old stage anchors are topic ids themselves.
    for (const old of ["getting-started", "study", "family"]) expect(ids.has(old as never)).toBe(true);
  });

  it("groups in reading order, unknown guides last by title", () => {
    const g = (slug: string, stage = "getting-started", title = slug) => ({ slug, stage, title });
    const out = groupGuides([g("zz-new", "getting-started", "A new guide"), g("sim-internet-bank"), g("applying-to-the-islamic-university")]);
    expect(out[0].items.map((x) => x.slug)).toEqual(["applying-to-the-islamic-university", "sim-internet-bank", "zz-new"]);
  });

  it("keeps topics small enough to scan", () => {
    for (const t of GUIDE_TOPICS) expect(t.slugs.length).toBeLessThanOrEqual(10);
  });
});
