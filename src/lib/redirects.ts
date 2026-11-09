/**
 * 301s from the old site's URLs, so links already shared in WhatsApp keep
 * working. The forum and member accounts no longer exist; their pages land on
 * the closest new section.
 */
export const LEGACY_REDIRECTS: { source: string; destination: string; permanent: true }[] = [
  { source: "/guides/sports-and-martial-arts", destination: "/guides/sports-and-activities", permanent: true },
  // Old business guide (named an outside provider): replaced by the MESH company guide.
  { source: "/guides/starting-a-business", destination: "/guides/start-a-company-in-saudi", permanent: true },
  { source: "/daily-life/starting-a-business", destination: "/guides/start-a-company-in-saudi", permanent: true },
  // Thin guides retired: send old links to the closest useful page.
  { source: "/guides/restaurants", destination: "/guides", permanent: true },
  { source: "/guides/emergency-numbers", destination: "/guides/doctors-hospitals-and-pharmacies", permanent: true },
  { source: "/guides/arabic-learning-resources", destination: "/library", permanent: true },
  { source: "/guides/childbirth-options", destination: "/guides/having-a-baby-in-madinah", permanent: true },
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
