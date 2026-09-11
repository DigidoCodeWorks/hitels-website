// First lint pass this repo has ever had — kept intentionally permissive
// (recommended rulesets, not strict/stylistic) so it catches real bugs
// without blocking the first commit on a wall of pre-existing style nits.
// Tighten later once the codebase has had a chance to clean up gradually.
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'legacy-html-backup/**', 'public/**'],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    rules: {
      // The TypeGen refactor removed every remaining `any` from the codebase
      // (Sanity query results are properly typed now) — enforced as an error
      // so the CI lint gate actually blocks new ones, not just warns.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
)
