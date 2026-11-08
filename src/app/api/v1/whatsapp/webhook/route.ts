import { after } from "next/server";
import { getDb } from "@/server/db/client";
import { readPostWithGemini } from "@/server/watcher/ai";
import { incomingMessages, ingestForwarded, mediaDataUrl, ownerNumbers, sendText, validSignature } from "@/server/whatsapp/inbox";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Meta checks the webhook once when it is saved: echo the challenge if the verify token matches. */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const ok = u.searchParams.get("hub.mode") === "subscribe" && !!process.env.WHATSAPP_VERIFY_TOKEN && u.searchParams.get("hub.verify_token") === process.env.WHATSAPP_VERIFY_TOKEN;
  return ok ? new Response(u.searchParams.get("hub.challenge") ?? "", { status: 200 }) : new Response("Forbidden", { status: 403 });
}

/** Every message to the MESH number. Answers Meta at once; the reading happens right after. */
export async function POST(req: Request) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-hub-signature-256"), process.env.WHATSAPP_APP_SECRET)) return new Response("Bad signature", { status: 401 });
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  const messages = incomingMessages(payload, ownerNumbers());
  if (messages.length) {
    after(async () => {
      const db = await getDb();
      const apiKey = process.env.GEMINI_API_KEY ?? "";
      for (const m of messages) {
        const imageUrl = m.imageId && process.env.WHATSAPP_TOKEN ? await mediaDataUrl(m.imageId, process.env.WHATSAPP_TOKEN) : null;
        const out = await ingestForwarded(db, { ...m, imageUrl }, (post, lessons, today) => readPostWithGemini(post, lessons, today, { apiKey }));
        if (out.reply) await sendText(m.from, out.reply);
      }
    });
  }
  return new Response("OK", { status: 200 });
}
