import { Query } from 'material-table';

export type DetailClassGroupUser = {
  id: string;
  firstname: string;
  lastname: string;
  tableData?: {
    checked?: boolean;
  };
};

export interface GetUsersReturn {
  users: DetailClassGroupUser[];
  totalCount: number;
}

export interface SelectionChangeArgs {
  id: string;
  selected: boolean;
}

export interface ClassGroupProps {
  getClassGroupUsers: (
    query: Query<DetailClassGroupUser>,
  ) => Promise<GetUsersReturn>;
  getUsers: (query: Query<DetailClassGroupUser>) => Promise<GetUsersReturn>;
  selectedClassGroup?: string;
  onSelectionChange: (args: SelectionChangeArgs) => void;
  onSubmit: () => Promise<boolean>;
}
