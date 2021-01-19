import React from 'react';

import { Grid, Hidden } from '@material-ui/core';

import { SideListGridProps } from './types';

export const getSideListMaxHeight = (): number => {
  let maxHeight = 100;

  if (process.browser) {
    const toolbarHeight = 64;
    maxHeight = window.innerHeight - toolbarHeight * 3;
  }

  return maxHeight;
};

const SideListGrid: React.FC<SideListGridProps> = props => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
        {props.sideList}
      </Grid>
      <Hidden xsDown>
        <Grid item sm={6} md={7} lg={8} xl={9}>
          <div
            style={{ maxHeight: getSideListMaxHeight(), overflowY: 'scroll' }}
          >
            {props.body}
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default SideListGrid;
