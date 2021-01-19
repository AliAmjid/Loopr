import { Query } from 'material-table';

export interface ClassGroupUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  classGroup?: {
    id: string;
  } | null;
}

export interface User extends ClassGroupUser {
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

export interface StudentsProps {
  selectedClassGroup?: string;
  loading: boolean;
  classGroupsLookup: Record<string, string>;
  onGetClassGroupUsers: (
    query: Query<ClassGroupUser>,
  ) => Promise<GetUsersReturn>;
  onGetUsers: (query: Query<User>) => Promise<GetUsersReturn>;
  onSelectionChange: (users: User[]) => void;
  onSelectionClose: () => void;
  onSubmit: () => Promise<boolean>;
}
