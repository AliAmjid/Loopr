import { Exams, Students } from '../types';

export interface CSVDownloadIndexProps {
  students: Students;
  exams: Exams;
  subjectTitle: string;
  maxPoints: number;
}
