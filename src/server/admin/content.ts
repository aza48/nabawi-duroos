import { eq, like } from "drizzle-orm";
import { z } from "zod";
import type { Db } from "@/server/db/client";
import { faqs, guides } from "@/server/db/schema";
import { assertCan, type Actor } from "@/server/auth/permissions";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { cleanText } from "@/lib/text";
import { getSetting, setSetting } from "@/server/settings";
import { record } from "./audit";
import { slugify } from "./duroos";
import { refreshPublic } from "./refresh";
import { revalidatePath } from "next/cache";

const WORDS_PER_MINUTE = 200;

function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

async function freeSlug(db: Db, table: typeof faqs | typeof guides, base: string): Promise<string> {
  const taken = new Set((await db.select({ s: table.slug }).from(table).where(like(table.slug, `${base}%`))).map((r) => r.s));
  if (!taken.has(base)) return base;
  for (let i = 2; ; i++) if (!taken.has(`${base}-${i}`)) return `${base}-${i}`;
}

const faqInput = z.object({
  slug: z.string().optional(),
  question: z.string().trim().min(5).max(300),
  answerHtml: z.string().min(1).max(100_000),
  category: z.enum(["getting-started", "getting-settled", "family", "university", "duroos", "leaving"]),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  status: z.enum(["draft", "published"]),
  markVerified: z.boolean().optional(),
});

export async function saveFaq(db: Db, actor: Actor, input: z.input<typeof faqInput>) {
  assertCan(actor, "content.write");
  const v = faqInput.parse(input);
  const now = new Date();
  const fields = {
    question: cleanText(v.question, "en"),
    answerHtml: sanitizeArticleHtml(cleanText(v.answerHtml, "en")),
    category: v.category,
    tags: v.tags,
    status: v.status,
    updatedAt: now,
    ...(v.markVerified ? { lastVerifiedAt: now } : {}),
  };
  if (v.slug) {
    const [before] = await db.select().from(faqs).where(eq(faqs.slug, v.slug));
    if (!before) throw new Error("faq_not_found");
    const [after] = await db.update(faqs).set(fields).where(eq(faqs.slug, v.slug)).returning();
    await record(db, actor, { action: "update", entity: "faq", entityId: v.slug, before, after });
    refreshPublic(["/ask", `/ask/${v.slug}`]);
    return after;
  }
  const slug = await freeSlug(db, faqs, slugify(v.question));
  const [row] = await db.insert(faqs).values({ ...fields, slug }).returning();
  await record(db, actor, { action: "create", entity: "faq", entityId: slug, before: null, after: row });
  refreshPublic(["/ask", "/"]);
  return row;
}

export async function deleteFaq(db: Db, actor: Actor, input: { slug: string }) {
  assertCan(actor, "content.write");
  const [before] = await db.select().from(faqs).where(eq(faqs.slug, input.slug));
  if (!before) throw new Error("faq_not_found");
  await db.delete(faqs).where(eq(faqs.slug, input.slug));
  const auditId = await record(db, actor, { action: "delete", entity: "faq", entityId: input.slug, before, after: null });
  refreshPublic(["/ask", `/ask/${input.slug}`]);
  return auditId;
}

const guideInput = z.object({
  slug: z.string().optional(),
  title: z.string().trim().min(3).max(200),
  summary: z.string().trim().min(3).max(400),
  bodyHtml: z.string().min(1).max(300_000),
  stage: z.enum(["getting-started", "getting-settled", "study", "family", "leaving"]),
  coverUrl: z.string().trim().max(500).regex(/^(https:\/\/[^\s/]+\S*|\/(?!\/)\S*)?$/, "Use an https:// link or a /path on MESH").transform((v) => v || null).optional().nullable(),
  readingMinutes: z.number().int().min(1).max(120).optional(),
  status: z.enum(["draft", "published"]),
  markVerified: z.boolean().optional(),
});

export async function saveGuide(db: Db, actor: Actor, input: z.input<typeof guideInput>) {
  assertCan(actor, "content.write");
  const v = guideInput.parse(input);
  const body = sanitizeArticleHtml(cleanText(v.bodyHtml, "en"));
  const now = new Date();
  const fields = {
    title: cleanText(v.title, "en"),
    summary: cleanText(v.summary, "en"),
    bodyHtml: body,
    stage: v.stage,
    coverUrl: v.coverUrl ?? null,
    readingMinutes: v.readingMinutes ?? readingMinutes(body),
    status: v.status,
    updatedAt: now,
    ...(v.markVerified ? { lastVerifiedAt: now } : {}),
  };
  if (v.slug) {
    const [before] = await db.select().from(guides).where(eq(guides.slug, v.slug));
    if (!before) throw new Error("guide_not_found");
    const [after] = await db.update(guides).set(fields).where(eq(guides.slug, v.slug)).returning();
    await record(db, actor, { action: "update", entity: "guide", entityId: v.slug, before, after });
    refreshPublic(["/guides", `/guides/${v.slug}`, "/"]);
    return after;
  }
  const slug = await freeSlug(db, guides, slugify(v.title));
  const [row] = await db.insert(guides).values({ ...fields, slug }).returning();
  await record(db, actor, { action: "create", entity: "guide", entityId: slug, before: null, after: row });
  refreshPublic(["/guides", "/"]);
  return row;
}

export async function deleteGuide(db: Db, actor: Actor, input: { slug: string }) {
  assertCan(actor, "content.write");
  const [before] = await db.select().from(guides).where(eq(guides.slug, input.slug));
  if (!before) throw new Error("guide_not_found");
  await db.delete(guides).where(eq(guides.slug, input.slug));
  const auditId = await record(db, actor, { action: "delete", entity: "guide", entityId: input.slug, before, after: null });
  refreshPublic(["/guides", `/guides/${input.slug}`, "/"]);
  return auditId;
}

const whatsappInput = z.object({ url: z.string().regex(/^https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+$/, "Paste a WhatsApp group invite link") });

export async function setWhatsAppUrl(db: Db, actor: Actor, input: { url: string }) {
  assertCan(actor, "settings.write");
  const { url } = whatsappInput.parse(input);
  const before = await getSetting(db, "whatsapp_invite_url");
  await setSetting(db, "whatsapp_invite_url", url);
  await record(db, actor, {
    action: "update", entity: "setting", entityId: "whatsapp_invite_url",
    before: { key: "whatsapp_invite_url", value: before }, after: { key: "whatsapp_invite_url", value: url },
  });
  refreshPublic(["/", "/duroos", "/ar/duroos", "/ask", "/guides", "/more"]);
}

