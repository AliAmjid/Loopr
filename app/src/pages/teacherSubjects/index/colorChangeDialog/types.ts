export interface ColorChangeDialogIndexProps {
  open: boolean;
  onClose: () => void;
}

export interface ColorChangeDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (color: string) => void;
}
