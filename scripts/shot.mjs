import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:4322';
const OUT = 'd:/tmp/shots';
const pages = (process.argv[2] || '/').split(',');
const full = process.argv[3] !== 'viewport';

/** Walk the page so lazy images load and the reveal observer fires, then settle. */
async function settle(pg) {
  await pg.evaluate(() => document.fonts?.ready);
  await pg.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 200)); }
    window.scrollTo(0, 0);
  });
  await pg.evaluate(() =>
    document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('revealed'))
  );
  await pg.evaluate(() => Promise.all(
    [...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))
  ));
  await pg.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' }).catch(() => {});
  await pg.waitForTimeout(1200);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 950 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

for (const p of pages) {
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));

  await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 60000 });
  await settle(page);

  const name = p === '/' ? 'home' : p.replace(/\W+/g, '-').replace(/^-|-$/g, '');
  await page.screenshot({ path: `${OUT}/hn-${name}.png`, fullPage: full });
  console.log(`shot ${p} → hn-${name}.png` +
    (errs.length ? `  ⚠ ${errs.length} console errors:\n   ${errs.slice(0, 5).join('\n   ')}` : '  ✓ no console errors'));
}

// mobile pass on every requested page
await ctx.close();
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mp = await m.newPage();
for (const p of pages) {
  await mp.goto(BASE + p, { waitUntil: 'networkidle', timeout: 60000 });
  await settle(mp);
  const name = p === '/' ? 'home' : p.replace(/\W+/g, '-').replace(/^-|-$/g, '');
  await mp.screenshot({ path: `${OUT}/hn-m-${name}.png`, fullPage: full });
  console.log(`shot ${p} (mobile) → hn-m-${name}.png`);
}

await browser.close();
