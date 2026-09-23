import { defineField, defineType } from 'sanity'
import { languageField, seoField } from '../fields'

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
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        // Sanity's default slug uniqueness check is scoped only by _type, so
        // an English and Icelandic "page" doc that both want slug "home"
        // would otherwise collide. Scope the check by language too, so one
        // slug can have (at most) one document per language.
        isUnique: async (slugValue, context) => {
          const { document, getClient } = context
          // withConfig({ useCdn: false }) — a uniqueness check needs fresh
          // data; the CDN lags ~30-60s behind writes (same reasoning as
          // astro.config.mjs's sanity() integration), which can otherwise
          // flag a real, already-resolved conflict as still unresolved
          // right after a publish. getClient()'s own options type doesn't
          // accept useCdn directly, so it's applied via withConfig instead.
          const client = getClient({ apiVersion: '2024-01-01' }).withConfig({ useCdn: false })
          const id = document?._id.replace(/^drafts\./, '')
          const params = {
            draft: `drafts.${id}`,
            published: id,
            slug: slugValue,
            language: document?.language,
          }
          return client.fetch(
            `!defined(*[_type == "page" && !(_id in [$draft, $published]) && slug.current == $slug && language == $language][0]._id)`,
            params
          )
        },
      },
      validation: (rule) => rule.required(),
    }),
    languageField(),
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
        { type: 'comparisonTableSection' },
        { type: 'testimonialsSection' },
        { type: 'faqSection' },
      ],
    }),
    seoField(),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', language: 'language' },
    prepare: ({ title, slug, language }) => ({
      title,
      subtitle: slug ? `/${slug}${language ? ` · ${language}` : ''}` : undefined,
    }),
  },
})
