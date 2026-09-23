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
  _updatedAt,
  category,
  externalLink,
  shortDescription,
  body,
  metaTitle,
  metaDescription,
  relatedPosts[]->{
    title,
    "slug": slug.current,
    imageUrl,
    imageAlt
  }
}`)

export const pricingPlansQuery = defineQuery(`*[_type == "pricingPlans" && language == $language][0]{ plans }`)

// Generic — fetches any `page` document by its slug, with every page-builder
// section type's projection. One query for every page-builder page (Home,
// Custom Website, and any future conversion) rather than one hand-copied
// per-page query, so a new section type only needs adding here once.
export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug && language == $language][0]{
    sections[]{
      _key,
      _type,
      _type == "heroSection" => {
        headline, subheadingDesktop, subheadingMobile,
        primaryButtonLabel, primaryButtonHref,
        secondaryButtonLabel, secondaryButtonHref
      },
      _type == "productHeroSection" => {
        headline, subheading,
        primaryButtonLabel, primaryButtonHref,
        secondaryButtonLabel, secondaryButtonHref,
        imageUrl, imageAlt
      },
      _type == "simpleHeroSection" => { headline, subheading },
      _type == "productOfferingsSection" => { offerings },
      _type == "customerStoriesSection" => { cards },
      _type == "featuresSection" => { features },
      _type == "statsIntroSection" => { headline, body, stats },
      _type == "teamSection" => { headline, body, members },
      _type == "beliefsSection" => { headline, beliefs },
      _type == "whatIsHitelsSection" => { headline, body, features },
      _type == "comparisonTableSection" => { plans, rows }
    },
    seo
  }
`)

// Site-wide singleton (src/sanity/schemaTypes/siteSettings.ts) — fetched by
// both BaseLayout.astro (Organization JSON-LD + OG image fallback) and any
// page resolving its own SEO fields against the site defaults, so this is
// the one shared projection both call sites narrow down to what they need.
export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings" && language == $language][0]{ siteName, defaultSeoTitle, defaultSeoDescription, defaultOgImage, organizationName, organizationLogoUrl }`
)

// Shared "Add-ons" singleton (src/sanity/schemaTypes/addOns.ts) — fetched
// independently by both Home's and Pricing's AddOns.astro (different
// layouts, same content), same pattern as siteSettingsQuery.
export const addOnsQuery = defineQuery(`*[_type == "addOns" && language == $language][0]{ addons }`)

// Site-wide singleton (src/sanity/schemaTypes/footerSettings.ts) — fetched
// by Footer.astro, the one component every page includes.
export const footerSettingsQuery = defineQuery(`*[_type == "footerSettings" && language == $language][0]{
  ctaHeadline, ctaBody,
  primaryButtonLabel, primaryButtonHref,
  secondaryButtonLabel, secondaryButtonHref,
  contactHeadline,
  phoneLabel, phoneHref,
  mailingListLabel, mailingListHref,
  productLinks[]{ label, href },
  companyLinks[]{ label, href },
  instagramHref, facebookHref, linkedinHref,
  copyrightText
}`)
