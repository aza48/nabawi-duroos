import { readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SEED_GUIDES } from "@/server/seed/content/sync";
import { RETIRED_GUIDES } from "@/server/content/queries";
import { START_STAGES } from "@/content/start";
import {
  EMPTY_WHO,
  WHO_GENDERS,
  WHO_HOUSEHOLDS,
  WHO_PLACES,
  WHO_RULES,
  WHO_SAVED_NOTE,
  WHO_STAGES,
  WHO_STORAGE_KEY,
  hasAnswers,
  isDone,
  orderGuides,
  parseWho,
  scoreGuide,
  serialiseWho,
  startLinkFor,
  startViewChange,
  summariseWho,
  type WhoProfile,
} from "@/features/home/who";
import { WhoChooser } from "@/features/home/WhoChooser";
import { HOME_CARD_CLASS, HOME_TITLE_CLAMP, HomeGuides, type HomeGuide } from "@/features/home/HomeGuides";

const DASH = /[‒–—―−]/;

const who = (p: Partial<WhoProfile>): WhoProfile => ({ ...EMPTY_WHO, ...p });

/** Every full profile: two genders, two households, five places. */
const ALL_PROFILES: WhoProfile[] = WHO_GENDERS.flatMap((gender) =>
  WHO_HOUSEHOLDS.flatMap((household) => WHO_PLACES.map((place) => who({ gender, household, place }))),
);

const slugsFor = (p: Partial<WhoProfile>) => orderGuides(GUIDES, who(p)).map((g) => g.slug);

/** The guides as the home page gets them: every live seed guide, in seed order. */
const GUIDES: HomeGuide[] = SEED_GUIDES.filter((g) => !RETIRED_GUIDES.includes(g.slug)).map((g) => ({
  slug: g.slug,
  title: g.title,
  stage: g.stage,
  readingMinutes: 5,
}));

describe("who are you: saved answers", () => {
  it("round trips a full profile", () => {
    const p = who({ gender: "sister", household: "family", place: "kulliyah" });
    expect(parseWho(serialiseWho(p))).toEqual(p);
  });

  it("keeps a skip, with or without answers", () => {
    expect(parseWho(serialiseWho(who({ skipped: true })))).toEqual(who({ skipped: true }));
    expect(parseWho(serialiseWho(who({ gender: "brother", skipped: true })))).toEqual(who({ gender: "brother", skipped: true }));
  });

  it("asks again when nothing usable is saved", () => {
    for (const raw of [null, undefined, "", "not json", "[]", "null", "7", '"x"', "{}"]) expect(parseWho(raw)).toBeNull();
    // Another version of the format.
    expect(parseWho(JSON.stringify({ v: 2, gender: "sister", household: "single", place: "mahad", skipped: false }))).toBeNull();
    // Half answered and not skipped (the reader left mid way).
    expect(parseWho(JSON.stringify({ v: 1, gender: "sister", household: null, place: null, skipped: false }))).toBeNull();
  });

  it("drops answers it does not know", () => {
    const p = parseWho(JSON.stringify({ v: 1, gender: "aunt", household: "family", place: "moon", skipped: true }));
    expect(p).toEqual(who({ household: "family", skipped: true }));
  });

  it("uses a versioned key", () => {
    expect(WHO_STORAGE_KEY).toBe("mesh-who-v1");
  });

  it("knows when it is answered and when it is done", () => {
    expect(hasAnswers(null)).toBe(false);
    expect(hasAnswers(who({ skipped: true }))).toBe(false);
    expect(hasAnswers(who({ place: "visitor" }))).toBe(true);
    expect(isDone(who({ gender: "brother" }))).toBe(false);
    expect(isDone(who({ skipped: true }))).toBe(true);
    expect(isDone(who({ gender: "brother", household: "single", place: "mahad" }))).toBe(true);
  });

  it("sums up the answers in plain words", () => {
    expect(summariseWho(who({ gender: "sister", household: "family", place: "kulliyah" }))).toBe("Sister, with family, Kulliyah");
    expect(summariseWho(who({ household: "single", place: "postgrad" }))).toBe("Single, Postgraduate");
    expect(summariseWho(who({ skipped: true }))).toBeNull();
    expect(summariseWho(null)).toBeNull();
  });
});

