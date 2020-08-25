import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import { Column } from 'material-table';

export interface ColumnFilteringProps {
  onClick: () => void;
}

export interface ColumnFilteringDialogProps {
  open: boolean;
  onClose: () => void;
  selected: string[];
  columns: Column<any>[];
  onChange: SelectInputProps['onChange'];
}
