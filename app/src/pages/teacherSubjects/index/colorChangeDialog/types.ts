export interface ColorChangeDialogIndexProps {
  open: boolean;
  subjectId: string;
  defaultColor: string;
  onClose: () => void;
}

export interface ColorChangeDialogProps {
  open: boolean;
  loading: boolean;
  defaultColor: string;
  onCancel: () => void;
  onSubmit: (color: string) => void;
}
