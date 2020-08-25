import React from 'react';

import { Paper, Typography } from '@material-ui/core';
import { compose } from 'recompose';

import withPage from 'components/withPage';

import dashboardPageOptions from './pageOptions';

const DashboardIndex = (): JSX.Element => {
  return (
    <>
      <Paper>
        <Typography>ahoj</Typography>
      </Paper>
    </>
  );
};

export default compose(withPage(dashboardPageOptions))(DashboardIndex);
