export interface PercentsToMarkDialogIndexProps {
  open: boolean;
  percentsToMarkConvert: {
    one: number;
    two: number;
    three: number;
    four: number;
  };
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
  onSubmit: (values: PercentsValues) => void;
}
