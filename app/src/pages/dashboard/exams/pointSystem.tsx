import React from 'react';

import { IconButton, TableCell, TableRow } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Link from 'next/link';

import routes from 'config/routes';

import { formatDateToDay } from 'components/formatDate';
import { getMark, getMarkColor, getPercents } from 'components/percentMark';

import { PointSystemProps } from './types';

const PointSystem: React.FC<PointSystemProps> = props => {
  let points = 'N';
  let percents = 'N';
  let color = '';

  const node = props.exam.pointSystem?.points?.edges?.find(
    edge => edge?.node?.user?.id === props.user.id,
  )?.node;
  if (node && node.examWritten) {
    points = `${node.points}`;

    const maxPoints = props.exam.pointSystem?.maxPoints || 0;
    if (maxPoints > 0) {
      const percentNumber = getPercents({ value: node.points, max: maxPoints });
      percents = `${percentNumber}%`;
      if (props.exam.subject?.percentsToMarkConvert)
        color = getMarkColor(
          getMark({
            percents: percentNumber,
            percentsToMarkConvert: props.exam.subject.percentsToMarkConvert,
          }),
        );
    }
  }

  return (
    <TableRow>
      <TableCell>{formatDateToDay(props.exam.writtenAt)}</TableCell>
      <TableCell>{props.exam.subject?.subjectType?.name || ''}</TableCell>
      <TableCell>{props.exam.name || ''}</TableCell>
      <TableCell>
        <span style={{ color }}>{percents}</span>
      </TableCell>
      <TableCell>
        {`${points}/${props.exam.pointSystem?.maxPoints || 0}b`}
      </TableCell>
      <TableCell>
        <Link href={routes.studentSubjects.index}>
          <IconButton color="primary" size="small">
            <VisibilityIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default PointSystem;
