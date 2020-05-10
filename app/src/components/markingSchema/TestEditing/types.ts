import { MarkingSchema } from 'components/markingSchema/TestEditing/types/markingSchema';

interface Result {
  userId: number;
  value: any;
}

interface TestVariableData {
  name: string;
  value: any;
  label: string;
}

interface SubjectVariableData {
  name: string;
  value: any;
  label: string;
}

export interface TestData {
  results: Result[];
  testVariables: TestVariableData[];
  subjectVariables: SubjectVariableData[];
}

export interface SubjectTestProps {
  markingSchema: MarkingSchema;
  testData: TestData;
}

export interface UserResult {
  userId: number;
  subColumns: { name: string; value: any }[];
}

export interface ObjectWithStringKeys {
  [key: string]: any;
}

export interface TestVariablesProps {
  variables: TestVariableData[];
  onVariableUpdate: (name: string, value: any) => void;
}

export interface TestEditingIndexProps {
  markingSchema: MarkingSchema;
  testData: TestData;
}
