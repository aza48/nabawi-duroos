import { Languages } from "lucide-react";

/** On Arabic pages whose body is only written in English: a short note saying so. */
export function EnglishNote({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 rounded-2xl bg-bg-2 px-4 py-3 text-sm text-muted ${className}`}>
      <Languages size={17} className="mt-0.5 shrink-0 text-primary" />
      <span>تفاصيل هذه الصفحة مكتوبة بالإنجليزية حاليًا.</span>
    </p>
  );
}
