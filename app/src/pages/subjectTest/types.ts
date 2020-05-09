interface GlobalVariable {
  name: string;
  label: string;
}

interface SubTestColumn {
  name: string;
  code: string;
}

interface TestColumn {
  label: string;
  subColumns: SubTestColumn[];
}

interface Criteria {
  globalVariables: GlobalVariable[];
}

export interface SubjectTestProps {
  criteria: Criteria;
}

export interface SubjectVariablesProps {
  subjectVariables: GlobalVariable[];
}

export interface TestColumnsProps {
  testColumns: TestColumn[];
  inputs: { name: string; defaultValue: string }[];
}
