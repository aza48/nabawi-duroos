import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@electric-sql/pglite"],
  experimental: { globalNotFound: true },
  async redirects() {
    return LEGACY_REDIRECTS;
  },
};

export default nextConfig;
