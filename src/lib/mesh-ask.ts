import { meshCategories } from "@/data/mesh-seed";

/**
 * Code-only helpers for the search-first ask flow. No AI: the title, category
 * and tags are derived from the student's own words with plain keyword rules,
 * and everything derived stays editable before posting.
 */

const QUESTION_STARTERS = /^(how|what|when|where|why|which|who|whom|whose|can|could|do|does|did|is|are|was|were|will|would|should|may|has|have)\b/i;

/** Turn a raw search-style query into a postable question title. */
export function deriveTitle(raw: string): string {
  let s = raw.replace(/\s+/g, " ").trim();
  if (!s) return "";
  s = s.charAt(0).toUpperCase() + s.slice(1);
  if (s.length > 200) {
    const cut = s.slice(0, 200);
    const lastSpace = cut.lastIndexOf(" ");
    s = (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).trim();
  }
  if (!/[?.!]$/.test(s) && QUESTION_STARTERS.test(s)) s += "?";
  return s;
}

type Rule = { re: RegExp; sub?: string; tags: string[] };

/** Ordered keyword rules: the first matching subcategory wins; tags accumulate from every match. */
const RULES: Rule[] = [
  { re: /\bnafath\b|\babsher\b/i, sub: "nafath-absher", tags: ["Nafath", "Absher"] },
  { re: /\biqama\b|\bvisa\b|residency|residence permit|\bmuqeem\b/i, sub: "visa-iqama", tags: ["Iqama", "Visa"] },
  { re: /final exit|exit re[- ]?entry|re[- ]?entry|\bexit\b/i, sub: "exit-procedures", tags: ["Exit", "Final exit"] },
  { re: /admission|apply|application|enrol+ment|enrol+ing/i, sub: "admissions-enrollment", tags: ["Admissions"] },
  { re: /regist|student portal|course selection|add and drop/i, sub: "university-registration", tags: ["Registration"] },
  { re: /transcript|attest|final document|certificate/i, sub: "final-documents", tags: ["Documents", "Transcript"] },
  { re: /document|passport|photo(copies)?|paperwork/i, sub: "documents-requirements", tags: ["Documents"] },
  { re: /clearance|clearing|براءة|إخلاء/i, sub: "university-clearance", tags: ["Clearance"] },
  { re: /close|closing|cancel/i, sub: "closing-accounts", tags: ["Closing accounts"] },
  { re: /handover|hand over|return (the )?(apartment|flat|room)|deposit back/i, sub: "housing-handover", tags: ["Housing", "Handover"] },
  { re: /housing|rent|apartment|flat|roommate|dorm|accommodation|landlord/i, sub: "housing-accommodation", tags: ["Housing"] },
  { re: /\bsim\b|e ?sim|mobile|phone plan|\bstc\b|\bmobily\b|\bzain\b/i, sub: "sim-cards", tags: ["SIM", "Mobile"] },
  { re: /bank|\biban\b|\bmada\b| debit card|credit card|transfer money|atm/i, sub: "banking-payments", tags: ["Banking"] },
  { re: /grocer|supermarket|shopping|mall|market/i, sub: "shopping-groceries", tags: ["Shopping"] },
  { re: /food|restaurant|eat|delivery/i, sub: "food-essentials", tags: ["Food"] },
  { re: /doctor|clinic|hospital|health|insurance|pharmacy|medical/i, sub: "healthcare-services", tags: ["Healthcare"] },
  { re: /bus|taxi|\buber\b|\bcareem\b|transport|train|haramain/i, sub: "transport", tags: ["Transport"] },
  { re: /flight|ticket|travel|trip|umrah package/i, sub: "travel-planning", tags: ["Travel"] },
  { re: /luggage|shipping|ship (my|boxes)|moving|packing/i, sub: "moving-luggage", tags: ["Luggage", "Shipping"] },
  { re: /airport|arrival|arriving|first (day|week|time)|new student/i, sub: "first-arrival", tags: ["Arrival"] },
  { re: /stipend|mukafa|monthly allowance|salary/i, tags: ["Stipend"] },
];

export type AskAnalysis = { title: string; categorySlug: string; subcategorySlug: string; tags: string[] };

/** Analyse a natural-language question into a title, category guess and tags — plain string rules only. */
export function analyzeQuery(raw: string): AskAnalysis {
  const title = deriveTitle(raw);
  let subcategorySlug = "";
  const tags: string[] = [];
  for (const rule of RULES) {
    if (!rule.re.test(raw)) continue;
    if (rule.sub && !subcategorySlug) subcategorySlug = rule.sub;
    for (const t of rule.tags) if (!tags.includes(t)) tags.push(t);
  }
  let categorySlug = "getting-started";
  if (subcategorySlug) {
    const sub = meshCategories.find((c) => c.slug === subcategorySlug);
    if (sub?.parentSlug) categorySlug = sub.parentSlug;
    if (sub && tags.length < 5 && !tags.includes(sub.name)) tags.unshift(sub.name);
  }
  return { title, categorySlug, subcategorySlug, tags: tags.slice(0, 5) };
}

/** Words worth searching on: 3+ chars, minus filler. Used to match existing threads while typing. */
const STOPWORDS = new Set(["the", "a", "an", "and", "or", "to", "of", "in", "on", "for", "is", "are", "can", "how", "what", "when", "where", "why", "do", "does", "did", "i", "my", "me", "we", "you", "it", "this", "that", "with", "from", "before", "after", "about", "into", "get", "got", "need", "want", "should", "would", "could", "will", "في", "من", "إلى", "على", "هل", "ما", "كيف"]);

export function searchKeywords(raw: string): string[] {
  const words = raw.toLowerCase().replace(/[^a-z0-9؀-ۿ\s]/g, " ").split(/\s+/).filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  return words.filter((w, i) => words.indexOf(w) === i).slice(0, 6);
}
