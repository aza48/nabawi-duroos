/**
 * Reads a WhatsApp "Export chat" file and keeps only the messages after the last export that was
 * processed, so each new export costs a few hundred lines instead of the whole history.
 *
 *   node scripts/whatsapp-new.cjs "<path to .zip or .txt>" [--commit]
 *
 * Without --commit it writes the new messages to whatsapp-new.txt beside the export and prints a
 * summary. With --commit it records the newest message time as read (run it after processing).
 * The cursor file stores only chat names and times, never message text.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const CURSOR = path.join(__dirname, "..", "data", "whatsapp-cursors.json");
const [input, flag] = process.argv.slice(2);
if (!input) {
  console.error('Usage: node scripts/whatsapp-new.cjs "<export.zip or .txt>" [--commit]');
  process.exit(1);
}

let txtPath = input;
if (/\.zip$/i.test(input)) {
  const dir = path.join(require("os").tmpdir(), "mesh-whatsapp", path.basename(input, ".zip"));
  fs.mkdirSync(dir, { recursive: true });
  execFileSync("unzip", ["-o", "-q", input, "-d", dir]);
  const txt = fs.readdirSync(dir).find((f) => f.endsWith(".txt"));
  if (!txt) throw new Error("No .txt in the export");
  txtPath = path.join(dir, txt);
}
const chat = path.basename(input).replace(/\.(zip|txt)$/i, "").replace(/^WhatsApp Chat - /, "");

// "[6/6/26, 4:53:06 PM] Name: text" (iPhone export). Continuation lines belong to the previous message.
const HEAD = /^\[(\d{1,2})\/(\d{1,2})\/(\d{2,4}), (\d{1,2}):(\d{2})(?::(\d{2}))?\s?([AP]M)?\]\s/;
function stamp(m) {
  const [, mo, d, y, h, mi, sec, ap] = m;
  const year = Number(y.length === 2 ? `20${y}` : y);
  const hour = ap ? (Number(h) % 12) + (ap === "PM" ? 12 : 0) : Number(h);
  return Date.UTC(year, Number(mo) - 1, Number(d), hour, Number(mi), Number(sec ?? 0));
}

const lines = fs.readFileSync(txtPath, "utf8").replace(/\r/g, "").split("\n");
const messages = [];
for (const line of lines) {
  const m = HEAD.exec(line.replace(/^‎/, ""));
  if (m) messages.push({ t: stamp(m), text: line });
  else if (messages.length) messages[messages.length - 1].text += "\n" + line;
}

const cursors = fs.existsSync(CURSOR) ? JSON.parse(fs.readFileSync(CURSOR, "utf8")) : {};
const since = cursors[chat] ?? 0;
const fresh = messages.filter((m) => m.t > since);
const newest = messages.length ? Math.max(...messages.map((m) => m.t)) : since;

if (flag === "--commit") {
  cursors[chat] = Math.max(since, newest);
  fs.mkdirSync(path.dirname(CURSOR), { recursive: true });
  fs.writeFileSync(CURSOR, JSON.stringify(cursors, null, 2) + "\n");
  console.log(`Marked "${chat}" as read up to ${new Date(cursors[chat]).toISOString().slice(0, 16).replace("T", " ")}.`);
} else {
  const out = path.join(path.dirname(txtPath), "whatsapp-new.txt");
  fs.writeFileSync(out, fresh.map((m) => m.text).join("\n"));
  console.log(`"${chat}": ${messages.length} messages in the export, ${fresh.length} new since ${since ? new Date(since).toISOString().slice(0, 10) : "the beginning"}. New ones: ${out}`);
}
