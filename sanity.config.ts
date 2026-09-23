import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

// Every localized collection (English/Icelandic documents distinguished by
// a `language` field, sharing slugs/titles-in-different-languages) gets the
// same "one sub-list per language" treatment, instead of one flat list that
// makes same-titled documents hard to tell apart at a glance — first built
// for `page` during the i18n pilot, now shared here as more types localize.
// Add a new sub-list item here whenever a new locale is added sitewide.
function localizedList(S: StructureBuilder, typeName: string, title: string) {
  return S.listItem()
    .id(typeName)
    .title(title)
    .child(
      S.list()
        .title(title)
        .items([
          S.listItem()
            .id(`${typeName}-en`)
            .title('English')
            .child(S.documentTypeList(typeName).title(`English ${title}`).filter(`_type == "${typeName}" && language == "en"`)),
          S.listItem()
            .id(`${typeName}-is`)
            .title('Icelandic')
            .child(S.documentTypeList(typeName).title(`Icelandic ${title}`).filter(`_type == "${typeName}" && language == "is"`)),
        ])
    )
}

// Every locked singleton (fixed _id, exactly one document per language —
// see e.g. src/sanity/schemaTypes/pricingPlans.ts) gets an English/Icelandic
// pair of direct document shortcuts, rather than a filtered list, since a
// singleton's `documentId` is already known and fixed. `enId`/`isId` are
// the two documents' fixed ids (the Icelandic one is conventionally the
// English one + "-is", but pricingPlans/siteSettings/footerSettings/addOns
// all predate that convention, so it's passed explicitly rather than
// derived).
function pinnedSingletonPair(S: StructureBuilder, typeName: string, title: string, enId: string, isId: string) {
  return S.listItem()
    .id(typeName)
    .title(title)
    .child(
      S.list()
        .title(title)
        .items([
          S.listItem().id(`${typeName}-en`).title('English').child(S.document().schemaType(typeName).documentId(enId)),
          S.listItem().id(`${typeName}-is`).title('Icelandic').child(S.document().schemaType(typeName).documentId(isId)),
        ])
    )
}

const LOCALIZED_LIST_TYPES = ['page', 'post', 'faq', 'testimonial', 'story']

// Pins direct shortcuts to the true singletons (fixed _id, created by
// scripts/seed-site-settings.mjs) so editors open them straight away instead
// of a generic list — then falls back to the normal document-type list for
// everything else.
//
// "Pages"/"Blog Posts"/"FAQ"/"Testimonials"/"Customer Stories" are their own
// list items (not part of the generic document-type fallback below, which
// excludes all of LOCALIZED_LIST_TYPES) so every document of these types —
// across both languages — is reachable from one place, via localizedList()
// above.
const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      localizedList(S, 'page', 'Pages'),
      localizedList(S, 'post', 'Blog Posts'),
      localizedList(S, 'faq', 'FAQ'),
      localizedList(S, 'testimonial', 'Testimonials'),
      localizedList(S, 'story', 'Customer Stories'),
      pinnedSingletonPair(S, 'pricingPlans', 'Pricing Plans', 'pricingPlans', 'pricingPlans-is'),
      pinnedSingletonPair(S, 'addOns', 'Add-Ons', 'addOns', 'addOns-is'),
      pinnedSingletonPair(S, 'siteSettings', 'Site Settings', 'siteSettings', 'siteSettings-is'),
      pinnedSingletonPair(S, 'footerSettings', 'Footer Settings', 'footerSettings', 'footerSettings-is'),
      pinnedSingletonPair(S, 'storiesClosingCard', 'Stories: Closing Card', 'storiesClosingCard-default', 'storiesClosingCard-default-is'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => ![...LOCALIZED_LIST_TYPES, 'pricingPlans', 'addOns', 'siteSettings', 'footerSettings', 'storiesClosingCard'].includes(item.getId() ?? '')
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
