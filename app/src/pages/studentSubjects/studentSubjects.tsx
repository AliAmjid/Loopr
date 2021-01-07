import React from 'react';

import { Paper, Table, TableBody } from '@material-ui/core';

import PointSystemIndex from './pointSystem';
import { StudentSubjectsProps } from './types';

const StudentSubjects: React.FC<StudentSubjectsProps> = props => {
  return (
    <Paper>
      <Table>
        <TableBody>
          {props.subjects.map(subject => {
            if (subject.evaluationSystem === 'POINTS') {
              return (
                <PointSystemIndex subject={subject} maxExams={props.maxExams} />
              );
            }

            return <></>;
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StudentSubjects;
