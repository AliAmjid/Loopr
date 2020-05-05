const notTest = {
  presets: ['next/babel'],
  plugins: [['react-remove-properties', { properties: ['test-id'] }]],
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
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true,
            },
          },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    },
  },
};
