# Brand Book

The visual system for **zuhair.fi**. It exists so future pages, sections, and components stay consistent with the identity already established.

The system is defined **in code** — design tokens live in [`src/styles/global.css`](src/styles/global.css) (`:root`), and component styles live with each component. This document is the human-readable reference. **When you build something new, reach for the CSS custom properties below — don't hard-code hexes, sizes, or spacing.**

---

## 1. Identity

**An academic CV, made digital.** Restrained, literate, and precise — it mirrors the author's LaTeX CV (Computer Modern type) and earns "premium" through discipline rather than decoration.

Principles, in priority order:

1. **Restraint.** Whitespace and rhythm over ornament. If a flourish doesn't serve the content, cut it.
2. **One accent.** A single green carries every accent job. No second hue (a brass "honors" accent was considered and deliberately rejected).
3. **Computer Modern everywhere.** The serif is the personality; keep it.
4. **Honesty in copy.** First person, concrete, no hype.
5. **Accessible & reduced-motion safe.** Meet WCAG AA contrast; every animation has a `prefers-reduced-motion` off-ramp.

---

## 2. Logo & marks

| Mark | Asset | Use |
| --- | --- | --- |
| **The "Z"** | [`public/favicon.svg`](public/favicon.svg) | Favicon and brand mark. A Computer Modern "Z" in accent green (`#46a247`; `#5cb85c` on dark backgrounds). The letter mark is the right choice at favicon sizes where a photo can't read. |
| **Wordmark** | text | The full name set in CMU Serif **700** (nav brand, hero `h1`). |
| **Portrait** | `src/assets/profile.jpg` | Circular, accent-green border + a **breathing green halo** (a `radial-gradient` pseudo-element that slowly pulses opacity + scale; reduced-motion holds it solid). The recurring "person" mark in the hero, and the focal image of the social/share card (`public/og-image.png`). |

**Z usage:** keep it green on a cream/white ground; don't recolor, rotate, skew, or add drop-shadows/gradients. Give it clear space on all sides of at least the height of its crossbar. On dark grounds use the light green (`#5cb85c`).

The Aalto "A!" appears only as a third-party institution logo (education/experience) — it is **not** part of this brand.

---

## 3. Color

Light theme only (a designed dark mode is a future option). All values are tokens in `:root`.

| Token | Hex / value | Role |
| --- | --- | --- |
| `--color-accent` | `#46a247` | **Decorative** green — the CV's Overleaf green exactly: section underlines, timeline ring-nodes, the Z, fills, borders, glows |
| `--color-accent-light` | `#5cb85c` | Lighter green: large fills, the Z on dark |
| `--color-accent-dark` | `#2a6a2a` | **Interactive** green: links, solid-button bg, badge/eyebrow text (white-on-this is 6.58:1, AA) |
| `--color-accent-bg` | `rgba(70,162,71,.06)` | Faint tint: code, abstract block, status badges on white |
| `--color-tag-bg` / `--color-tag-border` | `rgba(70,162,71,.10)` / `.20` | Pill **chips** on the cream ground (fill + hairline) |
| `--color-text` | `#1a1a1a` | Primary text |
| `--color-soft` | `#4a4a44` | Secondary text: dates, org lines, taglines |
| `--color-muted` | `#6b6b66` | Tertiary text (AA-compliant on cream) |
| `--color-bg` | `#fafaf6` | Page background (warm cream) |
| `--color-bg-alt` | `#f3f1e8` | Alternating section bands |
| `--color-card` | `#ffffff` | Cards; the featured-section spotlight |
| `--color-border` / `--color-border-soft` | `#e5e3dc` / `#efede5` | Borders / faint dividers |
| `--color-btn-bg` / `-hover` / `-text` | `#2a6a2a` / `#21521f` / `#fff` | Solid buttons (white-on-green is 6.58:1, AA) |

**Rules:** exactly one accent (green); deploy it tonally — `--color-accent` (`#46a247`) for **decorative** marks (underlines, rings, fills, the Z), `--color-accent-dark` (`#2a6a2a`) for **interactive** text/buttons so they clear AA, `--color-accent-light` for large fills. No second hue. Icons are monochrome (`currentColor`).

