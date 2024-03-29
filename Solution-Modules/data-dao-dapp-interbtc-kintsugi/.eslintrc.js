module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'simple-import-sort', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'react-app/jest',
    'google',
    'prettier'
  ],
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // TS ESLinting rules
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          arrow: {
            before: true,
            after: true
          }
        }
      }
    ],
    'no-negated-condition': 'error',
    'no-dupe-keys': 'error',
    'require-jsdoc': 0, // TODO: `0` for now but later should be on by being removed
    'new-cap': ['error', { capIsNew: false }],

    // Import Rules
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/exports-last': 'error',

    // React ESLinting rules
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
};
