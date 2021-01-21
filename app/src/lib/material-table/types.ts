import { Action, Column, MaterialTableProps } from 'material-table';

export type ColumnFilteringColumns<RowData extends {} = any> = (
  | Column<RowData>
  | { section?: string }
)[];

export interface MaterialTableCustomProps<RowData extends {}>
  extends MaterialTableProps<RowData> {
  uniqueName: string;
  hidePagination?: boolean;
  totalCount?: number;
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

export type Actions<RowData extends {}> = (
  | Action<RowData>
  | ((rowData: RowData) => Action<RowData>)
)[];
