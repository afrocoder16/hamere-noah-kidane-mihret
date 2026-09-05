/**
 * Site-root URLs.
 *
 * GitHub Pages serves a project repository from a subpath
 * (…github.io/<repo>/), so every link and asset written as "/about" or
 * "/art/x.jpg" has to carry that prefix. Astro exposes it as BASE_URL but
 * does not rewrite hand-written paths, so they go through here.
 *
 * u('/about')      → '/hamere-noah-kidane-mihret/about'   (built for Pages)
 *                  → '/about'                              (dev, base '/')
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function u(path: string): string {
  if (!path.startsWith('/')) return path;      // external, mailto:, tel:, #anchor
  return BASE + path;
}
