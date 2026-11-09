import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { HEAD_SCRIPT, TEXT_SIZE_KEY, parseTextSize } from "@/components/shell/text-size";

/** Runs the head script against a stub document and storage, and returns the attributes it set on <html>. */
function run(stored: Record<string, string>, throws = false) {
  const attrs: Record<string, string> = {};
  const localStorage = { getItem: (k: string) => { if (throws) throw new Error("blocked"); return stored[k] ?? null; } };
  const document = { documentElement: { setAttribute: (k: string, v: string) => { attrs[k] = v; } } };
  runInNewContext(HEAD_SCRIPT, { localStorage, document });
  return attrs;
}

describe("text size (D5)", () => {
  it("reads only the three known sizes", () => {
    expect(parseTextSize("lg")).toBe("lg");
    expect(parseTextSize("xl")).toBe("xl");
    expect(parseTextSize("huge")).toBe("md");
    expect(parseTextSize(null)).toBe("md");
  });

  it("applies the saved theme and text size before paint", () => {
    expect(run({ "mesh-theme": "dark", [TEXT_SIZE_KEY]: "xl" })).toEqual({ "data-theme": "dark", "data-text": "xl" });
    expect(run({ [TEXT_SIZE_KEY]: "lg" })).toEqual({ "data-text": "lg" });
  });

  it("ignores unknown values and blocked storage", () => {
    expect(run({ "mesh-theme": "purple", [TEXT_SIZE_KEY]: "200%" })).toEqual({});
    expect(run({}, true)).toEqual({});
  });
});
