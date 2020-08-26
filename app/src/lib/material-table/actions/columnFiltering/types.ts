import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { Column } from 'material-table';

export interface ColumnFilteringProps {
  onClick: () => void;
}

export interface ColumnFilteringDialogProps {
  columns: Column<any>[];
  defaultColumns: string[];
}
