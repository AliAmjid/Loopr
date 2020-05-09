import { timeInterval } from 'rxjs/operators';

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
}

interface TestVariable {
  label: string;
  name: string;
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
  value: number;
}

export interface SubjectData {
  results: Result[];
}

export interface TestColumnsProps {
  markingSchema: MarkingSchema;
  subjectData: SubjectData;
}

export interface UserResult {
  userId: number;
  subColumns: { name: string; value: any }[];
}

export interface ObjectWithStringKeys {
  [key: string]: any;
}
