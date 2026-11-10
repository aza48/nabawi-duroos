"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, Check, Copy, Loader2, RotateCcw, Square, ThumbsDown, ThumbsUp } from "lucide-react";
import { localizeUrl, type Locale } from "@/lib/locale";

type Source = { title: string; section?: string; url: string };
type Reply = { answer: string; sources: Source[]; related?: { title: string; url: string }[]; mode: string; found?: boolean; lang?: string };
type Msg = {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
  related?: { title: string; url: string }[];
  failed?: boolean;
  /** The question a failed reply was for, so "Try again" can ask it again. */
  retry?: string;
  /** The reader's verdict on an answer. */
  rated?: "up" | "down";
};

const T = {
  en: {
    intro: "Ask anything about studying and living in Madinah: the University, visas, banks, housing, the duroos. Answers come from MESH's guides and schedule.",
    note: "For a religious ruling, ask a scholar.",
    placeholder: "Type your question...",
    send: "Send",
    stop: "Stop",
    thinking: "Finding the answer...",
    again: "New conversation",
    more: "From MESH",
    related: "Related questions",
    error: "That didn't go through. Check your connection and try again.",
    retry: "Try again",
    copy: "Copy answer",
    copied: "Copied",
    up: "This answer helped",
    down: "This answer did not help",
    thanks: "Thank you. The MESH team reads every report.",
    onPage: "About this page",
    suggestions: [
      "Can I open a bank account on a Visitor ID?",
      "What duroos are on tonight?",
      "How do I get home internet without an iqama?",
      "How much is the University stipend?",
    ],
    pageSuggestions: ["How much does it cost?", "How long does it take?", "What do I need for it?"],
  },
  ar: {
    intro: "اسأل عن الدراسة والحياة في المدينة: الجامعة والتأشيرات والبنوك والسكن والدروس. الأجوبة من أدلة MESH وجدول الدروس.",
    note: "للفتوى في المسائل الشرعية اسأل أهل العلم.",
    placeholder: "اكتب سؤالك...",
    send: "إرسال",
    stop: "إيقاف",
    thinking: "نبحث عن الجواب...",
    again: "محادثة جديدة",
    more: "من MESH",
    related: "أسئلة ذات صلة",
    error: "لم يصل السؤال. تحقق من الاتصال وحاول مرة أخرى.",
    retry: "أعد المحاولة",
    copy: "انسخ الجواب",
    copied: "تم النسخ",
    up: "أفادني هذا الجواب",
    down: "لم يفدني هذا الجواب",
    thanks: "شكرًا لك. فريق MESH يقرأ كل ملاحظة.",
    onPage: "عن هذه الصفحة",
    suggestions: ["هل أستطيع فتح حساب بنكي بهوية زائر؟", "ما الدروس الليلة؟", "كيف أحصل على إنترنت منزلي بدون إقامة؟", "كم مكافأة الجامعة الشهرية؟"],
    pageSuggestions: ["كم تكلفة هذا؟", "كم يستغرق هذا؟", "ما المطلوب لهذا؟"],
  },
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The direction of a block, from its first letter: an English passage under an Arabic line is left to right. */
const dirOf = (text: string) => (/^[^A-Za-z؀-ۿ]*[؀-ۿ]/.test(text) ? "rtl" : "ltr");

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

/** The answer as plain text for the clipboard: no markers, no Markdown, with its links written out. */
export function plainAnswer(md: string, sources: Source[] = [], origin = ""): string {
  const body = md.replace(/\s?\[\d{1,2}\]/g, "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1").trim();
  const links = sources.map((s) => `${s.section ? `${s.title}: ${s.section}` : s.title} ${origin}${s.url}`);
  return links.length ? `${body}\n\n${links.join("\n")}` : body;
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

function track(body: Record<string, unknown>) {
  const who = ids();
  if (!who) return;
  const e = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/[^A-Za-z0-9_-]/g, "");
  try {
    void fetch("/api/v1/track", {
      method: "POST",
      keepalive: true,
      credentials: "omit",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ v: who.v, s: who.s, e, path: window.location.pathname, ...body }),
    }).catch(() => {});
  } catch {}
}

/** Logs the question for the owner's Visitors page: what people ask, and whether MESH had the answer. */
const logQuestion = (question: string, mode: string, found: boolean) => track({ t: "ask", label: question.slice(0, 200), target: mode, value: found ? 1 : 0 });

/** Logs the reader's verdict on an answer, with the question, so weak answers can be fixed. */
const logRating = (question: string, up: boolean) => track({ t: "click", label: `${up ? "Answer helped" : "Answer did not help"}: ${question}`.slice(0, 140), target: up ? "assistant:helpful" : "assistant:not-helpful" });

