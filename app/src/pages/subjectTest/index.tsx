import React from 'react';

import { Divider, Typography } from '@material-ui/core';

import GlobalVariables from 'pages/subjectTest/globalVariables';
import TestColumns from 'pages/subjectTest/testColumns';

const pointsFunction = function main(values) {
  return [+values.percent * 100, ['percent']];
}.toString();

const colorFunction = function main(values) {
  let color = '';
  if (+values.points > 50) {
    color = '#AAA';
  } else if (+values.points > 25) {
    color = '#BBB';
  } else {
    color = '#CCC';
  }

  return [color];
}.toString();

const percentFunction = function main(values) {
  return [values.points / 100, ['points']];
}.toString();

const inputs = [
  { defaultValue: '', name: 'color' },
  { defaultValue: '', name: 'percent' },
  { defaultValue: '', name: 'points' },
];

const criteria = {
  subjectVariables: [
    {
      label: 'Známka - 1',
      name: 'mark1',
    },
  ],
  testVariables: [
    {
      label: 'Maximum bodů',
      name: 'maxPoints',
    },
  ],
  testColumns: [
    {
      label: 'Body',
      subColumns: [
        {
          name: 'color',
          input: true,
          inputType: 'text/number/color/select',
          validation: 'regexp',
          display: 'text/color',
          code: colorFunction,
          summaryCode: 'js code',
        },
        {
          name: 'points',
          input: true,
          inputType: 'text/number/color/select',
          validation: 'regexp',
          display: 'text/color',
          code: pointsFunction,
          summaryCode: 'js code',
        },
      ],
    },
    {
      label: 'Procenta',
      subColumns: [
        {
          name: 'percent',
          input: true,
          inputType: 'text/number/color/select',
          validation: 'regexp',
          display: 'text/color',
          code: percentFunction,
          summaryCode: 'js code',
        },
      ],
    },
  ],
};

const subjectTestIndex = (): JSX.Element => {
  return (
    <>
      <Typography variant="h5">Globální přoměnné předmětu</Typography>
      <GlobalVariables subjectVariables={criteria.subjectVariables} />
      <Divider />

      <Typography variant="h5">Globální přoměnné testu</Typography>
      <GlobalVariables subjectVariables={criteria.testVariables} />
      <Divider />

      <Typography variant="h5">Sloupce</Typography>
      <TestColumns inputs={inputs} testColumns={criteria.testColumns} />
    </>
  );
};

export default subjectTestIndex;
