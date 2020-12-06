export interface ClassGroupDialogFormValues {
  year: string;
  name: string;
}

export interface AddValues {
  year: number;
  section: string;
}

export interface ClassGroup {
  id: string;
  year: number;
  section: string;
}

export type ClassGroups = ClassGroup[];

export interface UpdateValues {
  id: string;
  year: number;
  section: string;
}

export interface ClassGroupListProps {
  classGroups: ClassGroups;
  classGroupsLoading: boolean;
  addClassGroupLoading: boolean;
  updateClassGroupLoading: boolean;
  onAdd: (values: AddValues) => Promise<boolean>;
  onSelectedClassChange: (cl: string) => void;
  onUpdate: (values: UpdateValues) => Promise<boolean>;
  onDelete: (classGroup: string) => Promise<boolean>;
}

export interface ClassGroupDialogProps {
  open: boolean;
  loading: boolean;
  title: string;
  primaryButtonLabel: string;
  defaultValues?: AddValues;
  onSubmit: (values: AddValues) => void;
  onClose: () => void;
}
