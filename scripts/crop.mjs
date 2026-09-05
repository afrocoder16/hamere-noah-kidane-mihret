import { chromium } from 'playwright';
// usage: node crop.mjs <path> <selector-or-y> [name]
const [, , route = '/', target = '0', name = 'crop'] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 950 } });
await p.goto('http://localhost:4322' + route, { waitUntil: 'networkidle' });
await p.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); }
  window.scrollTo(0, 0);
});
await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('revealed')));
await p.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' }).catch(() => {});
await p.waitForTimeout(900);

if (/^\d+$/.test(target)) {
  await p.evaluate((y) => window.scrollTo(0, +y), target);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `d:/tmp/shots/${name}.png` });
} else {
  const el = p.locator(target).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  await el.screenshot({ path: `d:/tmp/shots/${name}.png` });
}
console.log('→', name + '.png');
await b.close();
