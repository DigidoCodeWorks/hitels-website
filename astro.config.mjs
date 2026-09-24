// @ts-check
import { loadEnv } from 'vite';
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

// astro.config.mjs loads before Astro's own .env loading, so read it manually here
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// Placeholder until a custom domain is attached — swap via PUBLIC_SITE_URL env var,
// no code change needed. Drives canonical URLs, sitemap, and OG/Twitter tags.
// Update this fallback too if the pages.dev URL ever changes before a custom
// domain is attached.
const SITE_URL = env.PUBLIC_SITE_URL || 'https://simple-website-16a.pages.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  // English stays unprefixed at "/" (prefixDefaultLocale: false); Icelandic
  // lives under "/is/". Astro.currentLocale resolves from the route path at
  // build time for every component in the render tree — no middleware or
  // manual detection needed, since this is a fully static build.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'is'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    react(),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      // false, not true: every Sanity query in this project runs at build time
      // (static output, no per-request server), so there's no runtime traffic
      // to offload onto the CDN — its only effect here was propagation lag
      // (~30-60s) racing the publish-webhook's near-instant rebuild trigger,
      // causing builds to occasionally bake in stale pre-publish content.
      useCdn: false,
      studioBasePath: '/studio',
    }),
    sitemap({
      // Icelandic content is machine-drafted and not yet reviewed by a
      // native speaker (see BaseLayout's noindex prop, set per-page for
      // every /is/ route in the meantime) — keeping those URLs out of the
      // sitemap too, since a sitemap is a "please index this" signal that
      // would otherwise contradict noindex. Drop this filter clause (and
      // reinstate the i18n option below) once Icelandic copy is reviewed.
      filter: (page) => !page.includes('/studio') && !new URL(page).pathname.startsWith('/is/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  env: {
    schema: {
      PUBLIC_SANITY_PROJECT_ID: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_SANITY_DATASET: envField.string({ context: 'client', access: 'public', default: 'production' }),
      R2_PUBLIC_URL: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_CONTACT_FORM_ENDPOINT: envField.string({ context: 'client', access: 'public', default: '' }),
      PUBLIC_CF_BEACON_TOKEN: envField.string({ context: 'client', access: 'public', default: '' }),
      PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', default: '' }),
    }
  }
});