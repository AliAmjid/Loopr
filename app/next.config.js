const withOffline = require('next-offline');
const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = require('./src/lib/i18n/localeSubpaths');

const nextConfig = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};

module.exports = withOffline(nextConfig);