const STORE = "mesh_ask_chat_v1";
/** The conversation, kept for this browser tab so it survives a reload or a page change. */
function loadChat(): Msg[] {
  try {
    const v = JSON.parse(sessionStorage.getItem(STORE) ?? "[]");
    return Array.isArray(v) ? (v as Msg[]).filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string").slice(-30) : [];
  } catch {
    return [];
  }
}
function saveChat(msgs: Msg[]) {
  try {
    if (msgs.length) sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-30)));
    else sessionStorage.removeItem(STORE);
  } catch {}
}

/** Pages a question can be about: a guide, an answer, a programme, a dars or a shaykh. */
export const aboutPage = (path: string | undefined) => !!path && /^\/(ar\/)?(guides|ask|programs|duroos\/lesson|duroos\/shaykh)\/[^/]+/.test(path);

type Props = {
  locale?: Locale;
  autoFocus?: boolean;
  compact?: boolean;
  /** Asked as soon as the panel opens (/assistant?q=...). */
  initialQuestion?: string;
  /** A question sent from elsewhere (the search box); `n` changes for each new one. */
  request?: { q: string; n: number } | null;
  /** The page the person is reading, so "how much does it cost?" is about it. */
  page?: string;
  /** Called when a link in the chat is followed, so a dialog can close. */
  onNavigate?: () => void;
};

