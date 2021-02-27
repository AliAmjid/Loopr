import React from 'react';

import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import TestCell from 'pages/studentSubjects/components/testCell';

import { formatDateToDay } from 'components/formatDate';
import { getMarkColor } from 'components/percentMark';

import SubjectCell from '../components/subjectCell';

import { PointSystemProps } from './types';

const PointSystem: React.FC<PointSystemProps> = props => {
  const mappedExams = props.exams.map(exam => (
    <TestCell key={exam.id} backgroundColor={props.color}>
      <Tooltip title={exam.name} enterDelay={500} placement="top">
        <div>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="subtitle1">
              {`${exam.points}/${exam.maxPoints}b`}
            </Typography>
            <Box pl={2}>
              <Typography variant="subtitle1" style={{ color: exam.color }}>
                {exam.percents}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography variant="body2">
              {formatDateToDay(exam.writtenAt)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <IconButton
              color="primary"
              onClick={() => props.onDetail(exam.id)}
              disabled={!exam.examWritten}
            >
              <VisibilityIcon />
            </IconButton>
          </Box>
        </div>
      </Tooltip>
    </TestCell>
  ));

  const additionalCells: JSX.Element[] = [];
  for (let i = props.exams.length; i <= props.maxExams; i++) {
    additionalCells.push(
      <TableCell key={i} style={{ backgroundColor: props.color }} />,
    );
  }

  const markColor = getMarkColor(+props.totalMark);

  return (
    <TableRow>
      <SubjectCell backgroundColor={props.color}>
        <Box display="flex" justifyContent="center">
          <Typography variant="h6">{props.subjectType}</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box pr={2} pl={2}>
            <Typography variant="body1">
              {`${props.totalPoints}/${props.totalMaxPoints}b`}
            </Typography>
          </Box>
          <Box pr={2} pl={2}>
            <Typography variant="body1">{props.totalPercents}</Typography>
          </Box>
          <Box pr={2} pl={2}>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold', color: markColor }}
            >
              {props.totalMark}
            </Typography>
          </Box>
        </Box>
      </SubjectCell>
      {mappedExams}
      {additionalCells}
    </TableRow>
  );
};

export default PointSystem;
