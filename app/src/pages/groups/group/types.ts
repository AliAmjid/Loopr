import { Query } from 'material-table';

export type DetailGroupUser = {
  id: string;
  firstname: string;
  lastname: string;
  tableData?: {
    checked?: boolean;
  };
};

export interface GetUsersReturn {
  users: DetailGroupUser[];
  totalCount: number;
}

export interface SelectionChangeArgs {
  id: string;
  selected: boolean;
}

export interface GroupProps {
  getGroupUsers: (query: Query<DetailGroupUser>) => Promise<GetUsersReturn>;
  getUsers: (query: Query<DetailGroupUser>) => Promise<GetUsersReturn>;
  selectedGroup?: string;
  onSelectionChange: (args: SelectionChangeArgs) => void;
}
