import { Query } from 'material-table';

export interface Group {
  id: string;
  section: string;
}

export type Groups = Group[];

export type OnGetGroupReturn = Promise<{
  totalCount: number;
  groups: Groups;
}>;

export interface GroupTableProps {
  onGetGroups: (query: Query<Group>) => OnGetGroupReturn;
}
