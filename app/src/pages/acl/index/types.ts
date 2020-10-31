import { Column } from 'material-table';

export interface OnResourceChangeProps {
  roleId: string;
  resourceId: string;
  value: boolean;
}

export interface AclProps<
  RowData extends { name: string; resourceId: string } = {
    name: string;
    resourceId: string;
  }
> {
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
