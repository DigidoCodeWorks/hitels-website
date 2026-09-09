// One-off migration: copies every object from the old R2 bucket (personal
// Cloudflare account) to the new R2 bucket (dev@revera.is account), as part
// of the Vercel -> Cloudflare Pages migration. Streams each object
// (GetObject -> PutObject) since R2 doesn't support cross-account CopyObject.
// Idempotent/resumable: skips objects already present in the new bucket with
// a matching size.
//
// Usage: node --env-file=.env scripts/migrate-r2-to-new-account.mjs
// Requires both the old (R2_ACCOUNT_ID/R2_ACCESS_KEY_ID/...) and new
// (*_NEW suffixed) sets of R2 credentials in .env.

import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const {
  R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME,
  R2_ACCOUNT_ID_NEW, R2_ACCESS_KEY_ID_NEW, R2_SECRET_ACCESS_KEY_NEW, R2_BUCKET_NAME_NEW,
} = process.env;

for (const [name, value] of Object.entries({
  R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME,
  R2_ACCOUNT_ID_NEW, R2_ACCESS_KEY_ID_NEW, R2_SECRET_ACCESS_KEY_NEW, R2_BUCKET_NAME_NEW,
})) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const oldClient = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

const newClient = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID_NEW}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID_NEW, secretAccessKey: R2_SECRET_ACCESS_KEY_NEW },
});

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

const keys = [];
let continuationToken;
do {
  const res = await oldClient.send(new ListObjectsV2Command({ Bucket: R2_BUCKET_NAME, ContinuationToken: continuationToken }));
  for (const obj of res.Contents || []) keys.push(obj.Key);
  continuationToken = res.NextContinuationToken;
} while (continuationToken);

console.log(`Found ${keys.length} objects in old bucket "${R2_BUCKET_NAME}". Copying to "${R2_BUCKET_NAME_NEW}"...`);

let copied = 0;
let skipped = 0;
let failed = 0;

for (const key of keys) {
  try {
    let existingSize = null;
    try {
      const head = await newClient.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME_NEW, Key: key }));
      existingSize = head.ContentLength;
    } catch {
      // doesn't exist yet in the new bucket, proceed to copy
    }

    const got = await oldClient.send(new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    const body = await streamToBuffer(got.Body);

    if (existingSize === body.length) {
      skipped++;
      continue;
    }

    await newClient.send(new PutObjectCommand({
      Bucket: R2_BUCKET_NAME_NEW,
      Key: key,
      Body: body,
      ContentType: got.ContentType,
    }));
    copied++;
    if (copied % 20 === 0) console.log(`  ...${copied} copied so far`);
  } catch (err) {
    failed++;
    console.error(`FAILED: ${key} — ${err.message}`);
  }
}

console.log(`\nDone. Copied: ${copied}, already present (skipped): ${skipped}, failed: ${failed}, total: ${keys.length}`);
if (failed > 0) process.exit(1);
