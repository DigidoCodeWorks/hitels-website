import { defineField, defineType } from 'sanity'
import { altTextField, imageUrlField, linkField, stringListField } from '../fields'

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

// Generic product-landing-page hero: headline + one subheading paragraph +
// two CTA buttons. Distinct from `heroSection` (Home's hero splits its
// subheading into desktop/mobile variants and has no shared name with this
// shape) — named generically rather than "customWebsiteHeroSection" since
// Booking Engine's hero is the same shape and can reuse this type when it's
// converted. The hero's collage images, decorative background, and button
// icons stay hardcoded in the Astro component — bespoke per-page visual
// treatment, not editable content (same reasoning as Home's PartnerLogos/
// Benefits staying out of the page builder entirely). imageUrl/imageAlt are
// optional and only consumed by About Us's Hero (a single photo, unlike
// Custom Website/Booking Engine's hardcoded multi-breakpoint collages) —
// harmless unused fields on the other two pages' documents.
export const productHeroSection = defineType({
  name: 'productHeroSection',
  title: 'Product Hero',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2, validation: (rule) => rule.required() }),
    defineField({ name: 'primaryButtonLabel', title: 'Primary button label', type: 'string' }),
    linkField('primaryButtonHref', 'Primary button link'),
    defineField({ name: 'secondaryButtonLabel', title: 'Secondary button label', type: 'string' }),
    linkField('secondaryButtonHref', 'Secondary button link'),
    imageUrlField('imageUrl', 'Image URL', { required: false }),
    altTextField('imageAlt', 'Image alt text'),
  ],
  preview: { select: { title: 'headline' } },
})

// The minimal hero shape: just a headline and one subheading paragraph, no
// buttons or image. Distinct from `productHeroSection` (which always has
// two CTA buttons) rather than reusing it with blank button fields — Studio
// shouldn't offer button fields on a hero that never renders any.
export const simpleHeroSection = defineType({
  name: 'simpleHeroSection',
  title: 'Simple Hero',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'headline' } },
})

const featureItem = {
  type: 'object',
  name: 'featureItem',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    imageUrlField('imageUrl', 'Image URL'),
    altTextField('imageAlt', 'Image alt text'),
    defineField({
      name: 'imageFirst',
      title: 'Image first',
      description: 'Show the image before the text on desktop.',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageHasLightBackground',
      title: 'Light background behind image',
      description: 'Turn on for images that need a light fill behind them (e.g. a screenshot with transparent padding).',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'heading', subtitle: 'label' } },
}

// Which of FeatureSection.astro's two layout variants renders this section
// is a per-page visual choice (every feature on one page always shares one
// variant), not per-feature content — so it's set once by the Astro page
// that renders this section, not stored here.
export const featuresSection = defineType({
  name: 'featuresSection',
  title: 'Features',
  type: 'object',
  fields: [
    defineField({ name: 'features', title: 'Features', type: 'array', validation: (rule) => rule.required().min(1), of: [featureItem] }),
  ],
})

const offering = {
  type: 'object',
  name: 'offering',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
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
    defineField({ name: 'caption', title: 'Caption', type: 'string', validation: (rule) => rule.required() }),
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

// Exported (not a local const like the other per-section item shapes) since
// it's also used by src/sanity/schemaTypes/addOns.ts, the shared "Add-ons"
// singleton — the same 3 add-ons were previously duplicated verbatim across
// Home's (mobile) and Pricing's (desktop) hardcoded components, so this
// content now lives in one place both pages' AddOns.astro pull from
// independently, instead of two copies that could silently drift apart.
export const addon = {
  type: 'object',
  name: 'addon',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule) => rule.required() }),
    imageUrlField('iconUrl', 'Icon URL'),
    defineField({ name: 'price', title: 'Price', type: 'string', validation: (rule) => rule.required() }),
    stringListField('features', 'Features'),
  ],
  preview: { select: { title: 'title', subtitle: 'price' } },
}

