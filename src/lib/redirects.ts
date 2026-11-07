/**
 * 301s from the old site's URLs, so links already shared in WhatsApp keep
 * working. The forum and member accounts no longer exist; their pages land on
 * the closest new section.
 */
export const LEGACY_REDIRECTS: { source: string; destination: string; permanent: true }[] = [
  { source: "/mesh", destination: "/", permanent: true },
  { source: "/mesh/:path*", destination: "/:path*", permanent: true },
  { source: "/browse", destination: "/ask", permanent: true },
  { source: "/category/:slug", destination: "/ask", permanent: true },
  { source: "/question/:id", destination: "/ask", permanent: true },
  { source: "/resources", destination: "/guides", permanent: true },
  { source: "/resources/write", destination: "/admin", permanent: true },
  { source: "/resources/:id", destination: "/guides", permanent: true },
  { source: "/signup", destination: "/", permanent: true },
  { source: "/login", destination: "/", permanent: true },
  { source: "/forgot", destination: "/", permanent: true },
  { source: "/notifications", destination: "/", permanent: true },
  { source: "/profile/:id", destination: "/", permanent: true },
  { source: "/guidelines", destination: "/more#rules", permanent: true },
  { source: "/about", destination: "/more#about", permanent: true },
  { source: "/manage", destination: "/more", permanent: true },
  { source: "/privacy", destination: "/more", permanent: true },
];
