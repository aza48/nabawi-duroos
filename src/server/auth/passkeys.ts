import { eq } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { passkey } from "@/server/db/schema";

/** True when the user has registered at least one passkey (Face ID, fingerprint or security key). */
export async function hasPasskey(db: Db, userId: string): Promise<boolean> {
  const rows = await db.select({ id: passkey.id }).from(passkey).where(eq(passkey.userId, userId)).limit(1);
  return rows.length > 0;
}
