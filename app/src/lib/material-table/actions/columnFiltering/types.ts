import { ColumnFilteringColumns } from 'lib/material-table/types';

export interface ColumnFilteringDialogProps {
  columns: ColumnFilteringColumns;
  defaultColumns: string[];
}

export interface ColumnFilteringState {
  open: boolean;
  selected: string[];
  setOpen: (open: boolean) => void;
  setSelected: (selected: string[]) => void;
}
