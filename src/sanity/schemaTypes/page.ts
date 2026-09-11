import { defineField, defineType } from 'sanity'
import { seoField } from '../fields'

// A real collection (not Home-special-cased) so other pages can reuse this
// same page-builder system in later passes. Home's instance is identified by
// slug "home" — Studio's structure.ts pins a shortcut to it, but nothing here
// restricts creating further `page` documents for future pages.
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        { type: 'heroSection' },
        { type: 'productHeroSection' },
        { type: 'simpleHeroSection' },
        { type: 'productOfferingsSection' },
        { type: 'customerStoriesSection' },
        { type: 'addOnsSection' },
        { type: 'featuresSection' },
        { type: 'statsIntroSection' },
        { type: 'teamSection' },
        { type: 'beliefsSection' },
        { type: 'whatIsHitelsSection' },
        { type: 'testimonialsSection' },
        { type: 'faqSection' },
      ],
    }),
    seoField(),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? `/${slug}` : undefined }),
  },
})
