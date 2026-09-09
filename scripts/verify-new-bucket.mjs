// Quick verification helper: counts objects and total size in the new R2
// bucket (the *_NEW credentials), used to confirm migrate-r2-to-new-account.mjs
// actually landed everything. Not part of the regular asset-upload workflow.
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID_NEW}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID_NEW, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY_NEW },
});

let count = 0, size = 0, token;
do {
  const res = await client.send(new ListObjectsV2Command({ Bucket: process.env.R2_BUCKET_NAME_NEW, ContinuationToken: token }));
  for (const o of res.Contents || []) { count++; size += o.Size; }
  token = res.NextContinuationToken;
} while (token);

console.log('New bucket object count:', count, '| total size:', (size / 1024 / 1024).toFixed(2), 'MB');
