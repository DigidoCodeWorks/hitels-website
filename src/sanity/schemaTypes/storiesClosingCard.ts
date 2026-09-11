import { defineField, defineType } from 'sanity'
import { imageUrlField, altTextField, linkField } from '../fields'

// Singleton: the fixed closing "bumper" slide shown after all customer
// stories in the Instagram-style story viewer (Hero section, mobile). Not
// backed by a Stories.csv row — it's evergreen CTA copy, not a case study.
export default defineType({
  name: 'storiesClosingCard',
  title: 'Stories: Closing Card',
  type: 'document',
  fields: [
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
