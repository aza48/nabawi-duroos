import CategoryView from "@/components/mesh/CategoryView";
import JsonLd from "@/components/JsonLd";
import { meshCategories } from "@/data/mesh-seed";
import { abs } from "@/lib/site";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = meshCategories.find((c) => c.slug === params.slug);
  const breadcrumbLd = cat
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: cat.name,
            item: abs(`/category/${cat.slug}`),
          },
        ],
      }
    : null;
  return (
    <>
      {breadcrumbLd && <JsonLd data={breadcrumbLd} />}
      <CategoryView slug={params.slug} />
    </>
  );
}
