import type { StartStageId } from "@/content/start";

/**
 * "Who are you?" on the home page: three one-tap questions whose answers are saved on this device
 * and put the guides that fit the reader first. Pure data and functions only, so the server, the
 * client and the tests all share them. The browser side lives in WhoChooser.tsx.
 *
 * Only a type comes from src/content/start.ts, so the home page does not ship the whole first
 * 100 days plan to the phone for the two stage titles it links to (see WHO_STAGES).
 */

export type WhoGender = "brother" | "sister";
export type WhoHousehold = "single" | "family";
export type WhoPlace = "applicant" | "mahad" | "kulliyah" | "postgrad" | "visitor";

export type WhoProfile = {
  gender: WhoGender | null;
  household: WhoHousehold | null;
  place: WhoPlace | null;
  /** True when the reader chose Skip: the questions are not asked again. */
  skipped: boolean;
};

export const WHO_STORAGE_KEY = "mesh-who-v1";
const VERSION = 1;

export const EMPTY_WHO: WhoProfile = Object.freeze({ gender: null, household: null, place: null, skipped: false }) as WhoProfile;

export const WHO_GENDERS: readonly WhoGender[] = ["brother", "sister"];
export const WHO_HOUSEHOLDS: readonly WhoHousehold[] = ["single", "family"];
export const WHO_PLACES: readonly WhoPlace[] = ["applicant", "mahad", "kulliyah", "postgrad", "visitor"];

const pick = <T extends string>(v: unknown, allowed: readonly T[]): T | null => (allowed.includes(v as T) ? (v as T) : null);

/**
 * Reads what was saved on the phone. Returns null when nothing usable is saved (never asked,
 * an older or newer format, or anything unreadable), so the questions show again.
 */
export function parseWho(raw: string | null | undefined): WhoProfile | null {
  if (!raw) return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const o = v as Record<string, unknown>;
  if (o.v !== VERSION) return null;
  const p: WhoProfile = {
    gender: pick(o.gender, WHO_GENDERS),
    household: pick(o.household, WHO_HOUSEHOLDS),
    place: pick(o.place, WHO_PLACES),
    skipped: o.skipped === true,
  };
  // A record with no answers that was not skipped says nothing: ask again.
  return isDone(p) ? p : null;
}

export function serialiseWho(p: WhoProfile): string {
  return JSON.stringify({ v: VERSION, gender: p.gender, household: p.household, place: p.place, skipped: p.skipped });
}

/** At least one question answered. */
export function hasAnswers(p: WhoProfile | null | undefined): p is WhoProfile {
  return !!p && (p.gender !== null || p.household !== null || p.place !== null);
}

/** Every question answered, or skipped: the chooser stays folded away. */
export function isDone(p: WhoProfile | null | undefined): boolean {
  return !!p && (p.skipped || (p.gender !== null && p.household !== null && p.place !== null));
}

// Words shown on the buttons and in the "For you" line.
export const GENDER_LABEL: Record<WhoGender, string> = { brother: "Brother", sister: "Sister" };
export const HOUSEHOLD_LABEL: Record<WhoHousehold, string> = { single: "Single", family: "With family" };
export const PLACE_LABEL: Record<WhoPlace, { label: string; hint: string }> = {
  applicant: { label: "Applying", hint: "Not in Madinah yet" },
  mahad: { label: "Ma'had", hint: "The Arabic institute" },
  kulliyah: { label: "Kulliyah", hint: "A bachelor's degree" },
  postgrad: { label: "Postgraduate", hint: "Master's or PhD" },
  visitor: { label: "Visiting", hint: "Here on a visit, not studying" },
};

/** The line under the chooser that says where the answers are kept, in both languages. */
export const WHO_SAVED_NOTE = { en: "Saved on this device only.", ar: "محفوظة على هذا الجهاز فقط." } as const;

