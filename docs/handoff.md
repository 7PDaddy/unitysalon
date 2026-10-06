<!-- Handoff from the claude.ai chat session, 2026-10-05. Kept as written for reference. Current status and answers live in MIGRATION.md. -->

# Unity Salon Rebuild (unity.salon)

Handoff from a claude.ai chat session. Last updated 2026-10-05.

## 1. Goal

Rebuild unity.salon off WordPress (7 years old, Divi theme) as a modern static site on Cloudflare Pages. The owner is Patrick. The salon belongs to his wife Tamekia, who is the real approver of the design. She likes the current site's overall brand feel but it badly needs a refresh.

Decisions already made by Patrick:

- Design: keep the same brand feel, but modernize layout and typography. Not a copy, not a total departure.
- Blog: migrate the FULL archive (posts go back to 2020), not a partial or fresh start.
- Wants a "wow" site that can be iterated on. A muted plum palette was tried and rejected as too similar to the current site.
- Target audience is women, Patrick is not the audience. The hot pink direction may be too much for Tamekia, so Example 3 (elegant) is the likely candidate, but she has not reviewed anything yet.

## 2. Hosting and deployment pattern (Patrick's standard)

- Static HTML, no framework required unless it earns its place.
- GitHub repo, deployed via Cloudflare Pages. Cloudflare for DNS and redirects.
- Contact forms: Web3Forms.
- Patrick deploys by drag and drop to GitHub. Deliver zips with proper folder hierarchy, and he extracts the CONTENTS, not the parent folder or the zip itself.
- Patrick prefers full files over diffs when changes are needed.
- Cloudflare Redirect Rules for URL redirects: Type must be Static (not Dynamic) when the target is a plain URL.
- Ahrefs analytics is used on his other sites with a `data-key` script tag. Confirm with Patrick whether it should go on unity.salon before adding it.

## 3. Hard rules

- NO em dashes or en dashes anywhere in copy, titles, or meta text. Use periods, commas, or short hyphens.
- Never invent salon facts. All copy must come from the existing site or from Patrick or Tamekia.
- Keep booking links pointing to the Square booking page (below).
- Preserve URL parity with the old site wherever possible. Where a URL changes, add a Cloudflare redirect.

## 4. Business facts (from the live site)

- Name: Unity Salon, at The Beauty District, inside The Shops at Norterra
- Address: 2480 W Happy Valley Rd, Suite #1205, Phoenix, AZ 85085 (the site also says "Suite #101"; confirm which is correct)
- Phone: (623) 203-5863
- Booking: https://square.site/book/8NQGT66XBGYNH/unity-salon-phoenix-az
- Google reviews: https://g.co/kgs/mxfft4Z
- Instagram: @tamekiaokagu (Tamekia) and @the_hairmom
- Tamekia Dolan: licensed stylist 25+ years, educator at Penrose Academy (Scottsdale), 20+ years of extensions (hand-tied wefts, tape-ins, sew-ins, cylinders), DevaCurl cuts, color (hand painting, foiling, balayage, retouches), also men's and kids' cuts.
- Sister brands under the same roof: Braidful (event braiding, has its own existing static site on Cloudflare Pages), Salongevity (compression socks for salon pros, salongevity.co), Unity University / Look & Learn pro training, The Hair Mom, Build Unity.

## 5. Known site structure (partial crawl)

Top-level pages seen: Home, Build Unity, Unity University, The Hair Mom, Braidful, Salongevity Socks, News/blog. Blog categories: Striving for Unity, Services, Types of Hair. Blog URL pattern: `/{category}/{slug}/`.

## 6. Audit findings

1. Two Google Site Kit JS files return 404 on every page (stale hashed bundles in cached HTML). Moot once off WP.
2. Homepage images served as blank 1x1 SVG placeholders (Smush lazy-load not swapping them in). Real files exist in /wp-content/uploads/.
3. Titles, meta descriptions, OG tags, robots, canonicals looked clean. Carry the existing titles and descriptions over.
4. Ahrefs: homepage health 100, blog index 65.

## 7. Design work done so far

Three homepage directions (now in `design/`):

- `example-1-bold.html`: Bricolage Grotesque + Work Sans. Fuchsia `#E31C79`, violet `#3D1152`, gold `#F2A93B`, ink `#1B0E14`, cream `#FFF6EC`. Patrick liked it but thinks it is not elegant enough for salon clients.
- `example-2-elegant.html`: same structure, emerald `#1D4B3E`, umber `#2A1C10`, gold `#C9A24B`. Not different enough from Example 1. Weak option.
- `example-3-elegant.html`: Cormorant + Jost. Bordeaux `#5C1A2B`, champagne gold `#BFA476`, taupe `#E8DED2`, ivory `#FAF6F0`, ink `#1C1A17`. Most refined, current front-runner.
- `index.html` links all three for Tamekia's review.

Known weaknesses: portrait is a placeholder, logo is the 100px Hair-Tails PNG, two blog cards use text placeholders, no mobile nav toggle, only the homepage is designed.

## 8. Blockers (from chat)

- Chat sandbox could not reach unity.salon. (Solved in Claude Code: REST API and uploads are reachable.)
- Do not hotlink unity.salon assets in the final build.

## 9. Recommended plan

1. Get inputs: content, uploads, real logo, Tamekia's portrait and salon photos.
2. Full URL inventory in `docs/url-inventory.csv`.
3. Wait for Tamekia's pick, or build tokens so palette swaps are one-file changes.
4. Shared tokens and base CSS, a build step that generates blog pages from migrated posts. Plain static HTML output.
5. Migrate the blog archive to Markdown + front matter, same slugs and category paths.
6. Templates: home, services, about/Tamekia, Unity University, Braidful, Salongevity, blog index, post, category, 404.
7. Web3Forms, HairSalon LocalBusiness and Article schema, sitemap.xml, robots.txt.
8. Redirects for any changed paths.
9. QA: link check, image check, Lighthouse, Ahrefs crawl before and after cutover.
10. Cutover: staging preview, Tamekia sign-off, DNS switch.

## 10. Open questions (from chat)

- Which example does Tamekia prefer, or which pieces from each?
- Suite number: #101 or #1205?
- Ahrefs and Google Analytics on the new site?
- Braidful and Salongevity: separate sites with cross-links, or pages inside unity.salon?
- Unity University and Look & Learn pages: keep as is or refresh?
- Any posts to drop or consolidate despite the full archive decision?
