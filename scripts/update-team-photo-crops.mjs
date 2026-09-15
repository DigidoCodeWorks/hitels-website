// One-off: repoints the About page team section's photoUrl fields at the
// half-body crops uploaded to images/about/team/halfbody/ (the originals at
// images/about/team/ were full upper-body shots with inconsistent headroom
// per photo -- see Team.astro). Patches only photoUrl on each member by
// _key, leaving name/role/email untouched. Safe to re-run.
//
// Usage: node --env-file=.env scripts/update-team-photo-crops.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const MEMBER_KEYS = ['arnar', 'thordis', 'birgir', 'salome', 'bjarki'];

const patches = MEMBER_KEYS.map((key) => ({
  patch: {
    id: 'aboutUsPage',
    set: {
      [`sections[_key=="team"].members[_key=="${key}"].photoUrl`]: r2(`images/about/team/halfbody/${key}.webp`),
    },
  },
}));

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ mutations: patches }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Update failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Updated team photoUrl fields on "aboutUsPage".');
console.log(JSON.stringify(body, null, 2));
