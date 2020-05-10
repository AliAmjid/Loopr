import { MarkingSchema, ObjectWithStringKeys } from '../types';

import findSubColumnByName from './findColumnByName';
import runCode from './runcCode';

const runDependencies = (
  markingSchema: MarkingSchema,
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
          const subColumn = findSubColumnByName(dependency, markingSchema);
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

export default runDependencies;
