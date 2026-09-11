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
      // Astro components commonly use `any` for Sanity query results pending
      // the TypeGen refactor — don't block on this yet.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
)