/** "Sister, with family, Kulliyah", or null when nothing was answered. */
export function summariseWho(p: WhoProfile | null | undefined): string | null {
  if (!hasAnswers(p)) return null;
  const parts = [
    p.gender && GENDER_LABEL[p.gender],
    p.household && (p.household === "family" ? "with family" : "single"),
    p.place && PLACE_LABEL[p.place].label,
  ].filter((x): x is string => !!x);
  const s = parts.join(", ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Which guides fit which answer, most useful first. A rule applies when every answer it names
 * matches (a null in `when` means "not answered") and the answers in `unless` do not all match.
 * Each guide's score is the sum, over the rules that apply, of weight / (position + 1), so the
 * first guides of each rule come before the later ones of any rule and the answers mix. A `flat`
 * rule gives every guide it lists the full weight; with a negative weight it pushes them back.
 */
type WhoMatch = Partial<Pick<WhoProfile, "gender" | "household" | "place">>;

export type WhoRule = {
  when: WhoMatch;
  unless?: WhoMatch;
  weight: number;
  flat?: boolean;
  slugs: string[];
};

/** Guides about the Islamic University's own campus, which admits brothers. */
const UNIVERSITY_CAMPUS_GUIDES = [
  "campus-life-islamic-university",
  "university-housing-and-student-services",
  "registering-your-courses",
  "applying-to-the-islamic-university",
];

export const WHO_RULES: WhoRule[] = [
  // Where you are says the most, so it weighs the most.
  {
    when: { place: "applicant" },
    weight: 3,
    slugs: ["applying-to-the-islamic-university", "what-to-bring-to-madinah", "new-student-steps", "living-on-a-visitor-id", "first-30-days-in-madinah", "cost-of-living", "sim-internet-bank"],
  },
  {
    when: { place: "mahad" },
    weight: 3,
    slugs: ["new-student-steps", "campus-life-islamic-university", "graduating-from-mahad", "living-on-a-visitor-id", "scholarship-stipend-and-allowances", "your-first-semester-week-by-week", "university-to-the-haram", "exams-results-and-attendance"],
  },
  {
    when: { place: "kulliyah" },
    weight: 3,
    slugs: ["registering-your-courses", "new-student-steps", "what-you-study-by-level", "exams-results-and-attendance", "university-student-system", "sim-internet-bank", "gpa-warnings-and-dismissal", "scholarship-stipend-and-allowances", "campus-life-islamic-university", "tajeel-and-itithaar"],
  },
  {
    when: { place: "postgrad" },
    weight: 3,
    slugs: ["postgraduate-admission-1448", "new-student-steps", "university-student-system", "registering-your-courses", "scholarship-stipend-and-allowances", "living-on-a-visitor-id", "finding-an-apartment", "university-offices-and-contacts"],
  },
  {
    when: { place: "visitor" },
    weight: 3,
    slugs: ["masjid-an-nabawi-first-visit", "umrah-rawdah-quba", "getting-around", "historic-sites-and-masjids", "haramain-train-and-city-buses", "day-trips-from-madinah", "dates-of-madinah", "sim-internet-bank"],
  },
  // Family life, for families who live here. A visiting family gets only the visa guide below.
  {
    when: { household: "family" },
    unless: { place: "visitor" },
    weight: 2,
    slugs: ["visas-for-family-and-visitors", "finding-an-apartment", "kindergartens-and-schools", "family-records-on-absher", "having-a-baby-in-madinah", "kids-activities", "bringing-parents-to-visit"],
  },
  // A visiting family needs the visa guide above all.
  { when: { household: "family", place: "visitor" }, weight: 2, slugs: ["visas-for-family-and-visitors", "women-at-masjid-an-nabawi"] },
  // Single brothers living in the University halls.
  { when: { gender: "brother", household: "single", place: "mahad" }, weight: 1, slugs: ["university-housing-and-student-services"] },
  { when: { gender: "brother", household: "single", place: "kulliyah" }, weight: 1, slugs: ["university-housing-and-student-services"] },
  // Sisters: the guide to the masjid for every sister, and most of all for a visit.
  { when: { gender: "sister" }, weight: 1, slugs: ["women-at-masjid-an-nabawi"] },
  { when: { gender: "sister", place: "visitor" }, weight: 2, slugs: ["women-at-masjid-an-nabawi"] },
  // Sisters who study (or mean to) start with where sisters study, not the brothers' campus.
  { when: { gender: "sister", place: "applicant" }, weight: 4, slugs: ["sisters-studying-in-madinah"] },
  { when: { gender: "sister", place: "mahad" }, weight: 4, slugs: ["sisters-studying-in-madinah"] },
  { when: { gender: "sister", place: "kulliyah" }, weight: 4, slugs: ["sisters-studying-in-madinah"] },
  { when: { gender: "sister", place: "postgrad" }, weight: 2, slugs: ["sisters-studying-in-madinah"] },
  { when: { gender: "sister", place: null }, weight: 2, slugs: ["sisters-studying-in-madinah"] },
  { when: { gender: "sister" }, weight: -10, flat: true, slugs: UNIVERSITY_CAMPUS_GUIDES },
];

/** A small lift for guides whose stage fits, so they come before the rest when no rule names them. */
const STAGE_BONUS = 0.05;

export type WhoGuide = { slug: string; stage: string };

function matches(m: WhoMatch, p: WhoProfile): boolean {
  return (Object.keys(m) as (keyof WhoMatch)[]).every((k) => m[k] === p[k]);
}

function ruleApplies(rule: WhoRule, p: WhoProfile): boolean {
  return matches(rule.when, p) && !(rule.unless && matches(rule.unless, p));
}

function stagesFor(p: WhoProfile): Set<string> {
  const s = new Set<string>();
  if (p.household === "family" && p.place !== "visitor") s.add("family");
  if (p.place === "applicant") s.add("getting-started");
  if (p.place === "mahad" || p.place === "kulliyah" || p.place === "postgrad") s.add("study");
  return s;
}

/** How well a guide fits the profile; 0 when nothing points to it, below 0 when it does not fit. */
export function scoreGuide(g: WhoGuide, p: WhoProfile | null | undefined): number {
  if (!hasAnswers(p)) return 0;
  let score = 0;
  for (const rule of WHO_RULES) {
    if (!ruleApplies(rule, p)) continue;
    const i = rule.slugs.indexOf(g.slug);
    if (i >= 0) score += rule.flat ? rule.weight : rule.weight / (i + 1);
  }
  if (stagesFor(p).has(g.stage)) score += STAGE_BONUS;
  return score;
}

/**
 * The guides to show, best fit first, keeping the given order for ties. With no answers the list
 * is returned exactly as given, so a reader who never answered sees what the server rendered.
 * Slugs in the rules that are not in the list are simply ignored.
 */
export function orderGuides<G extends WhoGuide>(guides: readonly G[], p: WhoProfile | null | undefined, count = 8): G[] {
  if (!hasAnswers(p)) return guides.slice(0, count);
  return guides
    .map((g, i) => ({ g, i, s: scoreGuide(g, p) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, count)
    .map((x) => x.g);
}

/** Where on the first 100 days page each answer starts. Students from abroad start at arrival. */
const PLACE_STAGE: Record<WhoPlace, WhoStageId> = {
  applicant: "before",
  mahad: "arrival",
  kulliyah: "arrival",
  postgrad: "arrival",
  visitor: "arrival",
};

type WhoStageId = Extract<StartStageId, "before" | "arrival">;

/**
 * The titles of the /start stages the chooser links to, in both languages. A copy of the two
 * entries in START_STAGES (a test keeps them the same), so the home page stays light.
 */
export const WHO_STAGES: Record<WhoStageId, { en: string; ar: string; blurbEn: string; blurbAr: string }> = {
  before: {
    en: "Before you fly",
    ar: "قبل السفر",
    blurbEn: "Paperwork is far easier at home than from Madinah.",
    blurbAr: "إنجاز الأوراق في بلدك أسهل بكثير منه في المدينة.",
  },
  arrival: {
    en: "Arrival day",
    ar: "يوم الوصول",
    blurbEn: "Three things that make the first night easy.",
    blurbAr: "ثلاثة أمور تجعل الليلة الأولى سهلة.",
  },
};

/** A student, or someone applying to study. */
export const isStudent = (p: WhoProfile | null | undefined): boolean => !!p?.place && p.place !== "visitor";

export type WhoStartLink = { href: string; eyebrow: string; title: string; body: string };

/** The one link to the right part of /start for this profile. */
export function startLinkFor(p: WhoProfile | null | undefined): WhoStartLink {
  const stageId = p?.place ? PLACE_STAGE[p.place] : null;
  // "Your family's" only when nobody in the family is a student; a student's steps are their own.
  const family = p?.household === "family" && !isStudent(p);
  if (!stageId) {
    return {
      href: "/start",
      eyebrow: family ? "Your family's next steps" : "New to Madinah?",
      title: "Your first 100 days",
      body: "Every step in order, from before you fly.",
    };
  }
  const stage = WHO_STAGES[stageId];
  return {
    href: `/start#${stageId}`,
    eyebrow: family ? "Your family's next steps" : "Your next steps",
    title: stage.en,
    body: stage.blurbEn,
  };
}

/**
 * What the chooser does to the view on /start (Everyone, Students or Families) when answers are
 * saved. Only a visiting family is switched to Families, and only from Everyone, so a view the
 * reader picked on /start is kept. Students with family stay on Everyone, because Families hides
 * the student steps. When the answers no longer call for Families (Single, a student, or Clear)
 * the Families view goes back to Everyone.
 *  - "family": set Families when the view is Everyone
 *  - "all": set Everyone when the view is Families
 *  - null: leave it
 */
export function startViewChange(prev: WhoProfile | null | undefined, next: WhoProfile): "family" | "all" | null {
  const wantsFamily = (p: WhoProfile | null | undefined) => p?.household === "family" && p.place === "visitor";
  if (wantsFamily(next)) return "family";
  if (wantsFamily(prev) || (prev?.household === "family" && next.household !== "family")) return "all";
  return null;
}
