import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CITING_AGENTS, TRAINING_CRAWLERS } from "@/lib/ai-policy";

/**
 * Open to search engines and to assistants that look something up and link back.
 * Closed to crawlers that collect pages to train models. Admin and the API are private.
 * See src/lib/ai-policy.ts.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...CITING_AGENTS.map((userAgent) => ({ userAgent, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow })),
      ...TRAINING_CRAWLERS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
