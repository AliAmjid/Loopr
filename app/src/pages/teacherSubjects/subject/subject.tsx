import React from 'react';

import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  withoutBorders: {
    borderBottom: 'none !important',
  },
  head: {
    backgroundColor: '#fff',
    minWidth: '50px',
  },
});

const StickyTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2,
  },
  body: {
    backgroundColor: '#ddd',
    minWidth: '50px',
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1,
  },
}))(TableCell);

const Subject: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <StickyTableCell rowSpan={2} className={classes.head}>
              <TableCell>Jméno</TableCell>
              <TableCell>Příjmení</TableCell>
            </StickyTableCell>

            <TableCell
              colSpan={2}
              align="center"
              className={classes.withoutBorders}
            >
              <Typography>Test1</Typography>
              <Typography>10 bodů</Typography>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <Typography>BODY</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>PROCENTA</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StickyTableCell>
              <TableCell>
                <Typography>Jan</Typography>
              </TableCell>
              <TableCell>
                <Typography>Jan</Typography>
              </TableCell>
            </StickyTableCell>

            <TableCell align="center">
              <Typography>1</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">10%</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <StickyTableCell>
              <Typography>Jan</Typography>
            </StickyTableCell>
            <TableCell>
              <Typography>Novák</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>1</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">10%</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Subject;
