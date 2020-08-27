import { Column } from 'material-table';

export interface AclProps<RowData> {
  columns: Column<RowData>[];
  rows: RowData;
}
