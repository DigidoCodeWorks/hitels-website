import type { APIRoute } from 'astro';

// llms.txt (https://llmstxt.org/) — a curated, plain-text index of the site
// for AI crawlers/answer engines, same spirit as robots.txt/sitemap.xml but
// aimed at LLMs rather than search-engine bots. Hand-maintained: the site's
// top-level pages are few and stable, so this isn't worth generating from
// Sanity — add a line here when a new top-level page ships. An Astro route
// (not a static public/ file) so links can be absolute, matching
// robots.txt.ts's pattern of resolving them against `site` at request time.
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).toString();

  const body = `# Hitels

> Hitels builds award-winning, bespoke hotel websites and booking engines that turn visitors into direct bookings — no templates, no OTA dependency.

## Pages

- [Home](${url('/')}): Overview of the custom website and booking engine offering, customer results, add-ons, and pricing.
- [About Us](${url('/about-us')}): Who Hitels is and its mission to help hoteliers reclaim direct revenue, online presence, and guest relationships.
- [Custom Website](${url('/custom-website')}): Bespoke, SEO-driven hotel website design built from scratch — no templates.
- [Booking Engine](${url('/booking-engine')}): A booking engine built to maximize direct revenue with a seamless, branded checkout flow.
- [Pricing](${url('/pricing')}): Pricing plans for the custom website, booking engine, and combined packages.
- [Blog](${url('/blog')}): Guides, news, and insights on direct bookings, hotel websites, and revenue growth.
- [Contact Us](${url('/contact-us')}): Get in touch with the Hitels team.
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
