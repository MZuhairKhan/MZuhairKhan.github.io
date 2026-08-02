# Changelog

All notable changes to this portfolio are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The project is pre-release (0.1.0),
so everything to date is grouped under _Unreleased_.

## [Unreleased]

### Added

- **Brand book** ([`BRAND.md`](BRAND.md)): the design-system reference — palette, the green **Z** mark, Computer Modern type and scale, spacing/surfaces, components, motion, voice, do/don'ts, and a file map — so future additions stay on-brand.
- **Image lightbox**: detail-page figures, project/paper thumbnails, in-content images, and the QSilver/QBronze diplomas now open enlarged (but not full-screen) in an in-page overlay instead of a new tab — dismissed by the close button, a backdrop click, or Escape, with the page scroll locked while open. Credly certification badges keep linking out to their verification pages.
- **Hero**: a value-proposition line, an "open to…" availability badge with a live (pulsing) indicator, and a clear **Get in touch** primary call-to-action.
- **Scroll-reveal animations**: sections fade and rise into view on scroll, with a staggered cascade for cards and timeline entries. Fully disabled for `prefers-reduced-motion` and no-JS visitors.
- **More motion** (all reduced-motion-safe): a staggered **hero entrance** (eyebrow → name → tagline → pitch → meta → pills → actions, with the portrait) on first load; **programming skill bars that fill** from empty when the Skills section scrolls into view; a **back-to-top button** that fades in after scrolling; and a thin **scroll-progress bar** at the top of the viewport.
- **Smooth page transitions** via Astro's `ClientRouter`; all interactive scripts (scroll-reveal, mobile nav, scroll-spy, cite-copy) re-initialise on `astro:page-load`.
- **Per-item structured data (JSON-LD)** on project detail pages (`SoftwareSourceCode` / `CreativeWork`) and paper detail pages (`Thesis` / `ScholarlyArticle`).
- **Projects** sourced from GitHub, each with a thumbnail (real logo, real image, or generated thematic art) and a click-to-expand card: Pause, Reform, The Third Kind, Density Matrices, QFT Quantum Adder, Labyrinth, Agentic GraphRAG, Quantum Hack / QMill (Unction + peaked-circuit simulation), DAQC-VQE, Classiq, IonQ, Harbor, and more.
- **Home "top 3 + View all" rows** for Projects, Talks, and Awards, backed by dedicated `/projects`, `/talks`, and `/awards` listing pages.
- **Experience / Education / Leadership timelines** with clickable organisation logos (Lifeline, VTT, Aalto, AQJC, AaltoAI), full-size stacked sub-logos (Harbor under Lifeline, Pico under Aalto), and dedicated `/experience/*` and `/leadership/*` detail pages.
- **Award ↔ repo/project cross-links**, a **Cite (BibTeX)** affordance on papers, and real award photos with attribution (Mimir — Joonatan Rimpiläinen; Junction — Junction).
- **Aalto + Pico logos** on the bachelor's-thesis card and detail page.
- **Lifeline Ventures experience** split into two roles (Data Engineer; Trainee via Harbor by AaltoES) from the project brief.
- **Reusable screenshot skill** (`.claude/skills/screenshot/`) for visual verification across desktop, mobile, and expanded-card states (Playwright).
- **SEO & social**: canonical URLs, Open Graph + Twitter cards, a 1200×630 OG image, `Person` JSON-LD, sitemap, RSS feed, and a `robots.txt` that blocks AI/scraper bots and hides `cv.pdf` while keeping the site indexable.
- **Accessibility**: skip-to-content link, `:focus-visible` styling, `prefers-reduced-motion` handling, `aria-current` navigation, and an `<h1>` on every listing page.
- A custom **404** page and an `@media print` stylesheet.
- **Willo Technologies** link in the Deep Dive Commercialisation Competition write-up (an inline hyperlink in the text).
- **ORCID** link wired into the Contact section, the footer, and the JSON-LD `sameAs`, pointing to the verified ORCID iD.
- **Google Scholar** link in the footer and the JSON-LD `sameAs`.

