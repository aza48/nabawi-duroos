import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/redirects";
import { BASE_HEADERS, publicCsp } from "./src/server/security";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ["@electric-sql/pglite"],
  // Previews and local builds run migrations from these files at runtime.
  outputFileTracingIncludes: { "/**": ["./drizzle/**/*"] },
  experimental: { globalNotFound: true },
  async redirects() {
    return LEGACY_REDIRECTS;
  },
  async headers() {
    return [
      { source: "/:path*", headers: BASE_HEADERS },
      // Admin pages get a stricter per-request nonce policy from src/proxy.ts.
      { source: "/((?!admin).*)", headers: [{ key: "Content-Security-Policy", value: publicCsp(isDev) }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
};

export default nextConfig;
