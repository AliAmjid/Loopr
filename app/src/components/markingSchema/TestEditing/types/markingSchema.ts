export interface MarkingSchema {
  subjectVariables: SubjectVariable[];
  testVariables: TestVariable[];
  defaultColumn: string;
  testColumns: TestColumn[];
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

interface TestColumn {
  id: number;
  label: string;
  subColumns: SubColumn[];
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

export enum InputType {
  Text = 'text',
  Number = 'number',
  Color = 'color',
}

export enum Display {
  Text = 'text',
  Color = 'color',
}
