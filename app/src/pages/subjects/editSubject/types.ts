export interface EditSubjectState {
  group: string | undefined;
  classGroup: string | undefined;
  teacher: string | undefined;
  setGroup: (group: string | undefined) => void;
  setClassGroup: (classGroup: string | undefined) => void;
  setTeacher: (teacher: string | undefined) => void;
}
