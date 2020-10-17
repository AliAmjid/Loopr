export interface EditableListItemProps {
  primary: string;
  secondary?: string;
  edit: 'primary' | 'secondary';
  onSubmit: (value: string) => Promise<boolean>;
}
