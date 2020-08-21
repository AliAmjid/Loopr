import React from 'react';

import {
  Divider,
  Drawer as DrawerPrefab,
  makeStyles,
  Toolbar,
} from '@material-ui/core';

import SVGLogo from 'components/SVGLogo';

import Navigation from './Navigation';

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

const Drawer = (): JSX.Element => {
  const classes = useStyles();

  return (
    <DrawerPrefab variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <Toolbar className={classes.logoToolbar}>
        <SVGLogo height="auto" />
      </Toolbar>
      <Divider />
      <Navigation />
    </DrawerPrefab>
  );
};

export default Drawer;
