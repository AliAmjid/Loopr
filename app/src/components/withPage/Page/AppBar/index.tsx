import React from 'react';

import {
  AppBar as AppBarPrefab,
  Avatar,
  fade,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import Help from 'components/Help';
import LanguageSelect from 'components/LanguageSelect';

import { drawerWidth } from '../Drawer';

import Notifications from './Notifications';
import { AppBarProps } from './types';
import User from './User';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    paddingLeft: drawerWidth,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    transition: theme.transitions.create('background-color'),
    marginLeft: 0,
    width: 'auto',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  avatar: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
  },
  avatarButton: {
    padding: 0,
  },
}));

const AppBar = (props: AppBarProps): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation(namespaces.components.withPage);

  return (
    <AppBarPrefab className={classes.appBar}>
      <Toolbar>
        <Grid container item>
          <Grid item container xs={6} alignItems="center">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={`${t('appBar.search')}…`}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': t('appBar.search') }}
              />
            </div>
          </Grid>
          <Grid item container alignItems="center" justify="flex-end" xs={6}>
            <Help path="/" color="inherit" />
            <LanguageSelect color="inherit" />
            <Notifications />
            <Tooltip title={t<string>('appBar.logOut')}>
              <IconButton color="inherit" onClick={props.onLogOut}>
                <LogOutIcon />
              </IconButton>
            </Tooltip>
            <User />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBarPrefab>
  );
};

export default AppBar;
