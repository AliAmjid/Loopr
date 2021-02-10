import React from 'react';

import {
  makeStyles,
  TableCell,
  TableCellProps,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  stickyCell: {
    width: theme.spacing(30),
    borderRight: '1px solid #E0E0E0',
    [theme.breakpoints.up('md')]: {
      left: 0,
      position: 'sticky',
      zIndex: 102,
    },
  },
}));

const SubjectCell: React.FC<TableCellProps & { backgroundColor?: string }> = ({
  backgroundColor,
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <TableCell
      className={classes.stickyCell}
      style={{ backgroundColor }}
      {...rest}
    >
      {children}
    </TableCell>
  );
};

export default SubjectCell;
