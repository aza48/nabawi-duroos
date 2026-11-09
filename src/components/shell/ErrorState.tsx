"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RefreshCw } from "lucide-react";

const HELP = "+1 234 567 9076";

/**
 * What a section shows when its page fails to render (error.tsx): a plain message, Try again (Next 16's retry(),
 * which fetches and renders the page again), a way home, and the Admin help line. Never a blank page.
 */
export function ErrorState({ error, retry }: { error: unknown; retry: () => void }) {
  const ar = (usePathname() ?? "").startsWith("/ar");
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="shell flex min-h-[50vh] flex-col items-center justify-center py-16 text-center" role="alert">
      <h1 className="font-heading text-3xl font-bold md:text-4xl">{ar ? "تعذّر تحميل هذه الصفحة" : "This page didn't load"}</h1>
      <p className="mt-2 max-w-md text-muted">{ar ? "تحقّق من الاتصال وحاول مرة أخرى." : "Check your connection and try again."}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => retry()} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-ink">
          <RefreshCw size={17} /> {ar ? "حاول مرة أخرى" : "Try again"}
        </button>
        <Link href={ar ? "/ar" : "/"} className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-5 font-semibold">
          {ar ? "الرئيسية" : "Home"}
        </Link>
      </div>
      <p className="mt-6 text-sm text-muted">
        {ar ? "إن تكرر ذلك فراسل المشرف على واتساب على الرقم " : "If it keeps happening, message Admin on WhatsApp at "}
        <a href={`https://wa.me/${HELP.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-semibold text-primary [unicode-bidi:isolate] hover:underline" dir="ltr">
          {HELP}
        </a>
      </p>
    </div>
  );
}
