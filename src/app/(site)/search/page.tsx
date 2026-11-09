import type { Metadata } from "next";
import { PageBand } from "@/components/ui";
import { SearchPage } from "@/features/search/SearchUI";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every dars, shaykh, guide, answer, study programme, library item and discount on MESH, in English or Arabic.",
  alternates: { canonical: "/search", languages: { en: "/search", ar: "/ar/search", "x-default": "/search" } },
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <>
      <PageBand title="Search MESH" subtitle="Duroos, mashayikh, guides, answers, institutes, the library and discounts, in English or Arabic." />
      {/* Results load in the browser: reserve their room so the footer does not jump up and back. */}
      <div className="shell mt-8 min-h-[70vh] md:mt-12">
        <SearchPage initial={q ?? ""} />
      </div>
    </>
  );
}
