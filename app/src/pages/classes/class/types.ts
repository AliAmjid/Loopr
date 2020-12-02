import { Query } from 'material-table';

export type DetailClassUser = {
  id: string;
  firstname: string;
  lastname: string;
  tableData?: {
    checked?: boolean;
  };
};

export interface GetUsersReturn {
  users: DetailClassUser[];
  totalCount: number;
}

export interface SelectionChangeArgs {
  id: string;
  selected: boolean;
}

export interface ClassProps {
  getClassUsers: (query: Query<DetailClassUser>) => Promise<GetUsersReturn>;
  getUsers: (query: Query<DetailClassUser>) => Promise<GetUsersReturn>;
  selectedClass?: string;
  onSelectionChange: (args: SelectionChangeArgs) => void;
  onSubmit: () => Promise<boolean>;
}
