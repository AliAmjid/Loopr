import React from 'react';

import { Grid } from '@material-ui/core';

import { HorizontalListProps } from './types';

const HorizontalList: React.FC<HorizontalListProps> = props => {
  const mappedChildren = props.children.map((ch, index) => (
    <Grid key={index} item xs={12} sm={3}>
      {ch}
    </Grid>
  ));

  return <Grid container>{mappedChildren}</Grid>;
};

export default HorizontalList;
