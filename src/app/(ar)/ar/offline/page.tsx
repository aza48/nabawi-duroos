import type { Metadata } from "next";
import { OfflineView } from "@/components/shell/OfflineView";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "دون اتصال",
  description: "صفحات MESH المحفوظة على هذا الجهاز، تقرؤها دون اتصال.",
  robots: { index: false, follow: false },
};

/** Kept by the service worker and shown when a page cannot load offline. The list of saved pages fills in on the phone. */
export default function Page() {
  return <OfflineView locale="ar" />;
}
