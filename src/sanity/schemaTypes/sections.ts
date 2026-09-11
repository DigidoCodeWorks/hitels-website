import { defineField, defineType } from 'sanity'

// Page-builder section types for the `page` document's `sections` array.
// Each is an inline object (not its own document) — the closed set an editor
// can compose a page from. Image fields are `url` (R2-hosted, full URL, set
// via scripts/upload-to-r2.mjs), matching the convention in testimonial.ts/
// story.ts, not Astro's `asset()`-relative-path style.

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'subheadingDesktop',
      title: 'Subheading (desktop/tablet)',
      description: 'Longer copy shown above the mobile breakpoint.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadingMobile',
      title: 'Subheading (mobile)',
      description: 'Shorter copy shown on mobile — a deliberately different, condensed variant, not a truncation.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'primaryButtonLabel', title: 'Primary button label', type: 'string' }),
    defineField({ name: 'primaryButtonHref', title: 'Primary button link', type: 'string' }),
    defineField({ name: 'secondaryButtonLabel', title: 'Secondary button label', type: 'string' }),
    defineField({ name: 'secondaryButtonHref', title: 'Secondary button link', type: 'string' }),
  ],
  preview: { select: { title: 'headline' } },
})

const offering = {
  type: 'object',
  name: 'offering',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule: any) => rule.required() }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule: any) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule: any) => rule.required() }),
    defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA link', type: 'string' }),
    defineField({ name: 'desktopImageUrl', title: 'Desktop/tablet image URL', type: 'url', validation: (rule: any) => rule.required() }),
    defineField({ name: 'mobileImageUrl', title: 'Mobile image URL', type: 'url', validation: (rule: any) => rule.required() }),
  ],
  preview: { select: { title: 'headline' } },
}

export const productOfferingsSection = defineType({
  name: 'productOfferingsSection',
  title: 'Product Offerings',
  type: 'object',
  fields: [
    defineField({ name: 'offerings', title: 'Offerings', type: 'array', of: [offering] }),
  ],
})
// Astro-side alternates the background color behind each offering's image by
// array index — that's a visual/design decision, not content, so it's
// intentionally not an editable field here.

const storyCard = {
  type: 'object',
  name: 'storyCard',
  fields: [
    defineField({ name: 'logoUrl', title: 'Logo URL', type: 'url', validation: (rule: any) => rule.required() }),
    defineField({ name: 'imageUrl', title: 'Image URL', type: 'url', validation: (rule: any) => rule.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string', validation: (rule: any) => rule.required() }),
    defineField({ name: 'href', title: 'Link', type: 'string' }),
  ],
  preview: { select: { title: 'caption' } },
}

export const customerStoriesSection = defineType({
  name: 'customerStoriesSection',
  title: 'Customer Stories',
  type: 'object',
  fields: [
    defineField({ name: 'cards', title: 'Cards', type: 'array', of: [storyCard] }),
  ],
})

const addon = {
  type: 'object',
  name: 'addon',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule: any) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule: any) => rule.required() }),
    defineField({ name: 'iconUrl', title: 'Icon URL', type: 'url', validation: (rule: any) => rule.required() }),
    defineField({ name: 'price', title: 'Price', type: 'string', validation: (rule: any) => rule.required() }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'price' } },
}

export const addOnsSection = defineType({
  name: 'addOnsSection',
  title: 'Add-Ons',
  type: 'object',
  fields: [
    defineField({ name: 'addons', title: 'Add-ons', type: 'array', of: [addon] }),
  ],
})

// Marker sections: no fields of their own. They tell the page builder "render
// the Testimonial/Faq component here" — those components already query the
// existing `testimonial`/`faq` collections independently. This makes their
// *position* on the page editable/reorderable without any new schema.
export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials (from Testimonial collection)',
  type: 'object',
  fields: [defineField({ name: 'note', title: 'Note', type: 'string', readOnly: true, initialValue: 'Pulls live from the Testimonial collection — nothing to configure here.' })],
  preview: { select: {}, prepare: () => ({ title: 'Testimonials section' }) },
})

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ (from FAQ collection)',
  type: 'object',
  fields: [defineField({ name: 'note', title: 'Note', type: 'string', readOnly: true, initialValue: 'Pulls live from the FAQ collection — nothing to configure here.' })],
  preview: { select: {}, prepare: () => ({ title: 'FAQ section' }) },
})
