export interface Subject {
  id: string;
  name: string;
}

export type Subjects = Subject[];

export interface AddSubjectArgs {
  name: string;
}
export interface AddDialogFormValues {
  name: string;
}
export interface UpdateSubjectArgs {
  id: string;
  name: string;
}

export interface SubjectListProps {
  loading: boolean;
  subjects: Subjects;
  addLoading: boolean;
  onSubjectAdd: (args: AddSubjectArgs) => Promise<boolean>;
  onSubjectUpdate: (args: UpdateSubjectArgs) => Promise<boolean>;
}

export interface AddDialogProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: AddDialogFormValues) => void;
}
