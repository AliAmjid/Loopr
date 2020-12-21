const fs = require('fs');

const prefabConfig = require('../src/config/prefab');

const configPath = `${__dirname}/../src/config/index.js`;
if (fs.existsSync(configPath)) fs.unlinkSync(configPath);
fs.writeFileSync(
  configPath,
  `module.exports=${JSON.stringify(prefabConfig(process.env))}`,
);
console.log(
  'config created',
  `module.exports=${JSON.stringify(prefabConfig(process.env))}`,
  process.env,
);
