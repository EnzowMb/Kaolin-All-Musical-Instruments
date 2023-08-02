module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'chakra-ui',
    '@typescript-eslint',
    'react',
    'simple-import-sort',
    'sort-keys-custom-order-fix',
    'unused-imports',
  ],
  rules: {
    '@typescript-eslint/7006': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'chakra-ui/props-order': 'error',
    'chakra-ui/props-shorthand': 'error',
    'chakra-ui/require-specific-component': 'error',
    eqeqeq: ['error', 'always'],
    'no-useless-escape': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys-custom-order-fix/sort-keys-custom-order-fix': [
      'error',
      'custom',
      {
        caseSensitive: true,
        order: ['base', 'sm', 'md', 'lg', 'xl', '2xl'],
        orderBy: 'asc',
      },
    ],
    'unused-imports/no-unused-imports-ts': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};