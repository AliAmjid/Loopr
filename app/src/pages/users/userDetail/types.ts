export type User =
  | {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      createdAt: string;
      role: {
        id: string;
        name: string;
      };
      archivedAt?: string | null;
    }
  | null
  | undefined;

export type Roles =
  | ({
      id: string;
      name: string;
    } | null)[]
  | null
  | undefined;

export interface UserDetailProps {
  loading: boolean;
  user: User;
  roles: Roles;
}
