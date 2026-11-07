import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const AI = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot", "Bingbot"];

/** Everything public is open to search engines and AI assistants; only admin and the API are private. */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/"];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, ...AI.map((userAgent) => ({ userAgent, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
