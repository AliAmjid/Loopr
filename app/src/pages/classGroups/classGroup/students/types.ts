import { Query } from 'material-table';

export interface ClassGroupUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface User extends ClassGroupUser {
  classGroup?: {
    id: string;
  } | null;
  tableData?: {
    checked?: boolean;
  };
}

export interface GetClassGroupUsersReturn {
  users: ClassGroupUser[];
  totalCount: number;
}

export interface GetUsersReturn {
  users: User[];
  totalCount: number;
}

export interface SelectionChangeArgs {
  id: string;
  selected: boolean;
}

export interface StudentsProps {
  selectedClassGroup?: string;
  onGetClassGroupUsers: (
    query: Query<ClassGroupUser>,
  ) => Promise<GetUsersReturn>;
  onGetUsers: (query: Query<User>) => Promise<GetUsersReturn>;
  onSelectionChange: (users: User[]) => void;
  onSubmit: () => Promise<boolean>;
}
