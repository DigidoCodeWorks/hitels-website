import { defineField } from 'sanity'
import type { SlugIsUniqueValidator } from 'sanity'

// Field factories: the repeated field shapes across this project's schemas,
// written once and called everywhere instead of retyped per schema file.
// Change one of these and every schema built from it updates consistently.
//
// Kept as plain functions (not Sanity types/plugins) so they stay simple to
// call inline inside any schema's `fields: [...]` array.

/**
 * A URL pointing at an R2-hosted image (this project doesn't use Sanity's
 * native `image` type for content media — see any existing schema's
 * "Hosted on R2, not a Sanity asset" comment). Required by default since a
 * media field with no image is usually a mistake, not a valid empty state.
 */
export function imageUrlField(name: string, title: string, opts: { required?: boolean; description?: string } = {}) {
  const { required = true, description = 'Hosted on R2, not a Sanity asset — set by an upload script.' } = opts
  return defineField({
    name,
    title,
    type: 'url',
    description,
    validation: required ? (rule) => rule.required() : undefined,
  })
}

/** Plain-text alt text paired with an imageUrlField above it. Never required — an empty alt is valid for decorative images. */
export function altTextField(name: string, title: string) {
  return defineField({ name, title, type: 'string' })
}

/**
 * A link destination — plain `string`, not Sanity's `url` type, since these
 * are often relative in-site paths (e.g. "/contact-us"), which the `url`
 * type would reject.
 */
export function linkField(name: string, title: string, opts: { required?: boolean; description?: string } = {}) {
  const { required = false, description } = opts
  return defineField({
    name,
    title,
    type: 'string',
    description,
    validation: required ? (rule) => rule.required() : undefined,
  })
}

/** A simple array of plain-text strings — feature/bullet lists. */
export function stringListField(name: string, title: string) {
  return defineField({ name, title, type: 'array', of: [{ type: 'string' }] })
}

/**
 * Document language, for schemas with a locale-specific counterpart (e.g. an
 * English and Icelandic `page` document sharing the same slug). Defaults to
 * 'en' for new documents, but existing documents need this backfilled
 * explicitly — initialValue only applies on creation in the Studio UI.
 */
export function languageField() {
  return defineField({
    name: 'language',
    title: 'Language',
    type: 'string',
    options: {
      list: [
        { title: 'English', value: 'en' },
        { title: 'Icelandic', value: 'is' },
      ],
      layout: 'radio',
    },
    initialValue: 'en',
    validation: (rule) => rule.required(),
  })
}

/**
 * Sanity's default slug uniqueness check is scoped only by `_type`, so an
 * English and Icelandic document that both want the same slug (e.g. two
 * "page" docs both slugged "home") would otherwise collide. Scope the check
 * by `language` too, via `slug.options.isUnique`, so one slug can have (at
 * most) one document per language. `typeName` must match the schema's own
 * `name` (the check filters on `_type == typeName`).
 *
 * withConfig({ useCdn: false }) is required, not optional: the CDN lags
 * ~30-60s behind writes, which can otherwise flag a real, already-resolved
 * conflict as still unresolved right after a publish (reproduced and fixed
 * once already, on the `page` schema, before this was extracted here).
 */
export function languageScopedSlugIsUnique(typeName: string): SlugIsUniqueValidator {
  return async (slugValue, context) => {
    const { document, getClient } = context
    const client = getClient({ apiVersion: '2024-01-01' }).withConfig({ useCdn: false })
    const id = document?._id.replace(/^drafts\./, '')
    const params = {
      draft: `drafts.${id}`,
      published: id,
      slug: slugValue,
      language: document?.language,
    }
    return client.fetch(
      `!defined(*[_type == "${typeName}" && !(_id in [$draft, $published]) && slug.current == $slug && language == $language][0]._id)`,
      params
    )
  }
}

/**
 * Per-document SEO override (title/description/OG image), always named
 * "seo" so every page-builder-converted document type exposes it under the
 * same field name for BaseLayout/page components to resolve consistently
 * against src/sanity/schemaTypes/siteSettings.ts's site-wide defaults —
 * `page.seo?.title ?? siteSettings.defaultSeoTitle`. Every field stays
 * optional: a blank field means "fall back to the site default," not "this
 * page has no SEO."
 */
export function seoField() {
  return defineField({
    name: 'seo',
    title: 'SEO',
    description: 'Overrides the Site Settings defaults for this page only. Leave a field blank to fall back to the site default.',
    type: 'object',
    fields: [
      defineField({ name: 'title', title: 'SEO title', type: 'string' }),
      defineField({ name: 'description', title: 'SEO description', type: 'text', rows: 3 }),
      imageUrlField('ogImage', 'Social share image URL', { required: false, description: 'Hosted on R2, not a Sanity asset.' }),
    ],
  })
}
