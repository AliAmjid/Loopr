import React, { useState } from 'react';

import { Typography } from '@material-ui/core';

import TestColumns from 'pages/subjectTest/testColumns';
import TestVariables from 'pages/subjectTest/testVariables';

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

const colorFunction = function main(values) {
  let color = 'krásná';

  if (values.percent < 90) color = 'skoro hezká';
  if (values.percent < 75) color = 'ok';
  if (values.percent < 60) color = 'nehezká';
  if (values.percent < 40) color = 'okšlivá';

  return color;
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
          name: 'color',
          input: false,
          display: Display.Text,
          code: colorFunction,
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
          dependencies: ['points', 'color'],
        },
      ],
    },
  ],
};

const subjectTestIndex = (): JSX.Element => {
  const generateDefaultTestData = (): TestData => {
    const defaultTestData = { ...testDataFromServer };

    markingSchema.testVariables.forEach(testVariable => {
      let defaultTestVariable = defaultTestData.testVariables.find(
        defaultTestVariable => defaultTestVariable.name === testVariable.name,
      );
      if (!defaultTestVariable) {
        defaultTestVariable = {
          name: testVariable.name,
          value: testVariable.defaultValue || '',
          label: testVariable.label,
        };
        defaultTestData.testVariables.push(defaultTestVariable);
      }
    });

    return defaultTestData;
  };

  const [testData, setTestData] = useState(generateDefaultTestData());

  const testVariableChangeHandler = (name: string, value: any): void => {
    const newTestData = { ...testData };
    const testVariable = newTestData.testVariables.find(
      variable => variable.name === name,
    );
    testVariable.value = value;
    setTestData(newTestData);
  };

  return (
    <>
      <TestVariables
        testVariables={testData.testVariables}
        onTestVariableUpdate={testVariableChangeHandler}
      />
      <Typography variant="h5">Sloupce</Typography>
      <TestColumns markingSchema={markingSchema} testData={testData} />
    </>
  );
};

export default subjectTestIndex;
