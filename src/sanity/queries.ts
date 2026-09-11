import { defineQuery } from 'groq'

// Every GROQ query in the project, centralized here rather than inlined per
// component. Two reasons: (1) Sanity's typegen only statically scans
// .ts/.tsx/.js/.jsx files for defineQuery(...) calls to generate result types
// from — it can't parse .astro frontmatter, so queries have to live in a
// plain TS module for typegen to see them at all; (2) it also fixes the
// "same query, retyped slightly differently each time" drift this project
// otherwise had no protection against, same motivation as src/sanity/fields.ts.
//
// After editing a query here, run `npm run typegen` to regenerate
// sanity.types.ts before the new/changed shape is available to import.

export const storiesQuery = defineQuery(
  `*[_type == "story"] | order(order asc){ projectName, storyTitle, description, backgroundImageUrl, backgroundImageAlt, websitePreviewUrl, websitePreviewAlt, buttonText, buttonLink }`
)

export const storiesClosingCardQuery = defineQuery(
  `*[_type == "storiesClosingCard"][0]{ heading, backgroundImageUrl, backgroundImageAlt, features, buttonText, buttonLink }`
)

export const faqsQuery = defineQuery(`*[_type == "faq"] | order(order asc){ question, answer }`)

export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(order asc){ name, role, quote, imageUrl, imageAlt }`
)

export const postsQuery = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title,
    "slug": slug.current,
    category,
    imageUrl,
    imageAlt
  }`
)

export const postSlugsQuery = defineQuery(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`)

// Explicit projection (not a bare whole-document fetch) so typegen's
// --enforce-required-fields narrows title/slug/body etc. to non-null —
// a raw `[0]` with no {...} keeps everything optional regardless of that
// flag, since it falls back to the generic "any post document" shape.
export const postBySlugQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  imageUrl,
  imageAlt,
  publishedAt,
  category,
  externalLink,
  shortDescription,
  body,
  metaTitle,
  metaDescription
}`)

export const pricingPlansQuery = defineQuery(`*[_type == "pricingPlans"][0]{ plans }`)

export const homePageQuery = defineQuery(`
  *[_type == "page" && slug.current == "home"][0]{
    sections[]{
      _key,
      _type,
      _type == "heroSection" => {
        headline, subheadingDesktop, subheadingMobile,
        primaryButtonLabel, primaryButtonHref,
        secondaryButtonLabel, secondaryButtonHref
      },
      _type == "productOfferingsSection" => { offerings },
      _type == "customerStoriesSection" => { cards },
      _type == "addOnsSection" => { addons }
    },
    seo
  }
`)

// Site-wide singleton (src/sanity/schemaTypes/siteSettings.ts) — fetched by
// both BaseLayout.astro (Organization JSON-LD + OG image fallback) and any
// page resolving its own SEO fields against the site defaults, so this is
// the one shared projection both call sites narrow down to what they need.
export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0]{ siteName, defaultSeoTitle, defaultSeoDescription, defaultOgImage, organizationName, organizationLogoUrl }`
)
