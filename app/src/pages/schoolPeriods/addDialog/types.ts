export interface SubmitValues {
  from: string;
  to: string;
  quarter: number;
  year: number;
}

export interface AddDialogProps {
  open: boolean;
  onSubmit: (values: SubmitValues) => void;
  onCancel: () => void;
}

export interface AddDialogIndexProps {
  open: boolean;
  onClose: () => void;
}
