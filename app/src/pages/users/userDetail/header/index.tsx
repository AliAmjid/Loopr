import React from 'react';

import { Avatar, Box, makeStyles, Theme, Typography } from '@material-ui/core';

import getInitials from 'components/getInitials';
import stripRolePrefix from 'components/stripRolePrefix';

import { HeaderProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const Header: React.FC<HeaderProps> = props => {
  const classes = useStyles();

  return (
    <Box display="flex" pb={2}>
      <Avatar className={classes.avatar} variant="rounded">
        {getInitials(props.user?.firstname || '', props.user?.lastname || '')}
      </Avatar>
      <Box pl={2}>
        <Typography variant="h4">
          {props.user?.firstname || `${props.user?.lastname}` || ''}
        </Typography>
        <Typography>{stripRolePrefix(props.user?.role.name || '')}</Typography>
      </Box>
    </Box>
  );
};

export default Header;
