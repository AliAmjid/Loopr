import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Popover,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import getInitials from 'components/getInitials';
import stripRolePrefix from 'components/stripRolePrefix';

import { UserProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
  },
  avatarButton: {
    padding: theme.spacing(0.5),
  },
  popoverAvatar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

const User: React.FC<UserProps> = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation(namespaces.components.withPage);

  const initials = getInitials(
    props.user?.firstname || '',
    props.user?.lastname || '',
  );

  return (
    <>
      <Tooltip title={t<string>('account')}>
        <IconButton
          color="inherit"
          className={classes.avatarButton}
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <Avatar
            className={classes.avatar}
            color="secondary"
            variant="rounded"
          >
            {initials}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        classes={{ paper: classes.popover }}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            flexDirection="column"
            marginRight={2}
            minWidth={200}
          >
            <Box pl={1} pb={1}>
              <Typography variant="h5">
                {props.user?.firstname || ''}
              </Typography>
              <Typography>
                {stripRolePrefix(props.user?.role?.name || '')}
              </Typography>
            </Box>
            <Box display="flex">
              <Button color="primary">Nastavení profilu</Button>
            </Box>
          </Box>
          <Avatar className={classes.popoverAvatar} variant="rounded">
            {initials}
          </Avatar>
        </Box>
      </Popover>
    </>
  );
};

export default User;
