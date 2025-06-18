import pluginJs from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended' // ✅ ES module import
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  {
    ignores: ['.node_modules/*'],
  },
  eslintPluginPrettierRecommended, // ✅ correctly placed
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {
      'jsdoc/require-description': 'error',
      'jsdoc/check-values': 'error',
    },
  },
]
