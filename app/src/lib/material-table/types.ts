import { Column, MaterialTableProps } from 'material-table';

export interface MaterialTableCustomProps<RowData extends {}>
  extends MaterialTableProps<RowData> {
  defaultActions?: {
    columnFiltering?: {
      active: boolean;
      columns: Column<RowData>[];
      defaultColumns: string[];
    };
  };
}
