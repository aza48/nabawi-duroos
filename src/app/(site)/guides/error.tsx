"use client";

import { ErrorState } from "@/components/shell/ErrorState";

/** If this section's page fails to render, readers get a message and Try again, never a blank page. */
export default function SectionError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorState error={error} retry={retry} />;
}
