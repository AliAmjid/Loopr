import React from 'react';

import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';

import AppBar from './AppBar';
import Drawer, { drawerWidth } from './Drawer';
import { PageProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(2),
    marginLeft: drawerWidth,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Page = (props: PageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <AppBar onLogOut={props.onLogOut} />
      <Drawer />
      <div className={classes.toolbar} />
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default Page;
