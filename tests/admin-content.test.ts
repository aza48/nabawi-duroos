import { beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { resetTestDb, type Db } from "@/server/db/client";
import { createAuth, type Auth } from "@/server/auth/auth";
import { deleteFaq, saveFaq, saveGuide, setWhatsAppUrl } from "@/server/admin/content";
import { listAdmins, revokeAdmin, setRole } from "@/server/admin/admins";
import { getFaq, listFaqs } from "@/server/content/queries";
import { getWhatsAppUrl, getHelpContact } from "@/server/settings";
import { checkAdmin } from "@/server/auth/check";
import { session, user } from "@/server/db/schema";
import type { Actor } from "@/server/auth/permissions";
import { adminWith2fa, BASE } from "./helpers/auth";

let db: Db;
let auth: Auth;
let owner: Actor;
let editor: Actor;
let target: Actor;
const content: Actor = { id: "c1", name: "Hana", role: "content_editor" };

beforeAll(async () => {
  db = await resetTestDb();
  auth = createAuth(db, { baseURL: BASE });
  const o = await adminWith2fa(auth, "owner@example.com", "owner");
  const e = await adminWith2fa(auth, "editor@example.com", "editor");
  const t = await adminWith2fa(auth, "target@example.com", "content_editor");
  owner = { id: o.id, name: "owner", role: "owner" };
  editor = { id: e.id, name: "editor", role: "editor" };
  target = { id: t.id, name: "target", role: "content_editor" };
  const now = new Date();
  await db.insert(user).values({ id: content.id, name: content.name, email: "c@example.com", emailVerified: true, role: content.role, createdAt: now, updatedAt: now });
});

describe("FAQs and guides", () => {
  it("strips scripts on save and publishes", async () => {
    const f = await saveFaq(db, content, {
      question: "How do I activate Absher?", answerHtml: "<p>Visit a kiosk.</p><script>alert(1)</script>",
      category: "getting-started", tags: ["absher"], status: "published", markVerified: true,
    });
    expect(f.slug).toBe("how-do-i-activate-absher");
    expect(f.answerHtml).toBe("<p>Visit a kiosk.</p>");
    expect(f.lastVerifiedAt).not.toBeNull();
    expect((await listFaqs(db)).map((x) => x.slug)).toContain(f.slug);
  });

  it("deletes a FAQ", async () => {
    await deleteFaq(db, content, { slug: "how-do-i-activate-absher" });
    expect(await getFaq(db, "how-do-i-activate-absher")).toBeNull();
  });

  it("computes reading time for guides", async () => {
    const words = Array.from({ length: 450 }, () => "word").join(" ");
    const g = await saveGuide(db, content, { title: "Your first week", summary: "Start here", bodyHtml: `<p>${words}</p>`, stage: "getting-started", status: "draft" });
    expect(g.readingMinutes).toBe(3);
  });

  it("keeps duroos editors out of content", async () => {
    await expect(saveFaq(db, { id: "d", name: "D", role: "duroos_editor" }, { question: "Q?", answerHtml: "<p>a</p>", category: "university", tags: [], status: "draft" })).rejects.toThrow("forbidden");
  });
});

describe("settings", () => {
  it("accepts a WhatsApp group invite link", async () => {
    await setWhatsAppUrl(db, editor, { url: "https://chat.whatsapp.com/AbCdEf123" });
    expect(await getWhatsAppUrl(db)).toBe("https://chat.whatsapp.com/AbCdEf123");
  });
  it("rejects anything that is not a WhatsApp group link", async () => {
    await expect(setWhatsAppUrl(db, editor, { url: "https://evil.example.com/join" })).rejects.toThrow();
  });
  it("always shows the fixed help number", async () => {
    expect(await getHelpContact(db)).toBe("+1 234 567 9076");
  });
  it("keeps content editors out of settings", async () => {
    await expect(setWhatsAppUrl(db, content, { url: "https://chat.whatsapp.com/X1" })).rejects.toThrow("forbidden");
  });
});

describe("managing admins", () => {
  it("lists admins without secrets", async () => {
    const list = await listAdmins(db, owner);
    expect(list.length).toBeGreaterThanOrEqual(3);
    expect(Object.keys(list[0])).not.toContain("password");
  });
  it("only the owner changes roles", async () => {
    await expect(setRole(db, auth, editor, { userId: target.id, role: "editor" })).rejects.toThrow("forbidden");
    await setRole(db, auth, owner, { userId: target.id, role: "duroos_editor" });
    const [u] = await db.select().from(user).where(eq(user.id, target.id));
    expect(u.role).toBe("duroos_editor");
  });
  it("stops the owner demoting or revoking themselves", async () => {
    await expect(setRole(db, auth, owner, { userId: owner.id, role: "editor" })).rejects.toThrow("cannot_change_self");
    await expect(revokeAdmin(db, auth, owner, { userId: owner.id })).rejects.toThrow("cannot_change_self");
  });
  it("revoking an admin bans them and ends their sessions", async () => {
    await revokeAdmin(db, auth, owner, { userId: target.id });
    const [u] = await db.select().from(user).where(eq(user.id, target.id));
    expect(checkAdmin(u)).toBe("banned");
    expect(await db.select().from(session).where(eq(session.userId, target.id))).toEqual([]);
  });
});
