# Adding a parish update

The homepage automatically shows the newest published file from `src/data/parish-updates/`.

1. Duplicate an existing `.md` file in `src/data/parish-updates/` and give it a descriptive name.
2. Change `publicationDate`; the newest date appears on the homepage.
3. Add the post's images to `public/pics/` and list each one under `photos`.
4. Update the Amharic and English headings in the frontmatter between the two `---` lines.
5. Paste the main Amharic or bilingual post beneath the second `---`. Normal Markdown paragraphs, bold text, and lists are supported.
6. Set `draft: true` while preparing a post. Change it to `false` when it is ready to publish.

Each photo supports an optional `caption` and `position`. The position uses CSS syntax such as `center center`, `50% 30%`, or `left center` to control the crop.