// Marker section (see testimonialsSection/faqSection below): tells the page
// builder "render the Add-ons component here" — the component pulls the
// actual content from the shared addOns singleton independently. Used by
// both Home and Pricing.
export const addOnsSection = defineType({
  name: 'addOnsSection',
  title: 'Add-Ons (from Add-Ons collection)',
  type: 'object',
  fields: [defineField({ name: 'note', title: 'Note', type: 'string', readOnly: true, initialValue: 'Pulls live from the Add-Ons collection — nothing to configure here.' })],
  preview: { select: {}, prepare: () => ({ title: 'Add-Ons section' }) },
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

const stat = {
  type: 'object',
  name: 'stat',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      description: 'A leading number, optionally followed by a suffix, e.g. "15", "4", "19+" — parsed for the count-up animation.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'label', subtitle: 'value' } },
}

export const statsIntroSection = defineType({
  name: 'statsIntroSection',
  title: 'Stats Intro',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'stats', title: 'Stats', type: 'array', validation: (rule) => rule.required().min(1), of: [stat] }),
  ],
  preview: { select: { title: 'headline' } },
})

const teamMember = {
  type: 'object',
  name: 'teamMember',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (rule) => rule.required() }),
    imageUrlField('photoUrl', 'Photo URL'),
  ],
  preview: { select: { title: 'name', subtitle: 'role' } },
}

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Team',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'members', title: 'Members', type: 'array', validation: (rule) => rule.required().min(1), of: [teamMember] }),
  ],
  preview: { select: { title: 'headline' } },
})

// Shared by beliefsSection and whatIsHitelsSection — both are just a
// headline/intro plus a list of {title, description} pairs, rendered by two
// visually distinct Astro components (a 3-column row vs. a checklist next
// to a fixed decorative graphic), so they stay separate section types, but
// the repeated item shape is factored out once here.
const titledItem = {
  type: 'object',
  name: 'titledItem',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
}

export const beliefsSection = defineType({
  name: 'beliefsSection',
  title: 'Beliefs',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'beliefs', title: 'Beliefs', type: 'array', validation: (rule) => rule.required().min(1), of: [titledItem] }),
  ],
  preview: { select: { title: 'headline' } },
})

// The "Booking Recap" decorative graphic (fake pie chart + stat callouts)
// that sits alongside this section's headline/features stays entirely
// hardcoded in WhatIsHitels.astro — an illustrative widget, not real
// per-editor content (same reasoning as Home's Benefits/PartnerLogos).
export const whatIsHitelsSection = defineType({
  name: 'whatIsHitelsSection',
  title: 'What Is Hitels',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'features', title: 'Features', type: 'array', validation: (rule) => rule.required().min(1), of: [titledItem] }),
  ],
  preview: { select: { title: 'headline' } },
})

// Each value is a plain string rather than a boolean/string union (Sanity
// has no such field type): "true" renders a checkmark, "false" renders an
// empty cell, anything else renders as literal text — documented in the
// field description so editors don't need to read schema code to know the
// convention. A group-header row (e.g. "Design", "Technical") sets
// isGroupHeader and leaves values empty.
const comparisonRow = {
  type: 'object',
  name: 'comparisonRow',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'isGroupHeader',
      title: 'Group header row',
      description: 'A section divider with no values (e.g. "Design", "Technical") — turn this on instead of filling in Values.',
      type: 'boolean',
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      description: 'One value per plan column, in the same order as Plans below. Type "true" for a checkmark, "false" for an empty cell, or any other text to show it literally. Leave empty for a group header row.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { select: { title: 'label' } },
}

export const comparisonTableSection = defineType({
  name: 'comparisonTableSection',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'plans',
      title: 'Plans',
      description: 'Column headers — each row\'s Values line up with these in order.',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'rows', title: 'Rows', type: 'array', validation: (rule) => rule.required().min(1), of: [comparisonRow] }),
  ],
})
