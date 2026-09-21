// One-off backfill: sets Cache-Control on every object already in the R2
// bucket, matching the header upload-to-r2.mjs now sets on new uploads (see
// that script for why this is a bounded 30-day cache, not `immutable` —
// same reasoning applies here). PageSpeed Insights flagged this as the
// single largest remaining "efficient cache lifetimes" opportunity
// (~9MB estimated savings) after the /_astro/* immutable-caching fix, which
// only covered the site's own hashed build assets, not R2-hosted content.
//
// Metadata-only server-side copy (each object copied onto itself with
// MetadataDirective: REPLACE) — doesn't re-transfer or modify any image
// bytes, just the response headers R2 serves them with. Safe to re-run.
//
// Usage: node --env-file=.env scripts/patch-r2-cache-control.mjs

import { extname } from 'node:path';
import { S3Client, ListObjectsV2Command, CopyObjectCommand } from '@aws-sdk/client-s3';

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } = process.env;

for (const [name, value] of Object.entries({ R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

// Kept in sync with upload-to-r2.mjs's CONTENT_TYPES map — CopyObjectCommand
// with MetadataDirective: 'REPLACE' requires every desired header to be
// specified explicitly, so ContentType has to be re-derived here too (it
// won't carry over from the original object automatically).
const CONTENT_TYPES = {
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const CACHE_CONTROL = 'public, max-age=2592000, stale-while-revalidate=86400';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

let continuationToken;
const keys = [];

do {
  const res = await client.send(new ListObjectsV2Command({
    Bucket: R2_BUCKET_NAME,
    ContinuationToken: continuationToken,
  }));
  for (const obj of res.Contents || []) keys.push(obj.Key);
  continuationToken = res.NextContinuationToken;
} while (continuationToken);

console.log(`Found ${keys.length} objects. Patching Cache-Control on each...`);

let patched = 0;
let failed = 0;

for (const key of keys) {
  const contentType = CONTENT_TYPES[extname(key).toLowerCase()] || 'application/octet-stream';
  try {
    await client.send(new CopyObjectCommand({
      Bucket: R2_BUCKET_NAME,
      CopySource: `${R2_BUCKET_NAME}/${encodeURIComponent(key)}`,
      Key: key,
      ContentType: contentType,
      CacheControl: CACHE_CONTROL,
      MetadataDirective: 'REPLACE',
    }));
    patched++;
  } catch (err) {
    failed++;
    console.error(`Failed: ${key} — ${err.message}`);
  }
}

console.log(`Done. Patched ${patched}/${keys.length} objects${failed > 0 ? `, ${failed} failed` : ''}.`);
