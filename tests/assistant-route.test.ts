import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ASK_LIMITS } from "@/server/assistant/limits";
import { ENGLISH_PAGE_AR, notFound } from "@/server/assistant/compose";
import { greetingReply, HELP_LINE, rulingReply } from "@/server/assistant/guard";

const read = (p: string) => readFileSync(path.join(process.cwd(), p), "utf8");

describe("assistant route file", () => {
  it("exports only route handlers and segment config (next build rejects anything else)", () => {
    const src = read("src/app/api/v1/assistant/route.ts");
    const names = [...src.matchAll(/^export\s+(?:async\s+)?(?:const|let|function)\s+(\w+)/gm)].map((m) => m[1]);
    const allowed = new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS", "dynamic", "dynamicParams", "revalidate", "fetchCache", "runtime", "preferredRegion", "maxDuration"]);
    expect(names.length).toBeGreaterThan(0);
    expect(names.filter((n) => !allowed.has(n))).toEqual([]);
    expect(src).not.toMatch(/^export\s*\{/m);
    expect(src).toContain('from "@/server/assistant/limits"');
  });

  it("keeps the rate limits in their own module", () => {
    expect(ASK_LIMITS).toEqual([
      { max: 12, windowMs: 60_000 },
      { max: 80, windowMs: 3_600_000 },
    ]);
  });
});

describe("assistant launcher", () => {
  it("sits above the bottom bar for as long as the bar is shown", () => {
    const nav = read("src/components/shell/BottomNav.tsx");
    const launcher = read("src/features/assistant/AssistantLauncher.tsx");
    // The bottom bar hides at lg, so the button drops to the corner at lg too, not before.
    expect(nav).toMatch(/\blg:hidden\b/);
    expect(launcher).toMatch(/\blg:bottom-6\b/);
    expect(launcher).not.toMatch(/\b(sm|md):bottom-/);
  });

  it("is a round icon on phones and tablets and carries the full name on desktop", () => {
    const launcher = read("src/features/assistant/AssistantLauncher.tsx");
    const fab = /<button[\s\S]*?data-assistant-fab[\s\S]*?<\/button>/.exec(launcher)?.[0] ?? "";
    expect(fab).toMatch(/className="[^"]*\bsize-14\b[^"]*\brounded-full\b[^"]*\blg:size-auto\b/);
    expect(fab).toMatch(/aria-label=/);
    expect(fab).toMatch(/<span className="hidden lg:inline">/);
    expect(fab).toContain("<MeshaykhName />");
  });
});

describe("assistant wording", () => {
  const DOUBT_EN = /\b(reliable|reliably|may|might|perhaps|maybe|possibly)\b/i;
  const DOUBT_AR = /(^|\s)(قد|ربما|موثوق)(\s|$)/;

  it("says what to do when MESH has no answer, with authority", () => {
    expect(notFound("en")).toBe("This isn't on MESH yet. Message Admin on WhatsApp at +1 234 567 9076 or email mesh@albaseerah.org: the MESH team will help, and the answer is added to the site.");
    expect(notFound("ar")).toContain("+1 234 567 9076");
    expect(notFound("ar")).toContain("mesh@albaseerah.org");
    for (const s of [HELP_LINE.en, HELP_LINE.ar, rulingReply("en"), rulingReply("ar")]) {
      expect(s).toContain("+1 234 567 9076");
      expect(s).toContain("mesh@albaseerah.org");
    }
  });

  it("has no doubt words or long dashes in any fixed reply", () => {
    const fixed = [
      notFound("en"), notFound("ar"), rulingReply("en"), rulingReply("ar"), HELP_LINE.en, HELP_LINE.ar, ENGLISH_PAGE_AR,
      greetingReply("en", "salam"), greetingReply("ar", "السلام عليكم"), greetingReply("en", "thanks"), greetingReply("ar", "شكرا"), greetingReply("en", "salam, thanks"),
    ];
    for (const s of fixed) {
      expect(s).not.toMatch(DOUBT_EN);
      expect(s).not.toMatch(DOUBT_AR);
      expect(s).not.toMatch(/[\u2013\u2014]/);
    }
  });

  it("has no doubt words in the chat screens' text", () => {
    for (const f of ["AssistantLauncher.tsx", "AssistantPage.tsx", "AssistantPanel.tsx"]) {
      // Visible text only: comments removed, then quoted strings and JSX text checked.
      const src = read(`src/features/assistant/${f}`).replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
      const texts = [...src.matchAll(/"([^"\n]*)"|`([^`]*)`|>([^<>{}\n]+)</g)].map((m) => m[1] ?? m[2] ?? m[3]);
      for (const t of texts) {
        expect(t, `${f}: ${t}`).not.toMatch(DOUBT_EN);
        expect(t, `${f}: ${t}`).not.toMatch(DOUBT_AR);
      }
    }
  });
});
