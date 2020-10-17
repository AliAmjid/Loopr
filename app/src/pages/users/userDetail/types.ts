export type User =
  | {
      id: string;
      name: string;
      username: string;
      createdAt: string;
      role: {
        id: string;
        name: string;
      };
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
