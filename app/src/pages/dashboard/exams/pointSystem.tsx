import React from 'react';

import { TableCell, TableRow } from '@material-ui/core';

import { formatDateToDay } from 'components/formatDate';

import { PointSystemProps } from './types';

const PointSystem: React.FC<PointSystemProps> = props => {
  return (
    <TableRow>
      <TableCell>{formatDateToDay(props.exam.writtenAt)}</TableCell>
      <TableCell>{props.exam.subject?.subjectType?.name || ''}</TableCell>
      <TableCell>{props.exam.name || ''}</TableCell>
    </TableRow>
  );
};

export default PointSystem;
