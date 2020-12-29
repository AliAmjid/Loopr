const shared = { presets: ['next/babel'], plugins: ['inline-react-svg'] };

const notTest = {
  ...shared,
  plugins: [
    ...shared.plugins,
    ['react-remove-properties', { properties: ['test-id'] }],
  ],
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
      ...shared,
    },
  },
};
