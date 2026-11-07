import { getDb } from "@/server/db/client";
import { buildSearchDocs } from "@/server/search/docs";

export const revalidate = 600;

/** The whole-site search index, fetched once by the search box and cached. */
export async function GET() {
  const docs = await buildSearchDocs(await getDb());
  return Response.json({ data: docs }, { headers: { "cache-control": "public, s-maxage=600, stale-while-revalidate=3600" } });
}
