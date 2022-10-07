module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    curly: 'off',
    'no-nested-ternary': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-indent': ['error', 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'object-curly-newline': ['error', { minProperties: 5, multiline: true, consistent: true }],
    'react/forbid-prop-types': 'off',
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'off',
  },
  overrides: [
    {
      files: ['./pages/api/*.js'],
      rules: {
        camelcase: 'off',
      },
    },
  ],
};
