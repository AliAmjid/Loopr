export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: {
    id: string;
    name: string;
  };
  privateData?: {
    defaultPercentToMark?: {
      id: string;
      one: number;
      two: number;
      three: number;
      four: number;
    };
  };
}

export interface ProfileProps {
  user?: User | null;
  loading: boolean;
}
