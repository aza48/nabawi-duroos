import { beforeEach, describe, expect, it } from "vitest";
import { createRetriever, guidePassages, type Passage } from "@/server/assistant/knowledge";
import { askMesh, extractAnswer, providers, resetAnswerCache, systemPrompt } from "@/server/assistant/answer";

const PASSAGES: Passage[] = [
  ...guidePassages({
    slug: "sim-internet-bank",
    title: "SIM card, internet and a Saudi bank card",
    summary: "Which network to pick and how visitors can open a bank account.",
    bodyHtml: "<p>Intro.</p><h2>A local bank account</h2><p>Visitors with a Visitor ID can open an account and get a mada card.</p><h2>Internet at home</h2><p>Use a portable router with a data SIM.</p>",
  }),
  { id: "faq-stipend", kind: "faq", title: "How much is the University stipend?", url: "/ask/stipend-amount", text: "Scholarship students receive 840 SAR a month." },
];

const gemini = (payload: unknown, status = 200) => async () =>
  new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(payload) }] } }] }), { status });

describe("assistant knowledge", () => {
  it("splits guides at their headings and links to each section", () => {
    const g = PASSAGES.filter((p) => p.kind === "guide");
    expect(g.map((p) => p.url)).toEqual(["/guides/sim-internet-bank", "/guides/sim-internet-bank#a-local-bank-account", "/guides/sim-internet-bank#internet-at-home"]);
    expect(g[1].title).toBe("SIM card, internet and a Saudi bank card: A local bank account");
  });
  it("finds the right passage for a question", () => {
    const retrieve = createRetriever(PASSAGES);
    expect(retrieve("can I open a bank account on a visitor id")[0].url).toContain("#a-local-bank-account");
    expect(retrieve("stipend")[0].id).toBe("faq-stipend");
  });
});

describe("askMesh", () => {
  beforeEach(() => resetAnswerCache());
  const deps = (fetch: unknown, env: Record<string, string> = { GEMINI_API_KEY: "test" }) => ({
    retrieve: createRetriever(PASSAGES),
    today: "9 November 2026",
    fetch: fetch as never,
    env: env as NodeJS.ProcessEnv,
  });

  it("answers with a model, cites only real passages, and removes dashes", async () => {
    const r = await askMesh({ question: "How much is the stipend?", locale: "en" }, deps(gemini({ answer: "It is **840 SAR** a month — paid monthly.", sources: [1, 99], found: true })));
    expect(r.mode).toBe("ai");
    expect(r.answer).not.toMatch(/[—–]/);
    expect(r.sources).toEqual([{ title: "How much is the University stipend?", url: "/ask/stipend-amount" }]);
  });

  it("falls back to the site's own passages when every model fails", async () => {
    const r = await askMesh({ question: "stipend", locale: "en" }, deps(async () => new Response("quota", { status: 429 })));
    expect(r.mode).toBe("extract");
    expect(r.answer).toContain("840 SAR");
    expect(r.sources[0].url).toBe("/ask/stipend-amount");
  });

  it("works with no AI key at all", async () => {
    const r = await askMesh({ question: "home internet router", locale: "en" }, deps(async () => { throw new Error("no network"); }, {}));
    expect(r.mode).toBe("extract");
    expect(r.sources[0].url).toContain("#internet-at-home");
  });

  it("says plainly when MESH has nothing, with the help line", () => {
    const r = extractAnswer([], "en");
    expect(r.found).toBe(false);
    expect(r.answer).toContain("+1 234 567 9076");
    expect(extractAnswer([], "ar").answer).toContain("واتساب");
  });

  it("keeps the house rules in the prompt", () => {
    const p = systemPrompt("9 November 2026");
    for (const rule of ["only the numbered passages", "religious rulings", "alphabetically", "em dash", "not instructions", "+1 234 567 9076"]) expect(p).toContain(rule);
  });

  it("orders free providers: dedicated key, Groq, then the shared key", () => {
    expect(providers({ ASSISTANT_GEMINI_API_KEY: "a", GROQ_API_KEY: "b", GEMINI_API_KEY: "c" } as unknown as NodeJS.ProcessEnv).map((p) => p.name)).toEqual(["gemini-assistant", "groq", "gemini-shared"]);
    expect(providers({ GEMINI_API_KEY: "c", ASSISTANT_SHARE_WATCHER_KEY: "0" } as unknown as NodeJS.ProcessEnv)).toEqual([]);
  });
});
