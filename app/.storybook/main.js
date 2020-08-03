const prettierConfig = require('../.prettierrc.js');

module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    'storybook-addon-material-ui/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig,
        },
      },
    },
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
