# Unity Salon

Hair salon in Norterra, Phoenix AZ: unity.salon. Repo: github.com/7PDaddy/unitysalon.
Rebuild of the current WordPress site in Astro. Separate brand from the Dolan sites (GYLR, RWTD) and BlueYucca.

## Stack and deploy

- Astro (static output, no client framework). Run npm commands from the repo root.
- Hosting target: Cloudflare Workers static assets, Worker name `unitysalon` (`wrangler.jsonc`), serves `dist/`. Not connected yet. The WordPress site stays live until cutover.
- Dev server: `npm run dev`. Preview the build: `npm run preview`.
- `astro.config.mjs` uses `build.format: 'directory'` and `trailingSlash: 'always'` to match the WordPress URLs. Do not change it.

## Structure

- `src/layouts/Layout.astro`: shared shell. Site-wide scripts go here once.
- `src/pages/`: one folder per WordPress URL, same slug. Progress is tracked in `MIGRATION.md`.
- `design/`: homepage design drafts (not built or deployed).
- `public/`: copied as is. Images from the old site go in `public/images/`.

## URLs and SEO

- Keep every existing WordPress path exactly, trailing slash included.
- Canonicals come from `Layout.astro`.

## Copy rules

- No em dashes or en dashes in copy. Use a period, comma, colon, or a short hyphen.

## Working style

- Surgical edits over rewrites. Small descriptive commits. Build before every push.
