export interface User {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  role: {
    id: string;
    name: string;
  };
}
export type Users = User[];
export interface UsersProps {
  loading: boolean;
  users: Users;
}
