const config = {
  development: process.env.NODE_ENV !== 'production',
  port: process.env.port || 3000,
  apiURL: process.env.apiURL || 'https://smeny.krystof-rezac.cz/graphql',
};

module.exports = config;
