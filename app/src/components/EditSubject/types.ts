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

export interface SubmitArgs {
  group?: string;
  classGroup?: string;
  teacher: string;
}

export interface EditSubjectProps {
  defaultValues?: {
    group?: string;
    classGroup?: string;
    teacher?: string;
  };
  submitButtonLabel: string;
  onSubmit: (args: SubmitArgs) => Promise<void>;
}
