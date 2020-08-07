const notTest = {
  presets: ['next/babel'],
  // plugins: [['react-remove-properties', { properties: ['test-id'] }]],
};
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['./src'],
      },
    ],
  ],
  env: {
    development: notTest,
    production: notTest,
    test: {
      presets: ['next/babel'],
    },
  },
};
