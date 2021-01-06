import React from 'react';

import { Paper, Table, TableBody } from '@material-ui/core';

import withPage from 'components/withPage';

import studentSubjectPageOptions from './pageOptions';
import PointSystem from './pointSystem';

const StudentSubjects: React.FC = () => {
  return (
    <Paper>
      <Table size="small">
        <TableBody>
          <PointSystem />
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withPage(studentSubjectPageOptions)(StudentSubjects);
