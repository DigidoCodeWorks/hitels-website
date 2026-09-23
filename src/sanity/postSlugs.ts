import { sanityClient } from 'sanity:client';
import { postSlugsQuery } from './queries';

// Astro.currentLocale isn't available inside a page's getStaticPaths()
// export (a different, restricted Astro-global stub is used there), so the
// language has to be a literal passed in by the caller rather than derived
// — each locale's discover/[slug].astro calls this with its own hardcoded
// 'en'/'is'. Factored out so the two page files don't duplicate the GROQ
// fetch/map logic, only this one-line call.
export async function fetchPostSlugParams(language: 'en' | 'is') {
  const posts = await sanityClient.fetch(postSlugsQuery, { language });
  return posts.map((post) => ({ params: { slug: post.slug } }));
}
