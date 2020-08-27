import { Column } from 'material-table';

export interface ColumnFilteringDialogProps {
  columns: Column<any>[];
  defaultColumns: string[];
}

export interface ColumnFilteringState {
  open: boolean;
  selected: string[];
  setOpen: (open: boolean) => void;
  setSelected: (selected: string[]) => void;
}
