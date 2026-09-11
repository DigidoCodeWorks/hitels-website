import { defineField, defineType } from 'sanity'
import { linkField, stringListField } from '../fields'

// Site-wide singleton: the 3 pricing cards shown on Home, Pricing, About Us,
// Custom Website, and Booking Engine (shared/Pricing.astro). Lives here
// instead of per-page since it's the same data reused verbatim everywhere —
// "nothing global lives on a page." __experimental_actions restricts create/
// delete since exactly one instance should ever exist; this project has no
// prior singleton-locking precedent, introduced here as the first genuinely
// global config document.
export default defineType({
  name: 'pricingPlans',
  title: 'Pricing Plans',
  type: 'document',
  // @ts-expect-error — a real, supported Sanity Studio feature (locks
  // create/delete for a singleton document) that isn't part of defineType's
  // public TS surface.
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'plans',
      title: 'Plans',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'plan',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule) => rule.required() }),
            defineField({ name: 'price', title: 'Price', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'priceSuffix', title: 'Price suffix', description: 'e.g. "/ month" — leave blank for none.', type: 'string' }),
            stringListField('features', 'Features'),
            defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string', validation: (rule) => rule.required() }),
            linkField('ctaHref', 'CTA link', {
              required: true,
              description: 'Explicit destination — not inferred from the label text (the original code matched on the literal string "Get a quote", which breaks if the label is edited).',
            }),
            defineField({
              name: 'theme',
              title: 'Theme',
              type: 'string',
              options: { list: ['light', 'dark'] },
              initialValue: 'light',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'iconUrls',
              title: 'Icon URLs',
              description: 'Usually one icon; the third/dark-theme plan shows two stacked.',
              type: 'array',
              of: [{ type: 'url' }],
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'price' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Pricing Plans' }) },
})