describe("who are you: which guides come first", () => {
  it("names only guides that are live in the seed", () => {
    const live = new Set(GUIDES.map((g) => g.slug));
    const missing = WHO_RULES.flatMap((r) => r.slugs).filter((s) => !live.has(s));
    expect(missing).toEqual([]);
  });

  it("has no guide twice in one rule", () => {
    for (const r of WHO_RULES) expect(new Set(r.slugs).size).toBe(r.slugs.length);
  });

  it("keeps today's eight exactly when nothing is answered", () => {
    const today = GUIDES.slice(0, 8);
    expect(orderGuides(GUIDES, undefined)).toEqual(today);
    expect(orderGuides(GUIDES, null)).toEqual(today);
    expect(orderGuides(GUIDES, who({ skipped: true }))).toEqual(today);
  });

  it("always shows the same number of cards, with none twice", () => {
    for (const place of WHO_PLACES) {
      for (const household of ["single", "family"] as const) {
        for (const gender of ["brother", "sister"] as const) {
          const shown = orderGuides(GUIDES, who({ gender, household, place }));
          expect(shown).toHaveLength(8);
          expect(new Set(shown.map((g) => g.slug)).size).toBe(8);
        }
      }
    }
    expect(orderGuides(GUIDES.slice(0, 3), who({ place: "mahad" }))).toHaveLength(3);
  });

  it("puts the right guide first for each place", () => {
    const first = (p: Partial<WhoProfile>) => orderGuides(GUIDES, who(p))[0].slug;
    expect(first({ place: "applicant" })).toBe("applying-to-the-islamic-university");
    expect(first({ place: "mahad" })).toBe("new-student-steps");
    expect(first({ place: "kulliyah" })).toBe("registering-your-courses");
    expect(first({ place: "postgrad" })).toBe("postgraduate-admission-1448");
    expect(first({ place: "visitor" })).toBe("masjid-an-nabawi-first-visit");
  });

  it("mixes the answers: a sister with family at the Ma'had sees all three", () => {
    const shown = orderGuides(GUIDES, who({ gender: "sister", household: "family", place: "mahad" })).map((g) => g.slug);
    expect(shown).toContain("graduating-from-mahad");
    expect(shown).toContain("visas-for-family-and-visitors");
    expect(shown).toContain("women-at-masjid-an-nabawi");
    expect(shown).toContain("sisters-studying-in-madinah");
  });

  it("brings the sisters' guides forward for sisters only", () => {
    const sister = slugsFor({ gender: "sister" });
    expect(sister.slice(0, 2).sort()).toEqual(["sisters-studying-in-madinah", "women-at-masjid-an-nabawi"]);
    expect(scoreGuide({ slug: "sisters-studying-in-madinah", stage: "family" }, who({ gender: "brother" }))).toBe(0);
  });

  it("starts a sister who is applying with where sisters study, not the University's campus", () => {
    const shown = slugsFor({ gender: "sister", household: "single", place: "applicant" });
    expect(shown[0]).toBe("sisters-studying-in-madinah");
    expect(shown).not.toContain("applying-to-the-islamic-university");
    expect(shown.indexOf("what-to-bring-to-madinah")).toBeLessThan(shown.indexOf("women-at-masjid-an-nabawi"));
  });

  it("shows a single sister at the Kulliyah the sisters' guide, not the brothers' halls", () => {
    for (const place of ["kulliyah", "mahad"] as const) {
      const shown = slugsFor({ gender: "sister", household: "single", place });
      expect(shown[0], place).toBe("sisters-studying-in-madinah");
      for (const s of ["university-housing-and-student-services", "campus-life-islamic-university", "registering-your-courses", "applying-to-the-islamic-university"]) {
        expect(shown, `${place} ${s}`).not.toContain(s);
      }
    }
  });

  it("keeps the University halls for single brothers only", () => {
    expect(slugsFor({ gender: "brother", household: "single", place: "mahad" })).toContain("university-housing-and-student-services");
    expect(scoreGuide({ slug: "university-housing-and-student-services", stage: "study" }, who({ gender: "brother", household: "family", place: "mahad" }))).toBeLessThan(1);
  });

  it("gives visitors no guides for people who live here", () => {
    const visitors = ALL_PROFILES.filter((p) => p.place === "visitor");
    expect(visitors).toHaveLength(4);
    for (const p of visitors) {
      const shown = orderGuides(GUIDES, p).map((g) => g.slug);
      for (const s of ["finding-an-apartment", "kindergartens-and-schools", "having-a-baby-in-madinah", "sisters-studying-in-madinah"]) {
        expect(shown, `${summariseWho(p)}: ${s}`).not.toContain(s);
      }
    }
    expect(slugsFor({ household: "family", place: "visitor" })).toContain("visas-for-family-and-visitors");
    expect(slugsFor({ gender: "sister", household: "single", place: "visitor" })).toContain("women-at-masjid-an-nabawi");
  });

  it("gives Kulliyah and postgraduate newcomers the first steps", () => {
    for (const place of ["kulliyah", "postgrad"] as const) expect(slugsFor({ gender: "brother", household: "single", place }), place).toContain("new-student-steps");
    expect(slugsFor({ gender: "brother", household: "single", place: "kulliyah" })).toContain("sim-internet-bank");
    expect(WHO_RULES.flatMap((r) => r.slugs)).not.toContain("university-email-and-microsoft-365");
  });

  it("brings the family guides forward for a family", () => {
    const shown = orderGuides(GUIDES, who({ household: "family" })).map((g) => g.slug);
    for (const s of ["visas-for-family-and-visitors", "kindergartens-and-schools", "having-a-baby-in-madinah", "family-records-on-absher"]) expect(shown).toContain(s);
  });

  it("lifts a guide by its stage when no rule names it", () => {
    expect(scoreGuide({ slug: "some-new-family-guide", stage: "family" }, who({ household: "family" }))).toBeGreaterThan(0);
    expect(scoreGuide({ slug: "some-new-family-guide", stage: "family" }, who({ household: "single" }))).toBe(0);
    expect(scoreGuide({ slug: "some-new-study-guide", stage: "study" }, who({ place: "kulliyah" }))).toBeGreaterThan(0);
  });

  it("ignores rule guides that are not in the list", () => {
    const few: HomeGuide[] = [
      { slug: "a", title: "A", stage: "getting-settled", readingMinutes: 1 },
      { slug: "b", title: "B", stage: "getting-settled", readingMinutes: 1 },
    ];
    expect(orderGuides(few, who({ place: "visitor" })).map((g) => g.slug)).toEqual(["a", "b"]);
  });
});

