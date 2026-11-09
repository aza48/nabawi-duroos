import { GlossaryPage, glossaryMetadata } from "@/features/glossary/GlossaryPage";

export const metadata = glossaryMetadata("en");

export default function Page() {
  return <GlossaryPage locale="en" />;
}
