import type { Metadata } from "next";
import { ProgramsIndex } from "@/features/programs/ProgramPages";

export const metadata: Metadata = {
  title: "الدراسة في المدينة",
  description: "معاهد اللغة العربية والدرجات الجامعية ومراكز الأخوات وحلقات المسجد النبوي: الرسوم والمستويات وطريقة التسجيل.",
  alternates: { canonical: "/ar/programs", languages: { en: "/programs", ar: "/ar/programs" } },
};

export default function Page() {
  return <ProgramsIndex locale="ar" />;
}
