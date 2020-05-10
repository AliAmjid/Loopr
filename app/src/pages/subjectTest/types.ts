export enum InputType {
  Text = 'text',
  Number = 'number',
  Color = 'color',
}

export enum Display {
  Text = 'text',
  Color = 'color',
}

interface SubjectVariable {
  label: string;
  name: string;
  defaultValue: any;
}

interface TestVariable {
  label: string;
  name: string;
  defaultValue?: any;
}

export interface SubColumn {
  id: number;
  name: string;
  input: boolean;
  inputType?: InputType;
  display: Display;
  code: string;
  dependencies?: string[];
}

interface TestColumn {
  id: number;
  label: string;
  subColumns: SubColumn[];
}

export interface MarkingSchema {
  subjectVariables: SubjectVariable[];
  testVariables: TestVariable[];
  defaultColumn: string;
  testColumns: TestColumn[];
}

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

export interface TestColumnsProps {
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
