# WordPress to Astro migration

Live site: unity.salon (WordPress + Divi, Yoast, W3 Total Cache, Smush). Background and Patrick's decisions: `docs/handoff.md`.

## Source material (pulled 2026-10-05)

`node scripts/wp-pull.mjs` re-pulls everything from the live site (the WP REST API is open, so no WP export is needed):
- `docs/wp-snapshot/posts.json`, `pages.json`, `categories.json`: full content, dates, categories, Yoast titles and descriptions.
- `docs/wp-snapshot/html/`: live rendered HTML of every URL (header, footer, logo, scripts).
- `docs/url-inventory.csv`: all 24 URLs with titles, dates, SEO meta, featured images.
- `source/uploads/`: 71 original image files, same paths as `/wp-content/uploads/`. Optimize into `public/` as pages are built. Never hotlink unity.salon.

Already broken on the live site (404, not recoverable from WP): `personal-stylist-45.png`, `personal-stylist-48.png`, `personal_stylist_29.png`, `personal_stylist_34.jpg` (2020/05 and 2024/03 copies).

## Facts found on the live site

- Suite number conflict: homepage body and The Hair Mom say "Suite #101", the footer says "2480 W Happy Valley Rd, Suite #1205". Needs Patrick or Tamekia.
- Tracking already on WP: Ahrefs (`data-key="Ry4ACyzIB3dwPOKNqHC8jQ"`) and Google tag `GT-K5Q7FG8` (Site Kit) on every page.
- Forms: Ninja Forms on most pages, Web3Forms on The Hair Mom. New site uses Web3Forms everywhere.
- Instagram links found: @the_hairmom, @tamekiaokagu, @unity.salon, @thehairmom, @jackmartincolorist.
- Images: Tamekia portrait is only `2020/04/Tamekia_Okagu_Thumbnail.png` (435px). Logo is only `Hair-Tails_F_200px.png` (200px). Need larger originals from Tamekia. `2026/04/Transparent-Bg-01...png` is likely the Braidful logo.

## URL checklist

Every path stays the same, trailing slash included, so no redirects are needed.

Pages (7)
- [ ] /
- [ ] /contact-unity-salon-sponsorships-partnerships-education-opportunities/ (Build Unity)
- [ ] /unity-university/
- [ ] /salongevity-socks-by-unity-salon/
- [ ] /hair-tips-trends-extensions-advice-unity-salon-norterra-phoenix/ (blog index)
- [ ] /braidful-event-braids-phoenix/
- [ ] /the-hair-mom/

Category archives (3)
- [ ] /category/services/
- [ ] /category/striving-for-unity/
- [ ] /category/types-of-hair/

Posts (14, 2020-06 to 2026-05)
- [ ] /striving-for-unity/introducing-braidful-event-braiding-unity-salon/
- [ ] /striving-for-unity/spring-hair-extensions-norterra-phoenix/
- [ ] /services/back-to-school-haircuts-norterra/
- [ ] /services/norterra-hair-stylist-growth/
- [ ] /services/photos-and-hair-extensions/
- [ ] /types-of-hair/hair-goals-2025/
- [ ] /types-of-hair/summertime-brings-summer-hair/
- [ ] /services/hair-extensions-north-phoenix-norterra/
- [ ] /striving-for-unity/curly-hair-specialist-devacurl/
- [ ] /striving-for-unity/add-unity-to-our-community/
- [ ] /striving-for-unity/vacation-time-still-thinking-about-hair/
- [ ] /striving-for-unity/hair-extensions/
- [ ] /striving-for-unity/people-watching/
- [ ] /striving-for-unity/curly-and-beautiful-hair/

## Open questions

- [ ] Tamekia's design pick (or which pieces from each example)
- [ ] Suite #101 or #1205
- [ ] Keep Ahrefs and the Google tag on the new site
- [ ] Braidful and Salongevity: pages inside unity.salon (as now) or cross-links to their own sites
- [ ] Unity University and Look & Learn: keep as is or refresh
- [ ] Any posts to drop or merge
- [ ] Larger logo file and Tamekia portrait

## Before cutover

- Link check, image check, Lighthouse. Ahrefs crawl before and after DNS switch.
- Confirm the two Site Kit 404 JS files are gone.
- Delete the noindex rule in `public/_headers`, replace the temporary homepage, and remove `public/design/`.
- Tamekia sign-off on a Cloudflare preview URL.
