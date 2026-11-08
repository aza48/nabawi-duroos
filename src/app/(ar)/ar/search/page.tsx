import type { Metadata } from "next";
import { PageBand } from "@/components/ui";
import { SearchPage } from "@/features/search/SearchUI";

export const metadata: Metadata = {
  title: "بحث",
  description: "ابحث في الدروس والمشايخ والأدلة والأسئلة والمعاهد والمكتبة والخصومات على MESH، بالعربية أو الإنجليزية.",
  alternates: { canonical: "/ar/search", languages: { en: "/search", ar: "/ar/search" } },
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <>
      <PageBand title="البحث في MESH" subtitle="الدروس والمشايخ والأدلة والأسئلة والمعاهد والمكتبة والخصومات، بالعربية أو الإنجليزية." />
      <div className="shell mt-8 md:mt-12">
        <SearchPage initial={q ?? ""} locale="ar" />
      </div>
    </>
  );
}
