export interface ColorChangeDialogIndexProps {
  open: boolean;
  subjectId: string;
  onClose: () => void;
}

export interface ColorChangeDialogProps {
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (color: string) => void;
}
