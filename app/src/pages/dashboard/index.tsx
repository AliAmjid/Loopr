import React from 'react';

import { Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'recompose';

import withPage from 'components/withPage';

import ExamsIndex from './exams';
import NotificationsIndex from './notifications';
import dashboardPageOptions from './pageOptions';

const DashboardIndex: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ExamsIndex />
        </Grid>
        <Grid item xs={12} md={4}>
          <NotificationsIndex />
        </Grid>
      </Grid>

      <br />
    </>
  );
};

export default compose(withPage(dashboardPageOptions))(DashboardIndex);
