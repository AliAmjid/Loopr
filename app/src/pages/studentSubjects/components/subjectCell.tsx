import React from 'react';

import {
  makeStyles,
  TableCell,
  TableCellProps,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  stickyCell: {
    width: 200,
    [theme.breakpoints.up('md')]: {
      left: 0,
      position: 'sticky',
      zIndex: 102,
    },
  },
}));

const SubjectCell: React.FC<TableCellProps> = props => {
  const classes = useStyles();

  return (
    <TableCell className={classes.stickyCell} {...props}>
      {props.children}
    </TableCell>
  );
};

export default SubjectCell;
