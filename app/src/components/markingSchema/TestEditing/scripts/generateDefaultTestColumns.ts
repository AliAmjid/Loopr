import { MarkingSchema, TestData } from '../types';

const generateDefaultTestData = (
  defaultTestData: TestData,
  markingSchema: MarkingSchema,
): TestData => {
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

  markingSchema.subjectVariables.forEach(subjectVariable => {
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

export default generateDefaultTestData;
