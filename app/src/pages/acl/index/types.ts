import { Column } from 'material-table';

export interface OnResourceChangeProps {
  roleId: string;
  resourceId: string;
  value: boolean;
}

export interface RowData {
  name: string;
  resourceId: string;
}

export interface AclProps {
  columns: Column<RowData>[];
  rows?: RowData[];
  onResourceChange: (props: OnResourceChangeProps) => Promise<boolean>;
  onRoleAdd: () => void;
  loading: boolean;
}

export interface HeaderCellProps {
  roleName: string;
  roleId: string;
}
