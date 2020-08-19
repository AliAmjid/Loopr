import React, { PropsWithChildren } from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import AppBar from './AppBar';
import Drawer from './Drawer';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    paddingTop: theme.spacing(2),
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
