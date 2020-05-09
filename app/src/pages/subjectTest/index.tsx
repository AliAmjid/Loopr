import React from 'react';

import { Typography } from '@material-ui/core';

import TestColumns from 'pages/subjectTest/testColumns';

import { Display, InputType, MarkingSchema, SubjectData } from './types';

const pointsFunction = function main(values) {
  return +values.color / 10;
}.toString();

const colorFunction = function main(values) {
  return +values.points * 10;
}.toString();

const percentFunction = function percentFunction(values) {
  return +values.points * 10;
}.toString();

const subjectData: SubjectData = {
  results: [
    { userId: 1, value: 5 },
    { userId: 2, value: 10 },
  ],
};

const markingSchema: MarkingSchema = {
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
  defaultColumn: 'points',
  testColumns: [
    {
      id: 1,
      label: 'Body',
      subColumns: [
        {
          id: 1,
          name: 'color',
          input: false,
          inputType: InputType.Number,
          display: Display.Text,
          code: colorFunction,
          dependencies: ['points'],
        },
        {
          id: 2,
          name: 'points',
          input: true,
          inputType: InputType.Number,
          display: Display.Text,
          code: pointsFunction,
          dependencies: ['color', 'percent'],
        },
      ],
    },
    {
      id: 2,
      label: 'Procenta',
      subColumns: [
        {
          id: 3,
          name: 'percent',
          input: true,
          inputType: InputType.Number,
          display: Display.Text,
          code: percentFunction,
          dependencies: [],
        },
      ],
    },
  ],
};

const subjectTestIndex = (): JSX.Element => {
  return (
    <>
      <Typography variant="h5">Sloupce</Typography>
      <TestColumns markingSchema={markingSchema} subjectData={subjectData} />
    </>
  );
};

export default subjectTestIndex;
