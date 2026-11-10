"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, Loader2, RotateCcw } from "lucide-react";
import { localizeUrl, type Locale } from "@/lib/locale";

type Source = { title: string; section?: string; url: string };
type Reply = { answer: string; sources: Source[]; related?: { title: string; url: string }[]; mode: string; lang?: string };
type Msg = { role: "user" | "assistant"; text: string; sources?: Source[]; related?: { title: string; url: string }[]; failed?: boolean };

const T = {
  en: {
    intro: "Ask anything about studying and living in Madinah: the University, visas, banks, housing, the duroos. Answers come from MESH's guides and schedule.",
    note: "For a religious ruling, ask a scholar.",
    placeholder: "Type your question...",
    send: "Send",
    thinking: "Finding the answer...",
    again: "New conversation",
    more: "From MESH",
    related: "Related questions",
    error: "That didn't go through. Check your connection and try again.",
    suggestions: [
      "Can I open a bank account on a Visitor ID?",
      "What duroos are on tonight?",
      "How do I get home internet without an iqama?",
      "How much is the University stipend?",
    ],
  },
  ar: {
    intro: "اسأل عن الدراسة والحياة في المدينة: الجامعة والتأشيرات والبنوك والسكن والدروس. الأجوبة من أدلة MESH وجدول الدروس.",
    note: "للفتوى في المسائل الشرعية اسأل أهل العلم.",
    placeholder: "اكتب سؤالك...",
    send: "إرسال",
    thinking: "نبحث عن الجواب...",
    again: "محادثة جديدة",
    more: "من MESH",
    related: "أسئلة ذات صلة",
    error: "لم يصل السؤال. تحقق من الاتصال وحاول مرة أخرى.",
    suggestions: ["هل أستطيع فتح حساب بنكي بهوية زائر؟", "ما الدروس الليلة؟", "كيف أحصل على إنترنت منزلي بدون إقامة؟", "كم مكافأة الجامعة الشهرية؟"],
  },
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The direction of a block, from its first letter: an English passage under an Arabic line is left to right. */
const dirOf = (text: string) => (/^[^A-Za-z\u0600-\u06FF]*[\u0600-\u06FF]/.test(text) ? "rtl" : "ltr");

/**
 * A very small, safe Markdown subset: paragraphs, bullet and numbered lists, bold, links to pages on this site,
 * and [n] citation markers turned into small numbered links to the cited page. Each block sets its own
 * direction, so an English passage under an Arabic line reads left to right.
 */
export function renderAnswer(md: string, sources: Source[] = []): string {
  const cite = (n: string) => {
    const s = sources[Number(n) - 1];
    return s ? `<a href="${esc(s.url)}" class="ms-0.5 align-super text-[0.7em] font-semibold text-primary no-underline hover:underline" title="${esc(s.title)}">${n}</a>` : "";
  };
  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\s?\[(\d{1,2})\]/g, (_m, n: string) => cite(n))
      .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2" class="font-semibold text-primary underline-offset-2 hover:underline">$1</a>');
  const out: string[] = [];
  const lines = md.split("\n").map((l) => l.trim());
  let list: "ul" | "ol" | null = null;
  const close = () => { if (list) { out.push(`</${list}>`); list = null; } };
  lines.forEach((line, i) => {
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    const num = /^\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || num) {
      const want = bullet ? "ul" : "ol";
      if (list !== want) {
        close();
        out.push(`<${want} dir="${dirOf(lines[i])}" class="${want === "ul" ? "list-disc" : "list-decimal"} space-y-1 ps-5 text-start">`);
        list = want;
      }
      out.push(`<li>${inline((bullet ?? num)![1])}</li>`);
    } else if (!line) {
      close();
    } else {
      close();
      out.push(`<p dir="${dirOf(line)}" class="text-start">${inline(line)}</p>`);
    }
  });
  close();
  return out.join("");
}

function ids(): { v: string; s: string } | null {
  try {
    const v = localStorage.getItem("mesh_vid");
    const s = JSON.parse(localStorage.getItem("mesh_sid") ?? "null")?.id;
    return v && s ? { v, s } : null;
  } catch {
    return null;
  }
}

/** Logs the question for the owner's Visitors page: what people ask, and whether MESH had the answer. */
function logQuestion(question: string, mode: string, found: boolean) {
  const who = ids();
  if (!who) return;
  const e = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/[^A-Za-z0-9_-]/g, "");
  try {
    void fetch("/api/v1/track", {
      method: "POST",
      keepalive: true,
      credentials: "omit",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ t: "ask", v: who.v, s: who.s, e, path: window.location.pathname, label: question.slice(0, 200), target: mode, value: found ? 1 : 0 }),
    }).catch(() => {});
  } catch {}
}

