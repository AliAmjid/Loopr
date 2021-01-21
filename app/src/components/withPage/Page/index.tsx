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
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    height: '100%',
    [theme.breakpoints.up('lg')]: {
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
    <>
      <AppBar {...rest} />
      <Drawer user={props.user} />
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Typography variant="h1">{t(title)}</Typography>
        {children}
      </div>
    </>
  );
};

export default Page;
