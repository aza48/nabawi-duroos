import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Briefcase, CircleCheck } from "lucide-react";
import { AdminHelp } from "@/components/shell/AdminHelp";
import { arCount } from "@/lib/arabic-count";
import { CompanyGuide } from "@/features/guides/company/CompanyGuide";
import { PLAN, SLUG } from "@/features/guides/company/content";
import { checkedOn } from "@/features/guides/company/locale";

export const revalidate = 3600;

/** The date the guide was last checked, written in Arabic, the same date the guide's own notes show. */
const checkedAr = checkedOn("ar");

const TITLE_AR = "أسّس شركتك الخاصة في السعودية";
const SUMMARY_AR = "شركتك الخاصة وإقامتك الخاصة. طريق واضح عبر أنظمة ٢٠٢٥، من أوراقك في بلدك إلى أول فاتورة تصدرها.";

/** The Arabic page is its own canonical, with the English page as its twin. */
export const metadata: Metadata = {
  title: `${TITLE_AR} (أنظمة ٢٠٢٥)`,
  description: SUMMARY_AR,
  alternates: {
    canonical: `/ar/guides/${SLUG}`,
    languages: { en: `/guides/${SLUG}`, ar: `/ar/guides/${SLUG}`, "x-default": `/guides/${SLUG}` },
  },
  openGraph: { type: "article", title: TITLE_AR, description: SUMMARY_AR, url: `/ar/guides/${SLUG}`, siteName: "MESH" },
};

export default function Page() {
  const steps = PLAN.flatMap((p) => p.items);
  return (
    <>
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-16">
          <Link href="/ar/guides#papers" className="inline-flex min-h-10 items-center gap-2 text-sm text-white/75 hover:text-white">
            <Briefcase size={15} className="text-gold-bright" /> التأشيرات والإقامة والمال والعمل
          </Link>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold leading-snug md:text-6xl">{TITLE_AR}</h1>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg">{SUMMARY_AR}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><BookOpen size={15} /> {arCount(15, "minute", { one: "bare" })} للقراءة</span>
            <span className="flex items-center gap-1.5"><CircleCheck size={15} /> {arCount(steps.length, "step")}</span>
            <span className="flex items-center gap-1.5 text-gold-pale"><CircleCheck size={15} /> آخر مراجعة {checkedAr}</span>
          </p>
        </div>
      </section>
      <CompanyGuide locale="ar" />
      <div className="shell mt-10 max-w-3xl">
        <AdminHelp locale="ar" kind="question" />
      </div>
    </>
  );
}
