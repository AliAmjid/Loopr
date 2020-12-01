import { Query } from 'material-table';

export type DetailGroupUser = {
  id: string;
  firstname: string;
  lastname: string;
};

export interface GetGroupsUsersReturn {
  users: DetailGroupUser[];
  totalCount: number;
}

export interface GroupProps {
  getGroupUsers: (
    query: Query<DetailGroupUser>,
  ) => Promise<GetGroupsUsersReturn>;
  selectedGroup?: string;
}
