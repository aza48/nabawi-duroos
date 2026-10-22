import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

/**
 * Crawlers — search and AI alike — are welcome on the public content.
 * Only account, admin, write and API surfaces are kept out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/mesh/admin",
        "/manage",
        "/notifications",
        "/forgot",
        "/resources/write",
      ],
    },
    sitemap: abs("/sitemap.xml"),
  };
}
