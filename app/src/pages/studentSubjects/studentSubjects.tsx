import React, { useState } from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  Theme,
  useTheme,
} from '@material-ui/core';

import { bottomShadow } from 'components/shadows';
import SideDialogContainer from 'components/SideDialog/SideDialogContainer';

import Detail from './detail';
import PointSystemIndex from './pointSystem';
import { DetailState, StudentSubjectsProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0,
  },
  header: {
    ...bottomShadow,
    zIndex: 110,
  },
  periodSelect: {
    minWidth: theme.spacing(20),
  },
}));

const StudentSubjects: React.FC<StudentSubjectsProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [detail, setDetail] = useState<DetailState>(undefined);

  const toolbarHeight = 64;
  const tableContainerStyle = {
    height: window.innerHeight - toolbarHeight * 2.7,
  };

  const mappedSchoolPeriods = props.schoolPeriods.map(schoolPeriod => {
    return (
      <MenuItem key={schoolPeriod.id} value={schoolPeriod.id}>
        {`${schoolPeriod.quarter}. ${schoolPeriod.schoolYear}`}
      </MenuItem>
    );
  });

  return (
    <Paper className={classes.root}>
      <SideDialogContainer>
        <Box
          className={classes.header}
          position="relative"
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <FormControl>
            <InputLabel id="schoolPeriodSelectLabel">Period</InputLabel>
            <Select
              className={classes.periodSelect}
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
              {mappedSchoolPeriods}
              {props.selectedSchoolPeriods.length === 0 && (
                <MenuItem value="all">All</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        <TableContainer style={tableContainerStyle}>
          <Table>
            <TableBody>
              {props.subjects.map((subject, index) => {
                const color =
                  index % 2 === 0
                    ? theme.palette.common.white
                    : theme.palette.grey['100'];

                if (subject.evaluationSystem === 'POINTS') {
                  return (
                    <PointSystemIndex
                      subject={subject}
                      maxExams={props.maxExams}
                      color={color}
                      onDetail={examId => {
                        setDetail({
                          examId,
                          subject,
                        });
                      }}
                    />
                  );
                }

                return <></>;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Detail {...detail} onCancel={() => setDetail(undefined)} />
      </SideDialogContainer>
    </Paper>
  );
};

export default StudentSubjects;
