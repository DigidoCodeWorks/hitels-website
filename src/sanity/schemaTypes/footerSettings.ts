import { defineField, defineType } from 'sanity'
import { linkField } from '../fields'

// Site-wide singleton: every piece of Footer.astro's content that was
// previously hardcoded (CTA banner, contact column, Product/Company link
// lists, social hrefs, copyright text). Same __experimental_actions lock as
// siteSettings.ts/pricingPlans.ts — exactly one instance should ever exist.
//
// Deliberately NOT included here (stays hardcoded in Footer.astro):
// - The Hitels logo — reuses siteSettings.organizationName/organizationLogoUrl
//   instead of duplicating the same asset in a second field.
// - The "by Revera" credit — an agency signature, not client content.
// - The background video/decorative blob — bespoke visual treatment, not
//   per-editor content (same reasoning as Hero's background video).
// - Cookie Settings / Privacy Policy links — tied 1:1 to real routes
//   (/cookie-policy, /privacy-policy) that already exist in the codebase;
//   repointing them requires a code change anyway, so there's no real
//   "content" here for an editor to manage.

// A single {label, href} pair — the Product/Company columns are plain lists
// of these, so editors can add/remove/reorder link items freely instead of
// being limited to a fixed set of link fields.
const footerLink = {
  type: 'object',
  name: 'footerLink',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    linkField('href', 'Link', { required: true }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
}

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  // @ts-expect-error — a real, supported Sanity Studio feature (locks
  // create/delete for a singleton document) that isn't part of defineType's
  // public TS surface.
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'ctaHeadline',
      title: 'CTA headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA body',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'primaryButtonLabel', title: 'Primary button label', type: 'string', validation: (rule) => rule.required() }),
    linkField('primaryButtonHref', 'Primary button link', { required: true }),
    defineField({ name: 'secondaryButtonLabel', title: 'Secondary button label', type: 'string', validation: (rule) => rule.required() }),
    linkField('secondaryButtonHref', 'Secondary button link', { required: true }),

    defineField({
      name: 'contactHeadline',
      title: 'Contact column headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'phoneLabel', title: 'Phone display text', type: 'string', validation: (rule) => rule.required() }),
    linkField('phoneHref', 'Phone link', { description: 'e.g. "tel:+3545478001", or "#" as a placeholder until it\'s set.' }),
    defineField({ name: 'mailingListLabel', title: 'Mailing list link text', type: 'string', validation: (rule) => rule.required() }),
    linkField('mailingListHref', 'Mailing list link', { description: 'Sign-up form URL, or "#" as a placeholder until it\'s set.' }),

    defineField({
      name: 'productLinks',
      title: 'Product column links',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [footerLink],
    }),
    defineField({
      name: 'companyLinks',
      title: 'Company column links',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [footerLink],
    }),

    defineField({ name: 'instagramHref', title: 'Instagram URL', type: 'url', description: 'Leave blank to hide the icon.' }),
    defineField({ name: 'facebookHref', title: 'Facebook URL', type: 'url', description: 'Leave blank to hide the icon.' }),
    defineField({ name: 'linkedinHref', title: 'LinkedIn URL', type: 'url', description: 'Leave blank to hide the icon.' }),

    defineField({
      name: 'copyrightText',
      title: 'Copyright text',
      description: 'e.g. "© 2026 Hitels. All rights reserved." — update the year yourself; not auto-generated.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: 'Footer Settings' }) },
})
