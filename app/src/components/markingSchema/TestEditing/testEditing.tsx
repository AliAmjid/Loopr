import React, { useState } from 'react';

import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';

import generateDefaultTestData from 'components/markingSchema/TestEditing/scripts/generateDefaultTestColumns';
import getVariables from 'components/markingSchema/TestEditing/scripts/getVariables';
import runDependencies from 'components/markingSchema/TestEditing/scripts/runDependencies';
import updateDataFromDefaultColumn from 'components/markingSchema/TestEditing/scripts/updateDataFromDefaultColumn';
import {
  InputType,
  SubColumn,
} from 'components/markingSchema/TestEditing/types/markingSchema';
import Variables from 'components/markingSchema/TestEditing/variables';

import { SubjectTestProps, UserResult } from './types';

const TestEditing = (props: SubjectTestProps): JSX.Element => {
  const [dataInitialization, setDataInitialization] = useState(false);
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [testData, setTestData] = useState(
    generateDefaultTestData(props.testData, props.markingSchema),
  );

  if (!dataInitialization) {
    setUserResults(
      updateDataFromDefaultColumn(props.markingSchema, props.testData, true),
    );
    setDataInitialization(true);
  }

  const changeHandler = (
    value: any,
    subColumn: SubColumn,
    userId: number,
  ): void => {
    const variables = runDependencies(
      props.markingSchema,
      subColumn.dependencies,
      [subColumn.name],
      {
        [subColumn.name]: value,
        ...getVariables(props.testData),
      },
    );

    const updatedUserResults = [...userResults];
    const updatedUserResult = updatedUserResults.find(
      userResult => userResult.userId === userId,
    );

    const subColumns = [];
    for (const variable in variables) {
      if (variables.hasOwnProperty(variable))
        subColumns.push({ name: variable, value: variables[variable] });
    }
    updatedUserResult.subColumns = subColumns;
    setUserResults(updatedUserResults);
  };

  const testVariableChangeHandler = (name: string, value: any): void => {
    const newTestData = { ...testData };
    const testVariable = newTestData.testVariables.find(
      variable => variable.name === name,
    );
    testVariable.value = value;
    setTestData(newTestData);
    updateDataFromDefaultColumn(
      props.markingSchema,
      props.testData,
      false,
      userResults,
    );
  };

  const subjectVariableChangeHandler = (name: string, value: any): void => {
    const newTestData = { ...testData };
    const subjectVariable = newTestData.subjectVariables.find(
      variable => variable.name === name,
    );
    subjectVariable.value = value;
    setTestData(newTestData);
    updateDataFromDefaultColumn(
      props.markingSchema,
      props.testData,
      false,
      userResults,
    );
  };

  const mappedColumns = props.markingSchema.testColumns.map(column => (
    <TableCell key={`column${column.id}`} colSpan={column.subColumns.length}>
      {column.label}
    </TableCell>
  ));

  const mappedSubColumns = props.markingSchema.testColumns.map(column =>
    column.subColumns.map(subColumn => (
      <TableCell key={`subColumn${subColumn.id}`}>
        {`$${subColumn.name}`}
      </TableCell>
    )),
  );

  const mappedUsers = props.testData.results.map(result => {
    const mappedSubColumns = props.markingSchema.testColumns.map(column =>
      column.subColumns.map(subColumn => {
        const userResult = userResults.find(
          userResult => userResult.userId === result.userId,
        );
        if (userResult) {
          const userResultSubColumn = userResult.subColumns.find(
            userResultSubColumn => userResultSubColumn.name === subColumn.name,
          );

          if (userResultSubColumn) {
            const { value } = userResultSubColumn;

            return (
              <TableCell
                key={`user-${result.userId}-subColumn-${subColumn.id}`}
              >
                {subColumn.input ? (
                  <>
                    {subColumn.inputType === InputType.Text && (
                      <TextField
                        value={value}
                        onChange={e =>
                          changeHandler(
                            e.target.value,
                            subColumn,
                            result.userId,
                          )
                        }
                      />
                    )}
                    {subColumn.inputType === InputType.Number && (
                      <TextField
                        type="number"
                        value={value}
                        onChange={e =>
                          changeHandler(
                            e.target.value,
                            subColumn,
                            result.userId,
                          )
                        }
                      />
                    )}
                  </>
                ) : (
                  value
                )}
                {subColumn.inputType === InputType.Color &&
                  'barva - in progress'}
              </TableCell>
            );
          }
        }

        return (
          <TableCell key={`user-${result.userId}-subColumn-${subColumn.id}`}>
            Error
          </TableCell>
        );
      }),
    );

    return (
      <TableRow key={`user-${result.userId}`}>
        <TableCell>{`user-${result.userId}`}</TableCell>
        {mappedSubColumns}
      </TableRow>
    );
  });

  return (
    <>
      <Variables
        variables={testData.subjectVariables}
        onVariableUpdate={subjectVariableChangeHandler}
      />
      <Divider />
      <Variables
        variables={testData.testVariables}
        onVariableUpdate={testVariableChangeHandler}
      />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell />
            {mappedColumns}
          </TableRow>
          <TableRow>
            <TableCell />
            {mappedSubColumns}
          </TableRow>
          {mappedUsers}
        </TableBody>
      </Table>
    </>
  );
};

export default TestEditing;
