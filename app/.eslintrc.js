module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  settings: {
    'import/resolver': 'babel-module',
  },
  rules: {
    'no-plusplus': 'off',
    'spaced-comment': 'warn',
    'no-restricted-syntax': 'off',
    'newline-before-return': 'warn',
    'no-param-reassign': 'off',
    'no-prototype-builtins': 'off',
    'no-shadow': 'off',
    'react/jsx-curly-newline': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          ['^react$'],
          ['^@?\\w'],
          ['^lib'],
          ['^pages'],
          ['^components'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css'],
        ],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'off',
    'sort-imports': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/ban-ts-ignore': 'error',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: false,
        parameter: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: [
        '*.stories.*',
        '.storybook/*',
        'src/lib/storybook/*',
        '*.test*',
        'src/lib/jest/*',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
    {
      files: '.storybook/*',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: '*.test.*',
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
};
