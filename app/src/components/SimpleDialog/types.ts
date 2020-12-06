export interface SimpleDialogProps {
  open: boolean;
  title?: string;
  content?: JSX.Element;
  actions?: JSX.Element[];
  onClose?: () => void;
}
