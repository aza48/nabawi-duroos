import type { Metadata } from "next";
import { AssistantPage } from "@/features/assistant/AssistantPage";

export const metadata: Metadata = {
  title: "مساعد MESH",
  description: "اسأل عن الدراسة والحياة في المدينة المنورة: الجامعة الإسلامية والتأشيرات والبنوك والسكن ودروس المشايخ.",
  alternates: { canonical: "/ar/assistant", languages: { en: "/assistant", ar: "/ar/assistant", "x-default": "/assistant" } },
};

/** `?q=...` asks that question at once: links from the search box and shared questions open answered. */
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const question = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 600) || undefined;
  return <AssistantPage locale="ar" question={question} />;
}
