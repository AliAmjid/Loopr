import { SchoolPeriod } from '../types';

export interface SubmitValues {
  from: string;
  to: string;
  quarter: number;
  year: number;
}

export interface EditDialogSharedProps {
  open: boolean;
  loading: boolean;
  submitActionLabel: string;
  title: string;
  defaultValues?: SchoolPeriod;
  onCancel: () => void;
  onSubmit: (values: SubmitValues) => void;
}
