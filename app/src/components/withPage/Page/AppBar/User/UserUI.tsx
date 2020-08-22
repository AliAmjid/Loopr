import React from 'react';

import {
  Avatar,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Popover,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import { UserUIProps } from './types';

const popoverWidth = 250;

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
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  popover: {
    padding: theme.spacing(1),
    width: popoverWidth,
  },
}));

const UserUI = (props: UserUIProps): JSX.Element => {
  const classes = useStyles();

  const { t } = useTranslation(namespaces.components.withPage);

  return (
    <>
      <Tooltip title={t<string>('appBar.account')}>
        <IconButton
          color="inherit"
          className={classes.avatarButton}
          onClick={e => props.onClick(e.currentTarget)}
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
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
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
        <Grid container spacing={1}>
          <Grid container justify="center" item xs={12}>
            <Avatar className={classes.popoverAvatar} variant="rounded">
              AJ
            </Avatar>
          </Grid>
          <Grid item container>
            <Grid item container justify="center" xs={12}>
              <Typography variant="h5">Adam Janov</Typography>
            </Grid>
            <Grid item container justify="center" xs={12}>
              <Typography>Student</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth color="primary" variant="contained">
              Profil
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export default UserUI;
