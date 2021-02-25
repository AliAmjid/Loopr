import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { compose } from 'recompose';

import resources from 'config/resources';

import useResources from 'components/useResources';
import withPage from 'components/withPage';

import ExamsIndex from './exams';
import NotificationsIndex from './notifications';
import dashboardPageOptions from './pageOptions';

const DashboardIndex: React.FC = () => {
  const canStudy = useResources([[resources.user.canStudy]]);
  console.log('canStudy', canStudy);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} hidden={!canStudy}>
          <ExamsIndex />
        </Grid>
        <Grid item xs={12} md={4}>
          <NotificationsIndex />
        </Grid>
      </Grid>
      <Typography variant="h1">ahoj1</Typography>
      <Typography variant="h2">ahoj2</Typography>
      <Typography variant="h3">ahoj3</Typography>
      <Typography variant="h4">ahoj4</Typography>
      <Typography variant="h5">ahoj5</Typography>
      <Typography variant="h6">ahoj6</Typography>
      <Typography variant="subtitle1">ahoj-s1</Typography>
      <Typography variant="subtitle2">ahoj-s2</Typography>
      <Typography variant="body1">ahoj-b1</Typography>
      <Typography variant="body2">ahoj-b2</Typography>
    </>
  );
};

export default compose(withPage(dashboardPageOptions))(DashboardIndex);
