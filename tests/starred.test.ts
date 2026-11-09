import { describe, expect, it } from "vitest";
import { parseStarred, toggleIn } from "@/features/duroos/useStarred";

describe("My duroos stars", () => {
  it("reads only a list of slugs and drops repeats", () => {
    expect(parseStarred(null)).toEqual([]);
    expect(parseStarred("not json")).toEqual([]);
    expect(parseStarred('{"a":1}')).toEqual([]);
    expect(parseStarred('["tadmuriyyah", 5, "", "tadmuriyyah", "bulugh"]')).toEqual(["tadmuriyyah", "bulugh"]);
  });

  it("toggles a slug on and off without touching the others", () => {
    const once = toggleIn(["a"], "b");
    expect(once).toEqual(["a", "b"]);
    expect(toggleIn(once, "a")).toEqual(["b"]);
  });
});
