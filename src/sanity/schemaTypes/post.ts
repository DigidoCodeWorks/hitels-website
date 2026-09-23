import { defineField, defineType } from 'sanity'
import { imageUrlField, altTextField, languageField, languageScopedSlugIsUnique, linkField } from '../fields'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', isUnique: languageScopedSlugIsUnique('post') },
      validation: (rule) => rule.required(),
    }),
    languageField(),
    imageUrlField('imageUrl', 'Image URL', { required: false }),
    altTextField('imageAlt', 'Image alt text'),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'e.g. "Hitels" or "News"',
      type: 'string',
    }),
    linkField('externalLink', 'External / CTA link'),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'string', title: 'URL (absolute or relative path)' }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related posts',
      description: 'Shown in a "Related articles" section at the bottom of this post. Pick 2-4 topically related posts.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (rule) => rule.max(4).unique(),
    }),
  ],
})
