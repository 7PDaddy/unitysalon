// @ts-check
import { defineConfig } from 'astro/config';

// Directory format + trailing slashes match the WordPress URLs Google
// already has (e.g. /the-hair-mom/), so nothing needs a redirect.
export default defineConfig({
  site: 'https://unity.salon',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Keep quotes straight and never turn -- into a dash.
  markdown: {
    smartypants: false,
  },
});