describe("who are you: the link into the first 100 days", () => {
  it("points each place at a real stage", () => {
    const ids = new Set(START_STAGES.map((s) => s.id));
    for (const place of WHO_PLACES) {
      const href = startLinkFor(who({ place })).href;
      expect(href).toMatch(/^\/start#/);
      expect(ids.has(href.slice("/start#".length) as never)).toBe(true);
    }
    expect(startLinkFor(who({ place: "applicant" })).href).toBe("/start#before");
    expect(startLinkFor(who({ place: "mahad" })).href).toBe("/start#arrival");
    expect(startLinkFor(who({ place: "kulliyah" })).href).toBe("/start#arrival");
    expect(startLinkFor(who({ place: "postgrad" })).href).toBe("/start#arrival");
  });

  it("keeps its copy of the stage titles the same as the plan", () => {
    for (const [id, st] of Object.entries(WHO_STAGES)) {
      const real = START_STAGES.find((s) => s.id === id);
      expect(real, id).toBeDefined();
      expect({ en: real!.en, ar: real!.ar, blurbEn: real!.blurbEn, blurbAr: real!.blurbAr }).toEqual(st);
    }
  });

  it("does not load the whole plan into the home page", () => {
    const src = (f: string) => readFileSync(path.join(process.cwd(), f), "utf8");
    expect(src("src/features/home/who.ts")).not.toMatch(/^import \{[^}]*\} from "@\/content\/start"/m);
    expect(src("src/features/home/WhoChooser.tsx")).not.toMatch(/^import [^;]*from "@\/features\/start\/store"/m);
  });

  it("links to the whole plan with no place", () => {
    expect(startLinkFor(null).href).toBe("/start");
    expect(startLinkFor(who({ skipped: true })).href).toBe("/start");
    expect(startLinkFor(who({ household: "family", skipped: true })).eyebrow).toBe("Your family's next steps");
  });

  it("speaks to a visiting family as a family, and to a student as a student", () => {
    expect(startLinkFor(who({ household: "family", place: "visitor" })).eyebrow).toBe("Your family's next steps");
    for (const place of ["applicant", "mahad", "kulliyah", "postgrad"] as const) {
      expect(startLinkFor(who({ household: "family", place })).eyebrow, place).toBe("Your next steps");
    }
  });
});

