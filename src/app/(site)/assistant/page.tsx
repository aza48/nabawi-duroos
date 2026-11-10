import type { Metadata } from "next";
import { AssistantPage } from "@/features/assistant/AssistantPage";

export const metadata: Metadata = {
  title: "Ask the MESHaykh",
  description: "MESH's assistant (not a shaykh): ask anything about studying and living in Madinah: the Islamic University, visas, banks, housing and the duroos of the mashayikh.",
  alternates: { canonical: "/assistant", languages: { en: "/assistant", ar: "/ar/assistant", "x-default": "/assistant" } },
};

/** `?q=...` asks that question at once: links from the search box and shared questions open answered. */
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const question = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 600) || undefined;
  return <AssistantPage question={question} />;
}
