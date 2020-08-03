const { exec } = require('child_process');

const command =
  'ts-prune -p tsconfig.json | grep -v pages | grep -v **/*.stories.tsx';

const count = `${command} | wc -l`;

exec(count, (err, stdout) => {
  if (err) throw new Error(`ts-prune - something went wrong.\n${err}`);
  if (+stdout > 0) {
    exec(command, (err, stdout) => {
      let message = 'Found some unused exports';
      if (!err) {
        message += `\n${stdout}`;
      }
      throw new Error(message);
    });
  }
});
