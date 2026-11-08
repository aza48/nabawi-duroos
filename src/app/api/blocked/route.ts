import { AI_USE_POLICY } from "@/lib/ai-policy";

/** Where next.config.ts sends crawlers that collect pages to train models. */
export function GET() {
  return new Response(`Access denied. ${AI_USE_POLICY} Contact: medinahub.org/more\n`, {
    status: 403,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
export const HEAD = GET;
