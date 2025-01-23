import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:@next/next/recommended',
      'plugin:tailwindcss/recommended',
    ],
    plugins: ['prettier'],
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_', varsIgnorePattern: '_' }],
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@uniformdev/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@**/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next**/**',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
