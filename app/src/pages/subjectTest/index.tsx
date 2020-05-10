import React, { useState } from 'react';

import { Typography } from '@material-ui/core';

import SubjectTest from 'pages/subjectTest/subjectTest';
import Variables from 'pages/subjectTest/variables';

import TestEditingIndex from 'components/markingSchema/TestEditing';

import {
  Display,
  InputType,
  MarkingSchema,
  ObjectWithStringKeys,
  TestData,
} from './types';

const pointsFunction = function main(values) {
  return +values.maxPoints * (+values.percent / 100);
}.toString();

const markFunction = function main(values) {
  let mark = '1';

  if (values.percent < values.mark2) mark = '2';
  if (values.percent < values.mark3) mark = '3';
  if (values.percent < values.mark4) mark = '4';
  if (values.percent < values.mark5) mark = '5';

  return mark;
}.toString();

const percentFunction = function percentFunction(values) {
  return (+values.points / +values.maxPoints) * 100;
}.toString();

const testDataFromServer: TestData = {
  results: [
    { userId: 1, value: 5 },
    { userId: 2, value: 10 },
  ],
  testVariables: [],
  subjectVariables: [],
};

const markingSchema: MarkingSchema = {
  subjectVariables: [
    {
      label: 'Známka - 2',
      name: 'mark2',
      defaultValue: 90,
    },
    {
      label: 'Známka - 3',
      name: 'mark3',
      defaultValue: 80,
    },
    {
      label: 'Známka - 4',
      name: 'mark4',
      defaultValue: 70,
    },
    {
      label: 'Známka - 5',
      name: 'mark5',
      defaultValue: 60,
    },
  ],
  testVariables: [
    {
      label: 'Maximum bodů',
      name: 'maxPoints',
      defaultValue: 10,
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
          name: 'mark',
          input: false,
          display: Display.Text,
          code: markFunction,
        },
        {
          id: 2,
          name: 'points',
          input: true,
          inputType: InputType.Number,
          display: Display.Text,
          code: pointsFunction,
          dependencies: ['percent'],
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
          dependencies: ['points', 'mark'],
        },
      ],
    },
  ],
};

const subjectTestIndex = (): JSX.Element => {
  return (
    <>
      <TestEditingIndex
        markingSchema={markingSchema}
        testData={testDataFromServer}
      />
    </>
  );
};

export default subjectTestIndex;
