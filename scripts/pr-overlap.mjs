#!/usr/bin/env node
/**
 * Who is already doing this? Run before you start a task, before you review a PR, and before you open one.
 *
 *   npm run overlap                    every open PR, who claimed it, and where open PRs overlap
 *   npm run overlap -- --pr 101        only the overlaps that involve PR 101
 *   npm run overlap -- --find ramadan  open PRs whose title, branch, files or new slugs mention "ramadan"
 *   npm run overlap -- --pr 101 --comment   (GitHub Actions) also posts the report on the PR, updating one comment
 *
 * Overlaps it reports:
 *   - the same guide or FAQ slug added in two open PRs (two agents writing the same guide)
 *   - the same migration number in two open PRs (only one can be applied)
 *   - the same source file changed in two open PRs (shared docs and wiring files are listed apart)
 * Claims: a PR comment starting "Claimed:", "Reviewing:" or "Working on:" plus the agent's name. Plain JavaScript with
 * only the GitHub CLI (`gh`), so it runs anywhere without an install.
 */
import { execFileSync } from "node:child_process";

const REPO = process.env.GITHUB_REPOSITORY || "iumuhaymin/medinahub";
const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const onlyPr = arg("--pr") ? Number(arg("--pr")) : undefined;
const find = arg("--find")?.toLowerCase();
const comment = args.includes("--comment");

// Files many PRs touch on purpose; a clash there is resolved by "keep both sides", not by talking first.
const SHARED = [/^docs\/AI-LOG\.md$/, /^docs\/HANDOFF\.md$/, /^docs\/EXPIRING\.md$/, /^src\/server\/seed\/content\/sync\.ts$/, /^src\/lib\/guide-topics\.ts$/, /^scripts\/open-questions\.json$/, /^docs\/.*\.png$/];
const CLAIM = /^\s*(claimed|reviewing|working on)\s*:?\s*(.*)$/im;
const MARK = "<!-- pr-overlap -->";

const gh = (...a) => execFileSync("gh", a, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const json = (...a) => JSON.parse(gh(...a));

const prs = json("pr", "list", "--repo", REPO, "--state", "open", "--limit", "100", "--json", "number,title,headRefName,updatedAt,isDraft,files,comments");

for (const pr of prs) {
  pr.paths = pr.files.map((f) => f.path);
  pr.migrations = pr.paths.map((p) => /^drizzle\/(\d{4})_/.exec(p)?.[1]).filter(Boolean);
  pr.slugs = [];
  if (pr.paths.some((p) => p.startsWith("src/server/seed/content/"))) {
    let file = "";
    for (const line of gh("pr", "diff", String(pr.number), "--repo", REPO).split("\n")) {
      if (line.startsWith("+++ ")) file = line.slice(6);
      const m = /^\+\s*slug:\s*"([^"]+)"/.exec(line);
      if (m && file.startsWith("src/server/seed/content/")) pr.slugs.push(m[1]);
    }
  }
  const claims = pr.comments.filter((c) => !c.body.includes(MARK)).map((c) => ({ c, m: CLAIM.exec(c.body) })).filter((x) => x.m);
  const last = claims.at(-1);
  pr.claim = last ? `${last.m[1]}: ${last.m[2].split("\n")[0].slice(0, 80)} (${last.c.createdAt.slice(0, 16).replace("T", " ")} UTC)` : "";
}

/** Map each key (slug, migration or file) to the PRs that carry it, keeping keys with two or more. */
function clashes(pick) {
  const by = new Map();
  for (const pr of prs) for (const k of new Set(pick(pr))) by.set(k, [...(by.get(k) ?? []), pr.number]);
  return [...by].filter(([, ns]) => ns.length > 1 && (!onlyPr || ns.includes(onlyPr)));
}
const slugClash = clashes((p) => p.slugs);
const migClash = clashes((p) => p.migrations);
const fileClash = clashes((p) => p.paths.filter((f) => !SHARED.some((r) => r.test(f))));
const sharedClash = clashes((p) => p.paths.filter((f) => SHARED.some((r) => r.test(f)) && !f.endsWith(".png")));

const out = [];
const list = (title, rows, fmt) => {
  out.push(`\n### ${title}`);
  out.push(rows.length ? rows.map(fmt).join("\n") : "None.");
};
const prLink = (n) => `#${n}`;

if (find) {
  const hits = prs.filter((p) => [p.title, p.headRefName, ...p.paths, ...p.slugs].some((s) => s.toLowerCase().includes(find)));
  out.push(`Open PRs matching "${find}": ${hits.length ? "" : "none."}`);
  for (const p of hits) out.push(`- ${prLink(p.number)} ${p.title} (\`${p.headRefName}\`)${p.claim ? `, ${p.claim}` : ""}`);
} else {
  if (!onlyPr) {
    out.push(`## Open PRs (${prs.length})`);
    for (const p of prs.sort((a, b) => a.number - b.number)) {
      out.push(`- ${prLink(p.number)}${p.isDraft ? " (draft)" : ""} ${p.title.slice(0, 90)} (\`${p.headRefName}\`, updated ${p.updatedAt.slice(0, 16).replace("T", " ")})${p.claim ? `\n  ${p.claim}` : "\n  nobody has claimed it"}`);
    }
  } else {
    const me = prs.find((p) => p.number === onlyPr);
    out.push(`${MARK}\n## Overlap with other open PRs`);
    if (!me) out.push(`PR ${onlyPr} is not open.`);
  }
  list("Same guide or FAQ slug in two open PRs (two agents writing the same page)", slugClash, ([s, ns]) => `- \`${s}\`: ${ns.map(prLink).join(", ")}`);
  list("Same migration number in two open PRs (only one can be applied)", migClash, ([s, ns]) => `- \`${s}\`: ${ns.map(prLink).join(", ")}`);
  list("Same source file changed in two open PRs (agree on issue 13 who goes first)", fileClash, ([f, ns]) => `- \`${f}\`: ${ns.map(prLink).join(", ")}`);
  if (!onlyPr) list("Shared docs and wiring files (on conflict, keep both sides)", sharedClash, ([f, ns]) => `- \`${f}\`: ${ns.map(prLink).join(", ")}`);
  out.push("\nBefore you start or review: claim it with a PR comment `Reviewing: <your name>` or `Working on: <your name>, <what>`, and skip work someone claimed in the last few hours. Rules: `docs/AI-LOG.md`.");
}

const text = out.join("\n");
console.log(text);

if (comment && onlyPr) {
  const me = prs.find((p) => p.number === onlyPr);
  const found = slugClash.length + migClash.length + fileClash.length > 0;
  const old = me?.comments.find((c) => c.body.includes(MARK));
  // Only speak up when there is something to say, or to update an earlier warning.
  if (me && (found || old)) {
    const body = found ? text : `${MARK}\nNo overlap with other open PRs any more.`;
    const existing = old ? json("api", `repos/${REPO}/issues/${onlyPr}/comments`).find((c) => c.body.includes(MARK)) : undefined;
    if (existing) gh("api", "-X", "PATCH", `repos/${REPO}/issues/comments/${existing.id}`, "-f", `body=${body}`);
    else gh("pr", "comment", String(onlyPr), "--repo", REPO, "--body", body);
  }
}
