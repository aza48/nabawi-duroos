import type { Metadata } from "next";
import { StartPage } from "@/features/start/StartPage";

export const metadata: Metadata = {
  title: "Your first 100 days in Madinah",
  description: "Settle into Madinah in the right order: what to do before you fly, on arrival day, in the first 72 hours, the first week, the first month and your first semester, with a guide behind every step.",
  alternates: { canonical: "/start", languages: { en: "/start", ar: "/ar/start", "x-default": "/start" } },
};

export default function Page() {
  return <StartPage />;
}
