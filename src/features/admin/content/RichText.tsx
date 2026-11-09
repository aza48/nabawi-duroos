"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import { Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered, Quote, Redo2, Undo2 } from "lucide-react";

export function RichText({ value, onChange, placeholder }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        code: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      // Guides hold tables (costs, fees, timings). Without this the editor silently drops them on save.
      TableKit.configure({ table: { resizable: false } }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "article min-h-56 px-3.5 py-3 outline-none",
        "aria-label": placeholder ?? "Body",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const s = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e
        ? {
            h2: e.isActive("heading", { level: 2 }), h3: e.isActive("heading", { level: 3 }), bold: e.isActive("bold"),
            italic: e.isActive("italic"), ul: e.isActive("bulletList"), ol: e.isActive("orderedList"),
            quote: e.isActive("blockquote"), link: e.isActive("link"),
          }
        : null,
  });

  if (!editor) return <div className="min-h-56 rounded-xl border border-line bg-bg" />;

  function setLink() {
    const prev = editor!.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link address (leave empty to remove)", prev ?? "https://");
    if (url === null) return;
    if (!url || url === "https://") editor!.chain().focus().unsetLink().run();
    else editor!.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  const B = ({ on, label, onClick, children }: { on?: boolean; label: string; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" aria-label={label} aria-pressed={on} onMouseDown={(e) => e.preventDefault()} onClick={onClick}
      className={`grid size-9 shrink-0 place-items-center rounded-lg ${on ? "bg-primary text-primary-ink" : "hover:bg-bg-2"}`}>
      {children}
    </button>
  );

  return (
    // No overflow-hidden here: it would stop the toolbar sticking while a long guide scrolls.
    <div className="rounded-xl border border-line bg-bg focus-within:border-primary">
      <div className="sticky top-14 z-10 flex gap-0.5 overflow-x-auto rounded-t-[11px] border-b border-line bg-card p-1 [scrollbar-width:none]">
        <B label="Heading" on={s?.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={17} /></B>
        <B label="Subheading" on={s?.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={17} /></B>
        <B label="Bold" on={s?.bold} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={17} /></B>
        <B label="Italic" on={s?.italic} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={17} /></B>
        <B label="Bulleted list" on={s?.ul} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={17} /></B>
        <B label="Numbered list" on={s?.ol} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={17} /></B>
        <B label="Quote" on={s?.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={17} /></B>
        <B label="Link" on={s?.link} onClick={setLink}><Link2 size={17} /></B>
        <B label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 size={17} /></B>
        <B label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 size={17} /></B>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
