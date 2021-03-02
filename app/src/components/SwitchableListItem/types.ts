export interface SwitchableListItemProps {
  primary?: string;
  secondary?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