describe("who are you: the view on /start", () => {
  const family = (place: WhoProfile["place"]) => who({ gender: "brother", household: "family", place });
  const single = (place: WhoProfile["place"]) => who({ gender: "brother", household: "single", place });
  const cleared = who({ skipped: true });

  it("switches to Families only for a visiting family", () => {
    expect(startViewChange(null, family("visitor"))).toBe("family");
    for (const place of ["applicant", "mahad", "kulliyah", "postgrad"] as const) expect(startViewChange(null, family(place)), place).toBeNull();
  });

  it("goes back to Everyone on Single or Clear", () => {
    expect(startViewChange(family("visitor"), single("visitor"))).toBe("all");
    expect(startViewChange(family("visitor"), cleared)).toBe("all");
    expect(startViewChange(family("kulliyah"), single("kulliyah"))).toBe("all");
    expect(startViewChange(family("kulliyah"), cleared)).toBe("all");
    expect(startViewChange(family("visitor"), family("kulliyah"))).toBe("all");
  });

  it("leaves the view alone otherwise", () => {
    expect(startViewChange(null, single("mahad"))).toBeNull();
    expect(startViewChange(single("mahad"), cleared)).toBeNull();
    expect(startViewChange(family("mahad"), family("kulliyah"))).toBeNull();
  });

  it("never overrides a view picked on /start, and undoes only Families", async () => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) });
    vi.stubGlobal("window", { addEventListener() {}, removeEventListener() {} });
    vi.resetModules();
    const { updateStart, readStart } = await import("@/features/start/store");
    const apply = (view: "family" | "all") =>
      updateStart((s) => (view === "family" ? (s.who === "all" ? { ...s, who: "family" } : s) : s.who === "family" ? { ...s, who: "all" } : s));
    updateStart((s) => ({ ...s, who: "student" }));
    apply("family");
    expect(readStart().who).toBe("student");
    apply("all");
    expect(readStart().who).toBe("student");
    updateStart((s) => ({ ...s, who: "all" }));
    apply("family");
    expect(readStart().who).toBe("family");
    apply("all");
    expect(readStart().who).toBe("all");
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("uses the same rule in the chooser", () => {
    const src = readFileSync(path.join(process.cwd(), "src/features/home/WhoChooser.tsx"), "utf8");
    expect(src).toContain("startViewChange(profile, p)");
    expect(src).toContain('view === "family" ? (s.who === "all" ? { ...s, who: "family" } : s) : s.who === "family" ? { ...s, who: "all" } : s');
  });
});

