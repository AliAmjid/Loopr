import React from 'react';

import { Box, makeStyles, Theme, Typography } from '@material-ui/core';

import Worker from './images/worker.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
  },
  image: {
    maxWidth: '100%',
  },
}));

const BadGatewayError: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" align="center">
        Aplikace je momentálně mimo provoz
      </Typography>
      <Box p={4}>
        <Worker className={classes.image} />
      </Box>
      <Typography variant="h2" align="center">
        Pokud aplikace do pár minut nenaběhne, kontaktujte kompetentní osobu
      </Typography>
    </div>
  );
};

export default BadGatewayError;
