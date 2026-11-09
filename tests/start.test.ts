import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { START_STAGES, START_STEPS, type StartStageId } from "@/content/start";
import { SEED_FAQS, SEED_GUIDES } from "@/server/seed/content/sync";
import { SLUG as COMPANY_SLUG } from "@/features/guides/company/content";
import { START_COPY } from "@/features/start/copy";
import {
  EMPTY_SAVED,
  START_STORAGE_KEY,
  dayLabel,
  dueIso,
  dueLabel,
  isIsoDate,
  isShown,
  parseSaved,
  progressOf,
  toggleDone,
} from "@/features/start/plan";
import { hijriOf } from "@/lib/time/hijri";

const DASH = /[‒–—―−]/;

/** Every string in a value, however deep. */
function strings(v: unknown): string[] {
  if (typeof v === "string") return [v];
  if (typeof v === "function") return strings((v as (...a: unknown[]) => unknown)(3, 7));
  if (Array.isArray(v)) return v.flatMap(strings);
  if (v && typeof v === "object") return Object.values(v).flatMap(strings);
  return [];
}

describe("first 100 days: the plan", () => {
  it("has the six stages in order", () => {
    expect(START_STAGES.map((s) => s.id)).toEqual<StartStageId[]>([
      "before",
      "arrival",
      "first-72-hours",
      "first-week",
      "first-month",
      "first-semester",
    ]);
    for (const s of START_STAGES) expect(s.steps.length).toBeGreaterThan(0);
  });

  it("lists every stage's steps, in order, as START_STEPS", () => {
    expect(START_STEPS).toEqual(START_STAGES.flatMap((s) => s.steps));
    expect(START_STEPS.length).toBe(34);
  });

  it("gives every step a unique id", () => {
    const ids = START_STEPS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("links every step to a seeded guide or answer", () => {
    const valid = new Set([
      `/guides/${COMPANY_SLUG}`,
      ...SEED_GUIDES.map((g) => `/guides/${g.slug}`),
      ...SEED_FAQS.map((f) => `/ask/${f.slug}`),
    ]);
    const broken = START_STEPS.filter((s) => !valid.has(s.href)).map((s) => `${s.id}: ${s.href}`);
    expect(broken).toEqual([]);
  });

  it("orders steps by due day, within each stage and across stages", () => {
    let last = -Infinity;
    for (const stage of START_STAGES) {
      for (const step of stage.steps) {
        expect(Number.isInteger(step.by), step.id).toBe(true);
        expect(step.by, step.id).toBeGreaterThanOrEqual(last);
        last = step.by;
      }
    }
  });

  it("keeps each stage to its own days", () => {
    const byStage = Object.fromEntries(START_STAGES.map((s) => [s.id, s.steps.map((x) => x.by)]));
    expect(byStage.before.every((d) => d < 0)).toBe(true);
    expect(byStage.arrival.every((d) => d === 0)).toBe(true);
    expect(byStage["first-72-hours"].every((d) => d >= 1 && d <= 3)).toBe(true);
    expect(byStage["first-week"].every((d) => d >= 1 && d <= 7)).toBe(true);
    expect(byStage["first-month"].every((d) => d > 7 && d <= 31)).toBe(true);
    expect(byStage["first-semester"].every((d) => d > 30 && d <= 100)).toBe(true);
  });

  it("writes every stage and step in English and Arabic", () => {
    const arabic = /[؀-ۿ]/;
    for (const s of START_STAGES) {
      expect(s.en.trim()).not.toBe("");
      expect(s.blurbEn.trim()).not.toBe("");
      expect(s.ar, s.id).toMatch(arabic);
      expect(s.blurbAr, s.id).toMatch(arabic);
    }
    for (const s of START_STEPS) {
      expect(s.en.trim(), s.id).not.toBe("");
      expect(s.ar, s.id).toMatch(arabic);
      expect(s.en, s.id).not.toMatch(arabic);
    }
  });

  it("marks only students or families as a step's group", () => {
    for (const s of START_STEPS) expect([undefined, "student", "family"]).toContain(s.for);
  });

  it("has no dashes or hedging in anything a visitor reads", () => {
    const all = [...strings(START_STAGES), ...strings(START_COPY)];
    expect(all.filter((s) => DASH.test(s))).toEqual([]);
    const english = [...START_STAGES.flatMap((s) => [s.en, s.blurbEn, ...s.steps.map((x) => x.en)]), ...strings(START_COPY.en)];
    expect(english.filter((s) => /\b(may|might|reportedly|it seems|perhaps|possibly)\b/i.test(s))).toEqual([]);
  });
});

describe("first 100 days: saved plan", () => {
  const valid = new Set(START_STEPS.map((s) => s.id));

  it("starts empty with nothing saved", () => {
    expect(parseSaved(null)).toEqual({ done: [], arrival: null, who: "all" });
    expect(parseSaved(undefined)).toEqual(EMPTY_SAVED);
    expect(parseSaved("")).toEqual(EMPTY_SAVED);
  });

  it("falls back to empty on anything unreadable", () => {
    for (const raw of ["{", "null", "42", '"x"', "[]", "true"]) expect(parseSaved(raw)).toEqual(EMPTY_SAVED);
  });

  it("reads ticks, the arrival date and the group", () => {
    expect(parseSaved(JSON.stringify({ done: ["sim", "bank"], arrival: "2027-08-20", who: "family" }), valid)).toEqual({
      done: ["sim", "bank"],
      arrival: "2027-08-20",
      who: "family",
    });
  });

  it("drops unknown ticks, duplicates, bad dates and unknown groups", () => {
    const raw = JSON.stringify({ done: ["sim", "sim", "gone", 4, null], arrival: "2027-02-30", who: "everyone" });
    expect(parseSaved(raw, valid)).toEqual({ done: ["sim"], arrival: null, who: "all" });
  });

  it("keeps any tick when no list of steps is given", () => {
    expect(parseSaved(JSON.stringify({ done: ["anything"] })).done).toEqual(["anything"]);
  });

  it("toggles a tick on and off", () => {
    expect(toggleDone([], "sim")).toEqual(["sim"]);
    expect(toggleDone(["sim", "bank"], "sim")).toEqual(["bank"]);
    const before = ["sim"];
    toggleDone(before, "bank");
    expect(before).toEqual(["sim"]);
  });
});

describe("first 100 days: groups and progress", () => {
  const steps = [{ id: "a" }, { id: "b", for: "student" as const }, { id: "c", for: "family" as const }];

  it("shows everyone's steps always, and each group's only to that group", () => {
    expect(steps.filter((s) => isShown(s, "all")).map((s) => s.id)).toEqual(["a", "b", "c"]);
    expect(steps.filter((s) => isShown(s, "student")).map((s) => s.id)).toEqual(["a", "b"]);
    expect(steps.filter((s) => isShown(s, "family")).map((s) => s.id)).toEqual(["a", "c"]);
  });

  it("counts only the steps that show", () => {
    expect(progressOf(steps, [])).toEqual({ done: 0, total: 3 });
    expect(progressOf(steps, ["a", "c"])).toEqual({ done: 2, total: 3 });
    expect(progressOf(steps, ["a", "c"], "student")).toEqual({ done: 1, total: 2 });
    expect(progressOf(steps, ["c", "zzz"], "family")).toEqual({ done: 1, total: 2 });
  });

  it("counts the whole plan", () => {
    expect(progressOf(START_STEPS, [])).toEqual({ done: 0, total: START_STEPS.length });
    expect(progressOf(START_STEPS, START_STEPS.map((s) => s.id))).toEqual({ done: 34, total: 34 });
    const student = progressOf(START_STEPS, [], "student").total;
    const family = progressOf(START_STEPS, [], "family").total;
    expect(student).toBeLessThan(34);
    expect(family).toBeLessThan(34);
    for (const stage of START_STAGES) {
      expect(progressOf(stage.steps, [], "student").total, stage.id).toBeGreaterThan(0);
      expect(progressOf(stage.steps, [], "family").total, stage.id).toBeGreaterThan(0);
    }
  });
});

describe("first 100 days: dates", () => {
  it("accepts only real ISO dates", () => {
    expect(isIsoDate("2027-08-20")).toBe(true);
    expect(isIsoDate("2028-02-29")).toBe(true);
    for (const bad of ["2027-02-29", "2027-13-01", "2027-8-20", "20-08-2027", "", null, undefined, 20270820, "1899-01-01", "2027-08-20T00:00"]) {
      expect(isIsoDate(bad), String(bad)).toBe(false);
    }
  });

  it("has no due date without an arrival date", () => {
    expect(dueIso(null, 7)).toBeNull();
    expect(dueIso(undefined, 0)).toBeNull();
    expect(dueIso("", -14)).toBeNull();
    expect(dueIso("not a date", 3)).toBeNull();
    expect(dueLabel(null, 7, "en")).toBeNull();
    expect(dueLabel(null, 7, "ar")).toBeNull();
  });

  it("counts days from arrival day, before and after, across months and years", () => {
    expect(dueIso("2027-08-20", 0)).toBe("2027-08-20");
    expect(dueIso("2027-08-20", 3)).toBe("2027-08-23");
    expect(dueIso("2027-08-20", -14)).toBe("2027-08-06");
    expect(dueIso("2027-08-20", 14)).toBe("2027-09-03");
    expect(dueIso("2027-12-25", 100)).toBe("2028-04-03");
    expect(dueIso("2028-03-01", -1)).toBe("2028-02-29");
  });

  it("writes the due date in both calendars", () => {
    const en = dueLabel("2027-08-20", 7, "en");
    expect(en?.iso).toBe("2027-08-27");
    expect(en?.text).toContain("Do by 27 August 2027");
    const h = hijriOf("2027-08-27");
    expect(en?.text).toContain(`${h.day}/${h.month}/${h.year} AH`);

    const ar = dueLabel("2027-08-20", 7, "ar");
    expect(ar?.iso).toBe("2027-08-27");
    expect(ar?.text).toMatch(/^أنجزها بحلول /);
    expect(ar?.text).toContain("هـ");
    expect(ar?.text).not.toMatch(/\d/);
  });

  it("labels each step's day when no date is entered", () => {
    expect(dayLabel(-14, "en")).toBe("2 weeks before you fly");
    expect(dayLabel(-7, "en")).toBe("1 week before you fly");
    expect(dayLabel(-3, "en")).toBe("3 days before you fly");
    expect(dayLabel(-1, "en")).toBe("1 day before you fly");
    expect(dayLabel(0, "en")).toBe("Arrival day");
    expect(dayLabel(7, "en")).toBe("By day 7");

    expect(dayLabel(-14, "ar")).toBe("قبل السفر بأسبوعين");
    expect(dayLabel(-7, "ar")).toBe("قبل السفر بأسبوع");
    expect(dayLabel(-3, "ar")).toBe("قبل السفر بـ٣ أيام");
    expect(dayLabel(-2, "ar")).toBe("قبل السفر بيومين");
    expect(dayLabel(0, "ar")).toBe("يوم الوصول");
    expect(dayLabel(21, "ar")).toBe("بحلول اليوم ٢١");
  });

  it("labels every step in the plan without dashes", () => {
    for (const s of START_STEPS) {
      for (const locale of ["en", "ar"] as const) {
        const label = dayLabel(s.by, locale);
        expect(label, s.id).not.toBe("");
        expect(label, s.id).not.toMatch(DASH);
        expect(dueLabel("2027-08-20", s.by, locale)?.text, s.id).not.toMatch(DASH);
      }
    }
  });
});

describe("first 100 days: saved on the phone", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  const store = () => import("@/features/start/store");

  it("renders the empty plan on the server, whatever is saved", async () => {
    vi.stubGlobal("localStorage", { getItem: () => JSON.stringify({ done: ["sim"], arrival: "2027-08-20", who: "family" }), setItem: () => {} });
    const s = await store();
    expect(s.readStartOnServer()).toEqual(EMPTY_SAVED);
    expect(s.readStart()).toEqual({ done: ["sim"], arrival: "2027-08-20", who: "family" });
  });

  it("saves each change under its own key", async () => {
    const saved: Record<string, string> = {};
    vi.stubGlobal("localStorage", { getItem: (k: string) => saved[k] ?? null, setItem: (k: string, v: string) => { saved[k] = v; } });
    const s = await store();
    s.updateStart((p) => ({ ...p, done: toggleDone(p.done, "sim"), arrival: "2027-08-20" }));
    expect(JSON.parse(saved[START_STORAGE_KEY])).toEqual({ done: ["sim"], arrival: "2027-08-20", who: "all" });
  });

  it("still works for the visit when storage is blocked", async () => {
    const blocked = () => {
      throw new Error("blocked");
    };
    vi.stubGlobal("localStorage", { getItem: blocked, setItem: blocked });
    const s = await store();
    expect(s.readStart()).toEqual(EMPTY_SAVED);
    s.updateStart((p) => ({ ...p, done: toggleDone(p.done, "sim") }));
    s.updateStart((p) => ({ ...p, arrival: "2027-08-20" }));
    expect(s.readStart()).toEqual({ done: ["sim"], arrival: "2027-08-20", who: "all" });
  });

  it("still works with no storage at all", async () => {
    const s = await store();
    s.updateStart((p) => ({ ...p, who: "student" }));
    expect(s.readStart().who).toBe("student");
  });
});

describe("first 100 days: the page as the server renders it", () => {
  const render = async (locale: "en" | "ar") => {
    const { StartPage } = await import("@/features/start/StartPage");
    return renderToString(createElement(StartPage, { locale }));
  };

  it("renders every step with an unticked button, in English and Arabic", async () => {
    for (const locale of ["en", "ar"] as const) {
      const html = await render(locale);
      expect(html.match(/aria-pressed="false"/g)?.length, locale).toBe(START_STEPS.length + 2);
      expect(html.match(/aria-pressed="true"/g)?.length, locale).toBe(1);
      for (const s of START_STEPS) expect(html, s.id).toContain(`href="${locale === "ar" ? "/ar" : ""}${s.href}"`);
    }
  });

  it("links the Arabic page to Arabic pages and no date is shown before one is entered", async () => {
    const ar = await render("ar");
    expect(ar).toContain('href="/ar/assistant"');
    const en = await render("en");
    for (const html of [en, ar]) {
      expect(html).not.toMatch(DASH);
      expect(html).not.toContain("Do by");
      expect(html).not.toContain("أنجزها بحلول");
      expect(html).toContain(`href="https://wa.me/12345679076"`);
      expect(html).toContain("+1 234 567 9076");
    }
    expect(en).toContain("message Admin on WhatsApp at ");
  });
});
