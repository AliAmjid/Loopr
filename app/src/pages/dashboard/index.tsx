import React from 'react';

import { Paper, Typography } from '@material-ui/core';
import { compose } from 'recompose';

import withPage from 'components/withPage';

import dashboardBreadcrumbs from './breadcrumbs';

const DashboardIndex = (): JSX.Element => {
  return (
    <>
      <Paper>
        <Typography>ahoj</Typography>
      </Paper>
    </>
  );
};

export default compose(
  withPage({ breadcrumbs: dashboardBreadcrumbs, title: 'dashboard.index' }),
)(DashboardIndex);
