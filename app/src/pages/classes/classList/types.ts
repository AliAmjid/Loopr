export interface AddDialogFormValues {
  year: string;
  name: string;
}

export interface AddValues {
  year: number;
  section: string;
}

export interface Class {
  id: string;
  year: number;
  section: string;
}

export type Classes = Class[];

export interface UpdateValues {
  id: string;
  section: string;
}

export interface ClassListProps {
  classes: Classes;
  classesLoading: boolean;
  addClassLoading: boolean;
  onAdd: (values: AddValues) => Promise<boolean>;
  onSelectedClassChange: (cl: string) => void;
  onUpdate: (values: UpdateValues) => Promise<boolean>;
}

export interface AddDialogProps {
  open: boolean;
  loading: boolean;
  onSubmit: (values: AddValues) => void;
  onClose: () => void;
}
