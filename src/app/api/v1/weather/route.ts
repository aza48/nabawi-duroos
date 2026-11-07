import { openMeteoUrl, parseOpenMeteo } from "@/lib/weather";

export const dynamic = "force-dynamic";

/** /api/v1/weather: Madinah right now. The CDN keeps it for ten minutes, so Open-Meteo sees few calls. */
export async function GET() {
  try {
    const res = await fetch(openMeteoUrl(), { cache: "no-store", signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
    const weather = parseOpenMeteo(await res.json());
    if (!weather) throw new Error("Unexpected reply");
    return Response.json(weather, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800" } });
  } catch {
    return Response.json({ error: "Weather is unavailable right now" }, { status: 503, headers: { "Cache-Control": "public, s-maxage=60" } });
  }
}
