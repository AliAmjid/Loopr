import React, { PropsWithChildren } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import AppBar from './AppBar';
import Drawer, { drawerWidth } from './Drawer';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(2),
    marginLeft: drawerWidth,
  },
}));

const Page = (props: PropsWithChildren<{}>): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <AppBar />
      <Drawer />
      <div className={classes.toolbar} />
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default Page;
