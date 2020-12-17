const path = require('path');
const fs = require('fs');
const express = require('express');
const next = require('next');
const chalk = require('chalk');

const prefabConfig = require('./src/config/prefab');

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

  createConfig();

  // eslint-disable-next-line global-require
  const config = require('./src/config');
  const { port } = config;

  server.get('/service-worker.js', (req, res) => {
    const filePath = path.join(__dirname, './', '.next', 'service-worker.js');
    res.sendFile(filePath);
  });
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  // eslint-disable-next-line no-console
  console.log(
    chalk.green('ready'),
    `- started server on http://localhost:${port}`,
  );
})();
