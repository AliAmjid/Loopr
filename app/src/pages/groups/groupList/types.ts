export interface AddDialogFormValues {
  year: string;
  name: string;
}

export interface AddValues {
  year: number;
  section: string;
}

export interface Group {
  id: string;
  year: number;
  section: string;
}

export type Groups = Group[];

export interface GroupListProps {
  groups: Groups;
  groupsLoading: boolean;
  addGroupLoading: boolean;
  onAdd: (values: AddValues) => Promise<boolean>;
  onSelectedGroupChange: (group: string) => void;
}

export interface AddDialogProps {
  open: boolean;
  onSubmit: (values: AddValues) => void;
  onClose: () => void;
}
