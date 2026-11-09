import { faqImage } from "@/app/_og/card";

export const revalidate = 300;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "جواب من MESH";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return faqImage((await params).slug, "ar");
}
