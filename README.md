# ሐመረ ኖኅ ኪዳነ ምሕረት · Hamere Noah Kidane Mihret

A design sample for the Ethiopian Orthodox Tewahedo parish at
1609 W 11th Street, Sioux Falls, South Dakota.

Built with **Astro 7** and **Tailwind 4**. Fully static — no server, no database.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

---

## What is actually in here

### The Bahire Hasab — `src/lib/ethiopic.ts`

The centrepiece. The Ethiopian Orthodox calendar is **computed**, not stored in a
table of dates. The module implements:

- **Calendar conversion** — Gregorian ⟷ Ethiopian, via Julian Day Number.
  Thirteen months: twelve of thirty days and Pagume of five (six in leap years).
- **The Paschalion** — Fasika by the Julian computus the Church has always kept,
  then every movable feast measured out from it by its *tewsak* (appointed
  increment): Nineveh at −69 days, Great Lent at −55, Pentecost at +49.
- **Fixed feasts** — sixteen, given in the Ethiopian calendar and resolved to
  Gregorian dates for whatever year is being displayed.
- **The monthly commemorations** — all thirty days, each with its own saint.
  The 16th is Kidane Mihret, this parish's patron.
- **Fast status** — whether today is a fast day, and which fast.
- **The Ethiopian clock** — hours counted from dawn, so 6:00 AM is
  *12:00 ጠዋት* and 6:30 PM is *12:30 ማታ*.
- **Ge'ez numerals** — ፩ ፪ ፫ … ፻.

Verified against known dates: Fasika 2024–2028 (5 May, 20 Apr, 12 Apr, 2 May,
16 Apr), Genna 7 Jan, Timket 19 Jan, Meskel 27 Sept, Enkutatash 11 Sept, and
Kidane Mihret 23 Feb.

The date strip re-computes in the visitor's browser, so it is correct at
midnight wherever they are even though the site is statically built.

### The ornament — `src/components/ornament/`

All drawn by hand in SVG for this site, after Ethiopian models. Nothing traced.

| Component | What it is |
|---|---|
| `Harag.astro` | ሐረግ — the plaited interlace band a scribe draws at the head of a gospel page. Three variants (plait, chain, vine), drawn as a real `<pattern>` so it tiles at true proportion at any width. Four repeats per tile so the pigment cycle runs through. |
| `MeskelCross.astro` | The Ethiopian processional cross: a square at the heart, four arms of pierced latticework, tendrils in each quadrant, a floret at each terminal. Optional stroke-dash draw-on. |
| `AngelBand.astro` | The ceiling of Debre Berhan Selassie at Gondar — winged cherub faces in staggered courses, joined brow-arch, ochre faces, three ranks of feathers per wing. |
| `ArchFrame.astro` | A picture set in the shouldered Aksumite arch, with a gold rule standing off it and a floret at each spring. |
| `Divider.astro` | Harag running out either side of a small cross. |

`ThreeChambers.astro` draws the plan of a round Ethiopian church — Qene Mahlet,
Qeddest, Meqdes — with the tabot at the centre. Hover or select a ring to read
what happens there.

### The palette — `src/styles/global.css`

Taken from the pigments actually available to a Gondarine painter: madder red,
orpiment gold, indigo, malachite, lampblack, and the goatskin parchment ground.
Every colour pair used for small text meets WCAG AA (4.5:1); large text meets 3:1.

---

## Content: what is confirmed and what is not

**Confirmed from public records** — the address (1609 W 11th Street, Sioux Falls,
SD 57104) and the telephone number (605) 838-6273.

**Everything else is a considered placeholder.** Search the source for `TODO` to
find every one. The main ones:

- `src/lib/parish.ts` — **all service times**. These are plausible for an
  Ethiopian parish but were not obtained from the church. Confirm before publishing.
- `src/lib/parish.ts` — the email address.
- `src/pages/give.astro` — the online giving link.
- `src/pages/membership.astro` — the enquiry form has **no destination**. It
  submits nowhere and says so to the visitor rather than pretending to succeed.
  Wire it to a form service or the office's inbox before going live.

**Photographs** are of the Ethiopian Orthodox tradition, not of this parish —
used under Creative Commons or public domain, credited on `/credits` and in
`public/art/credits.json`. Replace them with photographs of this congregation
and this building before publishing. Every caption was written after looking at
the image it belongs to.

---

## Pages

| Route | |
|---|---|
| `/` | Hero, the live reckoning of the day, the two names, the three chambers, the week, coming feasts, art |
| `/about` | The parish, the meaning of the name, nineteen centuries in a timeline, Tewahedo |
| `/faith` | Six pillars, the seven sacraments, the ceiling of angels, the church plan, St Yared's three modes |
| `/services` | Service times in both clocks, the order of a Sunday, and a first-visit guide |
| `/calendar` | How the Bahire Hasab works, the thirteen months, a computed year of feasts and fasts, the seven fasts, the monthly commemorations |
| `/community` | Ministries, Sunday school, mutual aid |
| `/gallery` | The pigments, then painting, architecture, manuscripts, metalwork, the living Church |
| `/visit` | Contact, map, times |
| `/give` | Tithe, offering, alms, and where it goes |
| `/membership` | What membership means and how to ask |
| `/credits` | Image credits, licences, typefaces |

## Development scripts

`scripts/shot.mjs` and `scripts/crop.mjs` drive Playwright for desktop, mobile
and section screenshots during development. They are not part of the build.

```bash
node scripts/shot.mjs "/,/about,/faith"    # full-page desktop + mobile
node scripts/crop.mjs "/calendar" 3400 out # viewport crop at a scroll offset
```

---

## Deployment

Live at **https://afrocoder16.github.io/hamere-noah-kidane-mihret/**

Pushing to `main` builds and publishes via `.github/workflows/deploy.yml`.
GitHub Pages serves a project repo from a subpath, so `astro.config.mjs` sets
`base` when `GITHUB_ACTIONS` is set, and every internal link and asset goes
through `u()` in `src/lib/url.ts`. Local `npm run dev` keeps `base` at `/`.

To move the site to a custom domain (e.g. the parish's own), set the domain in
the repo's Pages settings and change `base` back to `'/'`.
