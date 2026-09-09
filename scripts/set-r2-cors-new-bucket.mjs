// One-off: applies the same CORS policy as set-r2-cors.mjs, but to the new
// R2 bucket (dev@revera.is account, *_NEW credentials) during the Cloudflare
// migration. Once the migration is complete and env vars are renamed back to
// the plain R2_* names, set-r2-cors.mjs is the one to use going forward.
import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';

const { R2_ACCOUNT_ID_NEW, R2_ACCESS_KEY_ID_NEW, R2_SECRET_ACCESS_KEY_NEW, R2_BUCKET_NAME_NEW } = process.env;

for (const [name, value] of Object.entries({ R2_ACCOUNT_ID_NEW, R2_ACCESS_KEY_ID_NEW, R2_SECRET_ACCESS_KEY_NEW, R2_BUCKET_NAME_NEW })) {
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
}

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID_NEW}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID_NEW, secretAccessKey: R2_SECRET_ACCESS_KEY_NEW },
});

await client.send(new PutBucketCorsCommand({
  Bucket: R2_BUCKET_NAME_NEW,
  CORSConfiguration: {
    CORSRules: [
      { AllowedOrigins: ['*'], AllowedMethods: ['GET'], AllowedHeaders: ['*'], MaxAgeSeconds: 3600 },
    ],
  },
}));

console.log(`CORS policy set on bucket "${R2_BUCKET_NAME_NEW}": public GET allowed from any origin.`);
