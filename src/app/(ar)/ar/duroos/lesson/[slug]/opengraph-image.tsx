import { lessonImage } from "@/app/_og/card";

/** Each dars shares its own card; refreshed every 5 minutes so a cancellation band stays current. */
export const revalidate = 300;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "درس في المدينة على MESH";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return lessonImage((await params).slug, "ar");
}
