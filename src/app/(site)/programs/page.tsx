import type { Metadata } from "next";
import { ProgramsIndex } from "@/features/programs/ProgramPages";

export const metadata: Metadata = {
  title: "Study in Madinah",
  description: "Arabic institutes, degrees, sisters' marakiz and the halaqat of Masjid an-Nabawi: fees, levels, how to apply and videos.",
  alternates: { canonical: "/programs", languages: { en: "/programs", ar: "/ar/programs", "x-default": "/programs" } },
};

export default function Page() {
  return <ProgramsIndex />;
}
