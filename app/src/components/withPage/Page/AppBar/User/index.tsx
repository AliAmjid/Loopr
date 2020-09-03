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
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  popover: {
    padding: theme.spacing(1),
  },
}));

const User: React.FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation(namespaces.components.withPage);

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
            AJ
          </Avatar>
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        classes={{ paper: classes.popover }}
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
            alignItems="center"
            marginRight={1}
          >
            <Typography variant="h5">Adam Janov</Typography>
            <Typography>Student</Typography>
            <Button color="primary">Nastavení profilu</Button>
          </Box>
          <Avatar className={classes.popoverAvatar} variant="rounded">
            AJ
          </Avatar>
        </Box>
      </Popover>
    </>
  );
};

export default User;
