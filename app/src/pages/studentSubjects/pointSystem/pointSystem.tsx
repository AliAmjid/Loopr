import React from 'react';

import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import TestCell from 'pages/studentSubjects/components/testCell';

import SubjectCell from '../components/subjectCell';

import { PointSystemProps } from './types';

const PointSystem: React.FC<PointSystemProps> = props => {
  const mappedExams = props.exams.map(exam => (
    <TestCell key={exam.id}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="subtitle1">
          {`${exam.points}/${exam.maxPoints} b`}
        </Typography>
        <Box pl={2}>
          <Typography variant="body2">{exam.percents}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="body2">{exam.writtenAt}</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <IconButton color="primary">
          <VisibilityIcon />
        </IconButton>
      </Box>
    </TestCell>
  ));

  const additionalCells: JSX.Element[] = [];
  for (let i = props.exams.length; i < props.maxExams; i++) {
    additionalCells.push(<TableCell key={i} />);
  }

  return (
    <TableRow>
      <SubjectCell>
        <Box display="flex" justifyContent="center">
          <Typography variant="subtitle1">{props.subjectType}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box pr={2} pl={2}>
            <Typography variant="body2">{`${props.totalPoints}/${props.totalMaxPoints}b`}</Typography>
          </Box>
          <Box pr={2} pl={2}>
            <Typography variant="body2">{props.totalPercents}</Typography>
          </Box>
          <Box pr={2} pl={2}>
            <Typography variant="body2">{props.totalMark}</Typography>
          </Box>
        </Box>
      </SubjectCell>
      {mappedExams}
      {additionalCells}
      <TableCell />
    </TableRow>
  );
};

export default PointSystem;
