import { Column, MaterialTableProps } from 'material-table';

export type ColumnFilteringColumns<RowData extends {} = any> = (
  | Column<RowData>
  | { section?: string }
)[];

export interface MaterialTableCustomProps<RowData extends {}>
  extends MaterialTableProps<RowData> {
  defaultActions?: {
    columnFiltering?: {
      active: boolean;
      columns: ColumnFilteringColumns<RowData>;
      defaultColumns: string[];
    };
    grouping?: {
      active: boolean;
    };
  };
}
