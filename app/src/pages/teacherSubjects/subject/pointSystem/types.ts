interface StudentExam {
  id: string;
  points: string;
  percents: string;
  examWritten: boolean;
  pointsNumber: number;
  color: string;
}

export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  exams: StudentExam[];
  totalPoints: number;
  totalPercents: string;
  totalMark: number;
  totalColor: string;
}

export interface Exam {
  id: string;
  name: string;
  maxPoints: number;
  writtenAt: string;
}

export type Students = Student[];
export type Exams = Exam[];

interface SchoolPeriod {
  id: string;
  quarter: number;
  schoolYear: number;
}
export type SchoolPeriods = SchoolPeriod[];

export interface PointSystemProps {
  loading: boolean;
  exams: Exams;
  students: Students;
  subjectTitle: string;
  maxPoints: number;
  schoolPeriods: SchoolPeriods;
  selectedSchoolPeriods: string[];
  onSchoolPeriodsChange: (schoolPeriods: string[]) => void;
  onExamCreate: () => void;
  onPercentsToMarkEdit: () => void;
}
