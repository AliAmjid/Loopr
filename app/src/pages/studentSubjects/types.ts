export interface Exam {
  id: string;
  name: string;
  pointSystem?: {
    points: number;
    maxPoints: number;
    examWritten: boolean;
    average: number;
    percentil: number;
  };
}

export interface Subject {
  id: string;
  subjectType: string;
  evaluationSystem: string;
  percentsToMarkConvert?: {
    id: string;
    one: number;
    two: number;
    three: number;
    four: number;
  };
  exams: Exam[];
}

export type Subjects = Subject[];

export interface StudentSubjectsProps {
  subjects: Subjects;
  maxExams: number;
}
export interface DetailProps {
  subject?: Subject;
  examId?: string;
  onCancel: () => void;
}

export type DetailState =
  | {
      subject?: Subject;
      examId?: string;
    }
  | undefined;
