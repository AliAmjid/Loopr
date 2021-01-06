export interface StudentExam {
  id: string;
  points: number;
  examWritten: boolean;
  maxPoints: number;
}

export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  exams: StudentExam[];
  totalPoints: number;
  totalPercents: string;
  totalMark: number;
}

export interface Exam {
  id: string;
  name: string;
  maxPoints: number;
}

export type Students = Student[];
export type Exams = Exam[];

export interface PointSystemProps {
  loading: boolean;
  exams: Exams;
  students: Students;
  subjectTitle: string;
  maxPoints: number;
  onExamCreate: () => void;
}
