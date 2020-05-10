import { MarkingSchema, TestData, UserResult } from '../types';

import findSubColumnByName from './findColumnByName';
import getVariables from './getVariables';
import runDependencies from './runDependencies';

const updateDataFromDefaultColumn = (
  markingSchema: MarkingSchema,
  testData: TestData,
  fromDefaultValues: boolean,
  userResults: UserResult[] = [],
): UserResult[] => {
  const defaultSubColumn = findSubColumnByName(
    markingSchema.defaultColumn,
    markingSchema,
  );

  if (defaultSubColumn) {
    const newUserResults: UserResult[] = [];

    const inLoopFunction = (userId: number, defaultValue: any): void => {
      const subColumns = [];
      const otherColumns = runDependencies(
        markingSchema,
        defaultSubColumn.dependencies,
        [defaultSubColumn.name],
        {
          [defaultSubColumn.name]: defaultValue,
          ...getVariables(testData),
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
        userId,
        subColumns,
      });
    };
    if (!fromDefaultValues) {
      userResults.forEach(result => {
        const userDefaultConfig = result.subColumns.find(
          subColumn => subColumn.name === defaultSubColumn.name,
        );
        inLoopFunction(result.userId, userDefaultConfig.value);
      });
    } else {
      testData.results.forEach(result => {
        inLoopFunction(result.userId, result.value);
      });
    }

    return newUserResults;
  }
};

export default updateDataFromDefaultColumn;
