---
name: screenshot
description: Build the portfolio, serve it, and capture full-page screenshots (desktop + mobile, plus expanded-card variants) of key pages so the rendered visuals can be analysed. Use when asked to screenshot the site, review the visuals/layout/design, or verify a UI change renders correctly.
---

# Screenshot & analyse the portfolio

Captures full-page PNGs of the **built** site at desktop (1280px) and mobile (390px)
widths — including variants with every expandable `<details>` card opened — so the
rendered output can be read and critiqued (layout, spacing, type, contrast, responsiveness).

## Prerequisites (one-time)

Playwright + Chromium must be installed:

```
npm i -D playwright && npx playwright install chromium
```

## Steps

1. Build the production site (screenshots run against the build, not dev):
   ```
   npm run build
   ```
2. Start the preview server in the background on a fixed port:
   ```
   npm run preview -- --port 4321
   ```
   (run it in the background; wait until it logs `http://localhost:4321`).
3. Capture screenshots into the scratchpad (Chromium, headless):
   ```
   node .claude/skills/screenshot/shoot.mjs --base=http://localhost:4321 --out=<SCRATCHPAD>/shots
   ```
   - Limit pages with `--routes=/,/projects,/talks` (comma-separated) if needed.
   - The script prints every file it wrote, with HTTP status.
4. Stop the background preview server.
5. Read the PNGs from the output dir and analyse them. Compare desktop vs mobile,
   and the `-expanded` variants to confirm the card expand/collapse and thumbnails.

## Notes

- The script forces `prefers-reduced-motion: reduce`, so scroll-reveal content is
  fully visible and stable for capture (you won't see the animation in a still — that's expected).
- Output names: `<route>-desktop.png`, `<route>-mobile.png`, `<route>-desktop-expanded.png`.
- Default routes: `/`, `/projects`, `/talks`, `/awards`, `/papers`, `/projects/pause`.
- **Windows / Git Bash:** when passing `--routes` with leading slashes, prefix the command with `MSYS_NO_PATHCONV=1` (otherwise Git Bash rewrites a bare `/` into a Windows path). Omitting `--routes` (defaults) avoids this.
