import type { Metadata } from "next";
import { StartPage } from "@/features/start/StartPage";

export const metadata: Metadata = {
  title: "أيامك المئة الأولى في المدينة",
  description: "استقر في المدينة المنورة بالترتيب الصحيح: ما تفعله قبل السفر ويوم الوصول وفي أول ٧٢ ساعة والأسبوع الأول والشهر الأول وفصلك الأول، ولكل خطوة دليل يشرحها.",
  alternates: { canonical: "/ar/start", languages: { en: "/start", ar: "/ar/start", "x-default": "/start" } },
};

export default function Page() {
  return <StartPage locale="ar" />;
}
