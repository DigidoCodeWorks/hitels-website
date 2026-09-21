// Shared JSON-LD helpers for schema.org structured data used across pages.
// Keeps the BreadcrumbList shape defined once instead of copy-pasted into
// every page that needs one — see src/sanity/fields.ts for the same
// "factory once it's used twice" reasoning applied to Sanity schema fields.

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