export function AssistantPanel({ locale = "en", autoFocus = false, compact = false }: { locale?: Locale; autoFocus?: boolean; compact?: boolean }) {
  const t = T[locale];
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { if (autoFocus) input.current?.focus(); }, [autoFocus]);
  useEffect(() => { end.current?.scrollIntoView({ block: "end", behavior: "smooth" }); }, [msgs, busy]);

  async function ask(text: string) {
    const question = text.trim();
    if (question.length < 2 || busy) return;
    const history = msgs.filter((m) => !m.failed).slice(-8).map((m) => ({ role: m.role, content: m.text }));
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setQ("");
    setBusy(true);
    try {
      const res = await fetch("/api/v1/assistant", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question, history }) });
      const j = (await res.json()) as { data: Reply | null; error: string | null; message?: string | null };
      if (!res.ok || !j.data) throw new Error(j.message ?? "failed");
      const d = j.data;
      setMsgs((m) => [...m, { role: "assistant", text: d.answer, sources: d.sources, related: d.related }]);
      logQuestion(question, d.mode, d.mode !== "guard" && (d.sources.length > 0 || d.mode === "live"));
    } catch (e) {
      const msg = e instanceof Error && e.message !== "failed" && !/fetch|network/i.test(e.message) ? e.message : t.error;
      setMsgs((m) => [...m, { role: "assistant", text: msg, failed: true }]);
    } finally {
      setBusy(false);
      input.current?.focus();
    }
  }

  return (
    <div className={`flex min-h-0 flex-col ${compact ? "h-full" : ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className={`min-h-0 flex-1 space-y-4 overflow-y-auto ${compact ? "p-4" : "py-2"}`} aria-live="polite">
        {msgs.length === 0 && (
          <div>
            <p className="leading-relaxed text-muted">{t.intro}</p>
            <p className="mt-1 text-sm text-muted">{t.note}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.suggestions.map((s) => (
                <button key={s} type="button" onClick={() => ask(s)} className="min-h-10 rounded-full border border-line bg-card px-3.5 py-2 text-start text-sm font-medium transition hover:border-primary hover:text-primary">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-ee-md bg-primary px-4 py-2.5 text-primary-ink" dir="auto">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="max-w-[95%]">
              <div className={`space-y-2 rounded-2xl rounded-es-md border px-4 py-3 leading-relaxed ${m.failed ? "border-red-300 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-200" : "border-line bg-card"}`} dir="auto" dangerouslySetInnerHTML={{ __html: renderAnswer(m.text, (m.sources ?? []).map((x) => ({ ...x, url: localizeUrl(x.url, locale) }))) }} />
              {!!m.sources?.length && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-xs text-muted">{t.more}:</span>
                  {m.sources.map((s) => (
                    <Link key={s.url} href={localizeUrl(s.url, locale)} dir="auto" className="max-w-full truncate rounded-full bg-primary-soft px-3 py-1.5 font-medium text-primary hover:bg-primary hover:text-primary-ink">
                      {s.section ? `${s.title}: ${s.section}` : s.title}
                    </Link>
                  ))}
                </div>
              )}
              {!!m.related?.length && (
                <div className="mt-2 text-sm">
                  <p className="text-xs text-muted">{t.related}</p>
                  <ul className="mt-1 space-y-1">
                    {m.related.slice(0, 3).map((r) => (
                      <li key={r.url}><Link href={localizeUrl(r.url, locale)} dir="auto" className="text-primary underline-offset-2 hover:underline">{r.title}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ),
        )}
        {busy && (
          <p className="flex items-center gap-2 text-sm text-muted" role="status">
            <Loader2 size={16} className="animate-spin" /> {t.thinking}
          </p>
        )}
        <div ref={end} />
      </div>
      <form
        className={`flex items-end gap-2 border-t border-line bg-bg ${compact ? "p-3" : "pt-4"}`}
        onSubmit={(e) => { e.preventDefault(); void ask(q); }}
      >
        {msgs.length > 0 && (
          <button type="button" onClick={() => setMsgs([])} aria-label={t.again} title={t.again} className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-card text-muted hover:text-ink">
            <RotateCcw size={17} />
          </button>
        )}
        <label className="sr-only" htmlFor="mesh-ask-input">{t.placeholder}</label>
        <textarea
          id="mesh-ask-input"
          ref={input}
          value={q}
          rows={1}
          maxLength={600}
          dir="auto"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void ask(q); } }}
          placeholder={t.placeholder}
          data-no-track
          className="max-h-36 min-h-11 flex-1 resize-none rounded-2xl border border-line bg-card px-4 py-2.5 text-base outline-none focus:border-primary"
        />
        <button type="submit" disabled={busy || q.trim().length < 2} aria-label={t.send} className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-ink transition disabled:opacity-40">
          <ArrowUp size={19} />
        </button>
      </form>
    </div>
  );
}
