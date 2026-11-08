/**
 * Who may read MESH for what.
 *
 * Open: search engines and the assistants that look something up for a person and link back
 * (retrieval and search crawlers, and agents acting on a person's request).
 * Closed: crawlers that collect pages to train models or build datasets.
 *
 * robots.txt is a request that honest crawlers follow. next.config.ts also refuses the named
 * training crawlers outright, and sends reservation headers (TDMRep) on every page.
 */

/** Crawlers that gather content for model training or datasets. Refused everywhere. */
export const TRAINING_CRAWLERS = [
  "Amazonbot",
  "anthropic-ai",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "cohere-ai",
  "Diffbot",
  "FacebookBot",
  "Google-Extended",
  "GPTBot",
  "ImagesiftBot",
  "img2dataset",
  "Meta-ExternalAgent",
  "Omgilibot",
  "PanguBot",
  "PetalBot",
  "Timpibot",
  "Webzio-Extended",
];

/** Search and assistant agents that quote briefly and link back. Welcome. */
export const CITING_AGENTS = [
  "Bingbot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "DuckAssistBot",
  "Googlebot",
  "OAI-SearchBot",
  "Perplexity-User",
  "PerplexityBot",
];

/** Training crawlers that identify themselves in the User-Agent header (robots-only tokens excluded). */
export const BLOCKED_USER_AGENTS = TRAINING_CRAWLERS.filter((n) => !["Google-Extended", "Applebot-Extended", "Webzio-Extended"].includes(n));

export const AI_USE_POLICY =
  "MESH content is protected by copyright. Search engines and AI assistants may read pages to answer a person's question, with a short summary and a link back to medinahub.org. Copying text in bulk, republishing it, and using it to train or fine-tune AI models or to build datasets are not permitted without written permission.";
