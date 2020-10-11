export interface User {
  username: string;
  role: string;
  name: string;
}
export type Users = User[];

export interface UserWithId extends User {
  id: number;
}
export type UsersWithId = UserWithId[];

export type RolesLookup = Record<string, string>;
export interface UserImportTableProps {
  users?: Users;
}

export interface UserImportTableUIProps {
  users: UsersWithId;
  rolesLookup: RolesLookup;
  loading: boolean;
  onRowAdd: (user: User) => void;
  onRowUpdate: (user: UserWithId) => void;
  onRowDelete: (user: UserWithId) => void;
  onSelectionChange: (users: UsersWithId) => void;
  onSubmit: () => void;
}
