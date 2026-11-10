import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { shareOrCopy } from "@/components/share";
import { ShareButton } from "@/components/ShareButton";

const data = { title: "A guide", url: "https://medinahub.org/guides/x" };

function fakeDoc(copyOk: boolean | "throw") {
  const added: unknown[] = [];
  const focused = { n: 0 };
  return {
    added,
    focused,
    doc: {
      createElement: () => ({ value: "", setAttribute: () => {}, select: () => {}, style: { position: "", opacity: "", top: "", left: "" } }),
      activeElement: { focus: () => { focused.n++; } },
      body: { appendChild: (el: unknown) => added.push(el), removeChild: (el: unknown) => added.splice(added.indexOf(el), 1) },
      execCommand: () => {
        if (copyOk === "throw") throw new Error("no");
        return copyOk;
      },
    },
  };
}

describe("shareOrCopy", () => {
  it("uses the share sheet when there is one", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    expect(await shareOrCopy(data, { share })).toBe("shared");
    expect(share).toHaveBeenCalledWith(data);
  });

  it("treats closing the share sheet as cancelled, and copies nothing", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const share = vi.fn().mockRejectedValue(Object.assign(new Error("x"), { name: "AbortError" }));
    expect(await shareOrCopy(data, { share, clipboard: { writeText } })).toBe("cancelled");
    expect(writeText).not.toHaveBeenCalled();
  });

  it("copies the link when there is no share sheet, or sharing fails", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    expect(await shareOrCopy(data, { clipboard: { writeText } })).toBe("copied");
    expect(writeText).toHaveBeenCalledWith(data.url);
    const share = vi.fn().mockRejectedValue(Object.assign(new Error("x"), { name: "NotAllowedError" }));
    expect(await shareOrCopy(data, { share, clipboard: { writeText } })).toBe("copied");
    expect(await shareOrCopy(data, { share: vi.fn(), canShare: () => false, clipboard: { writeText } })).toBe("copied");
  });

  it("says copied only when a copy really worked", async () => {
    const blocked = { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } };
    const ok = fakeDoc(true);
    expect(await shareOrCopy(data, blocked, ok.doc)).toBe("copied");
    expect(ok.added).toHaveLength(0);
    expect(ok.focused.n).toBe(1);
    expect(await shareOrCopy(data, blocked, fakeDoc(false).doc)).toBe("failed");
    expect(await shareOrCopy(data, blocked, fakeDoc("throw").doc)).toBe("failed");
    expect(await shareOrCopy(data, {})).toBe("failed");
  });

  it("renders a labelled button in each language, hidden in print", () => {
    const en = renderToStaticMarkup(createElement(ShareButton, { title: "A guide" }));
    const ar = renderToStaticMarkup(createElement(ShareButton, { title: "دليل", locale: "ar" }));
    expect(en).toContain("Share</button>");
    expect(ar).toContain("مشاركة");
    expect(en).toContain("data-noprint");
    expect(en).toContain('role="status"');
  });
});
