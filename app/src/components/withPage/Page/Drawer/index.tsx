import React from 'react';

import {
  Divider,
  Drawer as DrawerPrefab,
  Hidden,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
} from '@material-ui/core';

import SVGLogo from 'components/SVGLogo';
import usePageState from 'components/withPage/Page/state';

import Navigation from './Navigation';
import { DrawerProps } from './types';

export const drawerWidth = 260;
const useStyles = makeStyles({
  drawerPaper: {
    width: drawerWidth,
  },
  logoToolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const Drawer: React.FC<DrawerProps> = props => {
  const classes = useStyles();

  const { open, setOpen } = usePageState(state => ({
    open: state.drawerOpen,
    setOpen: state.setDrawerOpen,
  }));

  return (
    <>
      <Hidden smDown>
        <DrawerPrefab
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar className={classes.logoToolbar}>
            <SVGLogo height="auto" />
          </Toolbar>
          <Divider />
          <Navigation user={props.user} />
        </DrawerPrefab>
      </Hidden>
      <Hidden mdUp>
        <SwipeableDrawer
          classes={{ paper: classes.drawerPaper }}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Toolbar>
            <SVGLogo height="auto" />
          </Toolbar>
          <Divider />
          <Navigation user={props.user} />
        </SwipeableDrawer>
      </Hidden>
    </>
  );
};

export default Drawer;
