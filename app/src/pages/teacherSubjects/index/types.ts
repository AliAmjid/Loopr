export interface Subject {
  id: string;
  teacherCardColor?: string | null;
  evaluationSystem: string;
  archivedAt?: string;
  group?: {
    id: string;
    section: string;
  } | null;
  classGroup?: {
    id: string;
    year: number;
    section: string;
  } | null;
  subjectType?: {
    id: string;
    name: string;
  } | null;
}

export interface TeacherSubjectsProps {
  subjects: Subject[];
  loading: boolean;
  showArchived: boolean;
  onShowArchivedChange: (showArchived: boolean) => void;
}
