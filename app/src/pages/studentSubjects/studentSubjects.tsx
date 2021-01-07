import React, { useState } from 'react';

import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  useTheme,
} from '@material-ui/core';

import SideDialogContainer from 'components/SideDialog/SideDialogContainer';

import Detail from './detail';
import PointSystemIndex from './pointSystem';
import { DetailProps, DetailState, StudentSubjectsProps } from './types';

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
});

const StudentSubjects: React.FC<StudentSubjectsProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [detail, setDetail] = useState<DetailState>(undefined);

  const toolbarHeight = 64;
  const tableContainerStyle = {
    height: window.innerHeight - toolbarHeight * 2.7,
  };

  return (
    <Paper className={classes.root}>
      <SideDialogContainer>
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
