import { defineField, defineType } from 'sanity'
import { imageUrlField, linkField, stringListField } from '../fields'

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
    linkField('primaryButtonHref', 'Primary button link'),
    defineField({ name: 'secondaryButtonLabel', title: 'Secondary button label', type: 'string' }),
    linkField('secondaryButtonHref', 'Secondary button link'),
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
    linkField('ctaHref', 'CTA link'),
    imageUrlField('desktopImageUrl', 'Desktop/tablet image URL'),
    imageUrlField('mobileImageUrl', 'Mobile image URL'),
  ],
  preview: { select: { title: 'headline' } },
}

export const productOfferingsSection = defineType({
  name: 'productOfferingsSection',
  title: 'Product Offerings',
  type: 'object',
  fields: [
    defineField({ name: 'offerings', title: 'Offerings', type: 'array', validation: (rule) => rule.required().min(1), of: [offering] }),
  ],
})
// Astro-side alternates the background color behind each offering's image by
// array index — that's a visual/design decision, not content, so it's
// intentionally not an editable field here.

const storyCard = {
  type: 'object',
  name: 'storyCard',
  fields: [
    imageUrlField('logoUrl', 'Logo URL'),
    imageUrlField('imageUrl', 'Image URL'),
    defineField({ name: 'caption', title: 'Caption', type: 'string', validation: (rule: any) => rule.required() }),
    linkField('href', 'Link', { required: true }),
  ],
  preview: { select: { title: 'caption' } },
}

export const customerStoriesSection = defineType({
  name: 'customerStoriesSection',
  title: 'Customer Stories',
  type: 'object',
  fields: [
    defineField({ name: 'cards', title: 'Cards', type: 'array', validation: (rule) => rule.required().min(1), of: [storyCard] }),
  ],
})

const addon = {
  type: 'object',
  name: 'addon',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule: any) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule: any) => rule.required() }),
    imageUrlField('iconUrl', 'Icon URL'),
    defineField({ name: 'price', title: 'Price', type: 'string', validation: (rule: any) => rule.required() }),
    stringListField('features', 'Features'),
  ],
  preview: { select: { title: 'title', subtitle: 'price' } },
}

export const addOnsSection = defineType({
  name: 'addOnsSection',
  title: 'Add-Ons',
  type: 'object',
  fields: [
    defineField({ name: 'addons', title: 'Add-ons', type: 'array', validation: (rule) => rule.required().min(1), of: [addon] }),
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
