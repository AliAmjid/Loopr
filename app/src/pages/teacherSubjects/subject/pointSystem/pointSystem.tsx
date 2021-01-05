import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
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
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import { bottomShadow } from 'components/shadows';

import Edit from './edit';
import { PointSystemProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  studentCell: {
    minWidth: '200px',
  },
  paper: {
    padding: 0,
    position: 'relative',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
  },
  whiteCell: {
    backgroundColor: theme.palette.common.white,
  },
  grayCell: { backgroundColor: theme.palette.grey['100'] },
  cellWithoutBorder: { borderColor: theme.palette.common.white },
  cellWithRightBorder: {
    borderRight: '1px solid #E0E0E0',
  },
  cellWithLeftBorder: {
    borderLeft: '1px solid #E0E0E0',
  },
  header: {
    ...bottomShadow,
    zIndex: 103,
  },
}));

const StickyTableCell = withStyles((theme: Theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      left: 0,
      position: 'sticky',
      zIndex: 102,
    },
  },
  body: {
    [theme.breakpoints.up('md')]: {
      left: 0,
      position: 'sticky',
      zIndex: 101,
    },
  },
}))(TableCell);

const StickyTableCellRight = withStyles((theme: Theme) => ({
  head: {
    [theme.breakpoints.up('md')]: {
      right: 0,
      position: 'sticky',
      zIndex: 102,
    },
  },
  body: {
    [theme.breakpoints.up('md')]: {
      right: 0,
      position: 'sticky',
      zIndex: 101,
    },
  },
}))(TableCell);

const PointSystem: React.FC<PointSystemProps> = props => {
  const classes = useStyles();
  const headerRef = useRef() as MutableRefObject<HTMLTableRowElement>;
  const tableContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [editing, setEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (process.browser) {
      setTimeout(() => {
        tableContainerRef.current.scrollTo(1000000, 0);
      }, 200);
    }
  }, []);

  let tableContainerStyle = {};

  if (process.browser) {
    const toolbarHeight = 64;
    tableContainerStyle = {
      height: window.innerHeight - toolbarHeight * 3.7,
    };
  }

  return (
    <Paper className={classes.paper}>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <Box
          className={classes.header}
          p={2}
          position="relative"
          display="flex"
        >
          <Typography variant="subtitle1">Subject</Typography>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <Button color="primary" onClick={props.onExamCreate}>
              Add test
            </Button>
          </Box>
        </Box>
        <TableContainer style={tableContainerStyle} ref={tableContainerRef}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow ref={headerRef} style={{ backgroundColor: 'white' }}>
                <StickyTableCell
                  rowSpan={2}
                  className={`${'head'} ${classes.studentCell} ${
                    classes.whiteCell
                  } ${classes.cellWithRightBorder}`}
                  width={300}
                  style={{ minWidth: 300 }}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="center">
                        Jméno
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" justifyContent="center">
                        Příjmení
                      </Box>
                    </Grid>
                  </Grid>
                </StickyTableCell>
                {props.exams.map(exam => (
                  <TableCell
                    key={exam.id}
                    colSpan={2}
                    align="center"
                    className={`${classes.whiteCell} ${classes.cellWithoutBorder} ${classes.cellWithRightBorder} `}
                    width={140}
                  >
                    <Typography>{exam.name}</Typography>
                    <Typography>{`${exam.maxPoints} points`}</Typography>
                    <Typography>27. 7. 2020</Typography>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEditing(true);
                        setEditingId(exam.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                ))}
                <TableCell rowSpan={2} className={`${classes.whiteCell}`} />
                <StickyTableCellRight
                  rowSpan={2}
                  className={`${classes.whiteCell} ${classes.cellWithLeftBorder}`}
                  align="center"
                  width={300}
                  style={{ minWidth: 300 }}
                >
                  <Grid container>
                    <Grid item xs={4}>
                      Body
                    </Grid>
                    <Grid item xs={4}>
                      Procenta
                    </Grid>
                    <Grid item xs={4}>
                      Známka
                    </Grid>
                  </Grid>
                </StickyTableCellRight>
              </TableRow>
              <TableRow>
                {props.exams.map(exam => (
                  <React.Fragment key={exam.id}>
                    <TableCell
                      className={`${classes.whiteCell}`}
                      align="center"
                      style={{
                        top: headerRef.current?.clientHeight,
                      }}
                      width={70}
                    >
                      <Typography>BODY</Typography>
                    </TableCell>
                    <TableCell
                      className={`${classes.whiteCell} ${classes.cellWithRightBorder}`}
                      align="center"
                      style={{
                        top: headerRef.current?.clientHeight,
                      }}
                      width={70}
                    >
                      <Typography>PROCENTA</Typography>
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.students.map((student, index) => {
                const backgroundColor =
                  index % 2 === 0 ? classes.whiteCell : classes.grayCell;

                return (
                  <TableRow key={student.id}>
                    <StickyTableCell
                      className={`body ${classes.cellWithRightBorder} ${backgroundColor}`}
                      width={300}
                    >
                      <Box>
                        <Grid container>
                          <Grid item xs={6}>
                            <Box display="flex" justifyContent="center">
                              {student.firstname}
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box display="flex" justifyContent="center">
                              {student.lastname}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </StickyTableCell>

                    {student.exams.map(exam => {
                      let points = 'N';
                      if (exam.examWritten) points = `${exam.points}`;

                      return (
                        <>
                          <TableCell
                            align="center"
                            className={backgroundColor}
                            width={70}
                          >
                            {points}
                          </TableCell>
                          <TableCell
                            align="center"
                            className={`${classes.cellWithRightBorder} ${backgroundColor}`}
                            width={70}
                          >
                            IDK
                          </TableCell>
                        </>
                      );
                    })}
                    <TableCell className={`${backgroundColor}`} />
                    <StickyTableCellRight
                      className={`${backgroundColor} ${classes.cellWithLeftBorder}`}
                      align="center"
                    >
                      <Grid container>
                        <Grid item xs={4}>
                          110
                        </Grid>
                        <Grid item xs={4}>
                          90%
                        </Grid>
                        <Grid item xs={4}>
                          1
                        </Grid>
                      </Grid>
                    </StickyTableCellRight>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </OverlayLoadingContainer>
      <Edit
        open={editing}
        examId={`${editingId}`}
        exams={props.exams}
        students={props.students}
        onClose={() => {
          setEditing(false);
        }}
      />
    </Paper>
  );
};

export default PointSystem;
