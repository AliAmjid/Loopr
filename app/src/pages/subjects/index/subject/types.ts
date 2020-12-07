import { Query } from 'material-table';

export interface Subject {
  id: string;
  group: {
    id: string;
    section: string;
  } | null;
  classGroup: {
    id: string;
    year: number;
    section: string;
  } | null;
  teacher: {
    id: string;
    firstname: string;
    lastname: string;
  } | null;
}

export type Subjects = Subject[];

export type GetSubjectsArgs = Query<Subject>;

export type GetSubjectsReturn = Promise<{
  totalCount: number;
  subjects: Subjects;
}>;

export interface SubjectProps {
  selectedSubject?: string;
  onAddClick: () => void;
  onGetSubjects: (args: GetSubjectsArgs) => GetSubjectsReturn;
  onDelete: (subject: string) => Promise<boolean>;
}
