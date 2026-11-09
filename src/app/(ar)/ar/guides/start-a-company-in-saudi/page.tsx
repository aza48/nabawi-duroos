import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Briefcase, CircleCheck } from "lucide-react";
import { AdminHelp } from "@/components/shell/AdminHelp";
import { EnglishNote } from "@/components/EnglishNote";
import { toArabicDigits } from "@/lib/locale";
import { CompanyGuide } from "@/features/guides/company/CompanyGuide";
import { CHECKED, PLAN, SLUG } from "@/features/guides/company/content";

export const revalidate = 3600;

/** The date the guide was last checked, written in Arabic. */
const checkedAr = new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-arab", { day: "numeric", month: "long", year: "numeric" }).format(new Date(CHECKED));

const TITLE_AR = "أسّس شركتك الخاصة في السعودية";
const SUMMARY_AR = "شركتك الخاصة وإقامتك الخاصة. طريق واضح عبر أنظمة ٢٠٢٥، من أوراقك في بلدك إلى أول فاتورة تصدرها.";

/** The body is in English, so search engines are pointed at the English page. */
export const metadata: Metadata = {
  title: `${TITLE_AR} (أنظمة ٢٠٢٥)`,
  description: SUMMARY_AR,
  alternates: { canonical: `/guides/${SLUG}` },
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
            <span className="flex items-center gap-1.5"><BookOpen size={15} /> {toArabicDigits(15)} دقيقة للقراءة</span>
            <span className="flex items-center gap-1.5"><CircleCheck size={15} /> {toArabicDigits(steps.length)} خطوة</span>
            <span className="flex items-center gap-1.5 text-gold-pale"><CircleCheck size={15} /> آخر مراجعة {checkedAr}</span>
          </p>
        </div>
      </section>
      <div className="shell mt-8 md:mt-10">
        <EnglishNote className="max-w-3xl" />
      </div>
      <div dir="ltr" lang="en">
        <CompanyGuide />
      </div>
      <div className="shell mt-10 max-w-3xl">
        <AdminHelp locale="ar" kind="question" />
      </div>
    </>
  );
}
