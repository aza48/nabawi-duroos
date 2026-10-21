"use client";
import { useEffect, useRef } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold, Heading1, Heading2, ImagePlus, Italic, Link2, List, ListOrdered,
  Minus, Quote, Redo2, Strikethrough, Underline, Undo2,
} from "lucide-react";
import { useMeshPrefs } from "@/lib/mesh-i18n";
import { compressImageFile } from "./imageCompress";

/**
 * X-Articles-style editor for MESH Resources, built on Tiptap.
 * The toolbar deliberately offers NO colour, highlight, or font controls —
 * and the server sanitizer strips style attributes as a second guarantee.
 */
export default function ArticleEditor({ initialHtml, onChange }: { initialHtml: string; onChange: (html: string) => void }) {
  const { t } = useMeshPrefs();
  const fileRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
        link: { openOnClick: false, autolink: true },
      }),
      Image.configure({ allowBase64: true }),
    ],
    content: initialHtml || "",
    onUpdate: ({ editor: e }) => onChangeRef.current(e.getHTML()),
    editorProps: { attributes: { class: "mesh-article-body" } },
  });

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => e ? {
      bold: e.isActive("bold"), italic: e.isActive("italic"), underline: e.isActive("underline"),
      strike: e.isActive("strike"), h1: e.isActive("heading", { level: 1 }), h2: e.isActive("heading", { level: 2 }),
      quote: e.isActive("blockquote"), bullet: e.isActive("bulletList"), ordered: e.isActive("orderedList"),
      link: e.isActive("link"), canUndo: e.can().undo(), canRedo: e.can().redo(),
    } : null,
  });

  useEffect(() => () => { editor?.destroy(); }, [editor]);
  if (!editor) return null;

  const btn = (active: boolean, title: string, onClick: () => void, icon: React.ReactNode, disabled = false) => (
    <button type="button" className={`mesh-editor-btn mesh-focus${active ? " active" : ""}`} title={title} aria-label={title}
      onClick={onClick} disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}>
      {icon}
    </button>
  );

  function toggleLink() {
    if (!editor) return;
    if (editor.isActive("link")) { editor.chain().focus().unsetLink().run(); return; }
    const url = window.prompt(t("res.tbLinkPrompt"), "https://");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  async function onImageFile(file: File | undefined) {
    if (!file || !editor) return;
    try {
      const src = await compressImageFile(file, 1200, 0.82);
      editor.chain().focus().setImage({ src }).run();
    } catch { /* unreadable image — ignore */ }
  }

  return (
    <div className="mesh-editor">
      <div className="mesh-editor-toolbar" role="toolbar">
        {btn(!!state?.bold, t("res.tbBold"), () => editor.chain().focus().toggleBold().run(), <Bold size={16} />)}
        {btn(!!state?.italic, t("res.tbItalic"), () => editor.chain().focus().toggleItalic().run(), <Italic size={16} />)}
        {btn(!!state?.underline, t("res.tbUnderline"), () => editor.chain().focus().toggleUnderline().run(), <Underline size={16} />)}
        {btn(!!state?.strike, t("res.tbStrike"), () => editor.chain().focus().toggleStrike().run(), <Strikethrough size={16} />)}
        {btn(!!state?.h1, t("res.tbH1"), () => editor.chain().focus().toggleHeading({ level: 1 }).run(), <Heading1 size={16} />)}
        {btn(!!state?.h2, t("res.tbH2"), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={16} />)}
        {btn(!!state?.quote, t("res.tbQuote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote size={16} />)}
        {btn(!!state?.bullet, t("res.tbBullet"), () => editor.chain().focus().toggleBulletList().run(), <List size={16} />)}
        {btn(!!state?.ordered, t("res.tbNumbered"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={16} />)}
        {btn(!!state?.link, t("res.tbLink"), toggleLink, <Link2 size={16} />)}
        {btn(false, t("res.tbImage"), () => fileRef.current?.click(), <ImagePlus size={16} />)}
        {btn(false, t("res.tbDivider"), () => editor.chain().focus().setHorizontalRule().run(), <Minus size={16} />)}
        {btn(false, t("res.tbUndo"), () => editor.chain().focus().undo().run(), <Undo2 size={16} />, !state?.canUndo)}
        {btn(false, t("res.tbRedo"), () => editor.chain().focus().redo().run(), <Redo2 size={16} />, !state?.canRedo)}
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { onImageFile(e.target.files?.[0]); e.target.value = ""; }} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
