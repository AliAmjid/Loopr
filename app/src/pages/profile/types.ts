export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: {
    id: string;
    name: string;
  };
}

export interface ProfileProps {
  user?: User | null;
  loading: boolean;
}
