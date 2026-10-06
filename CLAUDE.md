# Unity Salon

Hair salon at The Beauty District, The Shops at Norterra, Phoenix AZ: unity.salon. Owner of the site: Patrick. The salon is Tamekia's, and she approves the design.
Repo: github.com/7PDaddy/unitysalon. Separate brand from the Dolan sites (GYLR, RWTD) and BlueYucca.
Rebuild of the WordPress site in Astro. Read `docs/handoff.md` for background and `MIGRATION.md` for status and open questions.

## Hard rules

- No em dashes or en dashes anywhere: copy, titles, meta. Use a period, comma, or short hyphen.
- Never invent salon facts. Copy comes from the existing site (`docs/wp-snapshot/`) or from Patrick or Tamekia.
- Booking links always go to https://square.site/book/8NQGT66XBGYNH/unity-salon-phoenix-az
- Keep every WordPress path exactly, trailing slash included. If a path ever changes, add a redirect.
- Carry over the existing Yoast titles and meta descriptions (`docs/url-inventory.csv`).
- Never hotlink unity.salon. Originals are in `source/uploads/`, optimized copies go in `public/`.

## Stack and deploy

- Astro (static output, no client framework). Outputs plain static HTML. Run npm commands from the repo root.
- Hosting target: Cloudflare Workers static assets, Worker name `unitysalon` (`wrangler.jsonc`), serves `dist/`. Not connected yet. WordPress stays live until cutover.
- Dev server: `npm run dev`. Preview the build: `npm run preview`.
- `astro.config.mjs` uses `build.format: 'directory'` and `trailingSlash: 'always'` to match the WordPress URLs. Do not change it.
- Forms: Web3Forms.

## Structure

- `src/layouts/Layout.astro`: shared shell. Site-wide scripts go here once.
- `src/pages/`: one folder per WordPress URL, same slug.
- `design/`: homepage design drafts for Tamekia (not built or deployed).
- `scripts/wp-pull.mjs`: re-pulls content, live HTML, and uploads from the WordPress site.
- `docs/`: handoff, URL inventory, WordPress snapshot.

## Working style

- Surgical edits over rewrites. Small descriptive commits. Build before every push, ask before pushing.
