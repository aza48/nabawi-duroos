/** Neon's HTTP driver for Neon hosts; the standard Postgres driver for everything else (Supabase, local). */
export function driverFor(url: string): "neon" | "postgres" {
  return new URL(url).hostname.endsWith(".neon.tech") ? "neon" : "postgres";
}

/** Supabase's transaction pooler (6543) can't hold a migration session; the session pooler (5432) on the same host can. */
export function sessionUrl(url: string): string {
  return url.replace(/:6543\//, ":5432/");
}
