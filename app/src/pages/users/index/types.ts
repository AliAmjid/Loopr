export interface User {
  id: string;
  name: string;
  createdAt: string;
  role: {
    id: string;
    name: string;
  };
}
export type Users = User[];
export interface UsersProps {
  users: Users;
}