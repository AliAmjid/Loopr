import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import Breadcrumbs from 'components/Breadcrumbs';

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
  const { t } = useTranslation(namespaces.other.pages);

  return (
    <div>
      <AppBar onLogOut={props.onLogOut} />
      <Drawer />
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <Breadcrumbs breadcrumbs={props.breadcrumbs} />
        <Typography variant="h5" component="h1">
          {t(props.title)}
        </Typography>
        {props.children}
      </div>
    </div>
  );
};

export default Page;
