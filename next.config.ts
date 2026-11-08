import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/redirects";
import { BASE_HEADERS, publicCsp } from "./src/server/security";
import { BLOCKED_USER_AGENTS } from "./src/lib/ai-policy";

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
  // Crawlers that collect pages to train models are refused outright (robots\.txt stays readable).
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/((?!robots\\.txt).*)",
          has: [{ type: "header" as const, key: "user-agent", value: `.*(${BLOCKED_USER_AGENTS.join("|")}).*` }],
          destination: "/api/blocked",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      { source: "/:path*", headers: BASE_HEADERS },
      // Rights reserved: no text and data mining for model training (TDMRep). Citing with a link is welcome.
      {
        source: "/((?!admin).*)",
        headers: [
          { key: "tdm-reservation", value: "1" },
          { key: "tdm-policy", value: "https://medinahub.org/llms.txt" },
          { key: "X-Robots-Tag", value: "noai, noimageai" },
        ],
      },
      // Admin pages get a stricter per-request nonce policy from src/proxy.ts.
      { source: "/((?!admin).*)", headers: [{ key: "Content-Security-Policy", value: publicCsp(isDev) }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
};

export default nextConfig;
