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
  selectedSubjectType?: string;
  showArchived: boolean;
  onAddClick: () => void;
  onGetSubjects: (args: GetSubjectsArgs) => GetSubjectsReturn;
  onDelete: (subject: string) => Promise<boolean>;
  onEdit: (subject: string) => void;
  onArchive: (subject: string) => Promise<boolean>;
  onShowArchivedChange: (show: boolean) => void;
}
