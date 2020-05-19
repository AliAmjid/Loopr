export interface TestColumn {
  id: number;
  name: string;
  label: string;
  code: string;
}

export interface Schema {
  testColumns: TestColumn[];
}
