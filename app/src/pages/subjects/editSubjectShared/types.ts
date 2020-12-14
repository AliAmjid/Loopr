export interface EditSubjectState {
  group: string | undefined;
  classGroup: string | undefined;
  teacher: string | undefined;
  add: boolean;
  setGroup: (group: string | undefined) => void;
  setClassGroup: (classGroup: string | undefined) => void;
  setTeacher: (teacher: string | undefined) => void;
  setAdd: (add: boolean) => void;
}

export interface EditSubjectSharedIndexProps {
  add?: boolean;
}
