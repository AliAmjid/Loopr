export interface Exam {
  id: string;
  name: string;
  writtenAt: string;
  pointSystem?: {
    points: number;
    maxPoints: number;
    examWritten: boolean;
    average: number;
    percentil: number;
    worstThan: number;
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

interface SchoolPeriod {
  id: string;
  quarter: number;
  schoolYear: number;
}
export type SchoolPeriods = SchoolPeriod[];

export interface StudentSubjectsProps {
  subjects: Subjects;
  maxExams: number;
  schoolPeriods: SchoolPeriods;

  selectedSchoolPeriods: string[];
  loading: boolean;
  onSchoolPeriodsChange: (schoolPeriods: string[]) => void;
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
