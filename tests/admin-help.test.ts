import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ADMIN_EMAIL, ADMIN_HELP_COPY, ADMIN_WHATSAPP, adminEmailHref, adminWhatsAppHref } from "@/components/shell/admin-help";
import { HELP_CONTACT_DEFAULT, HELP_EMAIL_DEFAULT } from "@/server/settings";

describe("help goes to Admin (D1)", () => {
  it("uses the one fixed help number", () => {
    expect(ADMIN_WHATSAPP).toBe(HELP_CONTACT_DEFAULT);
    expect(ADMIN_WHATSAPP).toBe("+1 234 567 9076");
  });

  it("links to Admin's WhatsApp with no message when there is no page", () => {
    expect(adminWhatsAppHref()).toBe("https://wa.me/12345679076");
  });

  it("fills in a greeting and the full page link", () => {
    const href = adminWhatsAppHref("/guides/opening-a-bank-account");
    expect(href.startsWith("https://wa.me/12345679076?text=")).toBe(true);
    const text = decodeURIComponent(href.split("?text=")[1]);
    expect(text).toBe("Assalamu alaykum. About this page on MESH: https://medinahub.org/guides/opening-a-bank-account");
  });

  it("greets in Arabic on Arabic pages and keeps the query", () => {
    const text = decodeURIComponent(adminWhatsAppHref("/ar/search?q=%D8%A5%D9%82%D8%A7%D9%85%D8%A9", "ar").split("?text=")[1]);
    expect(text.startsWith("السلام عليكم. بخصوص هذه الصفحة في MESH: https://medinahub.org/ar/search?q=")).toBe(true);
  });

  it("never names an internal route such as the prerendered 404", () => {
    expect(adminWhatsAppHref("/_not-found")).toBe("https://wa.me/12345679076");
  });

  it("uses the one fixed help email, with the page as the subject", () => {
    expect(ADMIN_EMAIL).toBe(HELP_EMAIL_DEFAULT);
    expect(ADMIN_EMAIL).toBe("mesh@albaseerah.org");
    expect(adminEmailHref()).toBe("mailto:mesh@albaseerah.org");
    expect(adminEmailHref("/_not-found")).toBe("mailto:mesh@albaseerah.org");
    expect(decodeURIComponent(adminEmailHref("/guides/opening-a-bank-account").split("?subject=")[1])).toBe("MESH: https://medinahub.org/guides/opening-a-bank-account");
  });

  it("has no long dashes in the help copy", () => {
    expect(JSON.stringify(ADMIN_HELP_COPY)).not.toMatch(/[–—]/);
  });
});

function files(dir: string, withSeed = false): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) return (withSeed ? /[\\/](admin|legacy)$/ : /[\\/](admin|seed|legacy)$/).test(p) || p.includes(`${path.sep}(admin)`) ? [] : files(p, withSeed);
    return /\.tsx?$/.test(p) ? [p] : [];
  });
}

describe("every public help line gives the email too", () => {
  it("finds no help number without the email beside it", () => {
    const offenders = files(path.join(process.cwd(), "src"), true).flatMap((f) =>
      readFileSync(f, "utf8")
        .split("\n")
        .map((line, i) => ({ line, i }))
        .filter(({ line }) => /WhatsApp at \+1 234 567 9076(?! or email (?:<a [^>]*>)?mesh@albaseerah\.org)/.test(line))
        .map(({ i }) => `${path.relative(process.cwd(), f)}:${i + 1}`)
    );
    expect(offenders).toEqual([]);
  });
});

describe("no public help line sends people to the group", () => {
  // Joining the group is fine; asking for help there is not (house rule: message Admin on WhatsApp).
  const HELP_TO_GROUP = [
    /ask (it )?in the (MESH )?WhatsApp group/i,
    /tell us in the (MESH )?WhatsApp group/i,
    /post it in the MESH WhatsApp chat/i,
    /in the WhatsApp group if something is out of date/i,
    /اسأل في مجموعة واتساب/,
    /أخبرنا في مجموعة واتساب/,
    /اكتبه في مجموعة MESH على واتساب/,
  ];
  it("finds none in the site's source", () => {
    const offenders = files(path.join(process.cwd(), "src")).flatMap((f) => {
      const src = readFileSync(f, "utf8");
      return HELP_TO_GROUP.filter((re) => re.test(src)).map((re) => `${path.relative(process.cwd(), f)}: ${re}`);
    });
    expect(offenders).toEqual([]);
  });
});
