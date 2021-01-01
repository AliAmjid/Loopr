import React, { MutableRefObject, useRef } from 'react';

import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  tableContainer: {
    maxHeight: '400px',
  },
  cell: {
    minWidth: '100px',
  },
  studentCell: {
    minWidth: '200px',
  },
}));

const StickyTableCell = withStyles(theme => ({
  head: {
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2,
  },
  body: {
    backgroundColor: '#ddd',
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1,
  },
}))(TableCell);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Subject: React.FC = () => {
  let id = 0;
  function createData(name, calories, fat, carbs, protein) {
    id += 1;

    return { id, name, calories, fat, carbs, protein };
  }

  const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const classes = useStyles();
  const headerRef = useRef<HTMLTableRowElement>() as MutableRefObject<
    HTMLTableRowElement
  >;

  return (
    <Paper>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow ref={headerRef}>
              <StickyTableCell
                rowSpan={2}
                className={`${'head' + ' '}${classes.studentCell}`}
              >
                <Grid container>
                  <Grid item xs={6}>
                    Jméno
                  </Grid>
                  <Grid item xs={6}>
                    Příjmení
                  </Grid>
                </Grid>
              </StickyTableCell>

              <TableCell
                colSpan={2}
                align="center"
                // className={classes.withoutBorders}
              >
                <Typography>Test1</Typography>
                <Typography>10 bodů</Typography>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                align="center"
                style={{ top: headerRef.current?.clientHeight }}
              >
                <Typography>BODY</Typography>
              </TableCell>
              <TableCell
                align="center"
                style={{ top: headerRef.current?.clientHeight }}
              >
                <Typography>PROCENTA</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <StyledTableRow key={n.id}>
                  <StickyTableCell className="body">
                    <Box display="flex">
                      <Box flex={1}>basdksodfhofsdhf</Box>
                      <Box flex={1}>a</Box>
                    </Box>
                  </StickyTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.fat}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.carbs}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.protein}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.calories}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.fat}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.carbs}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.protein}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.calories}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.fat}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.carbs}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.protein}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.carbs}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.protein}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.calories}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.fat}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.carbs}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.protein}
                  </StyledTableCell>
                  <StyledTableCell align="center" className={classes.cell}>
                    {n.protein}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Subject;
