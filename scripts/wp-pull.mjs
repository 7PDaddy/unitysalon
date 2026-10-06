// Snapshot the live WordPress site so the rebuild never depends on it.
// Run from the repo root: node scripts/wp-pull.mjs
//   docs/wp-snapshot/*.json   raw REST API data (posts, pages, categories)
//   docs/wp-snapshot/html/    live rendered HTML of every URL (Divi header, footer, logo)
//   docs/url-inventory.csv    old URL, title, type, category, date, new URL, SEO meta
//   source/uploads/           every /wp-content/uploads/ file referenced anywhere, same paths
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE = 'https://unity.salon';
const API = `${SITE}/wp-json/wp/v2`;
const SNAP = 'docs/wp-snapshot';
const UPLOADS = 'source/uploads';

const getJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};
const save = async (path, data) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, typeof data === 'string' ? data : JSON.stringify(data, null, 2));
};
const exists = (p) => access(p).then(() => true, () => false);
const csv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const decode = (s = '') =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n)).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&rsquo;|&lsquo;/g, "'");

const posts = await getJson(`${API}/posts?per_page=100&_embed`);
const pages = await getJson(`${API}/pages?per_page=100`);
const cats = await getJson(`${API}/categories?per_page=100`);
await save(`${SNAP}/posts.json`, posts);
await save(`${SNAP}/pages.json`, pages);
await save(`${SNAP}/categories.json`, cats);
const catSlug = Object.fromEntries(cats.map((c) => [c.id, c.slug]));

// Live HTML catches what the REST content leaves out: theme header, logo, footer, lazy-load data-src.
const items = [
  ...pages.map((p) => ({ ...p, kind: 'page' })),
  ...posts.map((p) => ({ ...p, kind: 'post' })),
  ...cats.filter((c) => c.count).map((c) => ({ link: c.link, kind: 'category', slug: c.slug, name: c.name, count: c.count })),
];
const uploadUrls = new Set();
const grab = (text) => {
  for (const m of text.matchAll(/https?:\/\/unity\.salon\/wp-content\/uploads\/[^"'\s)<>,]+?\.(?:jpe?g|png|gif|webp|svg|pdf|mp4)/gi)) {
    uploadUrls.add(m[0].replace(/^http:/, 'https:'));
  }
};
for (const it of items) {
  const res = await fetch(it.link);
  it.status = res.status;
  const html = await res.text();
  const path = new URL(it.link).pathname;
  await save(`${SNAP}/html${path === '/' ? '/index' : path.replace(/\/$/, '')}.html`, html);
  grab(html);
  if (it.content) grab(it.content.rendered);
  console.log(it.status, it.link);
}
for (const p of posts) {
  const fm = p._embedded?.['wp:featuredmedia']?.[0];
  if (fm?.source_url) grab(fm.source_url);
}

const rows = [['old_url', 'new_url', 'type', 'status', 'title', 'category', 'date', 'modified', 'seo_title', 'meta_description', 'featured_image']];
for (const it of items) {
  const y = it.yoast_head_json ?? {};
  const fm = it._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';
  rows.push([
    it.link,
    new URL(it.link).pathname, // same path on the new site, no redirect needed
    it.kind,
    it.status,
    decode(it.title?.rendered ?? it.name),
    it.categories ? it.categories.map((id) => catSlug[id]).join(' ') : '',
    it.date?.slice(0, 10) ?? '',
    it.modified?.slice(0, 10) ?? '',
    decode(y.title ?? ''),
    decode(y.description ?? ''),
    fm,
  ]);
}
await save('docs/url-inventory.csv', rows.map((r) => r.map(csv).join(',')).join('\n') + '\n');

// Download originals. Skip files already on disk so reruns are cheap.
let got = 0, failed = [];
for (const url of [...uploadUrls].sort()) {
  const rel = decodeURIComponent(new URL(url).pathname.replace('/wp-content/uploads/', ''));
  const dest = join(UPLOADS, rel);
  if (await exists(dest)) continue;
  const res = await fetch(url);
  if (!res.ok) { failed.push(`${res.status} ${url}`); continue; }
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  got++;
}
console.log(`\n${items.length} URLs, ${uploadUrls.size} upload files referenced, ${got} downloaded`);
if (failed.length) console.log('Failed:\n' + failed.join('\n'));
