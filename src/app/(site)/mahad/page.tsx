import { MahadPage, mahadMetadata } from "@/features/library/MahadPage";

export const metadata = mahadMetadata("en");

export default function Page() {
  return <MahadPage locale="en" />;
}
