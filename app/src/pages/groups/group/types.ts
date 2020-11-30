export type DetailGroupUsers =
  | {
      id: string;
      firstname: string;
      lastname: string;
    }[]
  | null
  | undefined;

export type DetailGroup =
  | {
      id: string;
      users: DetailGroupUsers;
    }
  | undefined
  | null;

export interface GroupIndexProps {
  selectedGroup?: string;
}

export interface GroupProps {
  group: DetailGroup;
  loading: boolean;
}
