import type { Db } from "@/server/db/client";
import { sources } from "@/server/db/schema";

/** The public channels MESH reads. Everything starts in shadow mode (autoPublish off). */
export const DEFAULT_SOURCES: { handle: string; name: string }[] = [
  { handle: "drosalmadina", name: "Duroos al-Madinah an-Nabawiyyah" },
  { handle: "khizana_62", name: "Khizanat al-Ilm" },
  { handle: "sohaymi", name: "Shaykh Salih al-Suhaymi (official)" },
  { handle: "dr_maherkhujah", name: "Prof. Dr. Mahir Khujah (official)" },
  { handle: "Sulalruhaily", name: "Shaykh Sulayman al-Ruhayli (official)" },
  { handle: "twijri", name: "Prof. Dr. Ali al-Tuwaijri (official)" },
];

export async function seedSources(db: Db): Promise<void> {
  for (const s of DEFAULT_SOURCES) {
    await db.insert(sources).values({ ...s, trusted: true, autoPublish: false }).onConflictDoNothing({ target: sources.handle });
  }
}
