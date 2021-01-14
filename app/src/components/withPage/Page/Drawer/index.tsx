import React, { useEffect } from 'react';

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

export const drawerWidth = 280;
const useStyles = makeStyles({
  drawerPaper: {
    width: drawerWidth,
  },
  logoToolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    maxHeight: '70%',
    maxWidth: '70%',
  },
});

const Drawer: React.FC<DrawerProps> = props => {
  const classes = useStyles();

  const { open, setOpen } = usePageState(state => ({
    open: state.drawerOpen,
    setOpen: state.setDrawerOpen,
  }));

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Hidden mdDown>
        <DrawerPrefab
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar className={classes.logoToolbar}>
            <SVGLogo className={classes.logo} height="auto" />
          </Toolbar>
          <Divider />
          <Navigation user={props.user} />
        </DrawerPrefab>
      </Hidden>
      <Hidden lgUp>
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
