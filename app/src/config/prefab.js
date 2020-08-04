const prefabConfig = env => ({
  port: env.port || 3000,
  apiURL: env.apiURL || 'https://smeny.krystof-rezac.cz/graphql',
  docsURL: env.docsURL || 'http://localhost:3001',
  disableTour: env.disableTour || false,
});

module.exports = prefabConfig;
