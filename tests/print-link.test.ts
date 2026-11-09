import { describe, expect, it } from "vitest";
import QRCode from "qrcode";
import { PRINT_SCAN_LABEL, printLink } from "@/components/shell/print-link";
import { SITE_URL } from "@/lib/site";

describe("print footer link (C6)", () => {
  it("gives the full address for the QR code and a short one to print", () => {
    const host = SITE_URL.replace(/^https?:\/\//, "");
    expect(printLink("/guides/etimad-account")).toEqual({ href: `${SITE_URL}/guides/etimad-account`, label: `${host}/guides/etimad-account` });
    expect(printLink("ar/guides/etimad-account").label).toBe(`${host}/ar/guides/etimad-account`);
  });

  it("has a scan label in both languages with no dashes", () => {
    expect(PRINT_SCAN_LABEL.en).toBe("Scan to open on your phone");
    expect(PRINT_SCAN_LABEL.ar).toBe("امسح للفتح على الجوال");
    for (const s of Object.values(PRINT_SCAN_LABEL)) expect(s).not.toMatch(/[–—]/);
  });

  it("draws the QR code as an inline SVG", async () => {
    const svg = await QRCode.toString(printLink("/guides/etimad-account").href, { type: "svg", margin: 0 });
    expect(svg).toMatch(/^<svg[^>]*viewBox="0 0 \d+ \d+"/);
    expect(svg).not.toMatch(/<script/i);
  });
});
