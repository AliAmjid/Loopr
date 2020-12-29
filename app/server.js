const path = require('path');
const express = require('express');
const next = require('next');
const chalk = require('chalk');

(async () => {
  const app = next({ dev: process.env.NODE_ENV !== 'production' });
  const handle = app.getRequestHandler();
  const server = express();

  await app.prepare();

  server.get('/service-worker.js', (req, res) => {
    const filePath = path.join(__dirname, './', '.next', 'service-worker.js');
    res.sendFile(filePath);
  });
  server.get('*', (req, res) => handle(req, res));

  await server.listen(process.env.PORT);
  // eslint-disable-next-line no-console
  console.log(
    chalk.green('ready'),
    `- started server on http://localhost:${process.env.PORT}`,
  );
})();
