export interface PercentsToMarkDialogIndexProps {
  open: boolean;
  percentsToMarkConvert: {
    id: string;
    one: number;
    two: number;
    three: number;
    four: number;
  };
  onClose: () => void;
}

export interface PercentsValues {
  one: string;
  two: string;
  three: string;
  four: string;
}

export interface PercentsToMarkDialogProps {
  open: boolean;
  defaultValues: PercentsValues;
  loading: boolean;
  onSubmit: (values: PercentsValues) => void;
  onCancel: () => void;
}
