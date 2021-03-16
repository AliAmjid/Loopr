import React from 'react';

import { Grid } from '@material-ui/core';
import { compose } from 'recompose';

import resources from 'config/resources';

import useResources from 'components/useResources';
import withPage from 'components/withPage';

import ExamsIndex from './exams';
import NotificationsIndex from './notifications';
import dashboardPageOptions from './pageOptions';

const DashboardIndex: React.FC = () => {
  const canStudy = useResources([[resources.user.canStudy]]);

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
    </>
  );
};

export default compose(withPage(dashboardPageOptions))(DashboardIndex);