**Provenance (vs. the LaTeX CV):** the typeface matches exactly — the CV sets no font package under `[T1]{fontenc}`, i.e. **Computer Modern**, which is what CMU Serif/Typewriter are. The **decorative** accent matches the CV's `Overleaf_green` exactly (`#46a247`); only the **interactive** green is darkened to `#2a6a2a` so white-on-green buttons and link text clear WCAG AA (the CV's bright green fails white-text contrast). Secondary text is a touch darker than the CV's `#737373`, and the page uses a warm cream rather than the CV's neutral white — for legibility/warmth on screen.

---

## 4. Typography

| Face | Stack | Use |
| --- | --- | --- |
| **CMU Serif** | `'CMU Serif', Georgia, 'Times New Roman', serif` (`--font-serif` / `--font-sans`) | Everything — body and headings |
| **CMU Typewriter Text** | `'CMU Typewriter Text', ui-monospace, …` (`--font-mono`) | Code, BibTeX, tabular/utility text |

Self-hosted woff2 under [`public/fonts/`](public/fonts/) (OFL). Only **two physical weights** exist: `400–500` → regular, `600–700` → bold. Manufacture hierarchy with **size** and by reserving **700**, since intermediate weights aren't available.

**Font files & `@font-face`** (declared at the top of [`src/styles/global.css`](src/styles/global.css), all `font-display: swap`):

| File | Family / style | `font-weight` |
| --- | --- | --- |
| `cmu-serif-500-roman.woff2` | CMU Serif, upright | `400 500` |
| `cmu-serif-500-italic.woff2` | CMU Serif, italic | `400 500` |
| `cmu-serif-700-roman.woff2` | CMU Serif, bold upright | `600 700` |
| `cmu-serif-700-italic.woff2` | CMU Serif, bold italic | `600 700` |
| `cmu-typewriter-text-500-roman.woff2` | CMU Typewriter Text | `400 700` |

Token stacks: `--font-serif` / `--font-sans` = `'CMU Serif', Georgia, 'Times New Roman', serif`; `--font-mono` = `'CMU Typewriter Text', ui-monospace, 'SF Mono', Menlo, Consolas, monospace`.

**Typeset line-breaking:** headings, pull-quotes and captions use `text-wrap: balance`; running prose uses `text-wrap: pretty` — emulating the even line-breaking of a LaTeX document. The two critical above-the-fold serif weights (regular 500, bold 700 roman) are `<link rel="preload">`-ed so the headline text paints without waiting on the font request.

**Type scale**

| Element | Size / weight | Notes |
| --- | --- | --- |
| `h1` (hero) | `clamp(2rem, 4vw, 2.75rem)` / 700 | `letter-spacing: -0.02em` |
| `h2` | `1.75rem` / 600 | |
| `.section-title` (eyebrow) | `0.8125rem` / 600, uppercase | `letter-spacing: 0.16em`, green, short green underline — the section "kicker" |
| `.section-title--feature` | `clamp(1.5rem, 3vw, 1.85rem)` / 700 | Dark serif headline for the **one** featured section (Work) |
| `.entry-title` | `1.2rem` / 700 | Timeline entry titles |
| `.entry-role-title` | `1.08rem` / 700 | Sub-roles |
| Body | `1rem` / 1.65 | Cap running prose at **~52rem** measure |
| Bullets | `0.9375rem` | |
| Meta (dates/org) | `0.875rem`, `--color-soft` | `tabular-nums` on dates |

---

## 5. Spacing, layout & surfaces

