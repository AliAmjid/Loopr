const { exec } = require('child_process');

const count =
  'ts-prune -p tsconfig.json | grep -v pages | grep -v **/*.stories.tsx | grep -v src/types/graphql.ts | wc -l';

exec(count, (err, stdout) => {
  if (err) throw new Error(`ts-prune - something went wrong.\n${err}`);
  if (+stdout > 0) {
    throw new Error(
      'Found some unused exports. Run `exports:find` to see where.',
    );
  }
});
