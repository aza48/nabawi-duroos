import { readFileSync } from "node:fs";
/** Copies KEY=value lines from a git-ignored env file into process.env. Never overrides a value already set; a missing file is fine. */
export function loadEnvFile(file: string): void {
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = /^([A-Z_]+)=(.*)$/.exec(line.trim());
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
    }
  } catch {}
}
