import React from 'react';

import { Paper, Table, TableBody, Typography } from '@material-ui/core';

import OverlayLoading from 'components/OverlayLoading';
import OverlayLoadingContainer from 'components/OverlayLoading/OverlayLoadingContainer';

import PointSystem from './pointSystem';
import { ExamsProps } from './types';

const Exams: React.FC<ExamsProps> = props => {
  return (
    <Paper>
      <OverlayLoadingContainer>
        <OverlayLoading loading={props.loading} />
        <Typography variant="h6">Nejnovější hodnocení</Typography>
        <Table size="small">
          <TableBody>
            {props.exams.map(exam => {
              switch (exam.subject?.evaluationSystem || '') {
                case 'POINTS':
                  return <PointSystem exam={exam} user={props.user} />;
                default:
                  return <></>;
              }
            })}
          </TableBody>
        </Table>
      </OverlayLoadingContainer>
    </Paper>
  );
};

export default Exams;
