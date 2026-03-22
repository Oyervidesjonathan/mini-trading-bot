import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * ESLint Configuration
 * --------------------
 * Defines linting rules and standards for the project to ensure
 * code consistency, readability, and adherence to best practices.
 *
 * Includes:
 * - Base JavaScript recommended rules
 * - React Hooks linting rules
 * - Vite React Refresh support
 * - Custom rule overrides
 */

export default defineConfig([
  // Ignore build output directory
  globalIgnores(['dist']),

  {
    // Apply rules to all JS and JSX files
    files: ['**/*.{js,jsx}'],

    // Extend recommended rule sets
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      // Set JavaScript version and browser globals
      ecmaVersion: 2020,
      globals: globals.browser,

      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    rules: {
      /**
       * Disallow unused variables
       * -------------------------
       * Allows variables starting with uppercase or underscore
       * (useful for constants or intentionally unused values)
       */
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])