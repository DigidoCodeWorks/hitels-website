import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

// Pins direct shortcuts to the two singleton-style documents (fixed _id,
// created by scripts/seed-home-page.mjs) so editors open them straight away
// instead of a generic list — then falls back to the normal document-type
// list for everything else. No prior singleton/structure customization
// existed in this project; this is the first.
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('homePage')
        .title('Home Page')
        .child(S.document().schemaType('page').documentId('homePage')),
      S.listItem()
        .id('pricingPlans')
        .title('Pricing Plans')
        .child(S.document().schemaType('pricingPlans').documentId('pricingPlans')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) => !['page', 'pricingPlans'].includes(item.getId())
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Simple Site',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
