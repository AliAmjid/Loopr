import { Exam, Exams, Student, Students } from '../types';

export interface EditStudent extends Student {
  pointsValue: string;
  percentsValue: string;
  pointsError: boolean;
  percentsError: boolean;
  pointsWarning: boolean;
  percentsWarning: boolean;
}

export type EditStudents = EditStudent[];

export interface StudentExamChangeValues {
  studentId: string;
  points?: string;
  percents?: string;
}

export interface EditIndexProps {
  open: boolean;
  examId: string;
  onClose: () => void;
  exams: Exams;
  students: Students;
}

export interface EditProps {
  open: boolean;
  exam: Exam;
  students?: EditStudents;
  onSubmit: () => void;
  onCancel: () => void;
  onStudentExamChange: (values: StudentExamChangeValues) => void;
  onExamInfoEdit: () => void;
}

export interface ExamInfoDialogSubmitValues {
  maxPoints: string;
  name: string;
}

export interface ExamInfoDialogProps {
  open: boolean;
  defaultValues: {
    name: string;
    maxPoints: number;
  };
  onSubmit: (values: ExamInfoDialogSubmitValues) => void;
  onClose: () => void;
}
