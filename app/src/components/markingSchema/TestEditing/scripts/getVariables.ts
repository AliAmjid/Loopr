import { ObjectWithStringKeys, TestData } from '../types';

const getVariables = (testData: TestData): ObjectWithStringKeys => {
  const variables = {};
  testData.testVariables.forEach(testVariable => {
    variables[testVariable.name] = testVariable.value;
  });

  testData.subjectVariables.forEach(subjectVariable => {
    variables[subjectVariable.name] = subjectVariable.value;
  });

  return variables;
};

export default getVariables;
