export interface Subject {
  id: string;
  teacherCardColor: string;
  group?: {
    id: string;
    section: string;
  } | null;
  classGroup?: {
    id: string;
    year: number;
    section: string;
  } | null;
  subjectType: {
    id: string;
    name: string;
  };
}

export interface TeacherSubjectsProps {
  subjects: Subject[];
}

export interface ColorChangeDialogProps {
  open: boolean;
}
