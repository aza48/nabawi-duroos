import { describe, expect, it } from "vitest";
import { groupHits } from "@/features/search/SearchUI";
import type { SearchHit } from "@/lib/search/engine";

const hit = (id: string, type: SearchHit["type"], score: number): SearchHit => ({ id, type, score, title: id, url: `/${id}` });

describe("search result groups", () => {
  it("puts the group holding the best hit first", () => {
    const hits = [hit("tawhid-dars", "dars", 120), hit("tawhid-dars-2", "dars", 40), hit("aqidah-guide", "guide", 30), hit("ruhayli", "shaykh", 20)];
    expect(groupHits(hits, false).map((g) => g.t)).toEqual(["dars", "guide", "shaykh"]);
  });
  it("keeps the usual order when the best scores are equal", () => {
    const hits = [hit("a", "dars", 10), hit("b", "guide", 10), hit("c", "faq", 10)];
    expect(groupHits(hits, false).map((g) => g.t)).toEqual(["guide", "faq", "dars"]);
  });
  it("caps each group and drops empty ones", () => {
    const hits = Array.from({ length: 8 }, (_, i) => hit(`g${i}`, "guide", 50 - i));
    const groups = groupHits(hits, true);
    expect(groups).toHaveLength(1);
    expect(groups[0].items).toHaveLength(5);
  });
});
