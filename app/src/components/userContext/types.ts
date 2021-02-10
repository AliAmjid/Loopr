export interface User {
  id: string;
  firstname: string;
  lastname: string;
  role: {
    id: string;
    name: string;
    resources:
      | ({
          id: string;
          name: string;
        } | null)[]
      | null;
  };
  notifications: {
    edges:
      | ({
          node: {
            id: string;
            type: string;
            parameters: any;
            viewAt: string | null;
          } | null;
        } | null)[]
      | null;
  } | null;
}

export interface UserContext {
  set: (user: User) => void;
  value: User | undefined;
}
