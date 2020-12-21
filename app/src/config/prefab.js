const prefabConfig = env => ({
  production: env.NODE_ENV === 'production',
  port: env.PORT || 3000,
  apiURL: env.API_URL || 'http://localhost:8001/graphql',
  docsURL: env.DOCS_URL || 'http://localhost:3001',
  disableTour: env.DISABLE_TOUR ? Boolean(env.DISABLE_TOUR) : false,
  tokenCookie: env.TOKEN_COOKIE || 'tokenCookie',
});

module.exports = prefabConfig;