export function AssistantPanel({ locale = "en", autoFocus = false, compact = false, initialQuestion, request, page, onNavigate }: Props) {
  const t = T[locale];
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [restored, setRestored] = useState(false);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);
  const asked = useRef<string | number | null>(null);
  /** The conversation as last rendered, read when a question is sent. */
  const current = useRef<Msg[]>([]);
  useEffect(() => {
    current.current = msgs;
  }, [msgs]);

  useEffect(() => {
    const saved = loadChat();
    current.current = saved;
    setMsgs(saved);
    setRestored(true);
  }, []);
  useEffect(() => {
    if (restored) saveChat(msgs.filter((m) => !m.failed));
  }, [msgs, restored]);
  useEffect(() => { if (autoFocus) input.current?.focus(); }, [autoFocus]);
  useEffect(() => { end.current?.scrollIntoView({ block: "end", behavior: "smooth" }); }, [msgs, busy]);

  const ask = useCallback(
    async (text: string, opts: { replace?: number } = {}) => {
      const question = text.trim();
      if (question.length < 2 || abort.current) return;
      const ctrl = new AbortController();
      abort.current = ctrl;
      // "Try again" replaces the failed reply and its question with a fresh attempt.
      const before = opts.replace !== undefined ? current.current.slice(0, opts.replace) : current.current;
      const next: Msg[] = [...before, { role: "user", text: question }];
      current.current = next;
      setMsgs(next);
      setQ("");
      setBusy(true);
      try {
        const history = before.filter((m) => !m.failed).slice(-8).map((m) => ({ role: m.role, content: m.text }));
        // The page counts only for the first question: after that, the conversation says what "it" is.
        const onPage = !history.length && aboutPage(page) ? page!.replace(/^\/ar(?=\/)/, "") : undefined;
        const res = await fetch("/api/v1/assistant", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ question, history, locale, ...(onPage ? { page: onPage } : {}) }),
          signal: ctrl.signal,
        });
        const j = (await res.json()) as { data: Reply | null; error: string | null; message?: string | null };
        if (!res.ok || !j.data) throw new Error(j.message ?? "failed");
        const d = j.data;
        setMsgs((m) => [...m, { role: "assistant", text: d.answer, sources: d.sources, related: d.related }]);
        logQuestion(question, d.mode, d.mode !== "guard" && (d.sources.length > 0 || d.mode === "live"));
      } catch (e) {
        if (ctrl.signal.aborted) {
          // Stopped: the question goes back in the box, unanswered.
          setMsgs((m) => m.slice(0, -1));
          setQ(question);
        } else {
          const msg = e instanceof Error && e.message !== "failed" && !/fetch|network|json/i.test(e.message) ? e.message : t.error;
          setMsgs((m) => [...m, { role: "assistant", text: msg, failed: true, retry: question }]);
        }
      } finally {
        abort.current = null;
        setBusy(false);
        input.current?.focus();
      }
    },
    [locale, page, t.error]
  );

  // A question from the link (/assistant?q=) or from the search box is asked once.
  useEffect(() => {
    if (!restored || !initialQuestion || asked.current === initialQuestion) return;
    asked.current = initialQuestion;
    void ask(initialQuestion);
  }, [restored, initialQuestion, ask]);
  useEffect(() => {
    if (!restored || !request || asked.current === request.n) return;
    asked.current = request.n;
    void ask(request.q);
  }, [restored, request, ask]);

  const copy = async (i: number, m: Msg) => {
    try {
      await navigator.clipboard.writeText(plainAnswer(m.text, m.sources, window.location.origin));
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 2000);
    } catch {}
  };
  const rate = (i: number, up: boolean) => {
    const question = msgs.slice(0, i).reverse().find((x) => x.role === "user")?.text ?? "";
    setMsgs((list) => list.map((x, k) => (k === i ? { ...x, rated: up ? "up" : "down" } : x)));
    logRating(question, up);
  };
  const follow = onNavigate ? () => onNavigate() : undefined;
  const iconBtn = "grid size-9 place-items-center rounded-full text-muted transition hover:bg-bg-2 hover:text-ink";

  return (
    <div className={`flex min-h-0 flex-col ${compact ? "h-full" : ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className={`min-h-0 flex-1 space-y-4 overflow-y-auto ${compact ? "p-4" : "py-2"}`} aria-live="polite">
        {msgs.length === 0 && !busy && (
          <div>
            <p className="leading-relaxed text-muted">{t.intro}</p>
            <p className="mt-1 text-sm text-muted">{t.note}</p>
            {aboutPage(page) && (
              <>
                <p className="mt-4 text-xs font-semibold text-muted">{t.onPage}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.pageSuggestions.map((s) => (
                    <button key={s} type="button" onClick={() => ask(s)} className="min-h-10 rounded-full border border-primary/30 bg-primary-soft/60 px-3.5 py-2 text-start text-sm font-medium text-primary transition hover:border-primary">
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
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
              <p className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-ee-md bg-primary px-4 py-2.5 text-primary-ink" dir="auto">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="max-w-[95%]">
              <div
                onClick={(e) => { if ((e.target as HTMLElement).closest("a")) follow?.(); }}
                className={`space-y-2 rounded-2xl rounded-es-md border px-4 py-3 leading-relaxed ${m.failed ? "border-red-300 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-200" : "border-line bg-card"}`}
                dir="auto"
                dangerouslySetInnerHTML={{ __html: renderAnswer(m.text, (m.sources ?? []).map((x) => ({ ...x, url: localizeUrl(x.url, locale) }))) }}
              />
              {m.failed && m.retry && (
                <button type="button" onClick={() => ask(m.retry!, { replace: i - 1 })} disabled={busy} className="mt-2 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 text-sm font-semibold text-primary hover:border-primary disabled:opacity-40">
                  <RotateCcw size={14} /> {t.retry}
                </button>
              )}
              {!m.failed && (
                <div className="mt-1 flex items-center gap-0.5" data-no-track>
                  <button type="button" onClick={() => copy(i, m)} aria-label={copied === i ? t.copied : t.copy} title={copied === i ? t.copied : t.copy} className={iconBtn}>
                    {copied === i ? <Check size={15} className="text-primary" /> : <Copy size={15} />}
                  </button>
                  {m.rated ? (
                    <span className="ms-1 text-xs text-muted" role="status">{t.thanks}</span>
                  ) : (
                    <>
                      <button type="button" onClick={() => rate(i, true)} aria-label={t.up} title={t.up} className={iconBtn}>
                        <ThumbsUp size={15} />
                      </button>
                      <button type="button" onClick={() => rate(i, false)} aria-label={t.down} title={t.down} className={iconBtn}>
                        <ThumbsDown size={15} />
                      </button>
                    </>
                  )}
                </div>
              )}
              {!!m.sources?.length && (
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-xs text-muted">{t.more}:</span>
                  {m.sources.map((s) => (
                    <Link key={s.url} href={localizeUrl(s.url, locale)} onClick={follow} dir="auto" title={s.section ? `${s.title}: ${s.section}` : s.title} className="max-w-full truncate rounded-full bg-primary-soft px-3 py-1.5 font-medium text-primary hover:bg-primary hover:text-primary-ink">
                      {/* A long guide title would hide the section, and two sections of one guide would look the same. */}
                      {s.section ?? s.title}
                    </Link>
                  ))}
                </div>
              )}
              {!!m.related?.length && (
                <div className="mt-2 text-sm">
                  <p className="text-xs text-muted">{t.related}</p>
                  <ul className="mt-1 space-y-1">
                    {m.related.slice(0, 3).map((r) => (
                      <li key={r.url}><Link href={localizeUrl(r.url, locale)} onClick={follow} dir="auto" className="text-primary underline-offset-2 hover:underline">{r.title}</Link></li>
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
          <button type="button" onClick={() => { abort.current?.abort(); setMsgs([]); }} aria-label={t.again} title={t.again} className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-card text-muted hover:text-ink">
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
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void ask(q); } }}
          placeholder={t.placeholder}
          enterKeyHint="send"
          data-no-track
          className="max-h-36 min-h-11 flex-1 resize-none rounded-2xl border border-line bg-card px-4 py-2.5 text-base outline-none focus:border-primary"
        />
        {busy ? (
          <button type="button" onClick={() => abort.current?.abort()} aria-label={t.stop} title={t.stop} className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-bg transition">
            <Square size={15} fill="currentColor" />
          </button>
        ) : (
          <button type="submit" disabled={q.trim().length < 2} aria-label={t.send} className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-ink transition disabled:opacity-40">
            <ArrowUp size={19} />
          </button>
        )}
      </form>
    </div>
  );
}
