import type { Metadata } from "next";
import { COLLECTIONS, searchFiles } from "@/content/library-books";
import { SearchResults } from "@/features/library/CoursePages";

export const metadata: Metadata = { title: "Search the course books", robots: { index: false }, alternates: { canonical: "/library/search" } };
type Props = { searchParams: Promise<{ q?: string; c?: string }> };

export default async function Page({ searchParams }: Props) {
  const { q = "", c } = await searchParams;
  const collection = COLLECTIONS.find((x) => x.slug === c);
  const hits = searchFiles(q).filter((h) => !collection || h.collection.slug === collection.slug);
  return <SearchResults q={q.trim()} hits={hits} collection={collection} />;
}
