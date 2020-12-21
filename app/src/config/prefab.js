const prefabConfig = env => ({
  production: env.NODE_ENV === 'production',
  port: env.port || 3000,
  apiURL: env.apiURL || 'http://localhost:8001/graphql',
  docsURL: env.docsURL || 'http://localhost:3001',
  disableTour: Boolean(env.disableTour) || false,
  tokenCookie: env.tokenCookie || 'tokenCookie',
});

module.exports = prefabConfig;
