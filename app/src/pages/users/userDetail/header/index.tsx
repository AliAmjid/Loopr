import React from 'react';

import { Avatar, Box, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Box display="flex" pb={2}>
      <Avatar className={classes.avatar} variant="rounded">
        AJ
      </Avatar>
      <Box pl={2}>
        <Typography variant="h4">Jan Novák</Typography>
        <Typography>Admin</Typography>
      </Box>
    </Box>
  );
};

export default Header;
