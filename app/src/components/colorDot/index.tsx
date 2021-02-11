import React from 'react';

import { makeStyles, Theme } from '@material-ui/core';

import { ColorDotProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '100%',
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
}));

const ColorDot: React.FC<ColorDotProps> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundColor: props.color }} />
  );
};

export default ColorDot;
