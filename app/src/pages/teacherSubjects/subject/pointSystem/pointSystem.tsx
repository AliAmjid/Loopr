import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
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

import { useTranslation } from 'lib/i18n';
import namespaces from 'lib/i18n/namespaces';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';
import { getPercents } from 'components/percents';
import { bottomShadow } from 'components/shadows';
import SideDialogContainer from 'components/SideDialog/SideDialogContainer';

import Edit from './edit';
import { PointSystemProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  studentCell: {
    minWidth: '200px',
  },
  paper: {
    padding: 0,
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
  headCell: {
    paddingTop: theme.spacing(2),
  },
  date: {
    color: fade(theme.palette.common.black, 0.7),
    fontSize: '0.8rem',
  },
  points: {
    fontSize: '0.9rem',
  },
  testName: {
    fontWeight: 500,
  },
  schoolPeriodSelect: {
    minWidth: theme.spacing(20),
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
  const { t } = useTranslation(
    namespaces.pages.teacherSubjects.subject.pointSystem,
  );

  useEffect(() => {
    if (process.browser) {
      setTimeout(() => {
        tableContainerRef.current.scrollTo(1000000, 0);
      }, 200);
    }
  }, []);

  const toolbarHeight = 64;
  const tableContainerStyle = {
    height: window.innerHeight - toolbarHeight * 3.9,
  };

  return (
    <Paper className={classes.paper}>
      <SideDialogContainer>
        <OverlayLoadingContainer>
          <OverlayLoading loading={props.loading} />
          <Box
            className={classes.header}
            p={2}
            position="relative"
            display="flex"
            alignItems="center"
          >
            <Box minWidth={300}>
              <Typography variant="subtitle1">{props.subjectTitle}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Box pr={8}>
                <FormControl>
                  <InputLabel id="schoolPeriodsSelectLabel">
                    {t('common:gqlObjects.schoolPeriod.name')}
                  </InputLabel>
                  <Select
                    className={classes.schoolPeriodSelect}
                    labelId="schoolPeriodSelectLabel"
                    multiple
                    value={
                      props.selectedSchoolPeriods.length > 0
                        ? props.selectedSchoolPeriods
                        : ['all']
                    }
                    onChange={e =>
                      props.onSchoolPeriodsChange(
                        (e.target.value as string[]).filter(i => i !== 'all'),
                      )
                    }
                  >
                    {props.schoolPeriods.map(schoolPeriod => (
                      <MenuItem key={schoolPeriod.id} value={schoolPeriod.id}>
                        {`${schoolPeriod.quarter}. ${schoolPeriod.schoolYear}`}
                      </MenuItem>
                    ))}
                    {props.selectedSchoolPeriods.length === 0 && (
                      <MenuItem value="all">{t('allSchoolPeriods')}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
              <Button color="primary" onClick={props.onExamCreate}>
                {t('addTest')}
              </Button>
            </Box>
          </Box>
          <TableContainer style={tableContainerStyle} ref={tableContainerRef}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow ref={headerRef}>
                  <StickyTableCell
                    rowSpan={2}
                    className={`${'head'} ${classes.studentCell} ${
                      classes.whiteCell
                    } ${classes.cellWithRightBorder} ${classes.headCell}`}
                    width={200}
                    style={{ minWidth: 200 }}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                          <Typography variant="body2">
                            {t('common:gqlObjects.user.firstname')}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                          <Typography variant="body2">
                            {t('common:gqlObjects.user.lastname')}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </StickyTableCell>
                  {props.exams.map(exam => (
                    <TableCell
                      key={exam.id}
                      colSpan={2}
                      align="center"
                      className={`${classes.whiteCell} ${classes.cellWithoutBorder} ${classes.cellWithRightBorder} ${classes.headCell}`}
                      width={140}
                    >
                      <Typography className={classes.testName}>
                        {exam.name}
                      </Typography>
                      <Typography className={classes.points}>
                        {`${exam.maxPoints} ${t(
                          'common:gqlObjects.point.points.accusative',
                        )}`}
                      </Typography>
                      <Typography className={classes.date}>
                        {exam.writtenAt}
                      </Typography>
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
                  <TableCell
                    rowSpan={2}
                    className={`${classes.whiteCell} ${classes.headCell}`}
                  />
                  <StickyTableCellRight
                    rowSpan={2}
                    className={`${classes.whiteCell} ${classes.cellWithLeftBorder} ${classes.headCell}`}
                    align="center"
                    width={300}
                    style={{ minWidth: 300 }}
                  >
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          {t('common:gqlObjects.point.points.nominative')}
                        </Typography>
                        <Typography variant="body2">{`(${props.maxPoints})`}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          {t('common:gqlObjects.point.percents')}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          {t('common:gqlObjects.point.mark')}
                        </Typography>
                        <IconButton
                          color="primary"
                          onClick={props.onPercentsToMarkEdit}
                        >
                          <EditIcon />
                        </IconButton>
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
                        <Typography variant="body2">
                          {t('common:gqlObjects.point.points.nominative')}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={`${classes.whiteCell} ${classes.cellWithRightBorder}`}
                        align="center"
                        style={{
                          top: headerRef.current?.clientHeight,
                        }}
                        width={70}
                      >
                        <Typography variant="body2">
                          {t('common:gqlObjects.point.percents')}
                        </Typography>
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
                        let percents = 'N';
                        if (exam.examWritten) {
                          points = `${exam.points}`;
                          if (exam.maxPoints === 0) {
                            percents = '-';
                          } else {
                            percents = `${Math.round(
                              getPercents({
                                max: exam.maxPoints,
                                value: exam.points,
                              }),
                            )}%`;
                          }
                        }

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
                              {percents}
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
                            {student.totalPoints}
                          </Grid>
                          <Grid item xs={4}>
                            {student.totalPercents}
                          </Grid>
                          <Grid item xs={4}>
                            {student.totalMark}
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
      </SideDialogContainer>
    </Paper>
  );
};

export default PointSystem;
