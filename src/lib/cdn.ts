// Must match R2_PUBLIC_URL in .env — update both if the bucket/domain changes.
export const R2_BASE = 'https://pub-cc3bba3bab304bebb22958edffa16e9c.r2.dev';

export function asset(path: string): string {
  return `${R2_BASE}/${path.replace(/^\//, '')}`;
}
