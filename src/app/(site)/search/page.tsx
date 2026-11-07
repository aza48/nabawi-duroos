import type { Metadata } from "next";
import { PageBand } from "@/components/ui";
import { SearchPage } from "@/features/search/SearchUI";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every dars, shaykh, guide, answer, study programme, library item and discount on MESH, in English or Arabic.",
  alternates: { canonical: "/search" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <>
      <PageBand title="Search MESH" subtitle="Duroos, mashayikh, guides, answers, institutes, the library and discounts. English, Arabic, or however you spell it." />
      <div className="shell mt-8 md:mt-12">
        <SearchPage initial={q ?? ""} />
      </div>
    </>
  );
}
