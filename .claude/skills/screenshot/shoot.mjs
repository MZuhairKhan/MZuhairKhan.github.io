// Capture full-page screenshots of the portfolio at desktop + mobile widths,
// plus an "all cards expanded" variant per page. Requires playwright + chromium.
//
// Usage:
//   node .claude/skills/screenshot/shoot.mjs --base=http://localhost:4321 --out=./shots [--routes=/,/projects]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

function arg(name, def) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : def;
}

const base = arg('base', 'http://localhost:4321').replace(/\/$/, '');
const out = arg('out', path.join(process.cwd(), 'shots'));
const routes = arg('routes', '/,/projects,/talks,/awards,/papers,/projects/pause')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

mkdirSync(out, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const slug = (r) => (r === '/' ? 'home' : r.replace(/^\/|\/$/g, '').replace(/\//g, '-'));

const browser = await chromium.launch();
const written = [];

for (const route of routes) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    let status = '?';
    try {
      const resp = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 30000 });
      status = resp ? resp.status() : 'no-resp';
      await page.waitForTimeout(300);
      const file = path.join(out, `${slug(route)}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      written.push(`${file} [${status}]`);

      if (vp.name === 'desktop') {
        const count = await page.$$eval('details', (els) => {
          els.forEach((d) => d.setAttribute('open', ''));
          return els.length;
        });
        if (count > 0) {
          await page.waitForTimeout(250);
          const ef = path.join(out, `${slug(route)}-desktop-expanded.png`);
          await page.screenshot({ path: ef, fullPage: true });
          written.push(`${ef} [expanded x${count}]`);
        }
      }
    } catch (err) {
      written.push(`${route} [${vp.name}] ERROR ${status}: ${err.message}`);
    }
    await ctx.close();
  }
}

await browser.close();
console.log(written.join('\n'));
