import React, { useState } from 'react';

import { Table, TableCell, TableRow, TextField } from '@material-ui/core';

import { TestColumnsProps } from './types';

const TestColumns = (props: TestColumnsProps): JSX.Element => {
  const [state, setState] = useState({});

  const mappedHead = props.testColumns.map(column => (
    <TableCell colSpan={column.subColumns.length}>{column.label}</TableCell>
  ));
  const mappedSubColumns = props.testColumns.map(column => {
    return column.subColumns.map(subColumn => (
      <TableCell>{subColumn.name}</TableCell>
    ));
  });

  const evaluate = (stringCode: string, values: any) => {
    const params = {};
    for (const input of props.inputs) {
      const value = values[input.name] || input.defaultValue;
      params[input.name] = value;
    }

    const code = eval(`(${stringCode})`);

    return code(params);
  };

  const mappedInputs = props.testColumns.map(column => {
    return column.subColumns.map(subColumn => {
      const result = evaluate(subColumn.code, state);
      const value = result[0];
      const dependencies: string[] = result[1];

      return (
        <TableCell>
          <TextField
            value={value}
            onChange={e => {
              const newState = { ...state };
              newState[subColumn.name] = e.target.value;

              const visitedDeps = [];

              const loopThroughDependencies = (deps: string[]): void => {
                if (deps) {
                  if (!visitedDeps.some(v => deps.some(d => d === v))) {
                    visitedDeps.push(...deps);
                    deps.forEach(d => {
                      const dependencyTestColumn = props.testColumns.find(tc =>
                        tc.subColumns.find(sc => sc.name === d),
                      );
                      if (dependencyTestColumn) {
                        const dependencySubColumn = dependencyTestColumn.subColumns.find(
                          sc => sc.name === d,
                        );
                        if (dependencyTestColumn) {
                          const result = evaluate(
                            dependencySubColumn.code,
                            newState,
                          );
                          newState[d] = result[0];
                          loopThroughDependencies(result[1]);
                        }
                      }
                    });
                  }
                }
              };

              loopThroughDependencies(dependencies);

              setState(newState);
            }}
          />
        </TableCell>
      );
    });
  });

  return (
    <Table>
      <TableRow>{mappedHead}</TableRow>
      <TableRow>{mappedSubColumns}</TableRow>
      <TableRow>{mappedInputs}</TableRow>
    </Table>
  );
};

export default TestColumns;
