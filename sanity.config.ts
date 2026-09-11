import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

// Pins direct shortcuts to the singleton-style documents (fixed _id, created
// by scripts/seed-home-page.mjs / scripts/seed-site-settings.mjs) so editors
// open them straight away instead of a generic list — then falls back to the
// normal document-type list for everything else.
//
// "Pages" is its own list item (not part of the generic document-type
// fallback below, which excludes 'page' entirely) so every page-builder
// `page` document — Home, Custom Website, and any future conversion — is
// reachable from one place, with Home also pinned above it for one-click
// access to the page editors open most.
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('homePage')
        .title('Home Page')
        .child(S.document().schemaType('page').documentId('homePage')),
      S.listItem()
        .id('pages')
        .title('Pages')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .id('pricingPlans')
        .title('Pricing Plans')
        .child(S.document().schemaType('pricingPlans').documentId('pricingPlans')),
      S.listItem()
        .id('siteSettings')
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) => !['page', 'pricingPlans', 'siteSettings'].includes(item.getId())
      ),
    ])

// This file is loaded in two very different contexts: by Vite/Astro for the
// embedded Studio (runs in the browser — needs import.meta.env.PUBLIC_*,
// which Vite statically replaces at build time), and by the plain-Node
// `sanity` CLI for schema extract/typegen (no Vite, so import.meta.env is
// undefined there) — hence checking both rather than assuming either.
const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET ?? process.env.PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'default',
  title: 'Simple Site',

  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
