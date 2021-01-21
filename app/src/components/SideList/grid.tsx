import React, { useEffect, useState } from 'react';

import { Box, Grid, Hidden, makeStyles } from '@material-ui/core';

import { SideListGridProps } from './types';

export const getSideListMaxHeight = (): number => {
  let maxHeight = 100;

  if (process.browser) {
    const toolbarHeight = 64;
    maxHeight = window.innerHeight - toolbarHeight * 3;
  }

  return maxHeight;
};

const useStyles = makeStyles({
  content: {
    height: '100%',
    overflowY: 'scroll',
  },
});

const SideListGrid: React.FC<SideListGridProps> = props => {
  const classes = useStyles();
  const [height, setHeight] = useState(100);
  useEffect(() => {
    setHeight(getSideListMaxHeight());
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
        {props.sideList}
      </Grid>
      <Hidden xsDown>
        <Grid item sm={6} md={7} lg={8} xl={9}>
          <Box className={classes.content} style={{ height }}>
            {props.body}
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default SideListGrid;
