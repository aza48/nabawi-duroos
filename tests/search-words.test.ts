import { describe, expect, it } from "vitest";
import { expandQuery } from "@/lib/search/normalize";
import { createSearch, type SearchDoc } from "@/lib/search/engine";

describe("more student words", () => {
  it("connects the spellings and words students type", () => {
    expect(expandQuery("groceries")).toContain("supermarket");
    expect(expandQuery("hifz")).toContain("memorisation");
    expect(expandQuery("tahfiz")).toContain("hifz");
    expect(expandQuery("tajwid")).toContain("tajweed");
    expect(expandQuery("dependents")).toContain("family visa");
  });
  it("adds to what a word already finds instead of replacing it", () => {
    const wife = expandQuery("wife");
    expect(wife).toContain("children");
    expect(wife).toContain("dependents");
  });
  it("keeps tajweed and ta'jeel apart", () => {
    expect(expandQuery("tajweed")).not.toContain("tajeel");
    expect(expandQuery("tajeel")).not.toContain("tajweed");
  });

  const docs: SearchDoc[] = [
    { id: "visas", type: "guide", title: "Visas for family members and visitors", subtitle: "Bringing dependents to Madinah", text: "A family visa lets your dependents join you.", url: "/guides/visas" },
    { id: "budget", type: "guide", title: "Cost of living", subtitle: "Rent, food and transport", text: "A supermarket shop for a week costs about the same as at home.", url: "/guides/budget" },
    { id: "halaqat", type: "program", title: "Quran halaqat at the Haram", subtitle: "Free circles for adults", text: "Memorisation circles every day after Asr.", url: "/programs/halaqat" },
    { id: "bank", type: "faq", title: "Can I open a bank account?", subtitle: "With your iqama", text: "Yes, at any branch.", url: "/ask/bank" },
  ];
  const search = createSearch(docs);
  it("finds the right page for words that found nothing before", () => {
    expect(search("groceries")[0]?.id).toBe("budget");
    expect(search("hifz")[0]?.id).toBe("halaqat");
    expect(search("visa for wife")[0]?.id).toBe("visas");
  });
});
