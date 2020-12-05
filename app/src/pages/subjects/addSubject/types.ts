export interface AddSubjectState {
  group: string | undefined;
  classGroup: string | undefined;
  teacher: string | undefined;
  setGroup: (group: string) => void;
  setClassGroup: (classGroup: string) => void;
  setTeacher: (teacher: string) => void;
}
