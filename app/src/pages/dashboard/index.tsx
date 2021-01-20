import React from 'react';

import { Paper, Typography } from '@material-ui/core';
import { compose } from 'recompose';

import withPage from 'components/withPage';

import dashboardPageOptions from './pageOptions';

const DashboardIndex: React.FC = () => {
  return (
    <>
      <Paper>
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
      </Paper>
    </>
  );
};

export default compose(withPage(dashboardPageOptions))(DashboardIndex);
