import React from 'react';

import {
  makeStyles,
  TableCell,
  TableCellProps,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(20),
    borderRight: '1px solid #E0E0E0',
  },
}));

const TestCell: React.FC<TableCellProps> = props => {
  const classes = useStyles();

  return <TableCell className={classes.root}>{props.children}</TableCell>;
};
export default TestCell;
