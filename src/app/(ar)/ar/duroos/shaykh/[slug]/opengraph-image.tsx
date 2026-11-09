import { shaykhImage } from "@/app/_og/card";

export const revalidate = 300;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "دروس شيخ على MESH";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return shaykhImage((await params).slug, "ar");
}