- **Spacing scale:** `--space-1 … --space-16` (`0.25rem` → `4rem`). Use the tokens, never raw px.
- **Width:** `--max-width: 64rem` for cards/timeline; running prose constrained to **~52rem**.
- **Radius:** `--radius: 6px` (cards, buttons); **pills** `999px`; **status badges** `4px`. ("Rounded = tag, squared = status.")
- **Shadow:** `--shadow: 0 1px 3px rgba(58,50,30,.07)` (warm). Card hover = lift `translateY(-3px)` + green-tinted shadow.
- **Section rhythm:** `.section` = `4rem` vertical; anchor sections (`#experience`, `#publications`, `#leadership`) open with `6rem`; mobile `3rem`.
- **Hero surface:** the hero is **not** plain cream — it's an "engineering graph-paper" field: a fine + heavier-major green grid (`repeating-linear-gradient`, accent at low alpha) over cream, with the green **tint radiating from the portrait** as an isotropic `radial-gradient(circle …)` whose alpha follows an inverse-square law `α(t)=0.30/(1+(7t)²)`. The bottom fades into the plain About band via a `linear-gradient` mask (`.hero::after`). All built from the one accent green; `overflow-x: clip` contains the halo + scale.
- **Banding:** plain page cream (`--color-bg`) and the deeper band (`--color-bg-alt`) **alternate**. `#about` stays plain so it flows out of the hero's faded base; the cream bands are `#experience, #skills, #talks, #leadership, #contact`; the rest (`#projects, #publications, #achievements, #education`) stay plain. No full-width dividers — the bands separate sections.
- **Featured section:** Work Experience keeps the larger `.section-title--feature` headline, but now sits on a normal **cream** band — the old white spotlight (`.section--feature` background) was removed so the plain/cream alternation stays unbroken.

---

## 6. Components

Reuse these rather than inventing new patterns. (File in parentheses.)

- **Buttons** — `.button` (solid green) / `.button-ghost` (outline). _(global.css)_
- **Tags / pills** — `.tag`: `999px`, `--color-tag-bg` + `--color-tag-border`. Soft-noun labels (skills, topics). _(global.css)_
- **Status badges** — `.xcard-badge` / `.type-badge`: `4px`, uppercase, `0.08em`, `--color-accent-bg`. On cards they sit in a right-aligned meta row **under** the title. _(ExpandableCard, PaperCard)_
- **Cards** — white, thin border, warm rest shadow, hover lift + green border; two-line title min-height keeps rows aligned. _(ExpandableCard, PaperCard)_
- **Timeline** — `.timeline` / `.entry`: left rail + green ring-nodes, right-aligned tabular dates. The rail is a **softened accent** (`rgba(70,162,71,.45)`) so the line reads on cream while the full-accent ring-nodes lead. _(global.css)_
- **"Present" dot** — entries whose period ends in `Present` (rendered in Experience / Leadership / Education) get a small **breathing green dot** after the date (`.present-dot`), echoing the hero availability ping. `aria-hidden` (the word "Present" carries the meaning); reduced-motion holds it solid. _(global.css)_
- **Section headers** — `.section-title` eyebrow; `.section-title--feature` for the featured headline. _(global.css)_
- **Navigation** — themed dropdown groups: `.nav-group` / `.nav-trigger` / `.nav-menu`. One menu open at a time; hover + click + keyboard; inline-expanded in the mobile drawer; scroll-spy highlights the active section and its parent group. _(BaseLayout)_
- **Language pills** — CEFR-level treatment; the chip quality bar to match. _(Skills)_
- **Skill bars** — thin green fill that animates from empty on scroll-in. _(SkillBar)_
- **Quote blocks** — `.about-quote`: italic, green left rule. _(About)_
- **Lightbox** — images in `.project-thumb`, `.project-body`, `.paper-body`, `.role-hero`/`.role-figure`, or any element with `data-zoom-src`, open enlarged (not full-screen); dismiss via close button, backdrop, or Escape. _(BaseLayout)_
- **Scroll-progress bar** + **back-to-top** button — fixed chrome.
- **Focus ring** — `:focus-visible`: a 2px `--color-accent-dark` outline plus a cream `box-shadow` halo so the indicator reads on cream bands, white cards and green buttons alike. The lightbox returns focus to its opener on close. _(global.css, BaseLayout)_
- **Print** — `@media print` collapses the site into a clean one-page CV: chrome hidden, the decorative green field + hero scale neutralized, external-link URLs printed inline, a print-only contact header shown, and `break-inside: avoid` so entries never split. _(global.css)_ _(BaseLayout)_

