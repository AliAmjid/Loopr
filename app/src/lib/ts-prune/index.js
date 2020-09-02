const { exec } = require('child_process');

const command =
  'ts-prune -p tsconfig.json | grep -v pages | grep -v **/*.stories.tsx | grep -v src/types/graphql.ts';

exec(command, (err, stdout) => {
  // eslint-disable-next-line no-console
  console.log(stdout);
  if (!err) throw new Error(`Found some unused exports`);
});
