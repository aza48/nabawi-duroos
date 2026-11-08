import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Briefcase, CircleCheck } from "lucide-react";
import { getDb } from "@/server/db/client";
import { getWhatsAppUrl } from "@/server/settings";
import { JsonLd, ORG_ID, breadcrumbs } from "@/components/JsonLd";
import { AskOnWhatsApp } from "@/components/shell/WhatsApp";
import { abs } from "@/lib/site";
import { CompanyGuide } from "@/features/guides/company/CompanyGuide";
import { CHECKED, PLAN, SLUG, SUMMARY, TITLE } from "@/features/guides/company/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Start your own company in Saudi Arabia (MISA registration guide)",
  description: SUMMARY,
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: { type: "article", title: TITLE, description: SUMMARY, url: `/guides/${SLUG}`, siteName: "MESH" },
  twitter: { card: "summary_large_image", title: TITLE, description: SUMMARY },
};

export default async function Page() {
  const whatsappUrl = await getWhatsAppUrl(await getDb());
  const steps = PLAN.flatMap((p) => p.items);
  const ld = {
    "@context": "https://schema.org",
    "@type": ["Article", "HowTo"],
    headline: TITLE,
    name: TITLE,
    description: SUMMARY,
    url: abs(`/guides/${SLUG}`),
    inLanguage: "en",
    datePublished: "2026-11-08",
    dateModified: "2026-11-08",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@type": "Country", name: "Saudi Arabia" },
    totalTime: "P7W",
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
  };
  return (
    <>
      <JsonLd data={[ld, breadcrumbs([["Guides", "/guides"], ["Getting settled", "/guides#getting-settled"], [TITLE, `/guides/${SLUG}`]])]} />
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-16">
          <Link href="/guides#getting-settled" className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
            <Briefcase size={15} className="text-gold-bright" /> Getting settled · Business
          </Link>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold leading-[1.05] md:text-6xl">{TITLE}</h1>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg">
            You don&apos;t need an agency. You need a map. Set up your own Saudi company and residency for your family, step by step, for a fraction of what agencies charge. Updated for the 2025 rule changes.
          </p>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><BookOpen size={15} /> 15 min read</span>
            <span className="flex items-center gap-1.5"><CircleCheck size={15} /> {steps.length} steps to tick off</span>
            <span className="flex items-center gap-1.5 text-gold-bright"><CircleCheck size={15} /> Checked {CHECKED}</span>
          </p>
        </div>
      </section>
      <CompanyGuide footer={<AskOnWhatsApp url={whatsappUrl} />} />
    </>
  );
}
