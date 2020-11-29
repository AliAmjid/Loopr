export interface EditableListItemProps {
  primary: string;
  secondary?: string;
  edit: 'primary' | 'secondary';
  onSubmit: (value: string) => Promise<boolean>;
  lookup?: Record<any, string>;
  additionalActions?: JSX.Element[];
  classes?: {
    editIconButton?: string;
  };
  editingDisabled?: boolean;
}
