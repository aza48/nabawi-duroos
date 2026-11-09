import { GlossaryPage, glossaryMetadata } from "@/features/glossary/GlossaryPage";

export const metadata = glossaryMetadata("ar");

export default function Page() {
  return <GlossaryPage locale="ar" />;
}
