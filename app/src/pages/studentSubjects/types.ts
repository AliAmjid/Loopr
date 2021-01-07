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
  exams: {
    id: string;
    name: string;
    pointSystem?: {
      points: number;
      maxPoints: number;
      examWritten: boolean;
    };
  }[];
}

export type Subjects = Subject[];

export interface StudentSubjectsProps {
  subjects: Subjects;
  maxExams: number;
}
