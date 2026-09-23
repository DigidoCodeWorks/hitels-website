import { defineField, defineType } from 'sanity'
import { languageField } from '../fields'
import { addon } from './sections'

// Site-wide singleton: the 3 add-on cards shown on Home (mobile layout,
// home/AddOns.astro) and Pricing (desktop layout, pricing/AddOns.astro) —
// previously the exact same content hardcoded twice, once per component.
// Same __experimental_actions lock as pricingPlans/siteSettings — exactly
// one instance should ever exist.
export default defineType({
  name: 'addOns',
  title: 'Add-Ons',
  type: 'document',
  // @ts-expect-error — a real, supported Sanity Studio feature (locks
  // create/delete for a singleton document) that isn't part of defineType's
  // public TS surface.
  __experimental_actions: ['update', 'publish'],
  fields: [
    languageField(),
    defineField({ name: 'addons', title: 'Add-ons', type: 'array', validation: (rule) => rule.required().min(1), of: [addon] }),
  ],
  preview: { prepare: () => ({ title: 'Add-Ons' }) },
})
