export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  exams: {
    id: number;
    points: number;
  }[];
}

export interface Exam {
  id: string;
  name: string;
}

export type Students = Student[];
export type Exams = Exam[];

export interface PointSystemProps {
  loading: boolean;
  exams: Exams;
  students: Students;
  onExamCreate: () => void;
}
