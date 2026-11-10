import json, subprocess, os, sys, hashlib, re
SP = sys.argv[1]; REPO = "/home/user/medinahub"
def git(*a): return subprocess.run(["git", "-C", REPO, *a], capture_output=True, text=True).stdout
T = "docs/research/translations"
now = json.load(open(f"{SP}/now.json"))
# Guides: the commit that last wrote each Arabic draft.
src = {}
for slug in now["guides"]:
    f = f"{T}/{slug}.ar.html"
    c = git("log", "-1", "--format=%H", "HEAD", "--", f).strip()
    src[("g", slug)] = c or None
# Answers: the newest commit that changed this slug's entry in the file that wins (later files win).
files = sorted(x for x in os.listdir(f"{REPO}/{T}") if re.match(r"faqs-.*\.ar\.json$", x))
cur = {x: json.load(open(f"{REPO}/{T}/{x}")) for x in files}
def at(c, f):
    out = git("show", f"{c}:{T}/{f}")
    try: return json.loads(out)
    except Exception: return {}
for slug in now["faqs"]:
    win = [x for x in files if slug in cur[x]]
    if not win: src[("f", slug)] = None; continue
    f = win[-1]
    commits = git("log", "--format=%H", "--no-merges", "HEAD", "--", f"{T}/{f}").split()
    found = None
    for c in commits:
        a, b = at(c, f).get(slug), at(c + "^", f).get(slug)
        if a != b: found = c; break
    src[("f", slug)] = found
# Short answers: the commit that last changed each slug in faq-leads.ar.json.
LF = "faq-leads.ar.json"
lead_cur = json.load(open(f"{REPO}/{T}/{LF}"))
lead_commits = git("log", "--format=%H", "--no-merges", "HEAD", "--", f"{T}/{LF}").split()
def lat(c):
    try: return json.loads(git("show", f"{c}:{T}/{LF}"))
    except Exception: return {}
for slug in lead_cur:
    found = None
    for c in lead_commits:
        if lat(c).get(slug) != lat(c + "^").get(slug): found = c; break
    src[("l", slug)] = found
# Dump the English at each commit.
dumps = {}
for c in sorted({v for v in src.values() if v}):
    wt = f"{SP}/wt-{c[:8]}"
    out = f"{SP}/en-{c[:8]}.json"
    if not os.path.exists(out):
        subprocess.run(["git", "-C", REPO, "worktree", "add", "--detach", "-f", wt, c], capture_output=True)
        os.symlink(f"{REPO}/node_modules", f"{wt}/node_modules")
        subprocess.run(["cp", f"{SP}/dump.ts", f"{wt}/zz-dump.ts"])
        r = subprocess.run("npx tsx --tsconfig tsconfig.json zz-dump.ts", shell=True, cwd=wt, capture_output=True, text=True)
        open(out, "w").write(r.stdout)
        if not r.stdout: print("DUMP FAILED", c[:8], r.stderr[-400:])
        subprocess.run(["git", "-C", REPO, "worktree", "remove", "--force", wt], capture_output=True)
    try: dumps[c] = json.load(open(out))
    except Exception: dumps[c] = None
norm = lambda s: re.sub(r"\s+", " ", s or "").strip()
report = {"stale": [], "missing": [], "unknown": []}
for (k, slug), c in sorted(src.items()):
    kind = "guides" if k == "g" else "faqs"
    if k == "l":
        d = dumps.get(c) if c else None
        old = d and d["faqs"].get(slug)
        new = now["faqs"].get(slug)
        if not new: continue
        if not old: report["unknown"].append(["lead", slug, (c or "")[:8]]); continue
        if norm(old.get("lead")) != norm(new.get("lead")):
            report["stale"].append(["lead", slug, c[:8], ["lead"]])
            json.dump({"old": old.get("lead"), "new": new.get("lead"), "from": c}, open(f"{SP}/lead-{slug}.json", "w"), ensure_ascii=False)
        continue
    new = now[kind][slug]
    if not c: report["missing"].append([kind, slug]); continue
    d = dumps.get(c)
    old = d and d[kind].get(slug)
    if not old: report["unknown"].append([kind, slug, c[:8]]); continue
    fields = ["title", "summary", "bodyHtml"] if k == "g" else ["question", "answerHtml"]
    changed = [x for x in fields if norm(old.get(x)) != norm(new.get(x))]
    if changed:
        report["stale"].append([kind, slug, c[:8], changed])
        json.dump({"old": old, "new": new, "from": c}, open(f"{SP}/{kind}-{slug}.json", "w"), ensure_ascii=False)
json.dump(report, open(f"{SP}/report.json", "w"), indent=1)
print(len(report["stale"]), "stale;", len(report["missing"]), "missing;", len(report["unknown"]), "unknown")
for s in report["stale"]: print(" stale", s)
for s in report["missing"]: print(" missing", s)
for s in report["unknown"]: print(" unknown", s)
