import { SchoolPeriod } from 'pages/schoolPeriods/types';

export interface EditDialogIndexProps {
  id: string;
  open: boolean;
  defaultValues?: SchoolPeriod;
  onClose: () => void;
}
