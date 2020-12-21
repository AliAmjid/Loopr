import { Query } from 'material-table';

export type DetailClassGroupUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  classGroup?: {
    id: string;
  } | null;
  tableData?: {
    checked?: boolean;
  };
};
export interface GetUsersReturn {
  users: DetailClassGroupUser[];
  totalCount: number;
}

type GetUsers = (query: Query<DetailClassGroupUser>) => Promise<GetUsersReturn>;

export interface TeacherProps {
  teacher?: DetailClassGroupUser | null;
  loading: boolean;
  onGetUsers: GetUsers;
  onChange: (id: string) => Promise<boolean>;
}
