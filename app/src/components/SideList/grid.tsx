import React from 'react';

import { Grid, Hidden } from '@material-ui/core';

import { SideListGridProps } from './types';

const SideListGrid: React.FC<SideListGridProps> = props => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
        {props.sideList}
      </Grid>
      <Hidden xsDown>
        <Grid item sm={6} md={7} lg={8} xl={9}>
          {props.body}
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default SideListGrid;
