import React from 'react';

import { Divider, DividerProps, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  dividerRoot: {
    height: theme.spacing(0.5),
  },
}));

const ThickDivider: React.FC<DividerProps> = props => {
  const classes = useStyles();

  return <Divider classes={{ root: classes.dividerRoot }} {...props} />;
};

export default ThickDivider;
