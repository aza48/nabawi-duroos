import { MahadPage, mahadMetadata } from "@/features/library/MahadPage";

export const metadata = mahadMetadata("ar");

export default function Page() {
  return <MahadPage locale="ar" />;
}
