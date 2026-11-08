import type { Metadata } from "next";
import { AssistantPage } from "@/features/assistant/AssistantPage";

export const metadata: Metadata = {
  title: "مساعد MESH",
  description: "اسأل عن الدراسة والحياة في المدينة المنورة: الجامعة الإسلامية والتأشيرات والبنوك والسكن ودروس المشايخ.",
  alternates: { canonical: "/ar/assistant", languages: { en: "/assistant", ar: "/ar/assistant", "x-default": "/assistant" } },
};

export default function Page() {
  return <AssistantPage locale="ar" />;
}
