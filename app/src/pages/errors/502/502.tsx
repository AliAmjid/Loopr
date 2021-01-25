import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const BadGatewayError: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Aplikace je momentálně mimo provoz</Typography>
    </div>
  );
};

export default BadGatewayError;
