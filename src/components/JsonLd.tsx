import { abs, SITE_URL } from "@/lib/site";

/** Structured data for search engines and AI assistants. `<` is escaped so content can't end the script. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const ORG_ID = `${SITE_URL}/#org`;

export function siteJsonLd(whatsappUrl: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: "MESH: Medina English Student Hub",
      alternateName: ["MESH", "Medina English Student Hub", "Medinah Hub"],
      url: SITE_URL,
      logo: abs("/icon"),
      description: "For English-speaking students and families in Madinah, brought to you by Albaseerah International Institute: live duroos schedules, study programmes, guides and the MESH WhatsApp group.",
      areaServed: { "@type": "City", name: "Madinah", containedInPlace: { "@type": "Country", name: "Saudi Arabia" } },
      sameAs: [whatsappUrl],
      parentOrganization: { "@type": "Organization", name: "Albaseerah International Institute", url: "https://albaseerah.org" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "MESH",
      url: SITE_URL,
      inLanguage: ["en", "ar"],
      publisher: { "@id": ORG_ID },
      potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/search?q={query}`, "query-input": "required name=query" },
    },
  ];
}

export function breadcrumbs(items: [string, string][]) {
  // The trail always starts at Home, so search engines see the whole path.
  const trail: [string, string][] = items[0]?.[1] === "/" ? items : [["Home", "/"], ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}
