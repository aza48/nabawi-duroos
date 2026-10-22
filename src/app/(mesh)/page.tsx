import MeshHome from "@/components/mesh/MeshHome";
import JsonLd from "@/components/JsonLd";
import { abs, siteUrl } from "@/lib/site";

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MESH — Medinah English Students Hub",
  url: siteUrl(),
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl()}/browse?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MESH — Medinah English Students Hub",
  url: siteUrl(),
  logo: abs("/mesh-hero-poster.jpg"),
};

export default function Page() {
  return (
    <>
      <JsonLd data={[websiteLd, organizationLd]} />
      <MeshHome />
    </>
  );
}
