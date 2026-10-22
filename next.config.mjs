/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // MESH moved from /mesh/* to the site root; keep old URLs working.
    // NOTE: /mesh/admin intentionally has no redirect — the admin
    // console still lives there.
    const meshPages = [
      "about",
      "ask",
      "browse",
      "forgot",
      "guidelines",
      "login",
      "notifications",
      "privacy",
      "signup",
    ];
    return [
      { source: "/mesh", destination: "/", permanent: true },
      ...meshPages.map((p) => ({
        source: `/mesh/${p}`,
        destination: `/${p}`,
        permanent: true,
      })),
      {
        source: "/mesh/category/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
      {
        source: "/mesh/profile/:id",
        destination: "/profile/:id",
        permanent: true,
      },
      {
        source: "/mesh/question/:id",
        destination: "/question/:id",
        permanent: true,
      },
      { source: "/mesh/resources", destination: "/resources", permanent: true },
      {
        source: "/mesh/resources/write",
        destination: "/resources/write",
        permanent: true,
      },
      {
        source: "/mesh/resources/:id",
        destination: "/resources/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
