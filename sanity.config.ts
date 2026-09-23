import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureResolver } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

// Pins direct shortcuts to the true singletons (fixed _id, created by
// scripts/seed-site-settings.mjs) so editors open them straight away instead
// of a generic list — then falls back to the normal document-type list for
// everything else.
//
// "Pages" is its own list item (not part of the generic document-type
// fallback below, which excludes 'page' entirely) so every page-builder
// `page` document — Home, Custom Website, and any future conversion — is
// reachable from one place. No separate pinned shortcut for Home: unlike
// pricingPlans/siteSettings, "page" isn't a singleton — it's a growing
// collection Home just happens to be the first member of — so a dedicated
// Home shortcut sitting next to a "Pages" list that already shows Home one
// click away was pure redundancy, not a real navigation win.
//
// "Pages" splits into one sub-list per language (rather than one flat list
// of every `page` doc) now that the i18n pilot means English and Icelandic
// documents share the same slugs and titles-in-different-languages — a flat
// list made them hard to tell apart at a glance beyond the preview
// subtitle. Add a new entry here whenever a new locale is added.
const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('pages')
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .id('pages-en')
                .title('English')
                .child(S.documentTypeList('page').title('English Pages').filter('_type == "page" && language == "en"')),
              S.listItem()
                .id('pages-is')
                .title('Icelandic')
                .child(S.documentTypeList('page').title('Icelandic Pages').filter('_type == "page" && language == "is"')),
            ])
        ),
      S.listItem()
        .id('pricingPlans')
        .title('Pricing Plans')
        .child(S.document().schemaType('pricingPlans').documentId('pricingPlans')),
      S.listItem()
        .id('addOns')
        .title('Add-Ons')
        .child(S.document().schemaType('addOns').documentId('addOns')),
      S.listItem()
        .id('siteSettings')
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .id('footerSettings')
        .title('Footer Settings')
        .child(S.document().schemaType('footerSettings').documentId('footerSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['page', 'pricingPlans', 'addOns', 'siteSettings', 'footerSettings'].includes(item.getId() ?? '')
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
