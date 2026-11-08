import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { PageBand } from "@/components/ui";
import { DISCOUNTS } from "@/content/discounts";
import { DiscountsBrowser } from "@/features/discounts/DiscountsBrowser";
import { toArabicDigits } from "@/lib/locale";

export const metadata: Metadata = {
  title: "خصومات الطلاب",
  description: "خصومات لطلاب الجامعة الإسلامية ومنسوبيها في العيادات والمدارس وتأجير السيارات والمطاعم والنوادي والنظارات والفنادق في المدينة.",
  alternates: { canonical: "/ar/discounts", languages: { en: "/discounts", ar: "/ar/discounts" } },
};

export default function Page() {
  const total = DISCOUNTS.reduce((n, g) => n + g.offers.length, 0);
  return (
    <>
      <PageBand title="خصومات ببطاقتك الجامعية" subtitle={`${toArabicDigits(total)} عرضًا من عيادات ومدارس وشركات تأجير سيارات ومطاعم ونوادٍ وغيرها، ضمن برنامج شركاء الجامعة الإسلامية.`} />
      <div className="shell mt-8 md:mt-12">
        <p className="mb-8 flex max-w-3xl gap-3 rounded-2xl bg-gold-bg p-4 text-sm leading-relaxed text-ink">
          <CreditCard size={20} className="mt-0.5 shrink-0 text-gold" />
          اعرض بطاقتك الجامعية واسأل قبل الدفع. كثير من العروض مكتوبة لمنسوبي الجامعة، وما عليه علامة &quot;تذكر الطلاب&quot; يشمل الطلاب أيضًا. قد تغيّر الشركات شروطها في أي وقت.
        </p>
        <DiscountsBrowser groups={DISCOUNTS} locale="ar" />
      </div>
    </>
  );
}
