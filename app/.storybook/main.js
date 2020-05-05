const { withKnobs } = require('@storybook/addon-knobs');
const prettierConfig = require('../.prettierrc.js');

module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig,
        },
      },
    },
  ],
  decorators: [withKnobs],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