describe("who are you: on the page", () => {
  it("renders the folded view on the server, before anything loads", () => {
    const html = renderToString(createElement(WhoChooser));
    expect(html).toContain('data-who="folded"');
    expect(html).toContain("Guides for everyone");
    expect(html).toContain('href="/start"');
  });

  it("asks the first question, one button per answer", () => {
    const html = renderToString(createElement(WhoChooser, { initial: null }));
    expect(html).toContain('data-who="asking"');
    expect(html).toContain("Are you a brother or a sister?");
    expect(html).toContain("1 of 3");
    expect(html.match(/aria-pressed="false"/g)).toHaveLength(2);
    expect(html).toContain(">Skip<");
    expect(html).toContain('role="group"');
  });

  it("puts Skip after the answers in the page order", () => {
    const html = renderToString(createElement(WhoChooser, { initial: null }));
    expect(html.indexOf(">Skip<")).toBeGreaterThan(html.indexOf('role="group"'));
    expect(html.indexOf(">Skip<")).toBeGreaterThan(html.lastIndexOf("aria-pressed"));
  });

  it("says the answers stay on this device, in English and Arabic", () => {
    expect(WHO_SAVED_NOTE.en).toBe("Saved on this device only.");
    expect(WHO_SAVED_NOTE.ar).toMatch(/[\u0600-\u06FF]/);
    const html = renderToString(createElement(WhoChooser, { initial: who({ gender: "brother", household: "single", place: "mahad" }) }));
    expect(html).toContain("Saved on this device only.");
    expect(html).not.toMatch(/this phone/);
    const src = readFileSync(path.join(process.cwd(), "src/features/home/WhoChooser.tsx"), "utf8");
    expect(src).not.toMatch(/on this phone only/);
  });

  it("shows the place hints at every width", () => {
    const src = readFileSync(path.join(process.cwd(), "src/features/home/WhoChooser.tsx"), "utf8");
    expect(src).not.toContain("sr-only lg:not-sr-only");
    expect(src).toContain('"What brings you to Madinah?"');
  });

  it("folds to a For you line once answered", () => {
    const html = renderToString(createElement(WhoChooser, { initial: who({ gender: "sister", household: "family", place: "applicant" }) }));
    expect(html).toContain('data-who="folded"');
    expect(html).toContain("For you");
    expect(html).toContain("Sister, with family, Applying");
    expect(html).toContain(">Change<");
    expect(html).toContain('href="/start#before"');
  });

  it("renders today's eight cards on the server, and the profile's after it loads", () => {
    const server = renderToString(createElement(HomeGuides, { guides: GUIDES }));
    const hrefs = (html: string) => [...html.matchAll(/href="\/guides\/([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs(server)).toEqual(GUIDES.slice(0, 8).map((g) => g.slug));
    const visitor = renderToString(createElement(HomeGuides, { guides: GUIDES, profile: who({ place: "visitor" }) }));
    expect(hrefs(visitor)).toHaveLength(8);
    expect(hrefs(visitor)[0]).toBe("masjid-an-nabawi-first-visit");
  });

  it("gives every card the same fixed height and clamps the title, with or without answers", () => {
    const cards = (html: string) => [...html.matchAll(/<a [^>]*href="\/guides\/[^"]+"[^>]*>[\s\S]*?<\/a>/g)].map((m) => m[0]);
    for (const profile of [null, ...ALL_PROFILES]) {
      const html = renderToString(createElement(HomeGuides, { guides: GUIDES, profile }));
      const list = cards(html);
      expect(list).toHaveLength(8);
      for (const c of list) {
        expect(c).toContain(HOME_CARD_CLASS);
        expect(c).not.toMatch(/min-h-/);
        expect(c).toContain(HOME_TITLE_CLAMP);
      }
    }
    expect(HOME_CARD_CLASS).toMatch(/^h-\S+( (md|lg|xl):h-\S+)+$/);
  });

  it("does not pass client values through the server home page", () => {
    const src = readFileSync(path.join(process.cwd(), "src/features/home/HomePage.tsx"), "utf8");
    expect(src).not.toMatch(/STAGE_ICON/);
    expect(src).not.toMatch(/^export \{/m);
  });

  it("has no dashes in its copy", () => {
    for (const f of ["src/features/home/who.ts", "src/features/home/WhoChooser.tsx", "src/features/home/HomeGuides.tsx"]) {
      const src = readFileSync(path.join(process.cwd(), f), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
      expect(DASH.test(src), f).toBe(false);
    }
  });
});

describe("who are you: the phone's storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("saves to the versioned key", async () => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) });
    const { saveWho } = await import("@/features/home/whoStore");
    const p = who({ gender: "brother", household: "single", place: "mahad" });
    saveWho(p);
    expect(parseWho(store.get(WHO_STORAGE_KEY))).toEqual(p);
  });

  it("keeps working when storage is blocked", async () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    });
    const { saveWho } = await import("@/features/home/whoStore");
    expect(() => saveWho(who({ skipped: true }))).not.toThrow();
  });
});
