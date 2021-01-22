import React from 'react';

import {
  AppBar as AppBarPrefab,
  fade,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  makeStyles,
  Theme,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import Help from 'components/Help';
import LanguageSelect from 'components/LanguageSelect';
import usePageState from 'components/withPage/Page/state';

import { drawerWidth } from '../Drawer';

import LogOut from './LogOut';
import Notifications from './Notifications';
import { AppBarProps } from './types';
import User from './User';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: drawerWidth,
    },
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

const AppBar: React.FC<AppBarProps> = props => {
  const classes = useStyles();

  const { t } = useTranslation(namespaces.components.withPage);
  const setDrawerOpen = usePageState(state => state.setDrawerOpen);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBarPrefab className={classes.appBar}>
      <Toolbar>
        <Grid container>
          <Hidden lgUp>
            <Grid item xs={1}>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Hidden mdDown>
            <Grid item container xs={6} alignItems="center">
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={`${t('search')}…`}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': t('search') }}
                />
              </div>
            </Grid>
          </Hidden>
          <Grid
            item
            container
            alignItems="center"
            justify="flex-end"
            xs={mdDown ? 11 : 6}
          >
            {props.helpPath && <Help path={props.helpPath} color="inherit" />}
            <LanguageSelect color="inherit" />
            <Notifications user={props.user} />
            <LogOut onLogOut={props.onLogOut} />
            <User user={props.user} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBarPrefab>
  );
};

export default AppBar;
