import { PageSkeleton } from "@/components/shell/PageSkeleton";

/**
 * Shown while this index page loads on a slow connection. It sits in the (index) group on purpose: a loading.tsx
 * above a page that can call notFound() would turn its 404 into a 200 (see tests/loading-boundaries.test.ts).
 */
export default function Loading() {
  return <PageSkeleton locale="ar" />;
}
