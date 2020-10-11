import React from 'react';

import { makeStyles, Theme, Typography } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import Breadcrumbs from 'components/withPage/Page/AppBar/Breadcrumbs';

import AppBar from './AppBar';
import Drawer, { drawerWidth } from './Drawer';
import { PageProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Page: React.FC<PageProps> = props => {
  const classes = useStyles();
  const { t } = useTranslation(namespaces.other.pages);

  const { breadcrumbs, title, children, ...rest } = props;

  return (
    <div>
      <AppBar {...rest} />
      <Drawer />
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Typography variant="h5" component="h1">
          {t(title)}
        </Typography>
        {children}
      </div>
    </div>
  );
};

export default Page;
