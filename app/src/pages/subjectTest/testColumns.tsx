import React, { useState } from 'react';

import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';

import Variables from 'pages/subjectTest/variables';

import {
  InputType,
  ObjectWithStringKeys,
  SubColumn,
  TestColumnsProps,
  TestData,
  UserResult,
} from './types';

const TestColumns = (props: TestColumnsProps): JSX.Element => {
  const [dataInitialization, setDataInitialization] = useState(false);
  const [userResults, setUserResults] = useState<UserResult[]>([]);

  const generateDefaultTestData = (): TestData => {
    const defaultTestData = { ...props.testData };

    props.markingSchema.testVariables.forEach(testVariable => {
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

    props.markingSchema.subjectVariables.forEach(subjectVariable => {
      let defaultSubjectVariable = defaultTestData.subjectVariables.find(
        defaultSubjectVariable =>
          defaultSubjectVariable.name === subjectVariable.name,
      );
      if (!defaultSubjectVariable) {
        defaultSubjectVariable = {
          name: subjectVariable.name,
          value: subjectVariable.defaultValue,
          label: subjectVariable.label,
        };

        defaultTestData.subjectVariables.push(defaultSubjectVariable);
      }
    });

    return defaultTestData;
  };

  const [testData, setTestData] = useState(generateDefaultTestData());

  const runCode = (code: string, variables: any): any => {
    const customFunction = eval(`(${code})`);

    return customFunction(variables);
  };

  const findSubColumnByName = (name: string): SubColumn => {
    let wantedSubColumn: SubColumn;
    props.markingSchema.testColumns.forEach(column => {
      if (!wantedSubColumn) {
        column.subColumns.forEach(subColumn => {
          if (subColumn.name === name && !wantedSubColumn) {
            wantedSubColumn = subColumn;
          }
        });
      }
    });

    return wantedSubColumn;
  };

  const getTestVariables = (): ObjectWithStringKeys => {
    const testVariables = {};
    props.testData.testVariables.forEach(testVariable => {
      testVariables[testVariable.name] = testVariable.value;
    });

    return testVariables;
  };

  const getSubjectVariables = (): ObjectWithStringKeys => {
    const subjectVariables = {};
    props.testData.subjectVariables.forEach(subjectVariable => {
      subjectVariables[subjectVariable.name] = subjectVariable.value;
    });

    return subjectVariables;
  };

  const runDependencies = (
    deps: string[],
    visitedDependencies: string[] = [],
    defaultVariables: ObjectWithStringKeys = {},
  ): ObjectWithStringKeys => {
    let updatedValues: ObjectWithStringKeys;

    const nest = (
      dependencies: string[],
      variables: ObjectWithStringKeys,
    ): void => {
      if (dependencies) {
        dependencies.forEach(dependency => {
          if (
            !visitedDependencies.some(
              visitedDependency => visitedDependency === dependency,
            )
          ) {
            visitedDependencies.push(dependency);
            const subColumn = findSubColumnByName(dependency);
            if (subColumn) {
              const result = runCode(subColumn.code, variables);
              variables[subColumn.name] = result;
              updatedValues = variables;
              if (subColumn.dependencies) {
                nest(subColumn.dependencies, variables);
              }
            }
          }
        });
      }
    };
    nest(deps, defaultVariables);

    return updatedValues;
  };

  const updateDataFromDefaultColumn = (): void => {
    const defaultSubColumn = findSubColumnByName(
      props.markingSchema.defaultColumn,
    );

    if (defaultSubColumn) {
      const newUserResults = [];
      testData.results.forEach(result => {
        const subColumns = [];
        const otherColumns = runDependencies(
          defaultSubColumn.dependencies,
          [defaultSubColumn.name],
          {
            [defaultSubColumn.name]: result.value,
            ...getTestVariables(),
            ...getSubjectVariables(),
          },
        );

        for (const otherColumn in otherColumns) {
          if (otherColumns.hasOwnProperty(otherColumn))
            subColumns.push({
              name: otherColumn,
              value: otherColumns[otherColumn],
            });
        }

        newUserResults.push({
          userId: result.userId,
          subColumns,
        });
      });

      setDataInitialization(true);
      setUserResults(newUserResults);
    }
  };

  if (!dataInitialization) {
    updateDataFromDefaultColumn();
  }

  const changeHandler = (
    value: any,
    subColumn: SubColumn,
    userId: number,
  ): void => {
    const variables = runDependencies(
      subColumn.dependencies,
      [subColumn.name],
      {
        [subColumn.name]: value,
        ...getTestVariables(),
        ...getSubjectVariables(),
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
    updateDataFromDefaultColumn();
  };

  const subjectVariableChangeHandler = (name: string, value: any): void => {
    const newTestData = { ...testData };
    const subjectVariable = newTestData.subjectVariables.find(
      variable => variable.name === name,
    );
    subjectVariable.value = value;
    setTestData(newTestData);
    updateDataFromDefaultColumn();
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

export default TestColumns;
