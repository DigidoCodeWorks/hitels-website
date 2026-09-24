import { defineField, defineType } from 'sanity'
import { imageUrlField, altTextField, languageField, languageScopedSlugIsUnique, linkField } from '../fields'

export default defineType({
  name: 'story',
  title: 'Customer Story',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'projectName', isUnique: languageScopedSlugIsUnique('story') },
      validation: (rule) => rule.required(),
    }),
    languageField(),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'storyTitle',
      title: 'Story title (intro cards only)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    imageUrlField('backgroundImageUrl', 'Background image URL', { required: false }),
    altTextField('backgroundImageAlt', 'Background image alt text'),
    // The small circle badge shown next to the story's name in the mobile
    // story tray/viewer header (HeroStories.astro) — falls back to the
    // generic "hi." badge when unset, so this is optional rather than
    // required.
    imageUrlField('logoUrl', 'Logo URL (story tray badge)', { required: false }),
    imageUrlField('websitePreviewUrl', 'Website preview image URL', { required: false }),
    altTextField('websitePreviewAlt', 'Website preview image alt text'),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
    }),
    linkField('buttonLink', 'Button link (absolute or relative path)'),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
