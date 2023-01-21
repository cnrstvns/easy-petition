module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'no-nested-ternary': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-indent': [
      'error',
      2,
      { checkAttributes: true, indentLogicalExpressions: true },
    ],
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'off',
  },
};
