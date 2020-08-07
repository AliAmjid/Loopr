const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const prefabConfig = require('./src/config/prefab');

const nextI18next = require('./src/lib/i18n');

const createConfig = () => {
  const configPath = `${__dirname}/src/config/index.js`;
  if (fs.existsSync(configPath)) fs.unlinkSync(configPath);
  fs.writeFileSync(
    configPath,
    `module.exports=${JSON.stringify(prefabConfig(process.env))}`,
  );
};

(async () => {
  const app = next({ dev: process.env.NODE_ENV !== 'production' });
  const handle = app.getRequestHandler();
  const server = express();

  await app.prepare();
  await nextI18next.initPromise;

  createConfig();

  // eslint-disable-next-line global-require
  const config = require('./src/config');
  const { port } = config;

  server.use(nextI18NextMiddleware(nextI18next));

  server.get('/service-worker.js', (req, res) => {
    const filePath = path.join(__dirname, './', '.next', 'service-worker.js');
    res.sendFile(filePath);
  });
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
