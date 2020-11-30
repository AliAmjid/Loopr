export interface AddValues {
  year: number;
  name: string;
}

export interface GroupsProps {
  onAdd: (values: AddValues) => Promise<boolean>;
}

export interface AddDialogProps {
  open: boolean;
  onSubmit: (values: AddValues) => void;
  onClose: () => void;
}
