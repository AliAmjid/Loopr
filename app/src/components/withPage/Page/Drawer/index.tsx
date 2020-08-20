import React from 'react';

import {
  Divider,
  Drawer as DrawerPrefab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { Link } from 'lib/i18n';
import palette from 'lib/material-ui/theme/palette';

import SVGLogo from 'components/SVGLogo';

export const drawerWidth = 260;
const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  logoToolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    padding: theme.spacing(2),
  },
}));

const Drawer = (): JSX.Element => {
  const classes = useStyles();

  return (
    <DrawerPrefab variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <Toolbar className={classes.logoToolbar}>
        <SVGLogo height="auto" />
      </Toolbar>
      <Divider />
      <List>
        <Link href="/" passHref>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </Link>
        <ListItem button selected>
          <ListItemIcon color="primary">
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText color="primary">Dashboard</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
      </List>
    </DrawerPrefab>
  );
};

export default Drawer;
