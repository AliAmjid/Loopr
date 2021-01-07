import React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  useTheme,
} from '@material-ui/core';

import PointSystemIndex from './pointSystem';
import { StudentSubjectsProps } from './types';

const StudentSubjects: React.FC<StudentSubjectsProps> = props => {
  const theme = useTheme();
  const toolbarHeight = 64;
  const tableContainerStyle = {
    height: window.innerHeight - toolbarHeight * 3.15,
  };

  return (
    <Paper>
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
                  />
                );
              }

              return <></>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StudentSubjects;
