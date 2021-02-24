import { Query } from 'material-table';

export interface Group {
  id: string;
  section: string;
  year?: number;
  teacher?: {
    id: string;
    firstname: string;
    lastname: string;
  } | null;
}

export type Groups = Group[];

export type OnGetGroupsReturn = Promise<{
  totalCount: number;
  groups: Groups;
}>;

export interface GroupTableProps {
  classGroup?: boolean;
  selectedGroup: string;
  onSelectedGroupChange: (group: string) => void;
  onGetGroups: (query: Query<Group>) => OnGetGroupsReturn;
}
