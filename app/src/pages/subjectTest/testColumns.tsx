import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';

import {
  InputType,
  ObjectWithStringKeys,
  SubColumn,
  TestColumnsProps,
  UserResult,
} from './types';

const TestColumns = (props: TestColumnsProps): JSX.Element => {
  const [dataInitialization, setDataInitialization] = useState(false);
  const [userResults, setUserResults] = useState<UserResult[]>([]);

  const runCode = (code: string, variables: any): any => {
    const customFunction = eval(`(${code})`);
    const result = customFunction(variables);

    return result;
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

  if (!dataInitialization) {
    const defaultSubColumn = findSubColumnByName(
      props.markingSchema.defaultColumn,
    );

    if (defaultSubColumn) {
      const newUserResults = [];
      props.subjectData.results.forEach(result => {
        const subColumns = [];
        const otherColumns = runDependencies(
          defaultSubColumn.dependencies,
          [defaultSubColumn.name],
          { [defaultSubColumn.name]: result.value },
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

      console.log(newUserResults);

      setDataInitialization(true);
      setUserResults(newUserResults);
    }
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

  const mappedUsers = props.subjectData.results.map(result => {
    const mappedSubColumns = props.markingSchema.testColumns.map(column =>
      column.subColumns.map(subColumn => {
        const userResult = userResults.find(
          userResult => userResult.userId === result.userId,
        );
        // console.log('userResult', userResult);
        if (userResult) {
          const userResultSubColumn = userResult.subColumns.find(
            userResultSubColumn => userResultSubColumn.name === subColumn.name,
          );
          // console.log('userResultSubColumn', userResultSubColumn);

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
