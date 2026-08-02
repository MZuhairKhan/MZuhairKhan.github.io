/**
 * Generates the social / link-preview card at public/og-image.png (1200×630).
 *
 * Brand card: the circular portrait (green ring + glow) beside the name and
 * tagline, set in Computer Modern on the cream ground — matching the site.
 * Edit the CARD constants below if the headline/tagline ever change.
 *
 * Run:  node scripts/generate-og.mjs   (or: npm run og)
 * Requires: sharp (ships with Astro) and Playwright Chromium
 *           (one-time: npm i -D playwright && npx playwright install chromium).
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = (...p) => path.join(root, ...p);

// --- Card content -----------------------------------------------------------
const CARD = {
  eyebrow: 'Mohammad Zuhair Khan',
  headline: 'Quantum computing &amp; agentic AI',
  tagline: 'Master&rsquo;s Student in Engineering Physics &middot; Aalto University',
  keywords: 'Research &middot; deep tech &middot; taking it the last mile',
  url: 'zuhair.fi',
};

// --- Brand tokens (kept in sync with src/styles/global.css) -----------------
const C = {
  bg: '#fafaf6',
  text: '#1a1a1a',
  soft: '#4a4a44',
  muted: '#6b6b66',
  accent: '#46a247',
  accentDark: '#2a6a2a',
};

const fontDataUri = (file) =>
  'data:font/woff2;base64,' + readFileSync(r('public/fonts', file)).toString('base64');

/**
 * The portrait is a background-removed cutout, so the card has to supply the
 * disc backdrop. On the site that is done in CSS (the hero halo animates, so a
 * baked fill would mismatch it) — here nothing moves, so it is baked in.
 *
 * The sweep fades from a key light behind the head out to the card's own
 * ambient at the rim: flat cream lifted by the green glow that the .photo
 * box-shadow throws just outside the circle. Matching that stops the disc
 * reading as a lighter hole punched in the glow.
 *
 * @returns {Promise<string>} 600x600 PNG portrait as a base64 data URI.
 */
const photoDataUri = async () => {
  const N = 600;
  const EDGE = [0.2 * 70 + 0.8 * 250, 0.2 * 162 + 0.8 * 250, 0.2 * 71 + 0.8 * 246];
  const CENTRE = [248, 251, 245];
  const smooth = (t) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t));
  const plate = Buffer.alloc(N * N * 3);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const u = x / N;
      const v = y / N;
      const rd = Math.min(1, Math.hypot(u - 0.5, v - 0.5) / 0.5);
      const key = 0.55 + 0.45 * (1 - smooth(Math.hypot(u - 0.5, v - 0.34) / 0.62));
      const t = smooth(1 - rd) * key;
      const o = (y * N + x) * 3;
      for (let c = 0; c < 3; c++) plate[o + c] = Math.round(EDGE[c] + (CENTRE[c] - EDGE[c]) * t);
    }
  }
  const subject = await sharp(r('src/assets/profile.png')).resize(N, N, { fit: 'cover' }).png().toBuffer();
  const buf = await sharp(plate, { raw: { width: N, height: N, channels: 3 } })
    .composite([{ input: subject, blend: 'over' }])
    .png()
    .toBuffer();
  return 'data:image/png;base64,' + buf.toString('base64');
};

const html = `<!doctype html><html><head><meta charset="utf-8" />
<style>
  @font-face { font-family:'CMU Serif'; font-style:normal; font-weight:400 500; src:url('${fontDataUri('cmu-serif-500-roman.woff2')}') format('woff2'); }
  @font-face { font-family:'CMU Serif'; font-style:normal; font-weight:600 700; src:url('${fontDataUri('cmu-serif-700-roman.woff2')}') format('woff2'); }
  body { margin:0; }
  .card {
    width:1200px; height:630px; box-sizing:border-box;
    background:${C.bg}; color:${C.text};
    display:flex; align-items:center; gap:72px; padding:84px 96px;
    font-family:'CMU Serif', Georgia, 'Times New Roman', serif;
    position:relative; overflow:hidden;
  }
  .watermark { position:absolute; right:28px; top:50%; transform:translateY(-50%); width:440px; height:440px; opacity:0.05; }
  .photo {
    width:312px; height:312px; flex:none; border-radius:50%; object-fit:cover;
    border:5px solid ${C.accent};
    box-shadow:0 8px 24px rgba(70,162,71,.18), 0 0 52px 8px rgba(70,162,71,.22);
  }
  .right { display:flex; flex-direction:column; max-width:640px; }
  .eyebrow { font-size:22px; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:${C.accentDark}; margin-bottom:18px; }
  .name { font-size:60px; font-weight:700; line-height:1.05; letter-spacing:-.02em; }
  .rule { width:96px; height:4px; background:${C.accent}; margin:26px 0 24px; }
  .tag { font-size:29px; color:${C.soft}; line-height:1.3; }
  .kw { font-size:25px; color:${C.accentDark}; margin-top:16px; }
  .url { font-size:20px; color:${C.muted}; margin-top:30px; }
</style></head>
<body>
  <div class="card">
    <img class="photo" src="${await photoDataUri()}" alt="" />
    <div class="right">
      <div class="eyebrow">${CARD.eyebrow}</div>
      <div class="name">${CARD.headline}</div>
      <div class="rule"></div>
      <div class="tag">${CARD.tagline}</div>
      <div class="kw">${CARD.keywords}</div>
      <div class="url">${CARD.url}</div>
    </div>
    <svg class="watermark" viewBox="0 0 128 128" aria-hidden="true"><path transform="matrix(0.13994 0 0 -0.13994 14.3907 112.0000)" fill="${C.accent}" d="M64 26Q64 40 72 52L472 639H342Q237 639 185.0 592.0Q133 545 127 445H80L92 686H606Q619 686 624.5 685.0Q630 684 634.0 678.5Q638 673 638.0 661.0Q638 649 630 637L231 51H371Q414 51 448.0 58.5Q482 66 504.5 77.0Q527 88 544.0 108.0Q561 128 570.0 145.0Q579 162 585.5 189.5Q592 217 594.0 235.5Q596 254 598 284H645L627 0H96Q83 0 77.5 1.0Q72 2 68.0 7.5Q64 13 64 26Z"></path></svg>
  </div>
</body></html>`;

// Scratch file for Playwright to load. It inlines the fonts and portrait as
// base64, so it weighs well over a megabyte — always clean it up, or it lands
// in the next commit.
const tmp = r('scripts', '.og.html');
writeFileSync(tmp, html);

let shot;
try {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  shot = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
} finally {
  rmSync(tmp, { force: true });
}

await sharp(shot).resize(1200, 630).png({ quality: 90 }).toFile(r('public/og-image.png'));
const meta = await sharp(r('public/og-image.png')).metadata();
console.log(`wrote public/og-image.png ${meta.width}x${meta.height}`);