---

## 7. Motion

All motion is **gated by `prefers-reduced-motion`** (reduced-motion visitors get the final state immediately) and kept subtle.

- **Scroll-reveal:** sections fade and rise in (`0.4s`), with a staggered cascade for cards and timeline entries (`0.35s`, delays `0.05–0.25s`). Gated by the JS-added `.reveal-on` class (off for no-JS / reduced-motion).
- **Hero entrance:** children stagger in on load; on wider screens the hero `.hero-inner` starts at **~120%** and eases to **100%** as you scroll the first screen (transform-only; overflow clipped; ≥768px only).
- **Breathing portrait halo:** `hero-glow` pulses the halo's opacity (`0.5 → 1`) and scale (`1 → 1.08`) on a calm **5s** loop. Opacity/transform only.
- **Availability + "Present" pings:** the hero "open to work" dot pulses an expanding ring (`hero-pulse`, **2.5s**) over a steady glow; the timeline "Present" dots breathe (`present-breathe`, **2.6s**).
- **Card expand (FLIP):** when an ExpandableCard `<details>` toggles, neighbours **glide** to their new positions via a transform-only FLIP (measure → invert → play), so nothing reflows per-frame. Bails under reduced-motion (instant native toggle).
- **Cross-page wordmark morph:** the header wordmark carries `transition:name="brand-wordmark"`, so Astro's ClientRouter morphs it in place between pages (View Transitions). ClientRouter disables it under reduced-motion; a belt-and-braces `::view-transition-group(*){animation:none}` backs it up.
- **Skill bars:** fill from empty when Skills scrolls into view.
- **Hover:** cards and buttons lift slightly; links shift to the brighter green and underline on hover/focus.

Every looping/keyframed effect explicitly holds a sensible static state, and the global `@media (prefers-reduced-motion: reduce)` block zeroes animation/transition durations as a backstop.

New motion should be transform/opacity based (no per-frame reflow), reduced-motion-safe, and quiet — one orchestrated moment beats scattered effects.

---

## 8. Iconography & imagery

- **Icons:** inline SVG, `stroke: currentColor`, ~`13px`, thin line style (matching the card chevron). **No emoji** — the pink 📍 and the 🏆 were replaced with green stroked SVGs.
- **Imagery:** content/detail images open in the lightbox; the portrait is circular with a green border + soft glow.

---

## 9. Voice & tone

First person, concise, concrete, honest. Sentence case. No filler or hype. Source of truth: [`src/data/profile.ts`](src/data/profile.ts).

---

## 10. Do / Don't

**Do**
- Use the tokens (`var(--color-…)`, `var(--space-…)`).
- Keep to the one green; vary it tonally.
- Set everything in Computer Modern; reserve **700** for titles.
- Honor WCAG AA and `prefers-reduced-motion`.

**Don't**
- Introduce a second accent hue.
- Use emoji as icons.
- Hard-code colors, spacing, or radii.
- Add loud or scroll-jacking animation.
- Set uppercase labels without wide tracking.

---

## 11. Where things live

| Concern | Location |
| --- | --- |
| Design tokens + base/element styles | [`src/styles/global.css`](src/styles/global.css) (`:root`) |
| Layout, nav, footer, lightbox, scroll UI, hero motion | [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) |
| SEO/OG/Twitter meta, canonical, robots, font preload, JSON-LD `Person`, and a per-page `slot="head"` (paper `citation_*` + `BreadcrumbList`; project `BreadcrumbList`; talk `Event`) | [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) + page `<Fragment slot="head">` |
| Components | [`src/components/`](src/components/) |
| Content & data | [`src/content/`](src/content/), [`src/data/`](src/data/) |
| Logo / favicon | [`public/favicon.svg`](public/favicon.svg), `public/favicon.ico` |
| Social / share image | `public/og-image.png` — regenerate with `npm run og` ([`scripts/generate-og.mjs`](scripts/generate-og.mjs)) |
| Fonts (CMU, OFL) | [`public/fonts/`](public/fonts/) |
