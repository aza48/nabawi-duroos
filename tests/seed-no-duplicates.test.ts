import { describe, expect, it } from "vitest";
import { AIAKHEE_REPLACED_SLUGS } from "@/server/seed/content/faqs-aiakhee-2026-11";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";

/**
 * Two agents writing the same guide is the costliest kind of duplicate work, and the seed used to
 * hide it: a later list silently replaced an earlier guide with the same slug. Now a slug may be
 * defined twice only on purpose: a guide rewrite in GUIDE_REWRITES_2026_11, or an FAQ replacement
 * listed in AIAKHEE_REPLACED_SLUGS. Anything else fails here,
 * so the second author finds out before merging. Fix: rewrite the existing guide in place (in its
 * owner's file, after asking on issue 13) or pick a different slug for a genuinely different guide.
 */
// Every exported list of guides or FAQs in the seed folder, found on its own, so a new seed file is checked too.
const modules = import.meta.glob<Record<string, unknown>>("../src/server/seed/content/*.ts", { eager: true });
const GUIDE_LISTS: Record<string, { slug: string; title: string }[]> = {};
const FAQ_LISTS: Record<string, { slug: string }[]> = {};
for (const [file, mod] of Object.entries(modules)) {
  for (const [name, value] of Object.entries(mod)) {
    if (!Array.isArray(value) || typeof value[0] !== "object" || !value[0] || !("slug" in value[0])) continue;
    const key = `${name} (${file.split("/").pop()})`;
    if ("bodyHtml" in value[0] && name !== "SEED_GUIDES" && name !== "GUIDE_REWRITES_2026_11") GUIDE_LISTS[key] = value;
    if ("answerHtml" in value[0] && name !== "SEED_FAQS") FAQ_LISTS[key] = value;
  }
}

function duplicates(lists: Record<string, { slug: string }[]>, intended: string[] = []): string[] {
  const where = new Map<string, string[]>();
  for (const [name, list] of Object.entries(lists)) for (const { slug } of list) where.set(slug, [...(where.get(slug) ?? []), name]);
  return [...where].filter(([slug, names]) => names.length > (intended.includes(slug) ? 2 : 1)).map(([slug, names]) => `${slug}: ${names.join(" and ")}`);
}

describe("each guide and FAQ is written once", () => {
  it("finds the seed lists", () => {
    expect(Object.keys(GUIDE_LISTS).length).toBeGreaterThanOrEqual(11);
    expect(Object.keys(FAQ_LISTS).length).toBeGreaterThanOrEqual(4);
  });

  it("no guide slug is defined in two seed lists (rewrites go in GUIDE_REWRITES_2026_11)", () => {
    expect(duplicates(GUIDE_LISTS)).toEqual([]);
  });

  it("no FAQ slug is defined in two seed lists, except the replacements aiakhee lists", () => {
    expect(duplicates(FAQ_LISTS, AIAKHEE_REPLACED_SLUGS)).toEqual([]);
  });

  it("every seed list is published by the sync", () => {
    const published = new Set(SEED_GUIDES.map((g) => g.slug));
    expect(Object.values(GUIDE_LISTS).flat().map((g) => g.slug).filter((s) => !published.has(s))).toEqual([]);
    const faqs = new Set(SEED_FAQS.map((f) => f.slug));
    expect(Object.values(FAQ_LISTS).flat().map((f) => f.slug).filter((s) => !faqs.has(s))).toEqual([]);
  });

  it("no two guides share a title", () => {
    const seen = new Map<string, string>();
    const clash: string[] = [];
    for (const g of SEED_GUIDES) {
      const key = g.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      if (seen.has(key)) clash.push(`${seen.get(key)} and ${g.slug}`);
      else seen.set(key, g.slug);
    }
    expect(clash).toEqual([]);
  });
});
