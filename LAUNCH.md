# Launching zuhair.fi

End-to-end runbook for putting this site live on **zuhair.fi**, served by GitHub Pages
from the `MZuhairKhan/MZuhairKhan.github.io` repository.

## Status — 3 Aug 2026

| Part | State |
|---|---|
| 0 — Pre-flight (domain config, social card, CNAME, gitignore, CV) | ✅ done |
| 1 — Code on GitHub | ✅ pushed, commit `8f18c93` |
| 2 — Pages on Actions | ✅ `build_type: workflow`, all three jobs green |
| **3 — DNS at Zoner** | ⬜ **next — only you can do this** |
| 4 — Verify | ⬜ after DNS propagates |

**The site is live at <https://mzuhairkhan.github.io/>** and already serves the `zuhair.fi`
canonical tags and a `/CNAME` file. It will not answer on `zuhair.fi` until the DNS in
[Part 3](#part-3--dns-at-zoner) is changed — the domain still points at Zoner's
"Under construction" page.

GitHub has **not** registered the custom domain yet (`cname: null`). That is expected and
correct: the DNS check cannot pass while the records point elsewhere. Change the records
first, then [3.3](#33-set-the-domain-in-github).

> **The one step that silently half-breaks the launch:** replacing the A records but not the
> **AAAA** records. IPv6 visitors — most mobile networks — would keep landing on Zoner's
> parking page while everyone else sees the new site.

---
## Part 0 — Pre-flight

Everything in this part is **done**, on 2 Aug 2026. It is kept as a record of what was
changed and how to re-verify it, not as a list of work outstanding. The one item still
open is [0.6](#06-confirm-the-crawler-policy--your-call), which is a decision rather than
a task.

### 0.1 Point the site config at the new domain — ✅ done

`astro.config.mjs` drives the canonical URLs, the sitemap, the Open Graph `og:url`, and the
JSON-LD `Person.url`, so it is the line that matters most:

```js
site: 'https://zuhair.fi',
```

Three more places hardcoded the old host as a fallback or as literal text, plus the brand
book:

| File | Change |
|---|---|
| `src/pages/rss.xml.ts` | `context.site ?? 'https://zuhair.fi'` |
| `public/robots.txt` | `Sitemap: https://zuhair.fi/sitemap-index.xml` |
| `scripts/generate-og.mjs` | `url: 'zuhair.fi'` |
| `BRAND.md` | prose reference to the site's address |

### 0.2 Regenerate the social card — ✅ done

`public/og-image.png` had `mzuhairkhan.github.io` **rendered into the pixels** and still
showed the old portrait. Nothing in the build regenerates it, so it would have kept
surfacing both on every LinkedIn, Slack, and WhatsApp unfurl.

Regenerated via `npm run og` (needs `npx playwright install chromium` once). The card is
1200×630, reads `zuhair.fi`, and carries the new headshot.

While regenerating, `scripts/generate-og.mjs` was also repointed at `src/assets/profile.png`
— the portrait had been renamed and the script would have thrown — and taught to composite
the cutout onto a baked studio sweep, so the disc no longer reads as a lighter hole inside
the green glow the card throws around it.

### 0.3 Add the CNAME file — ✅ done

`public/CNAME` now contains a single line, `zuhair.fi`. It lives in `public/` deliberately:
set the custom domain only in the web UI and the next Actions deploy overwrites it, dropping
the site back to `mzuhairkhan.github.io`.

### 0.4 Keep the junk out of the repo — ✅ done

About 19 MB of local-only material was untracked but not ignored, so a `git add .` would
have swept it into a public repo. Added to `.gitignore`:

```gitignore
Reference/                     # CV LaTeX source + master PDF builds
design-review/                 # 13 MB of regenerable screenshots
.claude/settings.local.json    # machine-local; .claude/skills stays tracked
```

The **phone number** previously at `src/data/profile.ts:11` is gone — you removed it. It was
never rendered on any page, but committing it would have put it in the public history
permanently.

### 0.5 Shrink the CV PDF — ✅ done

`public/cv.pdf` was 6.1 MB, of which 5.7 MB was a single 2400×2402 photo embedded
losslessly by pdfTeX. Replaced with the current two-page build at **263 KB** — a 23×
reduction on a file linked from the nav of every page. The new CV also carries `zuhair.fi`
in its contact line, so it needs no further edit for the domain move.

> If a PDF tool reports this file as password-protected, that is a false positive. There is
> no `/Encrypt` key in the raw file or in the inflated object streams, and the previous CV
> triggers the identical error — it is a parser quirk with pdfTeX output.

### 0.6 Confirm the crawler policy — *your call, still open*

`public/robots.txt` blocks `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`,
`Google-Extended`, and others. That is a legitimate choice, but note the trade-off:
`OAI-SearchBot` and `PerplexityBot` are **answer-engine** crawlers, not training scrapers.
Blocking them means that when a recruiter asks an AI assistant about you, your site cannot
be cited. Google and Bing web search are unaffected either way.

To stay out of training corpora but remain findable in AI search, remove just the
`OAI-SearchBot` and `PerplexityBot` blocks and leave the rest.

### 0.7 Verify the build

```bash
npm ci
npm run check    # 0 errors, 0 warnings, 0 hints
npm run build    # 28 pages
```

Then confirm the domain switch took:

```bash
grep -c "zuhair.fi" dist/sitemap-0.xml     # 27 — every page except /404
grep -rl "mzuhairkhan.github.io" dist/     # prints nothing
cat dist/CNAME                             # zuhair.fi
```

The sitemap count is 27 rather than 28 because Astro's sitemap integration excludes the
404 page by design; it is `noindex` anyway.

---

## Part 1 — Get the code onto GitHub

### 1.1 Fix the git account first

`gh` is authenticated as **`ZuhairLifeline`**, which has **read-only** access to
`MZuhairKhan/MZuhairKhan.github.io`:

```json
{"admin": false, "maintain": false, "pull": true, "push": false}
```

Two separate credentials are involved, and they fail differently:

| | Used for | Currently |
|---|---|---|
| **SSH key** | `git push` | two keys on this machine — see below |
| **`gh` token** | `gh api`, e.g. the Pages setting in Part 2 | `ZuhairLifeline`, no push |
| **git identity** | commit authorship | already `MZuhairKhan` ✅ |

Your commit identity needs no change — `user.email` is already
`109867677+MZuhairKhan@users.noreply.github.com`.

**The SSH keys**, verified by authenticating each against GitHub:

```
~/.ssh/id_ed25519_personal  ->  Hi MZuhairKhan!      <- the one you want
~/.ssh/id_ed25519_lifeline  ->  Hi ZuhairLifeline!
```

Pin the personal key to this repository only, so your Lifeline work is untouched:

```bash
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_personal -o IdentitiesOnly=yes"
```

Then switch the `gh` CLI, which you need for the Pages API call in Part 2:

```bash
gh auth login          # choose GitHub.com -> SSH -> authenticate as MZuhairKhan
gh auth switch --user MZuhairKhan
gh auth status         # confirm MZuhairKhan is the active account
```

`gh auth switch` alone is enough if MZuhairKhan is already a known account; `gh auth login`
adds it if not. Both accounts can stay logged in — `switch` just changes which is active.

Verify before going further:

```bash
ssh -T git@github.com                                    # expect "Hi MZuhairKhan!"
gh api repos/MZuhairKhan/MZuhairKhan.github.io --jq .permissions   # expect push: true
```

### 1.2 Understand what is already on the remote

The repo exists (created Sep 2023) and its `main` branch serves a one-line **"Test page"**.
Your local repo has **zero commits and no remote**. The two histories are unrelated, so a
normal push will be refused.

Since the remote holds nothing but a throwaway placeholder, replacing it is the right move
— but it *is* a history overwrite, so do it deliberately:

```bash
git remote add origin git@github.com:MZuhairKhan/MZuhairKhan.github.io.git
git fetch origin
git log origin/main --oneline    # confirm it is only the test page
```

### 1.3 Commit and push

```bash
git add .
git status                       # verify Reference/ and design-review/ are absent
git commit -m "Add portfolio site"
git push --force origin main     # overwrites the 2023 test page
```

`--force` is safe **only** because this branch has never been shared and contains nothing
you want. Confirm step 1.2 first.

---

## Part 2 — Switch Pages to Actions

This is the step that most often gets missed, and it fails in a confusing way.

The repository's Pages source is currently:

```json
{"build_type": "legacy", "source": {"branch": "main", "path": "/"}}
```

`legacy` means **"Deploy from a branch"**. The workflow in
`.github/workflows/deploy.yml` uses `actions/deploy-pages@v4`, which **only works when the
source is set to GitHub Actions**. Leave it on `legacy` and the deploy job fails with a
permissions/environment error even though the build succeeded.

**Settings → Pages → Build and deployment → Source → GitHub Actions**

Or via the CLI, once authenticated as `MZuhairKhan`:

```bash
gh api -X PUT repos/MZuhairKhan/MZuhairKhan.github.io/pages \
  -f build_type=workflow
```

Then watch the run:

```bash
gh run watch
```

The workflow runs three jobs in sequence: `check` (astro check) → `build`
(`withastro/action@v3`) → `deploy`. Confirm all three are green and that
`https://mzuhairkhan.github.io/` now serves the real site before touching DNS.

---

## Part 3 — DNS at Zoner

### 3.1 What is there now

`zuhair.fi` currently resolves to Zoner's parking page ("Under construction"):

| Type | Name | Current value | Action |
|---|---|---|---|
| A | `zuhair.fi` | `5.249.230.99` | **replace** |
| AAAA | `zuhair.fi` | `2a02:2350:c:400:801b:425a:3b4f:3752` | **replace** |
| A | `www` | `5.249.230.99` | **replace with CNAME** |
| AAAA | `www` | `2a02:2350:c:400:801b:425a:3b4f:3752` | **delete** |
| MX | `zuhair.fi` | `mx1.zoner.fi`, `mx2.zoner.fi` (pref 0) | **⚠ KEEP** |

> **Do not delete the MX records.** If you have or plan to have `@zuhair.fi` email through
> Zoner, removing them kills mail delivery. They are independent of web hosting — changing
> A/AAAA does not affect them.
>
> Equally: leaving the **old AAAA records in place** is the classic way to break this
> migration. Any visitor on IPv6 — most mobile networks — would still hit Zoner's parking
> page while IPv4 visitors see the new site, and it looks intermittent rather than broken.

### 3.2 What to set

In Zoner's control panel (*Omat sivut* → your domain → **Nimipalvelin / DNS-tietueet**),
set the apex to GitHub's four Pages IPv4 addresses:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

And the four IPv6 addresses:

| Type | Name | Value |
|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Then point `www` at the Pages host so it redirects to the apex:

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `mzuhairkhan.github.io.` |

*(All eight IPs verified responding as GitHub Pages edge servers on 2 Aug 2026.)*

Your zone's default TTL is **600 s**, so propagation should take minutes, not hours.

### 3.3 Set the domain in GitHub

**Settings → Pages → Custom domain** → enter `zuhair.fi` → **Save**.

GitHub runs a DNS check; it will fail until 3.2 has propagated. Once it passes, tick
**Enforce HTTPS**. The Let's Encrypt certificate can take up to ~15 minutes to issue —
until it does, HTTPS will show a certificate warning. This is normal; wait it out rather
than re-saving the domain, which restarts the process.

If the certificate seems stuck for more than an hour, remove the custom domain, save, re-add
it, and save again.

---

## Part 4 — Verify

Run these once DNS has settled:

```bash
# apex resolves to GitHub, not Zoner
nslookup zuhair.fi                     # expect 185.199.10x.153
nslookup -type=AAAA zuhair.fi          # expect 2606:50c0:800x::153

# site is live over HTTPS with a valid cert
curl -sI https://zuhair.fi | head -1                  # 200

# www redirects to the apex
curl -sI -L https://www.zuhair.fi | grep -i location

# old address redirects to the new one
curl -sI -L https://mzuhairkhan.github.io | grep -i location

# no stale URLs escaped into the build
curl -s https://zuhair.fi/sitemap-0.xml | grep -c "zuhair.fi"
curl -s https://zuhair.fi/robots.txt | grep Sitemap

# 404 page and CV are served
curl -s -o /dev/null -w "%{http_code}\n" https://zuhair.fi/nope
curl -s -o /dev/null -w "%{http_code} %{size_download}\n" https://zuhair.fi/cv.pdf

# mail is untouched
nslookup -type=MX zuhair.fi            # expect mx1/mx2.zoner.fi
```

Then, by eye:

- Paste `https://zuhair.fi` into the LinkedIn post composer and confirm the card renders
  with the new URL and the green **Z**.
- Open the site on a phone on mobile data (an IPv6 path) — this is what catches a missed
  AAAA record.
- Run Lighthouse on the homepage.

---

## Part 5 — After launch

Worth doing in the first week, none of it blocking:

- **Google Search Console** — add `zuhair.fi` as a domain property (DNS TXT verification
  via Zoner), submit `https://zuhair.fi/sitemap-index.xml`.
- **Update your links** — LinkedIn, GitHub profile, ORCID, Google Scholar, and the CV
  itself all still point at the old address or none at all.
- **Set the repo homepage** — `gh repo edit --homepage https://zuhair.fi`.
- **Add a LICENSE** — the repo is public with no license, which means nobody may legally
  reuse the code, and your written content has no stated terms. MIT for the code plus
  CC BY-NC for the writing is a common split for a portfolio.
- **Add a README** — the repo is your most-visited GitHub page after this launch.

### Known gaps in the tooling

Measured against the standards in your global `CLAUDE.md`, this project is missing:

- **No test suite at all** — there is no test framework, and CI runs only `astro check`.
  For a static site the highest-value coverage is a link checker (internal links, no stale
  domains) and a build-output smoke test.
- **No CHANGELOG enforcement** — `CHANGELOG.md` is well maintained, but nothing in CI
  blocks a PR that fails to update it.
- **No formatter, linter, or pre-commit hooks** — no Prettier, no ESLint, no Husky.
- **No Dependabot or vulnerability scanning.**

### Content still open

From `CONTENT-CHECKLIST.md`, still outstanding at launch:

- Poster-session talk not yet added to `src/data/talks.ts`.
- `/thumbs/unction.png` reuses the generic quantum-multiplier graphic.
- Several experience and leadership detail pages have no photos, and the VTT and Pico
  entries are marked **⚠ verify** — wording that was drafted, not confirmed by you.

The checklist also still lists the Bachelor's thesis body as placeholder text. That is
**out of date** — `src/content/papers/bachelors-thesis.md` has the real abstract and
results. Tick that box.

---

## Rollback

If something goes badly wrong after the DNS switch, reverting is fast because the TTL is
600 s: set the apex A record back to `5.249.230.99` and remove the custom domain in
GitHub's Pages settings. The site stays reachable at `mzuhairkhan.github.io` throughout.
