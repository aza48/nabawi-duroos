import { beforeEach, describe, expect, it } from "vitest";
import { markAskPending, takeAskPending } from "@/features/assistant/ask-pending";

// A link like /assistant?q=... must not ask the model by itself; only the site's own search box may.
describe("the assistant asks on arrival only for the site's own search box", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    (globalThis as { sessionStorage?: unknown }).sessionStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    };
  });

  it("a shared link (nothing handed over) is not asked", () => {
    expect(takeAskPending("how do I renew my iqama")).toBe(false);
  });

  it("the search box's hand-off is asked, once", () => {
    markAskPending("  how do I renew my iqama ");
    expect(takeAskPending("how do I renew my iqama")).toBe(true);
    expect(takeAskPending("how do I renew my iqama")).toBe(false);
  });

  it("a different question than the one handed over is not asked", () => {
    markAskPending("bus to the haram");
    expect(takeAskPending("something else")).toBe(false);
  });

  it("long questions compare as the page cuts them (600 characters)", () => {
    const long = "a".repeat(800);
    markAskPending(long);
    expect(takeAskPending(long.slice(0, 600))).toBe(true);
  });
});
