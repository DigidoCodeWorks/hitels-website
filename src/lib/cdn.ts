// Must match R2_PUBLIC_URL in .env — update both if the bucket/domain changes.
// Was the shared pub-....r2.dev dev subdomain until 2026-09-25 — moved to this
// custom domain because r2.dev is rate-limited (not for production per
// Cloudflare's own docs) and, worse, was found to be DNS-blocked wholesale on
// Indonesian ISPs (PT Telkom's "Internet Positif" filtering resolves the bare
// r2.dev domain itself to a block page) — collateral damage from some other
// r2.dev-hosted bucket, unrelated to this project. A same-domain subdomain
// isn't caught by a block targeting the shared r2.dev domain.
export const R2_BASE = 'https://cdn.hitels.is';

export function asset(path: string): string {
  return `${R2_BASE}/${path.replace(/^\//, '')}`;
}
