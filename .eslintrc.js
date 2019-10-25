module.exports = {
  extends: 'eslint-config-ns',
  env: {
    browser: true,
    node: true, // required for storybook
    es6: true,
    mocha: true,
    jest: false,
    'jest/globals': false,
  },
  globals: {
    document: true
  },
  rules: {
    // general settings
    'class-methods-use-this': 0,
    'sort-keys': 0,

    // wer are not in a jest environment
    'jest/valid-expect': 0,

    // react settings
    'react/jsx-props-no-spreading': 0,
  },
  overrides: [
    {
      files: [
        'test-setup.js',
        '*.spec.js',
        '*.stories.js',
      ],
      globals: {
        jsdom: true,
        page: true,
      },
      rules: {
        'jsx-a11y/control-has-associated-label': 0,
        'import/no-extraneous-dependencies': 0,
        'no-console': 0,
        'react/prop-types': 0,
      },
    },
    { 
      files: ["example/**/**.js"], 
      rules: {
        'import/no-extraneous-dependencies': 0,
        'no-console': 0,
        'react/prop-types': 0,
      }
    }
  ]
}
