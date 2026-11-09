import { describe, expect, it } from "vitest";
import { COLLECTIONS, isJunkTitle, treeOf, type LibNode } from "@/content/library-books";

const files = (n: LibNode): { id: string; t: string }[] => ("f" in n ? n.f.flatMap(files) : [n]);
const all = COLLECTIONS.flatMap((c) => { const t = treeOf(c.slug); return t ? files(t) : []; });
const byId = (id: string) => all.find((f) => f.id === id)?.t;

describe("library file titles", () => {
  it("never shows a file name with no words", () => {
    for (const f of all) expect(isJunkTitle(f.t), `${f.id} ${f.t}`).toBe(false);
  });

  it("drops what sharing sites add in front of a title", () => {
    for (const f of all) expect(f.t, f.id).not.toMatch(/^(Salinan|Noor[\s.-]*Book|arabicpdfs|Figh\d|DOC-\d)|\.zip$/i);
  });

  it("fixes the names typed in Latin letters, and names blank files after their folder", () => {
    expect(byId("1W9HzhCyEYlrBFurbsn8OdZFaOhnTdEKV")).toBe("الترجيح بالمكتشف التجريبي في التفسير، دراسة نقدية");
    expect(byId("1sajE1-15G3fdK9pFJo2R0pyAp5OejfUg")).toBe("رسالة في الدعوة إلى الله");
    expect(byId("1C3_dx2Vz6MHtgpQ_V39hRZ2ccMWuDkX4")).toBe("تخريج الفروع على الأصول (١)");
    expect(byId("1CwgDDQ-Rs1l47KQJIiUH0x5TxiCVL3Yu")).toBe("الأديان");
    expect(byId("1473BFStzct7DnOxaebZo3cervNqE7YlS")).toMatch(/^الجرح والتعديل 1 \([١٢٣]\)$/);
  });

  it("knows a junk name from a real one", () => {
    for (const t of ["DOC-20250130-WA0016", "7d06cccc-a53f-4345-bd8d-d894e86d0ceb", "6032700262575095376 121", "fiqh15654", "null", "oti"]) expect(isJunkTitle(t), t).toBe(true);
    for (const t of ["التوحيد", "Photo", "Al-Arabiyyah Bayna Yadayk", "Book 1"]) expect(isJunkTitle(t), t).toBe(false);
  });
});
