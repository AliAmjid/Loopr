export interface ExamCreateValues {
  name: string;
  writtenAt: string;
}

export interface AddTestProps {
  loading: boolean;
  onExamCreate: (values: ExamCreateValues) => Promise<boolean>;
}
