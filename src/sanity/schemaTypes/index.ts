import type { SchemaTypeDefinition } from 'sanity'

import post from './post'
import faq from './faq'
import testimonial from './testimonial'
import story from './story'
import storiesClosingCard from './storiesClosingCard'
import page from './page'
import pricingPlans from './pricingPlans'
import {
  heroSection,
  productOfferingsSection,
  customerStoriesSection,
  addOnsSection,
  testimonialsSection,
  faqSection,
} from './sections'

export const schemaTypes: SchemaTypeDefinition[] = [
  page,
  pricingPlans,
  post,
  faq,
  testimonial,
  story,
  storiesClosingCard,
  heroSection,
  productOfferingsSection,
  customerStoriesSection,
  addOnsSection,
  testimonialsSection,
  faqSection,
]
