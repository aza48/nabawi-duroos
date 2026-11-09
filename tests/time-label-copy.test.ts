import { describe, expect, it } from "vitest";
import { t } from "@/features/duroos/strings";

/** Public text never shows doubt (owner rule): a dars without a confirmed time just says "Evening". */
describe("unconfirmed time label", () => {
  it("states only what is known, in both languages", () => {
    for (const locale of ["en", "ar"] as const) {
      const label = t(locale, "timeNotConfirmed");
      expect(label).not.toMatch(/confirm|مؤكد|غير|unknown|not stated/i);
    }
    expect(t("en", "timeNotConfirmed")).toBe("Evening");
    expect(t("ar", "timeNotConfirmed")).toBe("مساءً");
  });
});
