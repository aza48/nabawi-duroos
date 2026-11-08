import { MessageCircleQuestion } from "lucide-react";
import { PageBand } from "@/components/ui";
import type { Locale } from "@/lib/locale";
import { AssistantPanel } from "./AssistantPanel";

export function AssistantPage({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <PageBand
        title={<span className="inline-flex items-center gap-3"><MessageCircleQuestion className="size-9 text-gold-bright md:size-12" /> {ar ? "مساعد MESH" : "Ask the Meshaykh"}</span>}
        subtitle={ar ? "أجوبة سريعة عن الجامعة والتأشيرات والسكن والبنوك والدروس في المدينة." : "Quick answers about the University, visas, housing, banks and the duroos in Madinah."}
      />
      <div className="shell mt-8 md:mt-12">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col rounded-3xl border border-line bg-bg p-4 md:p-6">
          <AssistantPanel locale={locale} />
        </div>
      </div>
    </>
  );
}