### Changed

- **Mobile nav drawer flattened to a single column.** It was rendering the group label in a left column and that group's links in a right one, spread down the whole viewport. Cause was CSS specificity: `.nav-links > li` sets `display:flex` at (0,1,1), which out-ranks the mobile override `.nav-group { display:block }` at (0,1,0) — media queries add no specificity — so each trigger stayed laid out beside its own menu. The drawer now drops the Background / Showcase / Recognition headers entirely (they exist to keep the *desktop* bar short) and lists all eleven destinations flat. Two further fixes fell out of measuring it: rows were ~22px tall, well under the 44px touch-target minimum, and `ul li { margin-bottom: 8px }` from `global.css` — a prose-list rule — was applying twice over in the drawer, giving 52px steps inside a former group and 60px across one. Rows are now a uniform 44px with an even 44px rhythm. Desktop is untouched.

- **Site moved to the `zuhair.fi` domain.** `astro.config.mjs`'s `site` drives the canonical URLs, sitemap, `og:url`, and the JSON-LD `Person.url`, so that is the substantive change; three further places hardcoded the old host as a fallback or literal text ([`rss.xml.ts`](src/pages/rss.xml.ts), [`robots.txt`](public/robots.txt), [`generate-og.mjs`](scripts/generate-og.mjs)), plus the [`BRAND.md`](BRAND.md) intro. Added [`public/CNAME`](public/CNAME) — it lives in `public/` so every build re-emits it; setting the custom domain only in GitHub's web UI means the next Actions deploy silently reverts the site to `mzuhairkhan.github.io`. Verified: 27 sitemap entries on the new host (every page except `/404`, which Astro excludes by design), zero stale references anywhere in `dist/`.
- **Social card regenerated** for the new domain and the new portrait — `public/og-image.png` is a pre-rendered PNG that no build step touches, so both were baked into the old pixels. [`generate-og.mjs`](scripts/generate-og.mjs) was also repointed at the renamed portrait asset (it would otherwise have thrown) and now composites the cutout onto a baked studio sweep, matching the card's own ambient so the disc stops reading as a lighter hole inside the green glow the card throws around it. Safe to bake here, unlike on the site, because nothing on a static card animates.
- **Repo hygiene before the first commit:** `.gitignore` now excludes `Reference/` (CV LaTeX source and master PDFs), `design-review/` (13 MB of regenerable screenshots), and `.claude/settings.local.json` — roughly 19 MB of local-only material that was untracked but not ignored, so a `git add .` would have swept it into a public repository.
- **Homepage section order regrouped into a narrative arc.** Was: Experience, Projects, Skills, Papers, Talks, Achievements, Leadership, Education. Now three named blocks: **Background** (Education → Experience → Leadership) → **Showcase** (Projects → Papers → Talks) → **Recognition** (Achievements → Skills). Leadership sits with the record rather than beside the awards, because outreach is something you did, not something you won; Skills sits with the credentials. The nav mirrors the page order exactly, so the dropdowns read as a table of contents, and it is down to five top-level items from six.

  Education moves from 10th to 2nd. Promoting it to 3rd was not enough on its own: Experience is **1360 px tall**, more than double any other section, so Education still did not appear until 2468 px — over three screens down — while the tagline leads with "Master's Student at Aalto". Ordering it ahead of Experience brings it to 1108 px (1.4 screens) and costs Experience only 0.8 of a screen. It also reads better, since the About paragraph ends on the Master's and Education is the natural next beat.

  Skills moves down from 5th to 9th: it is reference detail, and it was interrupting the Experience → Projects → Papers evidence arc. The old **"Research"** group is retired — it was filing Achievements and Leadership under a label that described neither — and **"Work"** with it, which had been a navigation trap: it held Projects/Papers/Talks while the section actually headed *"Work Experience"* sat in a different group entirely.
