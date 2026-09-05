// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves a project repository from a subpath, so the built site
// needs `base`. Internal links go through src/lib/url.ts, which reads it.
// Dev keeps base '/', so `npm run dev` is unaffected.
const REPO = 'hamere-noah-kidane-mihret';
const isPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://afrocoder16.github.io',
  base: isPages ? `/${REPO}` : '/',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
