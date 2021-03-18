import React from 'react';

import { Avatar, Box, makeStyles, Theme, Typography } from '@material-ui/core';

import getInitials from 'components/getInitials';
import stripRolePrefix from 'components/stripRolePrefix';

import { ProfileHeaderProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

const ProfileHeader: React.FC<ProfileHeaderProps> = props => {
  const classes = useStyles();

  return (
    <Box display="flex" pb={2} pl={1} pt={1}>
      <Avatar className={classes.avatar} variant="rounded">
        {getInitials(props.firstname || '', props.lastname || '')}
      </Avatar>
      <Box pl={2}>
        <Typography variant="h4">
          {`${props.firstname || ''} ${props.lastname || ''}`}
        </Typography>
        <Typography>{stripRolePrefix(props.roleName || '')}</Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
