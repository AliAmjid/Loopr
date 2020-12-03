import { Query } from 'material-table';

export type DetailClassGroupUser = {
  id: string;
  email: string;
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

type GetUsers = (query: Query<DetailClassGroupUser>) => Promise<GetUsersReturn>;

export interface StudentsProps {
  selectedClassGroup?: string;
  onGetClassGroupUsers: (
    query: Query<DetailClassGroupUser>,
  ) => Promise<GetUsersReturn>;
  onGetUsers: GetUsers;
  onSelectionChange: (args: SelectionChangeArgs) => void;
  onSubmit: () => Promise<boolean>;
}

export interface TeacherProps {
  teacher?: DetailClassGroupUser | null;
  loading: boolean;
  onGetUsers: GetUsers;
  onChange: (id: string) => Promise<boolean>;
}

export interface ClassGroupProps {
  selectedClassGroup?: string;
  teacher?: DetailClassGroupUser | null;
  teacherLoading: boolean;
  onGetClassGroupUsers: (
    query: Query<DetailClassGroupUser>,
  ) => Promise<GetUsersReturn>;
  onGetUsers: (query: Query<DetailClassGroupUser>) => Promise<GetUsersReturn>;
  onStudentsChange: (args: SelectionChangeArgs) => void;
  onStudentsSubmit: () => Promise<boolean>;
  onTeacherChange: (id: string) => Promise<boolean>;
}