- **Section headings tightened.** *"Selected Publications"* → **"Publications"** (dropping "Selected", which implied a filtered subset of a longer list), and *"Work Experience"* → **"Experience"**, so no heading competes with a nav group label. The `publications` section id is unchanged — renaming it would have to move the `id`, the nav's `section:` key, and the CSS selectors in lockstep, for no reader-facing gain.

  Both positional rules in `global.css` — the alternating cream bands and the extra top padding on each block's opening section — were re-derived for the new order and now carry a note to re-check them on any future reorder.
- **The "still current" marker moved from the date to the timeline rail.** Entries ending in "– Present" no longer append a pulsing dot after the date; instead the hollow timeline node fills with accent green and pulses (`.timeline .entry.is-current::after`). The live role is now findable by scanning the rail, and the date column stays clean. Applies to all three timelines (Experience, Education, Leadership); reduced-motion holds it solid via the existing global block.
- **New hero portrait** ([`src/assets/profile.png`](src/assets/profile.png)): the July 2026 studio headshot. Cropped square (780×780) and composed for the circular mask — head at ~60% of the frame, eyes at ~42% from the top, centred on the head rather than the shoulders. Kept as a **background-removed cutout with live alpha**; the disc backdrop is painted in CSS instead of baked into the image. That matters because the hero halo behind the portrait animates: any fixed fill mismatched it, and a flat `#fafaf6` plate punched a visible white hole in the green field (25/255 step at the rim, versus 6.5 now). The CSS sweep is two radial gradients, both sized to reach zero *at or inside* the inscribed circle, so the rim is literally the hero's own pixels and cannot mismatch — with an off-centre key light behind the head restoring the tonal gradation the old backdrop had. **`npm run og` still needs running** to pull the new face into the share card.
- **CV replaced** with the current two-page build ([`public/cv.pdf`](public/cv.pdf)): **263 KB, down from 6.1 MB** — the old file embedded a 2400×2402 photo losslessly. It also now carries `zuhair.fi` in the contact line. The CV is linked from the nav on every page, so this is the single largest page-weight win on the site.
- **Rewrote and expanded the auto-generated copy from real sources.** Every project write-up was researched against its GitHub repo (Pause also against its local source) and expanded with verified detail in a natural voice; the thesis page was rebuilt from the Aaltodoc record (real title, 2024-04-26 date, supervisor Matti Raasakka / advisor Shuji Nakamura, the 3D-cavity/QCR topic, and the measured Q-factors of ~67,000 Al / ~12,000 Cu). In the process several unsupported claims were corrected: removed an invented arXiv citation on the Quantum Hack write-up, dropped a "Codecov" claim with no config in the repo, softened "several releases" (only two) and "trapped-ion hardware" (targets IonQ Forte) and a docs-only adder no longer implies running code, and the DAQC-VQE team list was fixed (added Shilan Abo, corrected César Bertoni Ocampo) with its real result added. CV-backed facts not restated in a repo (Alphapolis "25th in Italy", DAQC "Finalist") were kept.
- **Corrected the Quantum ML Battle role** from "Moderator" to **Invited Speaker** (per the CV — presented the fault-tolerant case), with the description rewritten to match.
- **Decorative accent switched to the CV's exact green** (`#46a247` — the `Overleaf_green` from `CV.cls`): section underlines, timeline rings, the favicon Z, the portrait ring, fills and glows. Interactive text and buttons stay on the darker `#2a6a2a` for WCAG AA.
- **Social/share image** is now an on-brand card — the circular portrait (green ring + glow), name, and tagline set in Computer Modern on the cream ground, with a faint **Z** watermark behind (`public/og-image.png`, 1200×630), regenerable with `npm run og` ([`scripts/generate-og.mjs`](scripts/generate-og.mjs)). Shared links preview with the photo; the favicon keeps the green **Z**.
- **robots.txt**: explicitly allow link-preview / unfurl crawlers (Twitterbot, facebookexternalhit, LinkedInBot, Slackbot, Discordbot, WhatsApp, TelegramBot, Pinterest) so shared links reliably render the card image, without loosening the AI/scraper blocks.
- **Visual polish pass (Tier-1 aesthetic audit)** to break up the flat single-page scroll and tighten hierarchy, while preserving the Computer Modern + single-green identity:
  - **Alternating section bands**: a second warm-cream surface (`--color-bg-alt: #f3f1e8`) now bands About, Projects, Publications, Achievements and Education full-bleed, chunking the long scroll into clear "acts". The faint full-width hairline section dividers were dropped in favour of the banding.
  - **Stronger type hierarchy**: timeline entry titles enlarged to 1.2 rem/700 (and role sub-titles to 1.08 rem/700), putting the previously-unused bold weight to work; base `h2` raised to 1.75 rem.
  - **Two-tier vertical rhythm**: base section padding 3 → 4 rem, with the substantive anchor sections (Experience, Publications, Leadership) opening on extra (6 rem) air; mobile section spacing 2 → 3 rem.
  - **Constrained prose measure**: About copy and timeline bullets capped at 52 rem so long lines no longer run the full 64 rem container.
  - **Crafted section labels**: uppercase green eyebrows nudged to 0.8125 rem with wider 0.16 em tracking.
  - **Chips read as chips**: skill-set tags, paper topic tags and hero profile pills gained a 10% green fill + hairline green border (replacing a near-invisible 6% tint).
  - **Monochrome icons**: the pink 📍 location emoji and the multicolour 🏆 award emoji are now green stroked inline SVGs, on-palette with the rest of the page.
  - **Card depth**: a warm rest shadow lifts the white cards off the cream, and card hover now lifts (`translateY(-3px)`) with a green-tinted shadow.
  - **Secondary text** darkened (`--color-soft` #5e5e5e → #4a4a44) and dates set with tabular figures for a tidy ledger down the timeline.
  - **Skills layout**: moved Skill Set directly under Languages in the right column (it was full-width below both columns, leaving a large empty gap beside the short Languages list), balancing the two columns.
- **Grouped the navigation by theme**: the 11 flat top-level links are now six — About, **Work ▾** (Experience, Projects, Skills), **Research ▾** (Papers, Talks, Achievements, Leadership), Education, Contact, CV ↗ — with dropdowns on desktop (hover, keyboard, and touch-tap; a single menu open at a time, with a hover "bridge" so the menu doesn't drop across the gap) and inline-expanded groups in the mobile drawer. Scroll-spy highlights the active section and its parent group.
- **Featured the Work Experience section**: spotlit full-bleed on white with a larger dark serif headline, so it reads as the page's anchor "act" rather than one band among many.
- **Bigger, composed hero portrait**: scaled the avatar up (220 → 300 px) and added a quiet signature treatment — a soft green halo and an offset ring echo behind it.
- **Unified status badges and fixed badge wrapping**: card status badges share one letter-spacing/shape, and on the expandable cards the badge now sits on its own right-aligned row beneath the title (long titles and long placement labels like "25th in Italy" no longer wrap around or compress the heading).
- **Consolidated profile links into Contact**: the Get-in-touch block now carries the full set (email, LinkedIn, GitHub, ORCID, Scholar, CV), and the footer was reduced to just the copyright / "Updated" / "Built with Astro" line — removing the duplicated link list. (The hero keeps its own LinkedIn/GitHub.)
- **Taller hero that scales from large to normal**: on wider screens the intro fills ~72vh on landing with its content enlarged to ~120%, then eases down to 100% as you scroll the first screen (transform-only, reduced-motion-safe; horizontal overflow from the scale-up is clipped).
- **Portrait glow**: the photo now carries a soft green glow (a `box-shadow` halo that hugs the circle and can't cause page scroll), replacing the offset "echo" ring and the earlier near-invisible radial gradient.
- **Project detail award** now uses the green SVG trophy, matching the cards (was the multicolour 🏆 emoji).
- **Featured projects reordered** on the home row: Pause → Harbor → Junction.
- **Reordered the home sections** to lead with work: About → Experience → Projects → Skills → Publications → Talks → Achievements → Leadership → Education → Contact (navigation order matched).
- **Detail pages (experience / leadership / awards)** now place secondary photos in a right-hand column beside the write-up (stacking below the text on mobile) instead of above the title.
- **Experience detail pages** now lead with a full-width photo at the top (VTT Q50 launch, Lifeline Data Engineer, Harbor trainee, and Pico), with a second photo beside the write-up on the Pico page.
- **Leadership order**: AaltoAI (Vice Chair) now appears above the Aalto Quantum Journal Club.
- Renamed the IQM award to **"Quantum Hackathon Challenge - IQM"** and set its provider to **Womanium**.
- Award cards now support a logo plate and a custom thumbnail ratio: the **Womanium** (IQM challenge) and **QCoder** cards show their official logos, the **Prompt Finance Hackathon** card uses the event poster's title banner (cropped to the top portion), and **Prosperity 3** uses the IMC competition banner.
- The **DAQC-VQE** project now uses the same updated Womanium logo as its award, and the **Pause** project card uses its app-icon hourglass on a tinted logo plate (keyed off its background to match the competition-logo cards).
- **Redesigned the Skills section** with proficiency bars, language pills, and skill chips (replacing the dot grid).
- Programming skill bars now show just the bar (the numeric `N/6` rating was removed from the display; kept in the screen-reader label).
- Added **SQL** to the Programming skills.
- **Expanded the About bio** (first person) and removed the width cap so it fills the page; paired two quotes side by side.
- **Optimised the hero image** through `astro:assets` (~5 MB PNG → ~14 KB WebP at 2× display size); generated lightweight thumbnails throughout.
- **Contrast fixes** to meet WCAG AA (muted body text, primary button, WIP badge).
- Content config migrated to `astro/zod` + `z.url()`; paper year is derived from its date.
- Updated **Astro 6.3.7 → 6.4.8**.

### Fixed

- **Hero halo on mobile**: the portrait's green glow stretched into a wide ellipse and pushed the page ~20px wider than the viewport (horizontal scroll into empty space). The photo wrapper now hugs the image so the halo stays circular, and the hero clips horizontal overflow.
- Removed a placeholder "replace this body…" note that was shipping on the thesis page.
- Fixed the About section width (was capped at 42 rem while the rest of the page used 64 rem).
- Fixed the Pico penguin overlapping the Aalto wordmark: cropped Aalto to the iconic "A!" mark and switched sub-logos to a full-size stacked layout.
- Home **Achievements** detail links now match the awards page (link to `/awards/<slug>` as well as related projects).
- `npm run check` now works offline (`@astrojs/check` + `typescript` added as devDependencies) and is gated in CI.
- Removed stray source images from the repo root (Qbronze/Qsilver certificate scans and the raw Harbor/Pico photos, now optimised under `public/experience/`).
- Removed orphaned award thumbnails (`award-prompt.png`, `award-imc.png`) superseded by the new card imagery.
- Eliminated a horizontal page shift between routes by reserving the scrollbar gutter (`scrollbar-gutter: stable`): short pages like `/papers` no longer jump right when the vertical scrollbar is absent.
- On detail pages, a side photo now aligns with the top of the content (beside the bullets) instead of starting below them; captioned the Pico dilution-refrigerator photo.

### Security

- `npm audit` reports two **moderate, development-only** advisories: esbuild's dev-server arbitrary file read on Windows (via Astro) and a YAML stack-overflow in the `@astrojs/check` language server. Neither runs in the built static site, and the available fixes are breaking (Astro 7 / downgrading `@astrojs/check`), so they are deferred and tracked.

### Known follow-ups

- Compress `public/cv.pdf` (~6 MB) — needs Ghostscript locally.
- Astro 7.0.0 (major) is available for a future upgrade; would also clear the esbuild advisory.
