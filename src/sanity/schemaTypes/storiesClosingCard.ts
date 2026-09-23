import { defineField, defineType } from 'sanity'
import { imageUrlField, altTextField, languageField, linkField } from '../fields'

// Singleton (one per language — see languageField() below): the fixed
// closing "bumper" slide shown after all customer stories in the
// Instagram-style story viewer (Hero section, mobile). Not backed by a
// Stories.csv row — it's evergreen CTA copy, not a case study.
//
// The `__experimental_actions` lock below was missing until now — every
// other singleton in this project (pricingPlans/siteSettings/footerSettings/
// addOns) has always had it; this one was a pre-existing gap, unrelated to
// localization, fixed here as a low-risk drive-by since the file was
// already open. Its `_id` ("storiesClosingCard-default") also doesn't match
// the other singletons' bare-name convention — left as-is rather than
// risking a rename migration; just noting the inconsistency here so it
// isn't mistaken for a bug later.
export default defineType({
  name: 'storiesClosingCard',
  title: 'Stories: Closing Card',
  type: 'document',
  // @ts-expect-error -- __experimental_actions is a real, working Studio
  // feature (locks create/delete so editors can't accidentally spawn a
  // second instance) that Sanity's own defineType() types don't model yet.
  __experimental_actions: ['update', 'publish'],
  fields: [
    languageField(),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    imageUrlField('backgroundImageUrl', 'Background image URL', { required: false }),
    altTextField('backgroundImageAlt', 'Background image alt text'),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            imageUrlField('iconUrl', 'Icon URL', { required: false }),
            { name: 'text', title: 'Text', type: 'string' },
          ],
          preview: { select: { title: 'text' } },
        },
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
    }),
    linkField('buttonLink', 'Button link (absolute or relative path)'),
  ],
})
