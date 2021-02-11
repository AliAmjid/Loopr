import React from 'react';

import { getMark, getMarkColor, getPercents } from 'components/percentMark';

import PointSystem from './pointSystem';
import { Exams, PointSystemIndexProps } from './types';

const PointSystemIndex: React.FC<PointSystemIndexProps> = props => {
  let totalPoints = 0;
  let totalMaxPoints = 0;
  const exams: Exams = props.subject.exams.map(exam => {
    const maxPoints = exam.pointSystem?.maxPoints || 0;
    let points = 'N';
    if (exam.pointSystem?.examWritten) {
      points = `${exam.pointSystem.points}`;
    }

    let percents = '-';
    let numberPercents = 0;
    if (maxPoints !== 0 && exam.pointSystem?.examWritten) {
      numberPercents = getPercents({
        value: exam.pointSystem?.points || 0,
        max: maxPoints,
      });

      percents = `${numberPercents}%`;
    }

    totalPoints += exam.pointSystem?.points || 0;
    totalMaxPoints += maxPoints;

    let color = '';
    if (props.subject.percentsToMarkConvert && percents !== '-') {
      color = getMarkColor(
        getMark({
          percents: numberPercents,
          percentsToMarkConvert: props.subject.percentsToMarkConvert,
        }),
      );
    }

    return {
      id: exam.id,
      name: exam.name,
      points,
      maxPoints,
      percents,
      writtenAt: exam.writtenAt,
      examWritten: exam.pointSystem?.examWritten || false,
      color,
    };
  });

  let totalPercents = '-';
  let numberTotalPercents = 0;
  if (totalMaxPoints !== 0) {
    numberTotalPercents = getPercents({
      max: totalMaxPoints,
      value: totalPoints,
    });
    totalPercents = `${numberTotalPercents}%`;
  }

  let totalMark = '-';
  if (totalMaxPoints > 0 && props.subject.percentsToMarkConvert) {
    totalMark = `${getMark({
      percentsToMarkConvert: props.subject.percentsToMarkConvert,
      percents: numberTotalPercents,
    })}`;
  }

  return (
    <PointSystem
      subjectType={props.subject.subjectType}
      exams={exams}
      maxExams={props.maxExams}
      totalPoints={totalPoints}
      totalMaxPoints={totalMaxPoints}
      totalPercents={totalPercents}
      totalMark={totalMark}
      color={props.color}
      onDetail={props.onDetail}
    />
  );
};

export default PointSystemIndex;
