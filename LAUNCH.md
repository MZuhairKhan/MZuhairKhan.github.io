# Launching zuhair.fi

End-to-end runbook for putting this site live on **zuhair.fi**, served by GitHub Pages
from the `MZuhairKhan/MZuhairKhan.github.io` repository.

## Status — 3 Aug 2026

# 🟢 **The site is live at <https://zuhair.fi>**

| Part | State |
|---|---|
| 0 — Pre-flight (domain config, social card, CNAME, gitignore, CV) | ✅ done |
| 1 — Code on GitHub | ✅ pushed, commit `8f18c93` |
| 2 — Pages on Actions | ✅ `build_type: workflow`, all three jobs green |
| 3.3 — DNS Phase 1, apex | ✅ 4×A + 4×AAAA live, MX untouched |
| 3.5 — Custom domain + HTTPS | ✅ `cname: zuhair.fi`, cert approved, enforced |
| **3.4 — DNS Phase 2, `www`** | ⬜ **outstanding** |
| 4 — Verify | ✅ apex; `www` pending Phase 2 |

Every route serves correctly over both IPv4 and IPv6, the Let's Encrypt certificate
(`CN=zuhair.fi`, valid to 31 Oct 2026) is issued and enforced, `mzuhairkhan.github.io`
301-redirects to the apex, and the Zoner MX records are intact.

### Still outstanding

1. **`www.zuhair.fi` still points at Zoner** and serves "Under construction". Fix with
   [3.4](#34-phase-2--point-www-at-the-site-8-more-records).
2. **The certificate currently covers only the apex** — `https_certificate.domains` is
   `["zuhair.fi"]`. GitHub re-issues it to include `www.zuhair.fi` automatically once www
   resolves to GitHub, so this resolves itself as part of Phase 2.
3. **Plain `http://zuhair.fi/` returns 404** rather than redirecting to HTTPS. HTTPS is
   unaffected. This is GitHub's port-80 listener lagging the domain→repo mapping after a
   custom domain is added; the HTTPS listener learns it immediately via SNI. It normally
   clears within the hour with no action needed. Re-check with:

   ```bash
   curl -sI http://zuhair.fi/ | head -1     # want: HTTP/1.1 301
   ```

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

### 3.1 How Zoner's panel works — read this first

Zoner does not let you delete the records that point at its own hosting. The panel states:

> *These are the DNS records for your domain. Our default records are hidden to ensure
> optimal performance of your products. **You can deactivate them by creating a new record
> of the same type.** If you remove your custom record, the default record becomes active
> again.*

Three consequences:

1. **You override, you do not delete.** Adding a custom **A** record at the apex silently
   deactivates Zoner's default apex **A**. There is no delete button to hunt for.
2. **Overriding is per type and per name.** A custom apex **A** does nothing to the apex
   **AAAA**, or to `www`'s **A**. Each of the four defaults must be overridden separately.
3. **A `CNAME` on `www` will not work here.** CNAME is a different *type*, so it would not
   deactivate the default `www A` / `www AAAA`, and a CNAME may not legally coexist with
   other records at the same name. Point `www` at the same A/AAAA addresses instead.

That last point is why the usual GitHub Pages advice (`CNAME www → user.github.io`) does not
apply to this registrar.

### 3.2 What is there now

Toggle **Show default DNS records** on to see everything. The zone currently holds:

| Name | Type | Origin | What it is | Action |
|---|---|---|---|---|
| *(apex)* | A | default | `5.249.230.99` — Zoner parking | **override** |
| *(apex)* | AAAA | default | `2a02:2350:c:400:…` — Zoner parking | **override** |
| `www` | A | default | `5.249.230.99` | **override** |
| `www` | AAAA | default | `2a02:2350:c:400:…` | **override** |
| *(apex)* | MX ×2 | custom | `mx1` / `mx2.zoner.fi` | **⚠ leave alone** |
| `www` | MX | default | mail routing | leave alone |
| *(apex)* | TXT | custom | SPF | **⚠ leave alone** |
| `ed1._domainkey` | CNAME | default | DKIM signing key | **⚠ leave alone** |
| `rsa1._domainkey` | CNAME | default | DKIM signing key | **⚠ leave alone** |
| `_acme-challenge` | TXT | default | Zoner's own cert validation | harmless, leave |

> **Touch nothing in the mail rows.** MX, TXT/SPF and the two `_domainkey` CNAMEs are what
> make `@zuhair.fi` email work. They are completely independent of web hosting — changing
> A and AAAA does not affect them.

### 3.3 Phase 1 — get `zuhair.fi` live (8 records)

Do this first and verify it before touching `www`. Only these eight records are needed for
the site itself.

**Leave the Name field empty** for every one of them (empty = the apex, `zuhair.fi`). If the
form insists on something, use `@`.

Add four **A** records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Add four **AAAA** records:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Set TTL to **300** if the field is editable — it makes a rollback take five minutes instead
of an hour. You can raise it once the site is confirmed working.

As soon as the first custom A record saves, Zoner's default A is deactivated and the apex
stops resolving to the parking page.

> Skipping the AAAA half is the classic way to half-break this. IPv6 visitors — which on
> mobile networks is most of them — would keep landing on Zoner's parking page while
> everyone else sees the new site, and it presents as intermittent rather than broken.

### 3.4 Phase 2 — point `www` at the site (8 more records)

Optional but worth doing: without it, `www.zuhair.fi` keeps serving Zoner's parking page.

Add the same eight addresses again, this time with the Name field set to **`www`** — four
**A** records and four **AAAA** records, identical values to 3.3.

GitHub reads the `CNAME` file in the deployment (which contains `zuhair.fi`) and redirects
`www.zuhair.fi` to the apex automatically. Nothing further is needed on the GitHub side.

### 3.5 Set the domain in GitHub

Only after 3.3 has propagated:

**Settings → Pages → Custom domain** → `zuhair.fi` → **Save**.

GitHub runs a DNS check that will fail until the new records are visible, which is why this
step comes last. Once it passes, tick **Enforce HTTPS**.

The Let's Encrypt certificate can take up to ~15 minutes to issue; until it does, HTTPS
shows a certificate warning. That is expected — wait rather than re-saving the domain, which
restarts issuance. If it is still stuck after an hour, remove the custom domain, save, then
re-add and save.

*(All eight GitHub addresses were verified as responding Pages edge servers on 2 Aug 2026.)*
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
