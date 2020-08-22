import React from 'react';

import {
  Avatar,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
  },
  avatarButton: {
    padding: 0,
  },
}));

const UserUI = (): JSX.Element => {
  const classes = useStyles();

  const { t } = useTranslation(namespaces.components.withPage);

  return (
    <Tooltip title={t<string>('appBar.account')}>
      <IconButton color="inherit" className={classes.avatarButton}>
        <Avatar className={classes.avatar} color="secondary" variant="rounded">
          AJ
        </Avatar>
      </IconButton>
    </Tooltip>
  );
};

export default UserUI;
