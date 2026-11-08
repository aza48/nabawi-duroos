import type { Metadata } from "next";
import { AssistantPage } from "@/features/assistant/AssistantPage";

export const metadata: Metadata = {
  title: "Ask MESH",
  description: "Ask anything about studying and living in Madinah: the Islamic University, visas, banks, housing and the duroos of the mashayikh.",
  alternates: { canonical: "/assistant", languages: { en: "/assistant", ar: "/ar/assistant", "x-default": "/assistant" } },
};

export default function Page() {
  return <AssistantPage />;
}
