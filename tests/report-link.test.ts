import { describe, expect, it } from "vitest";
import { reportHref, reportMessage } from "@/features/duroos/ReportLink";

const dars = { bookEn: "Kitab al-Tawhid", bookAr: "كتاب التوحيد", shaykhEn: "Prof. Dr. Sulayman al-Ruhayli", shaykhAr: "أ. د. سليمان الرحيلي", path: "/duroos/lesson/ruh-tawhid" };

describe("Did this dars not happen today? (A4)", () => {
  it("names the dars, the shaykh, the day and the page in English", () => {
    expect(reportMessage(dars, "Monday 18 Jumada al-Ula 1448", "en")).toBe(
      "Assalamu alaykum. The Kitab al-Tawhid dars with Prof. Dr. Sulayman al-Ruhayli did not happen today, Monday 18 Jumada al-Ula 1448. https://medinahub.org/duroos/lesson/ruh-tawhid"
    );
  });

  it("writes it in Arabic on Arabic pages", () => {
    const m = reportMessage({ ...dars, path: "/ar/duroos/lesson/ruh-tawhid" }, "الاثنين ١٨ جمادى الأولى ١٤٤٨", "ar");
    expect(m).toBe("السلام عليكم. درس «كتاب التوحيد» مع أ. د. سليمان الرحيلي لم يُقَم اليوم، الاثنين ١٨ جمادى الأولى ١٤٤٨. https://medinahub.org/ar/duroos/lesson/ruh-tawhid");
    expect(m).not.toMatch(/[–—]/);
  });

  it("opens WhatsApp to Admin's number with the message filled in", () => {
    const href = reportHref(dars, "today", "en");
    expect(href.startsWith("https://wa.me/12345679076?text=")).toBe(true);
    expect(decodeURIComponent(href.split("?text=")[1])).toContain("did not happen today");
  });
});
