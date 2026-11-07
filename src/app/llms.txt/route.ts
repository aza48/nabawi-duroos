import { getDb } from "@/server/db/client";
import { buildLlmsTxt } from "@/lib/llms";

export const revalidate = 3600;

export async function GET() {
  return new Response(await buildLlmsTxt(await getDb(), false), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
