import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { PageBand } from "@/components/ui";
import { DISCOUNTS } from "@/content/discounts";
import { DiscountsBrowser } from "@/features/discounts/DiscountsBrowser";

export const metadata: Metadata = {
  title: "Student discounts",
  description: "Discounts for Islamic University students and staff at clinics, schools, car rentals, restaurants, gyms, opticians and hotels in Madinah.",
  alternates: { canonical: "/discounts" },
};

export default function Page() {
  const total = DISCOUNTS.reduce((n, g) => n + g.offers.length, 0);
  return (
    <>
      <PageBand title="Discounts with your University card" subtitle={`${total} offers from clinics, schools, car rentals, restaurants, gyms and more, from the Islamic University's partner programme.`} />
      <div className="shell mt-8 md:mt-12">
        <p className="mb-8 flex max-w-3xl gap-3 rounded-2xl bg-gold-bg p-4 text-sm leading-relaxed text-ink">
          <CreditCard size={20} className="mt-0.5 shrink-0 text-gold" />
          Show your University card and ask before you pay. Many offers are written for University staff (منسوبي الجامعة); those marked &quot;Students named&quot; mention students too. Companies can change their terms at any time.
        </p>
        <DiscountsBrowser groups={DISCOUNTS} />
      </div>
    </>
  );
}
