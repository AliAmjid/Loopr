import { Subject } from '../types';

export interface PointSystemIndexProps {
  subject: Subject;
  maxExams: number;
  color: string;
  onDetail: (examId: string) => void;
}

export interface Exam {
  id: string;
  name: string;
  points: string;
  maxPoints: number;
  percents: string;
  writtenAt: string;
  examWritten: boolean;
}

export type Exams = Exam[];

export interface PointSystemProps {
  subjectType: string;
  exams: Exams;
  maxExams: number;
  totalPoints: number;
  totalMaxPoints: number;
  totalPercents: string;
  totalMark: string;
  color: string;
  onDetail: (examId: string) => void;
}
