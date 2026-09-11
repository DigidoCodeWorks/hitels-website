import { defineField } from 'sanity'

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
